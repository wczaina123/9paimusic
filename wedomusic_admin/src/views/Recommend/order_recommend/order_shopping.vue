<template>
	<div id="order_home" style="margin-top:-30px;">
		<p class="home_p" style="">
			<em class="add_jia delete_padding" @click="add=true">
				<i class="fa fa-plus-square-o fa-lg mt-4"></i>
				<a>新增</a>
			</em>
			<span class="add_list">
				<i class="fa fa-exclamation-circle fa-lg mt-4"></i>
				<a>列表拖拽可进行排序</a>
			</span>
		</p>
		<div class=" x_hidden">

			<table class="table-list" style="width:100%;">

				<thead class="home_thead" style="width:100%;">
					<tr>
						<!-- <th style="display:none"></th> -->
						<!-- <th style="width:20%">顺序</th>   -->
						<th style="width:50%">名称</th>
						<th style="width:50%">操作</th>
					</tr>
				</thead>
				<tbody class="home_tbody" >
					<draggable id="tablebox"  @start="drog" @end="drop">
					<tr v-for="(list,index) in lists" :key="index" :id="list.id" >
						<!-- <td style="text-align:center;width:20%">{{list.module_id}}</td> -->
						<td style="text-align:center;">{{list.name}}</td>
						<td style="text-align: center;color:#287af2;">
							<a @click="deleteadd(list.id)">下架</a>
						</td>
					</tr>
					</draggable>
				</tbody>
			</table>
			<p class="table_bottom_p" @click="add=true">
				<i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
				<span>新增</span>
			</p>
		</div>
		<!--点击新增-->
		<div id="app2">
			<Modal width="300" v-model="add" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">新增</div>

			<div class="order_home_input">
				<ul>
					<li v-for="(value,key,index) in newlist" :key="index" >
						<label :class='disable_data.indexOf(key*1) !== -1?"disabled":""' ><input type="checkbox" @click="inputclick(key)"  :value="value" :checked='disable_data.indexOf(key*1) !== -1' :disabled='disable_data.indexOf(key*1) !== -1'>{{value}}</label>
					</li>
					

				</ul>
			</div>
			
			<div slot="footer" style="display:flex;justify-content:space-around;align-items:center;">
				<button @click="changeadd" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
			</Modal>
		</div>
<!--以上-->
<div class="content_alert">
	<span>
		<i class="fa fa-exclamation-circle fa-lg mt-4"></i>
		<a>排序已保存</a>
	</span>
</div>

<div class='container' id="app">
	
</div>

</div>

