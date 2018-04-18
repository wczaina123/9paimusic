<template>
<div>
    <!--顶部标示-->
    <p class="home_text home_text_p">
        商品商城
        <a href="javascript:;" @click="onexport('out-table')">导出excel表</a>
    </p>
<!--状态选择-->

<!-- home_p -->
<p class="home_p ">
     <Select v-model="status" style="width:160px !important;height:30px;" @on-change='change_status(status)'>
            <Option v-for="item in status_list" :value="item.id" :key="item.value" >{{ item.name }}</Option>
        </Select>
        <Select v-model="category" style="width:160px !important;height:30px; margin-left:30px;" @on-change='chang_category(category)'>
            <Option v-for="item in category_list" :value="item.id" :key="item.value">{{ item.name }}</Option>
        </Select>
    <em class="add_jia" @click="go_add">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        <a>新增</a>
    </em>
    <span class="add_list">
        <i class="fa fa-exclamation-circle fa-lg mt-4"></i>
        <a>列表拖拽可进行排序</a>
    </span>
</p>
<!-- 以上home_p -->

<!--表格-->
<div >
      <table class="table-list">
        <thead>
        <tr>
          <!-- <th style="display:none"></th> -->
          <th style="width:8%;">顺序</th>
          <th style="width:10%;">商品ID</th>
          <th style="width:10%;">类别</th>
          <th style="width:8%;">商品图片</th>
          <th style="width:40%;">商品名称</th>
          <th style="width:10%;">状态</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(res,index) in list_main" :key="res.id">
            <td style="text-align:center;">{{index+1}}</td>
            <td style="text-align:center;">{{res.id}}</td>            
            <!-- <td style="text-align:center;">{{res.category_id}}</td> -->
            <td style="text-align:center;">{{res.category_name}}</td>
            <td style="text-align:center;"><img :src="res.img_url"></td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align:center;">{{(res.is_show==1)?'正在售卖':'下架' }}</td>
            <td style="text-align:center;" class="acolor">
              <a @click="chang_add(res.id)">修改</a>  
              <a @click="go_sku(res.id)" v-if="(res.is_show==1)?true:false">库存管理</a> 
              <a @click="del_goods(res.id)" v-if="(res.is_show==1)?false:true">删除</a>
              <a @click="up_goods(res.id,0)" v-if="(res.is_show==1)?true:false">下架</a>
              <a @click="up_goods(res.id,1)" v-else>上架</a>
            </td>
          </tr>
        </tbody>
       </table>
    <p class="table_bottom_p" @click="go_add">
        <i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
        <span>新增</span>
	</p>
  </div>

  <!--将要打印的excle-->
  <div id="out-table" >
      <table class="table-list" v-show="excle_table">
        <thead>
        <tr>
          <!-- <th style="display:none"></th> -->
          <th style="width:8%;">顺序</th>
          <th style="width:10%;">商品ID</th>
          <th style="width:10%;">类别</th>
          <th style="width:40%;">商品名称</th>
          <th style="width:10%;">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(res,index) in list_main" :key="res.id">
            <td style="text-align:center;">{{index+1}}</td>
            <td style="text-align:center;">{{res.id}}</td>            
            <!-- <td style="text-align:center;">{{res.category_id}}</td> -->
            <td style="text-align:center;">{{res.category_name}}</td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align:center;">{{(res.is_show==1)?'正在售卖':'下架' }}</td>
          </tr>
        </tbody>
       </table>
  </div>    

</div>
</template>

<script>

export default {
data () {
  return {
    status_list: [
                {
                    id: -1,
                    name: '全部'
                },
                {
                    id: 1,
                    name: '上架'
                },
                {
                    id: 0,
                    name: '下架'
                },
            ],
    status:-1,
    category_list:[],
    category:0,
    list_main:"",
    excle_table:false,
  }
},
mounted(){
    this.get_category_list()
    this.get_list()
    
},

methods:{
    // 导出excle表
    onexport(evt){
        var wb = XLSX.utils.table_to_book(document.getElementById(evt));
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        var data = new Date()
        var moun = data.getMonth()+1
        var a = data.getFullYear()+'-'+moun+'-'+data.getDate()
        saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream'}),'商品商城-'+a+'.xlsx');
    
    },

    s2ab(s){
        if(typeof ArrayBuffer != 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }  
        else {
        var buf = new Array(s.length);
        for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        }
    },



    go_add(){
        this.$router.push({path:'/store/add_goods'})
    },
    chang_add(id){
        this.$router.push({path:'/store/add_goods' + '?' + id})
    },

    go_sku(id){
        this.$router.push({path:'/store/goods/sku' + '?'+ id})
    },

    change_status(){  // 筛选上下架
        this.get_list()
    },

    chang_category(){   // 筛选分类
        this.get_list()
    },

    up_goods(id,st){  // 下架
        this.$axios({
        url: this.$linkurl.goods_shelve,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            id:id,
            is_shelve:st,
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
            this.get_list()
        })
    },
    
    del_goods(id){   // 删除
        this.$axios({
        url: this.$linkurl.delete_goods,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            id:id,
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
            this.get_list()
        })
    },

    get_category_list(){  // 获取分类
      this.$axios({
        url: this.$linkurl.get_goods_category_list,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
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
            let arr = res.data.data
            let a = {id:0,name:'全部'}
            arr.unshift(a)
            this.category_list = arr
            this.get_list()
        })
        .catch(err=>{
            console.log("获取分类列表失败",err)
        })
    },

    get_list(){  // 商品列表
        this.$axios({
        url: this.$linkurl.get_goods_list,
        method: 'POST',
        data: {
            token: localStorage.getItem('token'),
            page:0,
            status:this.status,
            category_id:this.category
        },
        transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
        .then(res=>{

            // console.log(res.data.data)
            let a = res.data.data
            for(let i=0;i<a.length;i++){  // 将列表中的类别进行比对后，在进行暄软
                for(let l=0;l<this.category_list.length;l++){
                    if(a[i].category_id ==this.category_list[l].id){
                        a[i].category_name = this.category_list[l].name
                    }
                }
            }
            this.list_main = a
        })
        .catch(err=>{
            console.log("获取分类列表失败",err)
        })
    },

},
}
</script>

<style scoped lang='scss'>
@import '../../../assets/css/alert.css';
@import '../../../assets/css/index.scss';
.maintop-one {
         margin: 0 0 40px 0;
         display: flex;
         justify-content: space-between;
         height: 60px;
         background: #DEE5EE;
         span {
             padding: 0 20px 0 20px;
             // width: 108px;
             text-align: center;
             line-height: 60px;
             font-size: 18px;
             color: #596980;
             cursor: pointer;
             a {
                 color: #287AF2;
                 font-size: 16px;
             }
         }
}

.mainstyle{
    display: block
}

// @import '../../../assets/css/index.scss'
</style>