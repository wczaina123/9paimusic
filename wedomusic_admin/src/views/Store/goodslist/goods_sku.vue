<template>
<div>
    <!-- <div class="maintop-one" @click="go_list">
        <span>返回列表</span>
    </div> -->
   <p class="line_p"><a href="javascript:;" @click="go_list">商品列表</a>&gt;<a href="javascript:;">库存管理</a></p>

    <div class="mainbox" style="margin:30px 0">
    <p class="home_text home_text_p" style="margin-bottom:30px;">
        库存管理
    </p>
    <div class="tablebox">
        <table class="table-list">
            <thead>
            <tr>
            <!-- <th style="display:none"></th> -->
            <th style="width:5%;">ID</th>
            <th style="width:20%;">货品名称</th>
            <th style="width:15%;">库存</th>
            <th style="width:15%;">预警库存</th>
            <th style="width:15%;">缩略图</th>
            <th >操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="res in sku_list" :key="res.id">
                <td style="text-align:center;">{{res.id}}</td>
                <td style="text-align:center;">{{res.attrsV}}</td>
                <td style="text-align:center;">{{res.stock}}</td>
                <td style="text-align:center;">{{res.warning_stock}}</td>
                <td style="text-align:center;"><img :src="res.cover_url"></td>  <!--换成img-->

                <td style="text-align: center;" class="acolor">
                <a @click="shou_change(res.id)">修改</a>  
                <a style="margin-left:6px;" @click="delbook(res.id)">删除</a>
                </td>
            </tr>
            
            </tbody>
        </table>
    </div>
    </div>
    <!--弹框-->
    <div class="app_alert">
        <Modal v-model="father" width="500" class-name="vertical-center-modal">
          <div slot="header" style="text-align:center;font-size:16px;margin:0">添加类目</div>
            <div class="father_main">
                <div class="uplode_class">
                    <div class="uplode_box">
                        <form name=theform>
                            <div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;background:#f6f6f6;">
                                <div class="edit-upload-plus">
                                    <a href="javascript:void(0);" class="upload-file" id="supplier_plus">
                                        <div id="supplier_span">
                                        <Icon type="images" size="52" style="color:white;"></Icon>
                                        <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式,RGB模式,<br>不超过500k</p>
                                        <button class="uplode_btn">点击上传</button>  
                                        </div>
                                        <input type="file" name="file" id="supplier" @change="upload('supplier')">
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div> 
                </div>
                <div class="my_stock">
                     <div style="display:inline-block;width:60px;text-align:right;">库存:</div> <Input class="up_inp" v-model="stock_name" placeholder="输入库存" style="width: 160px"></Input>
                    <br>
                    <br>
                      <div style="display:inline-block;width:60px;text-align:right;">预警库存:</div><Input class="up_inp" v-model="warning_stock_name" placeholder="输入预警库存" style="width: 160px"></Input>
                </div>
            </div>
            
           <!--  <div slot="footer" class="btns">
                <button class="btn btn1" @click="cancel">取消</button>
                <button class="btn btn2" @click="chang_sku">确定</button>
            </div> -->
               <div slot="footer">
            <button @click="cancel" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
            <button @click="chang_sku" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
        </Modal>
    </div>

</div>
</template>


<script>
// import linkurl from '../../All-commonality/LinkUrl'
import {mapState,mapActions} from 'vuex'

export default {
data () {
  return {
      sku_list:'',
      textid:'',
      father:false,
      stock_name:'',
      warning_stock_name:'',
      stock_id:'',
      cover_url:'',
  }
},
mounted(){
    this.geturl_id()
    this.get_token()
},
computed:{
    ...mapState({uptoken:'uptoken'})
},

methods:{
    ...mapActions({get_token:'get_token'}),  // 拿到osstoken

    go_list(){  // 返回
        this.$router.push({path:'/store'})
    },
    cancel(){
        this.father = false
    },

    geturl_id(){   // 获取urlid
        let urlid = window.location.search
        this.textid = urlid.substring(1)
        if(this.textid == ""){
            return ;
        }else{
            this.textid = urlid.substring(1)
            this.get_list() 
        }
    },

    get_list(){  // 拿到列表
        this.$axios({
        url: this.$linkurl.get_goods_detail,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            id:this.textid
        },
        transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
        }],
        })
        .then(res=>{
            // console.log(res.data.data)
            let i =res.data.data
            this.sku_list = i.sku
            console.log(this.sku_list)            
        })

    },

    shou_change(id){   // 弹框
        this.stock_id = id
        this.father = true
    },

    chang_sku(){  // 修改
        this.$axios({
        url: this.$linkurl.update_sku,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            sku_id:this.stock_id,
            stock:this.stock_name,
            warning_stock:this.warning_stock_name,
            cover_url:this.cover_url
        },
        transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
        }],
        })
        .then(res=>{
            console.log(res.data.data)
            this.father = false
            this.get_list()
        })
        .catch(err=>{
            console.log("获取分类列表失败",err)
        })
    },

    // 上传
    upload(id){   // 上传1
        var cdnDomain = 'http://cdn.9beats.com/';
        var timestamp=new Date().getTime();
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var indexname =  filename.substr(0,index)
        var ext = filename.substr(index+1);
        var key =  id + '/' + timestamp + '.' +  ext
        // var key = 'music/' + 'a' + '.' + ext;


        var data = {
            OSSAccessKeyId: this.uptoken.accessid,
            policy: this.uptoken.policy,
            signature: this.uptoken.signature,
            success_action_status:'200', 
            key:key         // 定义文件名
        };
          
          var oMyForm = new FormData();

          for(var field_name in data){
              oMyForm.append(field_name,data[field_name]);
          }

          oMyForm.append("file", document.getElementById(id).files[0]);

          var oReq = new XMLHttpRequest();
          
          oReq.open("POST", 'http://9beats.oss-cn-beijing.aliyuncs.com')
          oReq.send(oMyForm) 
          var that = this
          oReq.onreadystatechange = function(e){   // 上传oss后改变图片
          // console.log(oReq.status)
              if(oReq.readyState == 4){
                  if(oReq.status==200){ 
                        that.cover_url = cdnDomain + key;
                        $('#' + id + '_content').css('background-image','url("'+ that.cover_url +'")');
                        $('#' + id + '_span').css('display','none')                  
                  }else{
                    that.$Message.config({top:50})
                    that.$Message.warning('上传失败');
                  }
              }
        };
    },


}
}

</script>

<style scoped lang='scss'>
@import '../../../assets/css/alert.css';
/*头部的导航栏*/
    .line_p{
        width:100%;
        margin-top:30px;
        a{
            color:#7D93B2;
            &:nth-child(1){
                color:#7D93B2;
                padding-right:3px;
            }
            &:nth-child(2){
                padding-left:3px;
                color:#596980;
            }
            &:hover{
                text-decoration: none;
            }
        }
    }

.maintop-one{
    margin-top: 30px;
}
.my_stock{
    margin: 0 auto;
    text-align: center;
}

.uplode_class{
    font-size: 14px;
    padding:0 0 15px 0;
    // display: flex;
    .uplode_box{
        width: 60%;
        height: 50%;
        background: #D8D8D8;
        border: none;
        margin: 0 auto;
        // text-align: center;
        .uplode_btn{
            width: 100px;
            height: 30px;
            background:#F0B46E;
            color: white;
            border: none;
            
        }
    }
}
</style>
