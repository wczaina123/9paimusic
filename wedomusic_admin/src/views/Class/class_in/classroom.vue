<template>
	<div id="wrap">
		<!-- 教室管理 -->
		<div class="content content_model content_campus">
			<p class="home_text class_mana">教室管理</p>
			<p class="home_p" v-if="(vuex_school==0)?true:false">
				校区：
				<Select v-model="school_num" style="margin-right:40px;" placeholder="请选择校区" @on-change='change_school'>
					<Option :value="0" >全部</Option>
					<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				<em class="add_jia" @click="Add_class">
					<i class="fa fa-plus-square-o fa-lg mt-4"></i>
					<a>新增教室</a>
				</em>
			</p>
			<!-- 教室管理 列表以下 -->
			<div class=" x_hidden">
				<table class="table-list" style="width:100%;overflow-x:scroll">
					<thead class="home_thead">
						<tr>
							<!-- <th style="display:none"></th> -->
							<th>序号</th>
							<th>名称</th>
							<th>乐器</th>
							<th>最大承载学生数</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody class="home_tbody">
						<tr v-for="(res,index) in list_main" :key="res.id">
							<td style="text-align:center;">{{index+1}}</td>
							<td style="text-align:center;">{{res.name}}</td>
							<td style="text-align:center;" >
								<span v-for="(ress,idx) in res.category" :key="ress.id">{{ress.name}}<em v-if="idx!=res.category.length-1">,</em></span>
							</td>
							<td style="text-align:center;">{{res.max_number}}</td>
							<td style="text-align: center;color:#287af2;">
								<a @click="change_add_class(res.id)">详情</a>
								<a style="margin-left:6px;" @click="del_class(res.id)">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 表格以上 -->
		</div>
		<!--新增教室-->
		<div id="app2">
			<Modal width="450" v-model="add" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">添加教室</div>
				<div class="table_style" style="height:auto;">
					<div v-if="(vuex_school==0)?true:false">
						<span class="table_span span_long">所属校区:</span>
						<Select v-model="new_school_num" style="width:160px;margin-right:40px;" placeholder="请选择校区">
							<Option v-for="item in cityList" :value="item.id"  :key="item.id">{{ item.name }}</Option>
						</Select>
					</div>
					<div>
						<span class="table_span span_long">教室名:</span>
						<Input placeholder="" style="width: 200px" v-model="class_name"></Input>
					</div>
					<div>
						<span class="table_span span_long">最大承载学生数:</span>
						<Input placeholder="" style="width: 200px" v-model="max_num"></Input>
					</div>
					<div>
						<span class="table_span span_long">乐器:</span>
						<!-- <span v-for="res in category_list" :key="res.id">
							<label  for="checkbox6 span_long" @change="change_category"><input type="checkbox" :checked='res.flag' :id="res.id">{{res.name}}</label>
						</span> -->

						<CheckboxGroup v-model="arr_list">
							<Checkbox  v-for="res in category_list" :key="res.id" :label='res.id'>{{res.name}}</Checkbox>
						</CheckboxGroup>
						
					</div>
				</div>
				<div slot="footer">
					<button @click="not_null" style="margin-right:155px;width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>
		<!--删除弹框-->
		<div class="aaa">
			<Modal v-model="soldout" width="376" class-name="vertical-center-modal">
				<div class="tit" style="margin-top:20px;">是否确定删除该班级</div>
				<div slot="footer" class="btns">
					<button class="btn btn1" @click="cancel">取消</button>
					<button class="btn btn2" @click="delete_class">确定</button>
				</div>
			</Modal>
		</div>
	</div>
</template>
	<script>
