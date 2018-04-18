<template>
<div>
    <p class="line_p"><a href="javascript:;" @click="go_list">商品列表</a>&gt;<a href="javascript:;">新增</a></p>

    <div class="mainbox" style="margin:30px 0">
    <p class="home_text">
        新增商品
    </p>
        <!--上传图片-->
        <div style="margin-top:30px;">
            <span>上传商品图：</span>
            <div class="up_box">
                <div class="uplode_class">
                    <div class="uplode_box">
                        <form name=theform>
                            <div class="modify-img-border upload-bg"  id="goods0_content" style="padding-top:100%;background:#f6f6f6;">
                                <div class="edit-upload-plus">
                                    <a href="javascript:void(0);" class="upload-file" id="goods0_plus">
                                        <div id="goods0_span">
                                        <Icon type="images" size="52" style="color:white;"></Icon>
                                        <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式,RGB模式,<br>不超过500k</p>
                                        <button class="uplode_btn" style="margin-top:10px;">点击上传</button>  
                                        </div>
                                        <input type="file" name="file" id="goods0" @change="upload('goods0')">
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div> 

                    <div class="uplode_box">
                        <form name=theform>
                            <div class="modify-img-border upload-bg"  id="goods1_content" style="padding-top:100%;background:#f6f6f6;">
                                <div class="edit-upload-plus">
                                    <a href="javascript:void(0);" class="upload-file" id="goods1_plus">
                                        <div id="goods1_span">
                                        <Icon type="images" size="52" style="color:white;"></Icon>
                                        <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式,RGB模式,<br>不超过500k</p>
                                        <button class="uplode_btn" style="margin-top:10px;">点击上传</button>  
                                        </div>
                                        <input type="file" name="file" id="goods1" @change="upload('goods1')">
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div> 

                    <div class="uplode_box">
                        <form name=theform>
                            <div class="modify-img-border upload-bg"  id="goods2_content" style="padding-top:100%;background:#f6f6f6;">
                                <div class="edit-upload-plus">
                                    <a href="javascript:void(0);" class="upload-file" id="goods2_plus">
                                        <div id="goods2_span">
                                        <Icon type="images" size="52" style="color:white;"></Icon>
                                        <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式,RGB模式,<br>不超过500k</p>
                                        <button class="uplode_btn" style="margin-top:10px;">点击上传</button>  
                                        </div>
                                        <input type="file" name="file" id="goods2" @change="upload('goods2')">
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div> 
                </div>
                <!-- <div class="uplode_class"></div> -->
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">商品名称：</div>
            <div>
                <Input v-model="goods_name" placeholder="请输入商品名称" style="width: 300px"></Input>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">商品分类：</div>
            <div>
                <Select v-model="category_name" style="width:100px">
                    <Option v-for="res in category_id" :value="res.id" :key="res.id">{{ res.name }}</Option>
                </Select>
                <Select v-model="sub_category_name" style="width:100px">
                    <Option v-for="(res) in sub_category_id" :value="res.id" :key="res.id">{{ res.name }}</Option>
                </Select>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">商品品牌：</div>
            <div>
                <Select v-model="brand_name" style="width:200px">
                    <Option v-for="res in brand_id" :value="res.id" :key="res.id" >{{ res.name }}</Option>
                </Select>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">商品级别：</div>
            <div>
                <Select v-model="level_name" style="width:200px">
                    <Option v-for="res in level_id" :value="res.id" :key="res.id">{{ res.name }}</Option>
                </Select>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">供应商：</div>
            <div>
                <Select v-model="supplier_name" style="width:200px">
                    <Option v-for="res in supplier_id" :value="res.id" :key="res.id">{{ res.name }}</Option>
                </Select>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">商品单价：</div>
            <div>
                <Input v-model="price" placeholder="请输入商品单价" style="width: 300px"></Input>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">批发价格：</div>
            <div>
                <Input v-model="wholesale_price" placeholder="请输入批发价格" style="width: 300px"></Input>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">起购数量：</div>
            <div>
                <Input v-model="minimum_number" placeholder="请输入起购数量" style="width: 300px"></Input>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">运费：</div>
            <div>
                <Input v-model="freight" placeholder="请输入运费" style="width: 300px"></Input>
            </div>
        </div>
        <div class="another_style">
            <div class="goods_left">属性：</div>
            <div style="width:50%;">
                <div v-for="(res,index) in sku" :key="res.id" class="flexwrap">
                    <p>
                        <input type="checkbox"  :checked="res.flag" :value="res.id"  @change="chang_sku_fa($event,index)"><span>{{res.name}}</span>
                    </p>
                    <div class="flexwrap">
                        <p v-for="(ress,ineridx) in res.sub" :key="ress.id" v-if="res.flag">
                            <input type="checkbox" :value="ress.id" :checked="ress.flag"  @change="chang_sku_ch($event,index,ress.id,ineridx)"><span>{{ress.name}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--表单-->
        <div class="another_style" v-show="sku_style_show"> 
            <div class="tablebox" style="width:100%;">
                <table class="table-list">
                    <thead>
                    <tr>
                    <th style="width:5%;">ID</th>
                    <th style="width:20%;">货品属性</th>
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
                        <td style="text-align:center;"><img :src="res.cover_url"></td>
                        <td style="text-align: center;" class="acolor">
                        <a @click="alter(res.id)">修改</a>  
                        </td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="another_style">
            <div class="goods_left">图文混排：</div>
            <div>
                <Ueditor  :defaultMsg="defaultMsg" :config='config'></Ueditor>
            </div>
        </div>

        <!-- <Button type="warning" class="btn" @click="push_goods">提交</Button> -->
         <div style="position:absolute;right:80px;">
          <button @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
    </div>

    <!--弹框-->
    <div class="app_alert">
        <Modal v-model="father" width="500" class-name="vertical-center-modal">
            <div slot="header" style="text-align:center;font-size:16px;margin:0">添加类目</div>

            <div class="father_main">
                <div class="uplode_class1">
                    <div class="uplode_box">
                        <form name=theform>
                            <div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;background:#f6f6f6;">
                                <div class="edit-upload-plus">
                                    <a href="javascript:void(0);" class="upload-file" id="supplier_plus">
                                        <div id="supplier_span">
                                        <Icon type="images" size="52" style="color:white;"></Icon>
                                        <p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式,RGB模式,<br>不超过500k</p>
                                        <button class="uplode_btn" style="margin-top:10px;">点击上传</button>  
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
            
          <!--   <div slot="footer" class="btns">
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
import Ueditor from '../../All-commonality/UE.vue'
import {Event} from '../../All-commonality/bus'



export default {
components:{Ueditor},
data () {
  return {
      defaultMsg:'',
      config: {
          initialFrameWidth: 460,
          initialFrameHeight:300,
          BaseUrl: '',
          toolbars: [
            ['fullscreen', 'source', 'undo', 'redo'],
            ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','simpleupload']
          ],
        },

      goods_name:'',  // 商品名称
      category_name:'',  // 顶级分类
      sub_category_name:'',// 子集分类
      brand_name:'',    // 品牌级别
      level_name:'',   // 演奏级别
      supplier_name:'', // 供应商
      price:'',     // 价格
      wholesale_price:'',  // 批发价格
      minimum_number:'',  // 起购数量
      freight:'',       // 运费
      supplier_id:'',   // 供应商
      level_id:'',  // 级别
      brand_id:'',
      category_id:'',
      sku_father: [],
      sku_child:[],
      sku:[],
      sku_box:[],
      sku_box_ch:[],
      img_url_arr:[],

      // 修改
      textid:'',
      sku_list:'',
      sku_style_show:false,

        // 库存
      test:true,
      father:false,
      stock_name:'',
      warning_stock_name:'',
      stock_id:'',
      cover_url:'',

  }
},

mounted(){
    // this.get_all_list()
    this.geturl_id()
    this.getosstoken()
    // console.log()

    Event.$on('newval',ueval=>{
        this.defaultMsg = ueval;
        // console.log(this.defaultMsg)
    })
},
computed: {
    sub_category_id:function(){   // 计算属性遍历sub
        var that = this;
        if(this.category_id!=''&&this.category_name!=''){
            return this.category_id.filter(function(item) {
            return item.id == that.category_name;
            })[0].sub;
        }
    },
    ...mapState({uptoken:'uptoken'})
},


methods:{

    ...mapActions({getosstoken:'get_token'}),  // 获取oss token

    go_list(){  // 返回
        this.$router.push({path:'/store'})
    },

    chang_sku_fa(e,id){  // 外
        this.sku[id].flag = !this.sku[id].flag
        if(e.target.checked == true){
            this.sku_box.push([])
        }else{
            this.sku_box.pop()   
        }
    },

    chang_sku_ch(e,idx,_id,inidx){  // 内
        let res = e.target.value
        if(e.target.checked == true){
            this.sku[idx].sub[inidx].flag = !this.sku[idx].sub[inidx].flag;            
            this.sku_box[idx].push(_id)
        }else{
            this.sku_box_ch.pop()
            this.sku_box[idx].pop(_id)
        }
    },

    geturl_id(){   // 获取urlid
        let urlid = window.location.search
        this.textid = urlid.substring(1)
        if(this.textid == ""){
            this.textid = 0
            this.sku_style_show = false
            this.get_all_lists() 
        }else{
            this.textid = urlid.substring(1)
            this.sku_style_show = true
            this.get_all_list() 
        }
    },

    // 弹框
    cancel(){
        this.father = false
    },
    alter(id){   // 修改库存
        this.stock_name = ''
        this.warning_stock_name = ''
        this.stock_id = id
        $('#supplier_span').css('display','block')
        for(let i=0;i<this.sku_list.length;i++){
            if(this.sku_list[i].id == id){
                this.stock_name = this.sku_list[i].stock
                this.warning_stock_name = this.sku_list[i].warning_stock 
                $('#supplier_content').css('background-image','url("'+ this.sku_list[i].cover_url +'")');
            }
        }
        this.father = true
    },

    chang_sku(){  // 修改sku
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
            this.get_all_list()
        })
    },

    get_all_lists(){    // 拿到详情
        this.$axios({
        url: this.$linkurl.get_goods_detail,
        method: 'POST',
        data: {
            token:localStorage.getItem('token'),
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
            console.log(res.data.data,'22222')
            let i = res.data.data
            // 下拉内容
            this.level_id = i.performance_level_list
            this.supplier_id = i.supplier_list
            this.brand_id = i.brand_list
            this.category_id = i.category_list
            this.sku = i.skuAttr
        })
    },


    
    // 内容
    get_all_list(){    // 拿到详情
        this.$axios({
        url: this.$linkurl.get_goods_detail,
        method: 'POST',
        data: {
            token:localStorage.getItem('token'),
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
            console.log(res.data.data,'22222')
            let i = res.data.data
            // 下拉内容
            this.level_id = i.performance_level_list
            this.supplier_id = i.supplier_list
            this.brand_id = i.brand_list
            this.category_id = i.category_list
            this.sku = i.skuAttr
            // 内容
            this.goods_name = i.name  //  名字
            if(this.textid!=0){
                this.category_name = i.category_id  // 顶级分类
            }
            this.sub_category_name = i.sub_category_id  // 子分类
            this.price = i.price     // 价格
            this.wholesale_price = i.wholesale_price   // 批发价
            this.minimum_number = i.minimum_number  // 起拍数量
            this.supplier_name = i.supplier_id   // 供应商id
            this.freight = i.freight   // 运费
            this.brand_name = i.brand_id  // 供应商
            this.level_name = i.performance_level_id // 演奏级别
            this.config.initialContent = i.description
            this.test_main = i.description
            
            if(this.textid != 0){
               this.defaultMsg = i.description
            }
            

            if(this.textid!=0){   // 遍历图片数组
                this.img_url_arr = i.img_url    
                for(let i=0;i<this.img_url_arr.length;i++){
                    $('#goods' + i + '_content').css('background-image','url("'+ this.img_url_arr[i] +'")');
                }
            }
            
            // 处理sku
            
            this.sku_list = i.sku
            this.stage_sku()
            this.change_arr(i.sku)
            // for(let a=0;i<i.sku.length;a++){
            //     this.stock_name = i.sku[a].stock
            //     this.warning_stock_name = i.sku[a].warning_stock
            // }
        })
        .catch(err=>{
            console.log("获取分类列表失败",err)
        })
    },

    change_arr(arrs){  // 组成数组
            var a = [];
            var new_arr = [];
            arrs.forEach((i)=>{
                var arr = i.attrs.split(",");
                a.push(arr)
            })
            var len=[];
            for(var i=0;i<a.length;i++){
               len.push(a[i].length)
            }
            var maxlen =  Math.max.apply(null,len)
            var b = [];
            for(var i=0;i<maxlen;i++){
                var c = [];
                for(var j=0;j<a.length;j++){
                    if(a[j][i]){
                        c.push(a[j][i])
                    }
                    for(var main=0;main<c.length;main++){   // 去重
                        for(let mains=main+1;mains<c.length;mains++){
                            if(c[main] == c[mains]){
                                c.splice(mains,1);
                                main--;
                            }
                        }
                    }
                }
                b.push(c)
            }
            this.sku_box = b
    },

    

    stage_sku(){  // 处理sku
        let arr = ''
        this.sku_list.forEach((item)=>{
            arr+=','+item.attrs;
        })
        arr = arr.split(',');
        let newarr = [];
        arr.forEach((i)=>{  // 强转换
            if(i){
                newarr.push(Number(i))
            }
        })
        let tt = Array.from(new Set(newarr))
        this.sku.forEach((gtem,gidex,garr)=>{
            // if(gtem.name=='默认' ){
            //     gtem.flag = true
            // }
            garr[gidex].sub.forEach((stem,sidex,sarr)=>{ 
                tt.forEach((ttem,tidex,tarr)=>{                    
                    if(stem.id==ttem){
                        garr[gidex].flag = true;
                        stem.flag = true;
                    }
                })
            })
        })
        // console.log(tt,'tt')
        // this.sku_box = tt
        
    },

    not_null(){   //  判断
        if(this.goods_name == ''){
            this.$Message.warning('请输入商品名称')
        }else if(this.category_name==''){
            this.$Message.warning('请选择商品分类')
        }else if(this.sub_category_name==''){
            this.$Message.warning('请选择商品子分类')
        }else if(this.brand_name==''){
            this.$Message.warning('请选择商品品牌')
        }else if(this.level_name==''){
            this.$Message.warning('请选择商品级别')
        }else if(this.supplier_name==''){
            this.$Message.warning('请选择供应商')
        }else if(this.price==''){
            this.$Message.warning('请输入商品单价')
        }else if(this.wholesale_price==''){
            this.$Message.warning('请输入批发价格')
        }else if(this.minimum_number==''){
            this.$Message.warning('请输入起购数量')
        }else if(this.freight==''){
            this.$Message.warning('请输入运费')
        }else if(this.img_url_arr==''){
            this.$Message.warning('至少上传一张照片')
        }else if(this.sku_box==''){
            this.$Message.warning('请选择商品属性')
        }else {
            this.push_goods()
        }
    },


    push_goods(){   //  新建／修改
        this.$axios({
        url: this.$linkurl.handle_goods,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            id:this.textid,
            name:this.goods_name,
            category_id:this.category_name,
            sub_category_id:this.sub_category_name,
            price:this.price,
            freight:this.freight,
            description:this.defaultMsg,   //  图文混排
            brand_id:this.brand_name,
            wholesale_price:this.wholesale_price,
            minimum_number:this.minimum_number,
            performance_level_id:this.level_name,
            supplier_id:this.supplier_name,
            attrs:JSON.stringify(this.sku_box),
            img_url:JSON.stringify(this.img_url_arr),
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
            console.log(res.data,'666')
            if(res.data.code == 0){
                if(this.textid == 0){
                    this.$router.push({path:'/store/goods/sku' +'?'+res.data.data.id})
                }else{
                    this.$router.push({path:'/store'})
                }
            }else{
                this.$Message.config({top:50})
                this.$Message.warning('创建失败');
            }
            
            
        })
        .catch(err=>{
            console.log("新增失败",err)
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
                      if(id == 'goods0'){
                        var goods0 = cdnDomain + key;
                        // console.log(goods0)
                        $('#' + id + '_content').css('background-image','url("'+ goods0 +'")');
                        $('#' + id + '_span').css('display','none')
                        that.img_url_arr[0]=goods0                 
                      }
                      if(id == 'goods1'){
                        var goods1 = cdnDomain + key;
                        $('#' + id + '_content').css('background-image','url("'+ goods1 +'")');
                        $('#' + id + '_span').css('display','none')
                        that.img_url_arr[1]=goods1                                                                   
                      }
                      if(id == 'goods2'){
                        var goods2 = cdnDomain + key;
                        $('#' + id + '_content').css('background-image','url("'+ goods2 +'")');
                        $('#' + id + '_span').css('display','none')
                        that.img_url_arr[2]=goods2
                      }
                      if(id == 'supplier'){
                          that.cover_url = cdnDomain + key;
                          $('#' + id + '_content').css('background-image','url("'+ that.cover_url +'")');
                          $('#' + id + '_span').css('display','none')
                      }
                  }else{
                    that.$Message.warning('上传失败');
                  }
              }
        };
    },



},
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
.flexwrap{
    display: flex;
}




.uplode_class{
    font-size: 14px;
    padding: 30px 0;
    display: inline;
    display: flex;
    justify-content: space-between;
    .uplode_box{
        width: 30%;
        height: 30%;
        background: #D8D8D8;
        border: none;
        .uplode_btn{
            width: 100px;
            height: 30px;
            background:#F0B46E;
            color: white;
            border: none;
            
        }
    }
}

.another_style{
    display: flex;
    line-height: 30px;
    margin-top: 30px;
    .goods_left{
        width:80px;
        display:inline-block;
        text-align: right;
    }
}
.btn{
    width: 200px;
}

.uplode_class1{
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
#goods0{
    width: 100%;
    height: 100%;
}
#goods1{
    width: 100%;
    height: 100%;
}
#goods2{
    width: 100%;
    height: 100%;
}
#supplier{
    width: 100%;
    height: 100%;
}
.my_stock{
    margin: 0 auto;
    text-align: center;
}
</style>