</template>
<script>

	import draggable from 'vuedraggable'
	export default {
		name: "",
		components: { draggable },
		data() {
			return {
				items: [{
					state: false
				},{
					state: true
				}],
				checkedArr: [],
				cityList: [
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
				],
				model1: '',
				add: false,
			lists: [],//列表
			type_id: 3,//首页推荐位列表的id
			newlist: "",//点击新增
			start: false,
			over: true,
			list_value:[],//名称
			checked:false,
			arr_id:[],//删除的的时候的id
			disable_data:[],//选中的module_id

			drag_id:'',
			new_drag_id:'',
		}
	},
	watch:{
		add:function(){
			this.list_value=[];
		}
	},
	created: function() {
		
	},
	mounted(){
		this.module_sub_list()//table 列表
		this.content_all_list() // 内容_获取推荐内容子项列表
		// this.get_recommend_module_all_list()
	},
	methods: {
		alocked: function (item) {
			item.state = !item.state;
		},
		// input 
		inputclick(key){
			if(this.list_value.indexOf(key)===-1){
				this.list_value.push((key));	
				
			}else{
				this.delete_input(key)
			}
		},
		
		delete_input(num){
			this.list_value.forEach((i,index)=>{
				if(i===num){
					this.list_value.splice(index,1)
					return false;
				}
			})
		},
		changeok() {
			console.log("成功")
		},
		cancel() {
			console.log("失败")
		},

		drog(e) {   // 拖拽后的物品id
			// console.log(e.clone.id,'1')
			this.drag_id = e.clone.id
		},
		drop(e) {
			// console.log(e.newIndex,'2')
			this.new_drag_id = e.newIndex + 1
			// $(".content_alert").fadeIn().delay(1500).fadeOut(300);
			this.sort_recommend_module()
		},
		
		change_id(id){
			// console.log(id,'22222')
		},

		sort_recommend_module(){  // 拖拽排序
			this.$axios({
				url: this.$linkurl.sort_recommend_module,
				method: 'POST',
				data: {
					token:localStorage.getItem('token'),
					type_id: 3,
					recommend_place_id:this.drag_id,
					sort_number:this.new_drag_id,
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
				// console.log(res.data)
				// this.module_sub_list()

				
			})
		},

		test(id) {
			console.log(id)
		},

		module_sub_list() {    // 模块_获取已经上架的子列表
			this.$axios({
				url: this.$linkurl.get_recommend_module_sub_list,
				method: 'POST',
				data: {
					token:localStorage.getItem('token'),
					type_id: this.type_id,//这是推荐模块ID
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
				// console.log(res.data.data)
				this.lists = res.data.data
				this.disable_data = []
				this.lists.forEach(item => {
					this.disable_data.push(item.module_id)
				})
				
			})
		},
		
		// 新增里面的 （直播教学 本周之星）
		content_all_list() {    // 内容_获取推荐内容子项列表
			this.$axios({
				url: this.$linkurl.get_recommend_module_all_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					type_id: this.type_id,//这是推荐模块ID
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
				// console.log(res.data.data)
				this.newlist = res.data.data;
				for(var i in this.newlist){
					this.checkedArr.push({
						checked:false
					});
				}

			})
			.catch(err => {
				console.log("获取已经上架的子列表失败", err)
			})
		},
		// 新增 点击确定的时候//上架
		changeadd(){
			this.$axios({
				url: this.$linkurl.shelves_recommend_module,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					type_id:this.type_id,
					ids:JSON.stringify(this.list_value),//上架的时候传modules_id 
					is_shelves:1,//上架
				},
				transformRequest: [function(data) {
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
			.then(res => {
				// console.log(res)
				this.module_sub_list()
				this.add=false;
			})
			.catch(err => {
				console.log("新增失败", err)
			})
			
		},
		//点击下架
		deleteadd(id){
			this.arr_id=[];
			this.arr_id.push((id));
			this.$axios({
				url: this.$linkurl.shelves_recommend_module,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					type_id:this.type_id,
					ids:JSON.stringify(this.arr_id),//下架的时候传id 
					is_shelves:0,//下架
				},
				transformRequest: [function(data) {
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
			.then(res => {
				// console.log(res)
				this.module_sub_list()
			})
		}
	},
	directives: {

	},
}
</script>
<style lang="scss" scoped>
	@import '../../../assets/css/index.scss';
	@import '../../../assets/css/alert.css';

	* {
		font-style: normal;
	}
	.disabled {
		color:#eee !important;
	}
	#order_home {
		position: relative;
		margin:0;
		padding:0;
	}

	.content_alert {
		display: none;
		position: absolute;
		left: 50%;
		top: 30%;
		-webkit-transform: translate(-50%, -30%);
		width: 110px;
		height: 40px;
		opacity: 0.6;
		background: #000000;
		border-radius: 10px;
		span {
			width: 100%;
			height: 130%;
			position: absolute;
			left: 50%;
			top: 50%;
			-webkit-transform: translate(-50%, -50%);
			color: #fff;
			margin-top: 10px;
			i {
				width: 10px;
				height: 10px;
				margin-left: 5px;
			}
			a {
				font-size: 14px;
				margin-left: 10px;
			}
		}
	}



	.home_thead tr {
		background: #f6f6f6;
		td {
			a {
				color: #287af2;
			}
		}
	}

	.home_tbody tr {
		height: 60px;
	}

	



	/*这是table 下面的p标签*/

	.table_bottom_p {
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border: 1px dotted #eee;
		border-top: 0;
		cursor: pointer;
		span {
			color: #287af2;
			vertical-align: middle;
			font-size: 14px;
			margin-left: 5px;
		}
	}




	/*这是点击新增的弹出框*/

	.ivu-checkbox-group {
		margin: 0 40px;
	}

	.ivu-checkbox-group label {
		width: 100px;
		font-size: 16px;
		text-align: left;
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
			td{
				width: 532px;
				overflow: hidden;
				height: 60px;
				// border: none;
			}
		}
	}


</style>