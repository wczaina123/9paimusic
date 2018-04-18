<template>
<div>

	<div class="topbox">
			<div class="content big_content">
				<div class="contentlist order"  @click="order">
					<span>推荐位顺序/模块</span>
				</div>
				<div class="contentlist home " @click="home" style="position:relative;"><span >首页推荐位管理</span></div>
				<div class="contentlist find bg"  style="position:relative;"><span>发现推荐位管理</span>
					<p class="hide_find"><i class="icon-arrow-up icons font-2xl d-block mt-4 " style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
				</div>
				<div class="contentlist shopping"  style="position:relative;" @click="shop"><span>商城推荐位管理</span></div>
			</div>
	</div>

	
	
 	<br>

	<div id="home">
		<div class="content home_content" >
			<ul class="uls" >
				<li v-for="(list,key,index) in lists" @click="goAnchor('#anchor-'+index)" :key="key" >{{key}}</li>
			</ul>
		</div>
		<!--循环的列表-->
		<div v-for="(arr,index,idx) in lists" :key="index" :id="'anchor-'+idx">
			<div class="content content_model" >
				<p class="home_text">{{index}}</p>
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
				
				<div class="home_banner" > 
					<draggable class="drag_box"   @start="drog($event,index)" @end="drop">
					<dl class="content banner_dl"  v-for="res in arr" :key="res.id" :id='res.id'>
						<dt><img :src="res.cover_url" alt=""></dt>
						<dd>
							<a href="javascript:;">
								<i @click="get_main_message(res.id,index)" class="fa fa-pencil-square-o fa-lg mt-4"></i>
								<span >修改</span>
							</a>
							<a href="javascript:;" @click="up_main(res.id,0)"  v-if="(res.is_show==1)?true:false">
								<i class="fa fa-trash-o fa-lg mt-4"></i>
								<span >下架</span>
							</a>
							<a href="javascript:;" @click="del_main(res.id)" v-if="(res.is_show==1)?false:true">
								<i class="fa fa-trash-o fa-lg mt-4"></i>
								<span >删除</span>
							</a>
							<a href="javascript:;" @click="up_main(res.id,1)" v-if="(res.is_show==1)?false:true">
								<i class="fa fa-sort-amount-desc fa-lg mt-4"></i>
								<span >上架</span>
							</a>
						</dd>
					</dl>
					</draggable>
				</div>
			</div>
		</div>



		<!--轮播图-->
		<div id="app2">
			<Modal width="600" v-model="swiper_model.table" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">发现页轮播图</div>
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
				<button @click="clcik" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
				<button @click="add_main(0)" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
			</Modal>
		</div>

		<!--限时特惠弹框-->
		<div id="app2">
			<Modal width="600" v-model="time_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">限时特惠</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div class="uplode_box">
						<form name=theform >
						<div class="modify-img-border upload-bg"  id="textbooks_home_content" >
							<div class="edit-upload-plus">
							<a href="javascript:void(0);" class="upload-file" id="textbooks_home_plus">
								<div id="textbooks_home_span">
								<Icon type="images" size="52" style="color:white;"></Icon>
								<p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
								<button class="uplode_btn">点击上传</button>  
								</div>
								<input type="file" name="file" id="textbooks_home" @change="upload('textbooks_home')">
							</a>
							</div>
						</div>
						</form>
					</div> 

				<div>
					<span>课程ID:</span>
					<Input placeholder="请填写课程id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button @click="get_master_id(0)" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该课程</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">课程名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">课程ID</th>
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
				<button @click="clcik" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--为你制定弹框-->
		<div id="app2">
			<Modal width="600" v-model="youre_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">限时特惠</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>课程ID:</span>
					<Input placeholder="请填写课程id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该课程</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">课程名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">课程ID</th>
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
				<button @click="clcik" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--最新上架-->
		<div id="app2">
			<Modal width="600" v-model="new_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">最新上架</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>课程ID:</span>
					<Input placeholder="请填写课程id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该课程</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">课程名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">课程ID</th>
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
				<button @click="clcik" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>
		
		</div>

		<!--大家都在练-->
		<div id="app2">
		<Modal width="600" v-model="master_lisy.table" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">大家都在练</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>课程ID:</span>
					<Input placeholder="请填写课程id" style="width: 200px" v-model="master_lisy.goods_id"></Input>
					<button @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="master_lisy.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该课程</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">课程名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">课程ID</th>
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
					<button @click="clcik" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_main" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import draggable from 'vuedraggable'	

	export default {
		name: "",
		components: { draggable },
		data() {
			return {
			lists:[],
			type_id:2,//模块id
			add_id:'',
			url:'',
			content_type_list:'',
			swiper_model:{  // 轮播图
				table:false,
				link_model:'',
				url:'',
			},
			master_lisy:{  
				table:false,
				icon:false,
				id:'/',
				name:'/',
				goods_id:'',
			},
			time_model:false,
			new_model:false,
			youre_model:false,

		}
	},
	computed:{
		...mapState({uptoken:'uptoken'}),
	},

	mounted: function() {
		this.getosstoken()
		this.all_list()
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
		

		...mapActions({getosstoken:'get_token'}),

		order(){
			this.$router.push({path:'/recommend'})
		},
		home(){
			this.$router.push({path:'/recommend/index'})
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

		clcik(){
			this.swiper_model.table = false
			this.master_lisy.table = false
			this.time_model = false
			this.new_model = false
			this.youre_model = false
		},


		show_list(id,add){
			this.get_up_list(id)
			this.new_add = add
			this.master_lisy.goods_id = ''
			this.master_lisy.id = '/'
			this.master_lisy.name = '/'
			this.master_lisy.icon = false
			if(id=='轮播图'){
				$('#textbook_home_span').css('display','block')				
				$('#textbook_home_content').css('background-image','url()'); 
				this.swiper_model.link_model = "1"
				this.swiper_model.url = ''
				this.swiper_model.table = true
			}
			if(id=='为你定制'){
				this.swiper_model.link_model = '2'
				this.youre_model = true
			}
			if(id=='大家都在练'){
				this.swiper_model.link_model = '2'
				this.master_lisy.table = true
			}
			if(id=='限时特惠'){	
				this.url = ''	
				$('#textbooks_home_span').css('display','block')				
				$('#textbooks_home_content').css('background-image','url()'); 	
				this.swiper_model.link_model = '2'
				
				this.time_model = true
			}
			if(id=='最新上架'){			
				this.swiper_model.link_model = '2'
				this.new_model = true
			}
			
		},

		all_list() {    // 获取全部列表
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
				// console.log(this.lists,'list')
			})
		},

		get_up_list(id){  // 点击新增或修改，拿到对应的id
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
				let a = res.data.data
				for(let i=0;i<a.length;i++){
					if(id==a[i].name){
						id = a[i].id
						this.add_id = id
					}
				}
			})
		},

		add_main(id){   //    新增或修改
			if(id==0){
				this.master_lisy.goods_id = this.swiper_model.url
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.new_add,
					title:'',
					content_type:this.swiper_model.link_model,
					cover_url:this.url,
					// content:this.swiper_model.url,
					content:this.master_lisy.goods_id ,
					type_id:2,
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
				this.youre_model = false
				this.main_url = ''
				this.link_model = ''
				this.url = ''				
				
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
			if(idx=='为你定制'){
				this.master_lisy.goods_id = ''
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.youre_model = true
			}
			if(idx=='大家都在练'){
				this.master_lisy.goods_id = ''
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.master_lisy.table = true
			}
			if(idx=='限时特惠'){
				$('#textbooks_home_span').css('display','block')				
				this.master_lisy.goods_id = ''
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.time_model = true
			}
			if(idx=='最新上架'){
				this.master_lisy.goods_id = ''
				this.master_lisy.id = '/'
				this.master_lisy.name = '/'
				this.new_model = true
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
				let i = res.data.data
				this.swiper_model.link_model = i.content_type.toString()
				this.swiper_model.url = i.content
				this.url = i.cover_url
				this.master_lisy.goods_id = i.content
				$('#textbook_home_content').css('background-image','url("'+ this.url +'")');
				$('#textbooks_home_content').css('background-image','url("'+ this.url +'")');
			})

			this.new_add = id   // 拿到需要修改的id
		},

		get_master_id(id){   // 拿到msaterid  取出照片
			this.$axios({
				url: this.$linkurl.get_video_course_detail,
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
				if(a != ''){
					if(id!=0){
						this.url = a.cover_url
					}
					this.master_lisy.id = a.id
					this.master_lisy.name = a.name
					this.master_lisy.icon = false
				}
				else{
					if(id!=0){
						this.url = ''
					}
					this.master_lisy.id = '/'
					this.master_lisy.name = '/'
					this.master_lisy.icon = true
				}

				
			})
		},


		// 上传
		upload(id){   // 上传1
			this.$Loading.start();
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
				if(oReq.readyState == 4){
					if(oReq.status==200){ 

					that.url = cdnDomain + key;
					that.$Loading.finish();
					$('#' + id + '_content').css('background-image','url("'+ that.url +'")');
					$('#' + id + '_span').css('display','none')
					
					}else{
					that.$Message.warning('上传失败');
					}
				}
				};
		},
	}

}
</script>

<style lang="scss" scoped>
  	// @import '../../assets/css/index.scss';	
	@import '../../assets/css/erji.css';
	@import '../../assets/css/alert.css';
	.li_bg{
		color:#363f4c;
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
	#textbooks_home{
		width: 100%;
		height: 100%;
	}
	

	.modify-img-border{
		padding-top: 50%;
		
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