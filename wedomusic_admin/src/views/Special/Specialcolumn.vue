<!--专栏文章列表-->

<template>
<div>
  <br>
  <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist order" @click="column"><span>名师专栏</span></div>
        <div class="contentlist home" @click="newarticle"><span >新增文章</span></div>
        <div class="contentlist find  bg" @click="Specialcolumn"><span >专栏管理</span></div>
        <div class="contentlist shopping" @click="specialdata"><span>数据</span></div>
      </div>
    </div>
  <br>
	<div id="Specialcolumn">
    <div class="content content_model">
      <div class="list">
        <p class="home_text">
          专栏文章列表
        </p>
        <p class="home_p">
          <em class="add_jia" @click="get_add(0)">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            <a>新增</a>
          </em>
        </p>
        <!-- 头条表格以下 -->
        <div class=" x_hidden">
          <table class="table-list" style="width:100%;overflow-x:scroll">
            <thead class="home_thead">
              <tr>
               <th>专栏</th>
               <th>作者</th>
               <th>粉丝数</th>
               <th>阅读量</th>
               <th>操作</th>
             </tr>
           </thead>
           <tbody class="home_tbody">
            <tr v-for="res in list" :key="res.id">
             <td style="text-align:center;">{{res.name}}</td>
             <td style="text-align:center;">{{res.teacher_name}}</td>
             <td style="text-align:center;">{{res.fans_count}}</td>
             <td style="text-align:center;">{{res.read_count}}</td>
             <td style="text-align: center;">
              <a @click="del(res.id)">删除</a>
              <a @click="change_main(res.id)" style="margin-left:6px;">修改</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="table_bottom_p" @click="get_add(0)">
      <i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
      <span>新增</span>
    </p>
  </div>
  <!-- 表格以上 -->
</div>
<!--新增专栏-->
<div id="app2">
  <Modal width="600" v-model="add" class-name="vertical-center-modal">
    <div slot="header" style="text-align:center;font-size:16px;margin:0">新增专栏</div>
    <div class="table_style" style="padding-top:20px;">
      <div>
        <span>专栏名称:</span>
        <Input v-model="name" placeholder="请输入专栏名称最多7个字" style="width: 200px"></Input>
      </div>
      <div>
       <span>用户手机号:</span>
       <Input v-model="phone" placeholder="请输入用户手机号" style="width: 200px"></Input>
     </div>
   </div>
   <div slot="footer">
    <button @click="close" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
    <button @click="get_yes" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
  </div>
</Modal>
</div>
<!--删除-->
    <div class="aaa">
        <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
          <div  style="text-align:center;margin-top:30px;">是否确定删除？</div>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="close">取消</button>
            <button class="btn btn2" @click="delete_class">确定</button>
          </div>
        </Modal>
		</div>
<!--以上-->
</div>
</div>
</template>
<script>
  export default {
   data() {
    return {
      add:false,
      name:"",
      list:'',
      phone:'',
      soldout:false,
      del_id:'',
    }
  },
  mounted(){
    this.get_list()
  },
  methods:{

    column() {
			this.$router.push({path:'/special'})
		},
		newarticle() {
			this.$router.push({path:'/special/new_ticles'+'?'+0})
    },
    Specialcolumn(){
			this.$router.push({path:'/special/Specialcolumn'})
    },
    specialdata() {
		this.$router.push({path:'/special/data'})
		},
    
    changeok () {
     console.log("成功")
   },
   cancel () {
     console.log("失败")
   },
   close(){
      this.add = false
      this.soldout = false
   },

   get_add(id){
     this.name = ''
     this.phone = ''
     this.id = id
     this.add = true
   },

   get_yes(){ // 新增或修改
   if(this.id==0){
      this.$axios({
			url: this.$linkurl.handle_column_category,
			method: 'POST',
			data: {
        token: localStorage.getItem('token'),
        id:0,
        name:this.name,
        phone:this.phone,
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
        console.log(res.data)
        if(res.data.message == '教师手机号不存在'){
           this.$Message.config({top:50})
           this.$Message.error('老师手机号不存在');
           this.add = false                   
        }else{
          this.add = false        
          this.get_list()
        }
			})
   }else{
     this.$axios({
			url: this.$linkurl.handle_column_category,
			method: 'POST',
			data: {
        token: localStorage.getItem('token'),
        id:this.id,
        name:this.name,
        phone:this.phone,
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
        if(res.data.message == '教师手机号不存在'){
           this.$Message.config({top:50})
           this.$Message.error('老师手机号不存在');
           this.add = false                   
        }else{
          this.add = false        
          this.get_list()
        }
			})
   }
   },
   
   get_list(){  // 获取列表
     this.$axios({
			url: this.$linkurl.get_column_category_list,
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
        this.list = res.data.data
			})
   },

   change_main(id){  // 列表详情
     this.add = true
     this.id = id
     this.$axios({
			url: this.$linkurl.get_column_category_detail,
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
        let i = res.data.data
        this.name = i.name
        this.phone = i.phone
      })
      
   },

  del(id){
    this.del_id = id
    this.soldout = true
  },

  delete_class(){  // 删除
     this.$axios({
			url: this.$linkurl.delete_column_category,
			method: 'POST',
			data: {
        token: localStorage.getItem('token'),
        id:this.del_id,
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
        this.soldout = false
        this.get_list()
      })
  },
 }
}
</script>
<style lang="scss" scoped>
 @import '../../assets/css/alert.css';/*二级菜单 以及下面的框框*/
 .content_padding_delete{
  padding:0 !important;
}
 .content,
.content_model {
    margin-top: 10px;
}
 .add_jia{
  margin-left:0 !important;
}
.table-list{
  a{
    color:rgb(45,140,240);
  }
}
.addcolumn{
  p{
    span{
      display:inline-block;
      width:100px;
      text-align:right;
      margin-right: 10px;
    }
  }
}
</style>