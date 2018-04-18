<template>
	<div id="wrap">
		<!-- 班级管理 -->
		<div class="content content_model content_campus">
			<p class="home_text class_mana">班级管理
				<span  @click="onexport">导出Excel表</span>
			</p>
			<p class="home_p">
				<Select v-if="(vuex_school==0)?true:false" v-model="model1" style="width:160px;margin-right:40px;" placeholder="请选择校区" @on-change='change_school' >
					<Option :value="0" >全部</Option>
					<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
				教师：
				<Select v-model="teacher_id" style="width:160px；margin-left:30px;" placeholder="请选择教师" @on-change='change_teacher'>
					<Option :value="0">全部</Option>					
					<Option v-for="item in teacher_list" :value="item.user_id" :key="item.id">{{ item.nick_name }}</Option>
				</Select>
				<!-- 教师职责：
				<Select v-model="teachers_id" style="width:160px；margin-left:30px;" placeholder="请选择教师" @on-change='change_teacher'>
					<Option :value="0">全部</Option>					
					<Option v-for="item in teachers_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select> -->
				<em class="add_jia" @click="go_to_newClass">
					<i class="fa fa-plus-square-o fa-lg mt-4"></i>
					<a>新增</a>
				</em>
			</p>
			<p style="display:inline-block;line-height:30px;">
				教室：
				<CheckboxGroup v-model="classroom_arr" @on-change='change_classroom'>
					<Checkbox v-for="res in classroom" :key="res.id" :value='res.id' :label='res.id'>{{res.name}}</Checkbox>
				</CheckboxGroup>
			</p>
			<!-- 班级管理 列表以下 -->
			<div class=" x_hidden" id="out-table"> 
				<table class="table-list" style="width:100%;overflow-x:scroll">
					<thead class="home_thead">
						<tr>
							<!-- <th style="display:none"></th> -->
							<th>序号</th>
							<th>班级名</th>
							<th>班主任</th>
							<th>教师</th>
							<th>上课时间</th>
							<th>有效期</th>
							<th>教室</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody class="home_tbody">
						<tr v-for="(res,index) in class_list" :key="res.id">
							<td style="text-align:center;">{{index+1}}</td>
							<td style="text-align:center;">{{res.class_name}}</td>
							<td style="text-align:center;">{{res.class_teacher}}</td>
							<td style="text-align:center;">{{res.teaching_teacher}}</td>
							<td style="text-align:center;">
								<div v-for="ress in res.teaching_time" :key="ress.id">{{(ress.week_id==1)?'星期一':(ress.week_id==2)?'星期二':(ress.week_id==3)?'星期三':(ress.week_id==4)?'星期四':(ress.week_id==5)?'星期五':(ress.week_id==6)?'星期六':'星期天'}} {{ress.start_time}}-{{ress.end_time}}</div>
							</td>
							<td style="text-align:center;">{{res.start_date*1000 | formatDate}}-{{res.end_date*1000 | formatDate}}</td>
							<td style="text-align:center;">{{res.classroom_name}}</td>
							<td style="text-align: center;color:#287af2;">
								<a @click="change_to_newClass(res.id)">详情</a>
								<a @click="get_del_list(res.id)">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
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
import {formatDate} from '../../All-commonality/data'
	export default {
		data() {
			return {
				cityList: [],
				model1: '',
				teacher_list:[],
				teacher_id:0,
				classroom:'',
				classroom_arr:[],

				class_list:'',
				soldout:false,
				del_id:'',
				teachers_id:0,
				teachers_list:[
					{
						id:1,
						name:'班主任'
					},
					{
						id:2,
						name:'任课老师'
					},
				]

			}
		},
		mounted(){
			this.get_teach_list()
			this.get_school_list()
			// this.get_classroom_list()
			this.get_class_list()
		},
		computed:{
			vuex_school(){
				return localStorage.getItem('right')
			},
		},
		methods: {

			// 导出excle
			onexport: function(evt) {
				var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
				var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
				saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream'}),"班级列表.xlsx");
			},

			s2ab: function(s) {
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

			cancel(){  // 关闭
				this.soldout = false
			},
			go_to_newClass(){
				this.$router.push({
					path: "/class/newclass"
				})
			},
			change_to_newClass(id){
				this.$router.push({path: "/class/newclass"+'?'+id})
			},

			change_teacher(){
				this.get_class_list()
			},

			get_teach_list(){  // 教师下拉菜单
				this.$axios({
				url: this.$linkurl.get_teacher_list,
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
					// console.log(res.data.data,'1111')
					this.teacher_list = res.data.data
				})
			},

			change_school(){
				this.get_class_list()
				this.get_classroom_list()
			},

			get_school_list(){   // 校区下拉
				this.$axios({
				url: this.$linkurl.get_school_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					status_id:0,
					type:0,
					page:0
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
					this.cityList = res.data.data
				})
				.catch(err=>{
					console.log(err,'获取班级列表失败')
				})
			},

			change_classroom(){   // 选择了班级
				// console.log(this.classroom_arr)
				this.get_class_list()
			},

			get_classroom_list(){  // 获取教室
				this.$axios({
				url: this.$linkurl.get_classroom_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					page:0,
					school_id:this.model1
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
					// console.log(res.data.data,'22222')
					this.classroom = res.data.data
				})
			},

			get_class_list(){  //获取班级列表
				this.$axios({
				url: this.$linkurl.get_class_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					user_id:this.teacher_id,
					school_id:this.model1,
					classroom_ids:JSON.stringify(this.classroom_arr),
					teacher_type:0,   // 班主任或任课老师
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
					// console.log(res.data.data,'222222')
					this.class_list = res.data.data
				})
				.catch(err=>{
					console.log(err,'获取班级列表失败')
				})
			},

			delete_class(){  // 删除
				this.$axios({  
				url: this.$linkurl.delete_class,
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
					console.log(res.data,'22222')
					this.soldout = false
					this.get_class_list()
				})
			},

			get_del_list(id){ // 删除弹框
				this.del_id = id
				this.soldout = true
			},
	},

	 filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy/MM/dd');
        }
    }

}
</script>
<style scoped lang="scss">
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