export default {
	name: "",
	data() {
		return {
			cityList: [
			],
			school_num: '',
			fruit: ['第一教室'],
			add: false,
			soldout:false,
			list_main:'',
			del_id:'',
			new_school_num:'',
			category_list:[],
			class_name:'',
			max_num:'',
			arr_list:[],
			add_main:'',
		}
	},
	mounted(){
		this.get_school_list()
		this.get_list()
		this.get_teaching_list()
	},
	computed:{
		vuex_school(){
			return localStorage.getItem('right')
		},
	},
	methods: {

		Add_class(){
			this.add_main = 0
			this.new_school_num = ''
			this.class_name = ''
			this.max_num = ''
			this.arr_list = []
			this.add = true
		},

		cancel(){
			this.soldout = false
		},

		del_class(id){  // 删除弹框
			this.del_id = id
			this.soldout = true
		},

		delete_class(){  // 删除事件
			this.$axios({
			url: this.$linkurl.delete_classroom,
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

		change_school(){   // 切换分类   （注意  未来根据token 判断是否为校区还是机构）
			this.get_list()
		},

		get_list() {  // 拿到班级列表
			this.$axios({
			url: this.$linkurl.get_classroom_list,
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				page:0,
				school_id:this.school_num,
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
				this.list_main = res.data.data
			})
		},

		get_school_list(){  // 校区下拉菜单
			this.$axios({
				url: this.$linkurl.get_school_list,
				method: 'POST',
				data: {
				token: localStorage.getItem('token'),
				status_id:0,
				type:0,
				page:0,
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
				this.cityList = res.data.data
			})
		},


		get_teaching_list(){  // 获取教学分类
			this.$axios({
			url: this.$linkurl.get_category_list,
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				page:0,
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
				this.category_list = res.data.data
				for(let i=0; i<this.cityList.length;i++){
					this.cityList[i].flag = false
				}
			})
		},

		change_category(e){   // 选择乐器
			if(e.target.checked == true){
				this.arr_list.push(e.target.id)
			}else{
				this.arr_list.pop(e.target.id)
			}
		},

		change_add_class(id){  // 详情弹框
			this.new_school_num = ''
			this.class_name = ''
			this.max_num = ''
			this.arr_list = []
			this.add_main = id
			this.get_class_main(id)
			this.add = true
		},

		not_null(){
			if(this.class_name==''){
				this.$Message.warning('请填写教室名称')
			}else if(this.max_num==''){
				this.$Message.warning('请填写最大人数')
			}else if(this.arr_list==''){
				this.$Message.warning('请选择乐器')
			}else{
				this.add_class()
			}
		},

		add_class(){  // 新增班级
			this.$axios({
			url: this.$linkurl.handle_classroom,
			method: 'POST',
			data: {
				token: localStorage.getItem('token'),
				id:(this.add_main=='')?0:this.add_main,
				school_id:this.new_school_num,
				name:this.class_name,
				max:this.max_num,
				category_ids:JSON.stringify(this.arr_list),
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
				// console.log(res.data)
				this.add = false
				this.get_list()
				
			})
		},

		get_class_main(id){  // 内容
			this.$axios({
			url: this.$linkurl.get_classroom_detail,
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
				console.log(res.data.data)
				let i = res.data.data
				this.new_school_num = i.school_id
				this.class_name = i.classroom_name
				this.max_num = i.max_number
				// 默认勾选上
				let a = i.classroom_category
				for(let l=0;l<a.length;l++){
					this.arr_list.push(a[l].category_id)
				}
			})
		},

		
	}
}
</script>
<style scoped lang="scss">
@import '../../../assets/css/alert.css';
.span_long{
	width:120px !important;
}
.toggle_p {
	width: 100%;
	text-align: right;
	cursor: pointer;
	i {
		color: #596980;
	}
	span {
		font-size: 16px;
		color: #287AF2;
	}
}

.home_p {
	em {
		float: right;
	}
}

.ivu-checkbox-group {
	display: inline-block;
}

.class_mana {
	span {
		float: right;
		font-size: 16px;
		color: #287AF2;
		margin-right: 20px;
	}
}
</style>
