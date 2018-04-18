<template>
<div>

	<div class="topbox">
		<div class="content big_content">
			<div class="contentlist order " @click="order"><span>推荐位顺序/模块</span></div>
			<div class="contentlist home " @click="home" style="position:relative;"><span >首页推荐位管理</span></div>
			<div class="contentlist find " @click="find" style="position:relative;"><span>发现推荐位管理</span> </div>
			<div class="contentlist shopping bg" @click="shop"  style="position:relative;"><span>商城推荐位管理</span>
				<p class="hide_find"><i class="icon-arrow-up icons font-2xl d-block mt-4 " style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
			</div>
		</div>
	</div>
	<br>

	<div id="home">
		<div class="content home_content" style="margin-top:-20px;position:relative;">
			<ul class="uls">
				<li v-for="(list,key,index) in lists" :key="list.id" @click="goAnchor('#anchor-'+index)">{{key}}</li>
			</ul>
		</div>
		<!--列表-->
		<div v-for="(arr,index,idx) in lists" :key="index" :id="'anchor-'+idx">
			<div class="content content_model">
				<p class="home_text">{{index}}<p>
				<p class="home_p">
					
					<em class="add_jia delete_padding" @click="show_list(index,0)">
						<i class="fa fa-plus-square-o fa-lg mt-4"></i>
						<a>新增</a>
					</em>
					<span class="add_list">
						<i class="fa fa-exclamation-circle fa-lg mt-4"></i>
						<a>列表拖拽可进行排序</a>
					</span>
				</p>

				<div class="home_banner" v-if='(index=="热门商品")?false:true'> 
					<draggable class="drag_box"   @start="drog($event,index)" @end="drop">
					<dl class="content banner_dl"  v-for="res in arr" :key="res.id" :id='res.id'>
						<dt><img :src="res.cover_url" alt=""></dt>
						<dd>
							<a href="javascript:;">
								<i class="fa fa-pencil-square-o fa-lg mt-4"></i>
								<span @click="get_main_message(res.id,index)">修改</span>
							</a>
							<a href="javascript:;" v-if="(res.is_show==1)?true:false">
								<i class="fa fa-trash-o fa-lg mt-4"></i>
								<span @click="up_main(res.id,0)">下架</span>
							</a>
							<a href="javascript:;" v-if="(res.is_show==1)?false:true">
								<i class="fa fa-trash-o fa-lg mt-4"></i>
								<span @click="del_main(res.id)">删除</span>
							</a>
							<a href="javascript:;" v-if="(res.is_show==1)?false:true">
								<i class="fa fa-sort-amount-desc fa-lg mt-4"></i>
								<span @click="up_main(res.id,1)">上架</span>
							</a>
						</dd>
					</dl>
					</draggable>
				</div>

				<div class=" x_hidden" v-else>
				<table class="table-list" style="width:100%;">
					<thead class="home_thead" style="width:100%;">
						<tr>
							<!-- <th style="display:none"></th> -->
							<!-- <th style="width:15%">顺序</th> -->
							<th style="width:50%">详情</th>
							<th >操作</th>
						</tr>
					</thead>
					<tbody class="home_tbody">
						<draggable id="tablebox"   @start="drog($event,index)" @end="drop">
						<tr v-for="(res,indexs) in arr" :key="res.id" :id='res.id'>
							<!-- <td style="text-align:center;">{{indexs+1}}</td> -->
							<td style="text-align:center;">{{res.title}}</td>
							<td style="text-align: center;color:#287af2;">
								<a @click="get_main_message(res.id,index)">修改</a>								
								<a v-if="(res.is_show==1)?false:true" @click="del_main(res.id)">删除</a>
								<a @click="up_main(res.id,0)" v-if="(res.is_show==1)?true:false">下架</a>
								<a @click="up_main(res.id,1)" v-if="(res.is_show==1)?false:true">上架</a>
							</td>
						</tr>
						</draggable>
					</tbody>
				</table>
				<p class="table_bottom_p" @click="show_list(index,0)">
					<i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
					<span>新增</span>
				</p>
				</div>

			</div>
		</div>
		

		<!--新增轮播图-->
		<div id="app2">

			<Modal width="600" v-model="swiper_model.table" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">商城轮播图</div>
					<div class="uplode_box">
						<form name=theform >
						<div class="modify-img-border upload-bg"  id="textbook_home_content" >
							<div class="edit-upload-plus">
							<a href="javascript:void(0);" class="upload-file" id="textbook_home_plus">
								<div id="textbook_home_span">
								<Icon type="images" size="52" style="color:white;"></Icon>
								<p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
								<button class="uplode_btn">点击上传</button>  
								</div>
								<input type="file" name="file" id="textbook_home" @change="upload('textbook_home')">
							</a>
							</div>
						</div>
						</form>
					</div> 
				<div class="table_style" style="padding-left:30px;">
					<div>
						<span>链接类型:</span>
						<Select v-model="swiper_model.link_model" style="width:200px" placeholder="请选择链接类型">
							<Option v-for="(item,key) in content_type_list" :value="key" :key="key">{{item}}</Option>
						</Select>
					</div>
					<div >
						<span>跳转地址:</span>
						<Input placeholder="请填写跳转地址" style="width: 200px" v-model="swiper_model.url"></Input>
					</div>
				</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
				<button @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
			</Modal>
		</div>

		<!--限时特惠弹框-->
		<div id="app2">
			<Modal width="600" v-model="time_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">限时特惠</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>商品ID:</span>
					<Input placeholder="请填写商品id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button  @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该商品</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">商品名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">商品ID</th>
									<th style="width:173px;height:28px;margin:0">名称</th>
									<th style="width:103px;height:28px;margin:0">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="text-align: center;">
									<td>{{master_lisy.id}}</td>
									<td>{{master_lisy.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_shop_index" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--猜你喜欢弹框-->
		<div id="app2">
			<Modal width="600" v-model="like_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">猜你喜欢</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>商品ID:</span>
					<Input placeholder="请填写商品id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button  @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该商品</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">商品名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">商品ID</th>
									<th style="width:173px;height:28px;margin:0">名称</th>
									<th style="width:103px;height:28px;margin:0">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="text-align: center;">
									<td>{{master_lisy.id}}</td>
									<td>{{master_lisy.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_shop_index" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--新增热门商品-->
		<div id="app2">
			<Modal width="600" v-model="hot_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">新增热门商品</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>商品ID:</span>
					<Input placeholder="请填写商品id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button  @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该商品</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">课程名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">商品ID</th>
									<th style="width:173px;height:28px;margin:0">名称</th>
									<th style="width:103px;height:28px;margin:0">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="text-align: center;">
									<td>{{master_lisy.id}}</td>
									<td>{{master_lisy.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_shop_index" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>
		</div>
</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'	
import draggable from 'vuedraggable'	
	export default {
		components: { draggable },
		data() {
			return {
			lists:"",
			listsone:"",//显示一个
			add_give_you:false,
			type_id:3,//模块id

			content_type_list:'',
			link_list:'',
			swiper_model:{  // 轮播图
				table:false,
				link_model:'',
				url:'',
			},
			time_model:false,
			master_lisy:{
				goods_id:'',
				icon:false,
				id:'/',
				name:'/',
			},
			like_model:false,
			hot_model:false,
			

		}
	},
	created: function() {
		this.all_list()
	},
	mounted: function() {
		$(".uls li").on('click', function() {
			$(this).addClass("li_bg").siblings().removeClass("li_bg")
		})
	},

	methods: {
		goAnchor(selector) {  // 定位
			var anchor = this.$el.querySelector(selector)
       		var userAgent = navigator.userAgent;  // 获取浏览器的userAgent
			var isOpera = userAgent.indexOf("Opera") > -1
			if (isOpera) {
				return "Opera"
			}; //判断是否Opera浏览器
			if (userAgent.indexOf("Firefox") > -1) {
				return "FF";
			} //判断是否Firefox浏览器
			if (userAgent.indexOf("Chrome") > -1){
				document.documentElement.scrollTop = anchor.offsetTop  // 谷歌
				return "Chrome";
			}
			if (userAgent.indexOf("Safari") > -1) {
				document.body.scrollTop = anchor.offsetTop // 苹果
				return "Safari";
			} //判断是否Safari浏览器
			if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
				return "IE";
			}; //判断是否IE浏览器
		},

		drog(e,idx) {   // 拖拽后的物品id
			this.drage_id = e.clone.id
			this.get_up_list(idx)
		},
		drop(e) {   // 拖拽放下后的位置
			this.drage(e.newIndex)
		},

		drage(sort){   // 拖拽
			this.$axios({
				url: this.$linkurl.sort_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					recommend_place_id:this.add_id,
					content_id:this.drage_id*1,
					sort_number:sort+1,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				this.all_list()
			})
		},

		order(){
			this.$router.push({path:'/recommend'})
		},
		home(){
			this.$router.push({path:'/recommend/index'})
		},
		find(){
			this.$router.push({path:'/recommend/find'})
		},
		shop(){
			this.$router.push({path:'/recommend/shop'})
		},

		del_main(id){  // 删除
			this.$axios({
				url: this.$linkurl.delete_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:id,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				// console.log(res.data.data)
				this.all_list()
			})
		},

		up_main(id,up){   // 上下架
			this.$axios({
				url: this.$linkurl.shelves_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:id,
					is_shelves:up,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				// console.log(res.data.data)
				this.all_list()
			})
		},

		click(){  // 关闭
			this.swiper_model.table = false
			this.time_model = false
			this.like_model = false
			this.hot_model = false
		},

		show_list(id,add){
			this.get_up_list(id)
			this.new_add = add
			if(id=='轮播图'){
				this.swiper_model.link_model = "1"
				this.swiper_model.url = ''
				this.swiper_model.table = true
			}
			if(id=='限时特惠'){
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.master_lisy.icon = false
				this.time_model = true
			}
			if(id=='猜你喜欢'){
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.master_lisy.icon = false
				this.like_model = true
			}
			if(id=='热门商品'){
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.master_lisy.icon = false
				this.hot_model = true
			}
		},

		all_list() {    // 模块_获取推荐子模块下列表
			this.$axios({
				url: this.$linkurl.get_recommend_module_content_all_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					type_id:this.type_id,
					
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res => {
				
				this.lists = res.data.data.all_show
				for(var key in res.data.data.all_show){
					for(var i=0;i<res.data.data.no_show.length;i++){
						if(key==res.data.data.no_show[i]){
							delete res.data.data.all_show[key]
						}
					}
				}
				this.lists = res.data.data.all_show
				this.content_type_list = res.data.data.content_type_list
				console.log(this.lists,'list')
			})
		},

		

		get_up_list(id){  // 获取已上架 id
			this.$axios({
				url: this.$linkurl.get_recommend_module_sub_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					type_id:this.type_id,
					
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				// console.log(res.data.data)
				let a = res.data.data
				for(let i=0;i<a.length;i++){
					if(id==a[i].name){
						id = a[i].id
						this.add_id = id
					}
				}
				console.log(this.add_id)
			})
		},

		add_main(){   // 新增或修改
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.new_add,
					title:'',
					content_type:this.swiper_model.link_model,
					cover_url:this.url,
					content:this.swiper_model.url,
					type_id:3,
					recommend_place_id:this.add_id,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				// console.log(res.data.data)
				this.all_list()
				this.swiper_model.table = false
				this.master_lisy.table = false
				this.time_model = false
				this.new_model = false
				this.main_url = ''
				this.link_model = ''
				
				$('#textbook_home_content').css('background-image','url()');
				$('#textbook_home_span').css('display','block')
				this.url = ''
			})
		},

		get_main_message(id,idx){   // 获取详情
			this.get_up_list(idx) // 改变选项id
			if(idx=='轮播图'){
				// this.swiper_model.link_model = "1"
				this.swiper_model.table = true
			}
			if(idx=='限时特惠'){
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.master_lisy.icon = false
				this.time_model = true
			}
			if(idx=='猜你喜欢'){
				this.like_model = true								
			}
			if(idx=='热门商品'){
				this.hot_model = true				
			}
			this.$axios({
				url: this.$linkurl.get_recommend_module_content_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:id,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				console.log(res.data.data)
				let i = res.data.data
				this.swiper_model.link_model = i.content_type.toString()
				this.swiper_model.url = i.content
				this.url = i.cover_url
				this.master_lisy.goods_id = i.content

				$('#textbook_home_content').css('background-image','url("'+ this.url +'")');
			})
			this.new_add = id   // 拿到需要修改的id
		},

		get_master_id(){   // 获取商品详情
			this.$axios({
				url: this.$linkurl.get_goods_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.master_lisy.goods_id
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				let a = res.data.data
				console.log(a)
				if(a.id != undefined){
					this.master_lisy.url = a.img_url[0]
					this.master_lisy.id = a.id
					this.master_lisy.name = a.name
					this.master_lisy.icon = false

				}
				else{
					this.master_lisy.url = ''
					this.master_lisy.id = '/'
					this.master_lisy.name = '/'
					this.master_lisy.icon = true
				}
			})
		},

		add_shop_index(){   // 新品推荐 新增
			if(this.new_add==undefined){
				this.new_add = 0
			}
			// console.log(this.new_add,this.stor_model.goods_id,this.add_id,'tets')
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					// id:0,
					id:this.new_add,
					title:this.master_lisy.name,
					content_type:5,
					cover_url:this.master_lisy.url,
					content:this.master_lisy.goods_id,
					type_id:'',
					recommend_place_id:this.add_id,
				},
				transformRequest: [function(data) {
					let ret = ''
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
			})
			.then(res=>{
				this.all_list()
				this.time_model = false
				this.like_model = false	
				this.hot_model = false
							
			})
		},



	}
}
</script>

<style lang="scss" scoped>
	@import '../../assets/css/erji.css';
	@import '../../assets/css/alert.css';
	.li_bg{
		color:#363f4c;
	}
	.setting_uplode{
		//     display: flex;
		// justify-content: flex-start;
		padding:30px 0;
	}

	.uplode_box{
	  width: 80%;
	  height: 200px;
      background: #D8D8D8;
	  border: none;
	  margin-bottom: 30px;
      .uplode_btn{
        width: 120px;
        height: 30px;
        background:#F0B46E;
        color: white;
        border: none;
      }
	}

	#textbook_home{
		width: 100%;
		height: 100%;
	}

	.modify-img-border{
		padding-top: 50%
	}

	.big_content{
		padding:0 !important;
	}

	.home_content{
		padding:0 !important;
	}

	.drag_box{
	padding: 0;
    width: 100%;
    height: 150px;
    margin: 0 2% 0 0;
    display: flex;
    flex-wrap: wrap;
}

	#tablebox {
		width: 100% ;
		height: 60px;
		overflow: hidden;
		display: inline;
		line-height: 60px;
		border: 0;
		tr {
			display: block;
			width: 200%;
			border: 0;
			height: 73px;
			td{
				width: 532px;
				overflow: hidden;
				height: 60px;
				// border: none;
			}
		}
	}
	

</style>