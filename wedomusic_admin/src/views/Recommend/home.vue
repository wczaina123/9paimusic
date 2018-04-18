<template>
<div>
	<div class="topbox">
		<div class="content big_content">
			<div class="contentlist order" @click="go_recommend">
			<span>推荐位顺序/模块</span>
			</div>
			<div class="contentlist home bg"  style="position:relative;" >
			<span >首页推荐位管理</span>
			<p class="hide_home"><i class="icon-arrow-up icons font-2xl d-block mt-4 " style="z-index:222;color:rgb(206,206,206);position: absolute; left: 40%; bottom: -4px; background: #fff;"></i></p>
			</div>
			<div class="contentlist find"   style="position:relative;" @click="go_find"><span>发现推荐位管理</span></div>
		<div class="contentlist shopping" style="position:relative;" @click="shop"><span>商城推荐位管理</span></div>
		</div>
		</div>

	<br>

	<div id="home">
		<!--子项-->
		<div class="content home_content" style="margin-top:-20px;position:relative;">
			<ul class="uls">
				<li v-for="(list,key,index) in lists" :key="list.id" @click="goAnchor('#anchor-'+index)">{{key}}</li>
			</ul>
		</div>
		<!--内容-->
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
				<div class="home_banner" v-if='(index=="名师专栏")?false:(index=="头条")?false:true'>
					<!--拖拽-->
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
							<th style="width:50%">标题</th>
							<th >操作</th>
						</tr>
					</thead>
					
					<tbody class="home_tbody">
						<draggable id="tablebox" @start="drog($event,index)" @end="drop">					
						<tr v-for="(res,indexs) in arr" :key="res.id"  :id='res.id'>
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
		

		<!--新增轮播图弹框-->
		<div id="app2">
			<Modal width="600" v-model="addbanner" class-name="vertical-center-modal">
					<div slot="header" style="text-align:center;font-size:16px;margin:0">首页轮播图</div>
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
						<Select v-model="link_model" style="width:200px" placeholder="请选择链接类型">
							<Option v-for="(item,key) in content_type_list" :value="key" :key="key">{{item}}</Option>
						</Select>
					</div>
					<div >
						<span>跳转地址:</span>
						<Input placeholder="请填写跳转地址" v-model="main_url" style="width: 200px"></Input>
					</div>
				</div>
				<div slot="footer">
					<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="click">取消</button>
					<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="add_main">确定</button>
				</div>
			</Modal>
		</div>

		<!--新增大师弹框-->
		<div id="app2">
		<Modal width="600" v-model="master_model" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">大师课堂</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>课程ID:</span>
					<Input placeholder="请填写课程id" style="width: 200px" v-model="goods_id"></Input>
					<button @click="get_master_id" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-show="goods_show">
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
									<th style="width:120px;height:28px;margin:0">课程ID</th>
									<th style="width:173px;height:28px;margin:0">名称</th>
									<th style="width:103px;height:28px;margin:0">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="text-align: center;">
									<td>{{master_main_id}}</td>
									<td>{{master_main_name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_master_main(0)" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--新增推荐学习弹框-->
		<div id="app2">
		<Modal width="600" v-model="new_stu.table" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">推荐学习</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>课程ID:</span>
					<Input placeholder="请输入课程id" style="width: 200px" v-model="new_stu.goodsid"></Input>
					<button @click="get_stu" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-if="new_stu.icon">
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
									<td>{{new_stu.id}}</td>
									<td>{{new_stu.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="add_get_stu" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

		<!--新增新品推荐弹框-->
		<div id="app2">
		<Modal width="600" v-model="stor_model.table" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">新品推荐</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>商品ID:</span>
					<Input placeholder="请填写商品id" style="width: 200px" v-model="stor_model.goods_id"></Input>
					<button @click="add_shop" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-if="stor_model.icon">
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
									<td>{{stor_model.id}}</td>
									<td>{{stor_model.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="click">取消</button>
				<button @click="add_shop_index" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
			</Modal>
		</div>

		<!--新增名师专栏弹框-->
		<div id="app2">
		<Modal width="600" v-model="master_models.table" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">名师专栏</div>
			<div class="table_style" style="padding-top:20px;height:auto;">
				<div>
					<span>文章ID:</span>
					<Input placeholder="请填写文章id" style="width: 200px" v-model="master_models.goodsid"></Input>
					<button  @click="get_master" style="width:80px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					<a class="add_list" style="color:red;" v-if="master_models.icon">
						<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:red;"></i>
						<a>找不到该文章</a>
					</a>
				</div>
				<div style="margin:0 19px 20px 20px">
					<span style="height:30px;line-height:30px">文章名称：</span>
					<div>
						<table>
							<thead>
								<tr>
									<th style="width:120px;height:28px;margin:0">文章ID</th>
									<th style="width:173px;height:28px;margin:0">标题</th>
									<th style="width:103px;height:28px;margin:0">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr style="text-align: center;">
									<td>{{master_models.id}}</td>
									<td>{{master_models.name}}</td>
									<td>删除</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
				<button @click="add_get_master" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
			</Modal>
		</div>

		<!--头条弹框-->
		<div id="app2">
			<Modal width="600" v-model="add_models.table" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">头条</div>
				<div class="table_style" style="padding-top:20px;height:auto;">
					<div>
						<span>标题:</span>
						<Input placeholder="请填写标题" style="width: 200px" v-model="add_models.title"></Input>
					</div>
					<div>
						<span>链接类型:</span>
						<Select v-model="link_model" style="width:200px" placeholder="请选择链接类型">
							<Option v-for="(item,key) in content_type_list" :value="key" :key="key">{{item}}</Option>
						</Select>
					</div>
					<div>
						<span>跳转地址:</span>
						<Input placeholder="请填写跳转地址" style="width: 400px" v-model="add_models.url"></Input>
					</div>
				</div>
				<div slot="footer">
					<button @click="click" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
					<button @click="get_index" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>

	</div>
</div>
</template>
<script>
	import draggable from 'vuedraggable'	
	import {mapState,mapActions} from 'vuex'

	export default {
		name: "",
		components: { draggable },
		data() {
			return {
			addbanner: false,//这是点击新增轮播图
			lists:[],
			type_id:1,//模块id
			
			//  main_list
			all_list:[],
			add_id:'',
			content_type_list:'',     // 链接类型
			link_model:'1',  // 链接类型id  参数 content_type 
			main_url:'',
			image_url:'',

			master_model:false,  // 大师弹框
			stu_model:false, // 推荐学习
			new_master_model:false,  // 名师专栏
			goods_id:'',
			goods_show:false,
			master_main_id:'/',
			master_main_name:'/',
			master:{  // 大师
				change_master_id:Number,
			},
			stor_model:{  // 新品推荐
				table:false,
				goods_id:'',
				icon:false,
				id:'/',
				name:'/',
			},
			new_stu:{   // 推荐学习
				table:false,
				img:'',
				goodsid:'',
				id:"/",
				name:'/',
				icon:'',
			},
			master_models:{
				table:false,
				icon:false,
				id:'/',
				name:'/',
				img:'',
				goodsid:'',
			},
			add_models:{
				table:false,
				title:'',
				url:'',
			},
			drage_id:'',
			
		}
	},
	created(){
		
	},
	computed:{
		...mapState({uptoken:'uptoken'}),
		// ...mapState({all_list:'recommend'}),
		// playmusic () {
		// 	return this.all_list=this.$store.state.recommend
		// }

		
	},
	mounted: function() {
		this.getosstoken()
		this.get_all_list()
		// this.get_up_list()
		$(".uls li").on('click', function() {
			$(this).addClass("li_bg").siblings().removeClass("li_bg")
		})

	},
	updated(){

	},

	methods: {

		goAnchor(selector) {   // 定位
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
			console.log(this.drage_id)
			this.get_up_list(idx)
		},
		drop(e) {   // 拖拽放下后的位置
			this.drage(e.newIndex)
		},

		drage(sort){   // 拖拽
		console.log(this.add_id,this.drage_id*1,sort+1,'66666')
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
				console.log(res.data)
				this.get_all_list()
			})
		},

		
		
		...mapActions({getosstoken:'get_token'}),

		click(){   // 取消按钮
			$('#textbook_home_span').css('display','block')				
			$('#textbook_home_content').css('background-image','url()');
			this.addbanner = false
			this.add_models.table = false
			this.master_model = false
			this.stor_model.table = false
			this.new_stu.table = false
			this.master_models.table = false
		},

		go_recommend(){
			this.$router.push({path:'/recommend'})
		},

		go_find(){
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
				this.get_all_list()
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
				this.get_all_list()
			})
		},


		show_list(id,add){
			this.get_up_list(id)   // 获取已品类id
			this.new_add = add
			if(id == '轮播图'){
				$('#textbook_home_span').css('display','block')				
				$('#textbook_home_content').css('background-image','url()'); 
				this.main_url = ''
				this.link_model = '1'
				this.image_url = ''
				this.addbanner = true
			}
			if(id == '头条'){

				this.add_models.table = true
			}
			if(id == '大师课堂'){
				this.add_id = id
				this.goods_id = ''
				this.master_main_id = '/'
				this.master_main_name = '/'
				this.goods_show = false
				this.master_model = true
			}
			if(id == '推荐学习'){
				this.new_stu.goodsid = ''
				this.new_stu.id = '/'
				this.new_stu.name = '/'
				this.new_stu.icon = false
				this.new_stu.table = true
			}
			if(id == '新品推荐'){
				this.stor_model.goods_id = ''
				this.stor_model.id = '/'
				this.stor_model.name = '/'
				this.stor_model.icon = false
				this.stor_model.table = true
			}
			if(id == '名师专栏'){
				this.new_add = add
				this.master_models.goodsid = ''
				this.master_models.id = '/'
				this.master_models.name = '/'
				this.master_models.icon = false
				this.master_models.table = true
			}
		},


		get_all_list() {    // 筛选出所有模块
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
			})
		},

		get_up_list(id){  // 点击新增拿到对应的id
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

		add_main(){    //轮播图新增修改
			if(this.image_url==''){
				this.$Message.warning('请上传图片')
				return ; 
			}
			if(this.main_url ==''){
				this.$Message.warning('请填写跳转地址')
				return ; 				
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.new_add,
					title:'',
					content_type:this.link_model,
					cover_url:this.image_url,
					content:this.main_url,
					type_id:this.type_id,
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
				this.click()
				this.get_all_list()
				this.main_url = ''
				this.link_model = ''
				$('#textbook_home_content').css('background-image','url()');
				$('#textbook_home_span').css('display','block')
			})
		},

		

		get_main_message(id,idx){   // 获取详情
			this.get_up_list(idx) // 改变选项id
			if(idx == '轮播图'){
				this.addbanner = true
			}
			if(idx == '头条'){
				this.add_models.table = true
			}
			if(idx == '大师课堂'){
				// this.master.change_master_id = id
				// this.get_master_id()
				this.master_main_id = '/'
				this.master_main_name = '/'
				this.master_model = true
			}
			if(idx == '推荐学习'){
				this.new_stu.goodsid = ''
				this.new_stu.id = '/'
				this.new_stu.name = '/'
				this.new_stu.table = true
			}
			if(idx == '新品推荐'){
				this.stor_model.goods_id = id
				// console.log(this.stor_model.goods_id)
				this.stor_model.id = '/'
				this.stor_model.name = '/'
				this.stor_model.table = true
			}
			if(idx == '名师专栏'){
				
				this.master_models.goodsid = ''
				this.master_models.id = '/'
				this.master_models.name = '/'
				this.master_models.table = true
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
				this.goods_id = i.content
				this.link_model = i.content_type.toString()
				this.main_url = i.content
				this.image_url = i.cover_url
				this.stor_model.goods_id = i.content
				this.new_stu.goodsid = i.content
				this.master_models.goodsid = i.content
				this.add_models.title = i.title
				this.add_models.url = i.content
				$('#textbook_home_content').css('background-image','url("'+ this.image_url +'")');
			})
			this.new_add = id   // 拿到需要修改的id
		},

		get_master_id(){   // 拿到大师id  取出照片
			this.$axios({
				url: this.$linkurl.get_video_course_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.goods_id
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
				// console.log(a)
				if(a != ''){
					this.image_url = a.cover_url
					this.master_main_id = a.id
					this.master_main_name = a.name
					this.goods_show = false
				}
				else{
					this.image_url = ''
					this.master_main_id = '/'
					this.master_main_name = '/'
					this.goods_show = true
				}
			})
		},

		add_master_main(){    //大师新增	
			if(this.master_main_name=='/'){
				this.$Message.warning('请输入课程id')
				return;
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.new_add,
					title:'',
					content_type:6,
					cover_url:this.image_url,
					content:this.goods_id,
					type_id:this.type_id,
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
				this.get_all_list()
				this.master_model = false
			})
		},

		add_shop(){   // 新品推荐id  取出照片
			this.$axios({
				url: this.$linkurl.get_goods_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.stor_model.goods_id
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
				if(a.id != undefined){
					this.stor_model.url = a.img_url[0]
					this.stor_model.id = a.id
					this.stor_model.name = a.name
					this.stor_model.icon = false
				}
				else{
					this.stor_model.url = ''
					this.image_url = ''
					this.stor_model.id = '/'
					this.stor_model.name = '/'
					this.stor_model.icon = true
				}
			})
		},

		add_shop_index(){   // 新品推荐 新增
			if(this.new_add==undefined){
				this.new_add = 0
			}
			if(this.stor_model.name=='/'){
				this.$Message.warning('请填写商品id')
				return ;
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					// id:0,
					id:this.new_add,
					title:'',
					content_type:5,
					cover_url:this.stor_model.url,
					content:this.stor_model.goods_id,
					type_id:this.type_id,
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
				this.get_all_list()
				this.stor_model.table = false
			})
		},

		get_stu(){   // 拿到推荐学习id  取出照片
			this.$axios({
				url: this.$linkurl.get_video_course_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.new_stu.goodsid
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
				if(a != ''){
					this.new_stu.img = a.cover_url
					this.new_stu.id = a.id
					this.new_stu.name = a.name
					this.new_stu.icon = false
				}
				else{
					this.new_stu.img = ''
					this.new_stu.id = '/'
					this.new_stu.name = '/'
					this.new_stu.icon = true
				}
			})
		},

		add_get_stu(){   // 增改推荐位置
			if(this.new_add==undefined){
				this.new_add = 0
			}
			if(this.new_stu.name=='/'){
				this.$Message.warning('请选择课程')
				return;
			}
			
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					// id:0,
					id:this.new_add,
					title:'',
					content_type:3,
					cover_url:this.new_stu.img,
					content:this.new_stu.goodsid,
					type_id:this.type_id,
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
				this.get_all_list()
				this.new_stu.table = false
			})
		},

		get_master(){   // 拿到名师专栏id  取出照片
			this.$axios({
				url: this.$linkurl.get_column_category_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.master_models.goodsid
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
				if(a != null){
					this.master_models.img = a.name
					this.master_models.id = a.id
					this.master_models.name = a.name
					this.master_models.icon = false
				}
				else{
					this.master_models.img = ''
					this.master_models.id = '/'
					this.master_models.name = '/'
					this.master_models.icon = true
				}
			})
		},

		add_get_master(){   // 新增名师专栏
			if(this.new_add==undefined){
				this.new_add = 0
			}
			if(this.master_models.name=='/'){
				this.$Message.warning('请填写文章id')
				return;
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					// id:0,
					id:this.new_add,
					title:this.master_models.img,
					content_type:1,
					cover_url:"",
					content:this.master_models.goodsid,
					type_id:this.type_id,
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
				this.get_all_list()
				this.master_models.table = false
			})
		},

		get_index(){   // 新增头条
			if(this.new_add==undefined){
				this.new_add = 0
			}
			if(this.add_models.title==''){
				this.$Message.warning('请填写标题')
				return;
			}
			if(this.add_models.url==''){
				this.$Message.warning('请填写跳转地址')
				return;
			}
			this.$axios({
				url: this.$linkurl.handle_recommend_module_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					// id:0,
					id:this.new_add,
					title:this.add_models.title,
					content_type:1,
					cover_url:"",
					content:this.add_models.url,
					type_id:this.type_id,
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
				this.get_all_list()
				this.add_models.table = false
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
					that.image_url = cdnDomain + key;
					that.$Loading.finish();
					$('#' + id + '_content').css('background-image','url("'+ that.image_url +'")');
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
	// 拖拽
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