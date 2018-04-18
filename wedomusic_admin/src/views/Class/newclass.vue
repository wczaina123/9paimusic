<!--评论页面-->
<template>
	<div id="comment">
		<p class="line_p"><a href="javascript:;" @click="column">班级管理</a>&gt;<a href="javascript:;">新增班级</a></p>
		<div class="content content_model">
			<p class="home_text">班级信息</p>
			<div class="input_style" style="padding-top:20px;">
				<div class="input_div">
					<a class="table_a">校区:</a>
					<Select v-model="school_id" style="width:200px" placeholder="请选择校区">
						<Option v-for="item in schoolList" :value="item.id" 
						:key="item.id">{{ item.name }}</Option>
					</Select>
				</div>
				<div class="input_div">
					<a class="table_a">课件:</a>
					<Select v-model="teach_id" style="width:200px" placeholder="请请选择品类" @on-change='change_teach_id'>
						<Option v-for="item in teach_list" :value="item.id" 
						:key="item.id">{{ item.name }}</Option>
					</Select>

					<Select v-model="courseware_id" style="width:200px" placeholder="请选择课件">
						<Option v-for="item in courseware_list" :value="item.id" 
						:key="item.id">{{ item.name }}</Option>
					</Select>
				</div>
				<div class="input_div">
					<a class="table_a">班级名:</a>
					<Input placeholder="请输入班级名称,最多八个字" style="width: 200px" v-model="class_name"></Input>
				</div>

				<!-- 选完开班时间  课程频率 上课时间 才能选择其他选项-->
				<div class="input_div">
					<a class="table_a" style="float:left;margin-right:5px;">开班日期:</a>
					<Row >
							<DatePicker type="date" @on-change='get_start_data' v-model="star_datas"  placeholder="开班日期" style="width: 200px"></DatePicker>
					</Row>
				</div>
				<div class="input_div">
					<a class="table_a">每次课程学时:</a>
					<span style="margin-left:20px;">学生:</span>
					<Input style="width: 50px; margin:0 3px;" v-model="student_hours"></Input>学时
					<span style="margin-left:20px;">教师:</span>
					<Input style="width: 50px; margin:0 3px;" v-model="teacher_hours"></Input>学时
				</div>
				<div class="input_div input_info_div">
					<a class="table_a">上课时间:</a>
					<div class="input_div_content">
						<span>上课日期</span>

						<Row style="float:left;">
								<DatePicker :value="teaching_data" type="daterange" @on-change='get_teaching_data' placement="bottom-end" placeholder="上课时间" style="width: 200px"></DatePicker>
						</Row>
						<!-- 日期 -->
						<span style="margin-left:20px">最多排<Input v-model="max" style="width:50px;margin:0 5px;"></Input>次&nbsp;&nbsp;(若不填则按日期排满)</span>
						<div style="clear: both;margin-left: 90px;margin-top:20px 0;">
							<span>上课频率:</span>
							<CheckboxGroup v-model="weak_id">
								<Checkbox  label='6'>星期六</Checkbox>
								<Checkbox label=7>星期天</Checkbox><br>
								<Checkbox label=1>星期一</Checkbox>
								<Checkbox label=2>星期二</Checkbox>
								<Checkbox label=3>星期三</Checkbox>
								<Checkbox label=4>星期四</Checkbox>
								<Checkbox label=5>星期五</Checkbox>
							</CheckboxGroup>
						</div>
						<span style="margin-left:90px;">上课时间:</span>
						<button class="btn_style" @click="add_time">添加</button>
					</div>
				</div>
				<div class="input_div">
					<a class="table_a">教室:</a>
					<Select v-model="classroom_id" style="width:200px" placeholder="请选择教室">
						<Option v-for="item in classroom_list" :value="item.id" 
						:key="item.id">{{ item.name }}</Option>
					</Select>
				</div>
				<div class="input_div">
					<a class="table_a">班主任:</a>
					<Select v-model="chargeteacher_id" style="width:200px" placeholder="请选择班主任" >
						<Option v-for="item in teacher_list" :value="item.user_id" 
						:key="item.user_id">{{ item.nick_name }}</Option>
					</Select>
					<span style="margin-left:20px;">任课老师:</span>
					<Select v-model="teacher_id" style="width:200px" placeholder="请选任课老师">
						<Option v-for="item in teacher_list" :value="item.user_id" 
						:key="item.user_id">{{ item.nick_name }}</Option>
					</Select>
				</div>
				<div class="input_div">
					<a class="table_a">预招人数:</a>
					<Input style="width: 50px; margin:0 3px;" v-model="expect_number"></Input>人
					<span style="margin-left:20px;">开班人数:</span>
					<Input style="width: 50px; margin:0 3px;" v-model="actual_number"></Input>人
				</div>
				<div class="input_div">
					<a class="table_a">备注:</a>
					<Input style="width:200px" v-model="remark" type="textarea" :rows="2" placeholder="可不填"></Input>
				</div>
			</div>
			<div style="margin:0 auto;">
				<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
				<button @click="get_judge" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
			</div>
		</div>
		<!--点击新增-->
		<div id="app2">
			<Modal width="400" v-model="up_class" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">添加上课时间</div>
				<p style="" v-for="res in weak_ids" :key="res.weak_id">
					<span style="float:left;line-height:30px;">{{(res.week_id==1)?'星期一：':(res.week_id==2)?'星期二：':(res.week_id==4)?'星期四：':(res.week_id==5)?'星期五：':(res.week_id==6)?'星期六：':(res.week_id==3)?'星期三':'星期天：'}}</span>
					<!-- <TimePicker format="HH:mm" placeholder="上课时间" :value='res.start_time' v-model="res.start_time" style="width: 112px" @on-change='timechange'></TimePicker>
					<TimePicker format="HH:mm" placeholder="下课时间" :value='res.end_time' v-model="res.end_time" style="width: 112px" @on-change='timechange'></TimePicker> -->
					<Input placeholder="上课时间" format="HH:mm" style="width: 100px; margin:0 3px;" v-model="res.start_time"></Input>
					-
					<Input placeholder="下课时间" style="width: 100px; margin:0 3px;" v-model="res.end_time"></Input>
				</p>
				<div slot="footer">
					<button  @click="up_class=false" style="margin-right:220px;width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
				</div>
			</Modal>
		</div>
	</div>
</template>
<script>
	export default {
		name:"",
		data(){
			return{
				up_class:false,//点击添加
				
				schoolList:'',
				school_id:'',

				courseware_list:"",
				courseware_id:'',
				
				classroom_list:'',
				classroom_id:'',

				teacher_list:'',
				teach_list:'',
				teach_id:'',
				teacher_id:'',  // 任课老师
				chargeteacher_id:'', // 班主任

				star_data:'',
				teaching_data:[],
				weak_id:[],
				weak_ids:[],
				class_name:'',
				max:'',
				student_hours:'',
				teacher_hours:'',
				expect_number:'',
				actual_number:'',
				remark:'',
				getids:'',

				star_datas:'',
				newweak_ids:[],
			}
		},
		mounted(){
			this.get_url()   
			this.get_school_list()
			this.get_teach_list()
			this.get_courseware_list()
			this.get_classroom_list()
			this.get_teacher_list()
			console.log(this.vuex_school)
			
		},
		computed:{
			new_weak_ids(){
				let urlid = window.location.search.substring(1)
				if(urlid == ""){
					console.log('1111')
					return this.weak_ids 
				}else{
					console.log('2222')					
					return this.newweak_ids  
				}
			},
			
		},

		methods:{
			column(){
				this.$router.push({path:'/class'})
			},

			timechange(data){
				// console.log(data)
				// for(let i=0;i<this.weak_ids.length;i++){
				// 	// console.log(this.weak_ids[i].start_time)
				// 	let d = this.weak_ids[i].start_time
				// 	// console.log(d)
				// 	let s = this.weak_ids[i].end_time
				// 	let star = d.getHours() + ':' + d.getMinutes()
				// 	// console.log(star)
				// 	let end =  s.getHours() + ':' + s.getMinutes()
				// 	this.weak_ids[i].start_time = star
				// 	this.weak_ids[i].end_time = end
				// 	// console.log(this.weak_ids[i].start_time)
				// }
			},

			get_url(){   // 截取url中id
				let urlid = window.location.search.substring(1)
				if(urlid == ""){
					this.getids = 0
				}else{
					this.getids = urlid   
					this.get_main() 
				}
			},

			get_main(){   // 获取详情
				this.$axios({
				url: this.$linkurl.get_class_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.getids,
					// school_id:1,
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
					this.school_id = i.school_id
					this.teach_id = i.category_id
					this.class_name = i.name
					this.max = i.max
					this.courseware_id = i.courseware_id
					this.star_data = new Date(i.open_date*1000).getFullYear() +'-'+ new Date(i.open_date*1000).getMonth() +'-'+ new Date(i.open_date*1000).getDate() //开班时间
					this.star_datas = i.open_date*1000  //开班时间 （用于显示）

					this.student_hours = i.student_hours
					this.teacher_hours = i.teacher_hours
					
					let str_data = new Date(i.start_date*1000)  // 开始上课日期
					let s_y = str_data.getFullYear() 
					let s_m = str_data.getMonth() + 1
					let s_d = str_data.getDate()
					let s = s_y +'-'+s_m+'-'+s_d

					let end_date = new Date(i.end_date*1000)  // 结束上课日期
					let e_y = end_date.getFullYear() 
					let e_m = end_date.getMonth() + 1
					let e_d = end_date.getDate()
					let e = e_y +'-'+e_m+'-'+e_d
					
					this.teaching_data = [s,e]  // 上课日期

					this.classroom_id = i.classroom_id
					this.chargeteacher_id = i.class_teacher_user_id
					this.teacher_id = i.teaching_teacher_user_id
					this.expect_number = i.expect_number
					this.actual_number = i.actual_number
					this.remark = i.remark

					// 上课时间  (拿到详情的时候筛选出上课时间)
					let arr = i.class_course_list   
					let a = []
					for(let i=0;i<arr.length;i++){
						a = {
							'week_id':arr[i].week_id,
							'start_time':arr[i].start_time,
							'end_time':arr[i].end_time
						}
						this.weak_ids.push(a)
						this.weak_id.push(arr[i].week_id.toString())
					}
					console.log(this.weak_ids,'1111')
					this.newweak_ids = this.weak_ids   // 用于计算属性
				})
			},

			add_time(){   // 上课时间
				this.up_class=true
				let arrs = []
				let arr = []
				this.weak_id.forEach(res => {
					arr.push({"week_id":res,"start_time":'',"end_time":''})
				});

				this.weak_ids = arr
			},

			get_start_data(data){  // 开班日期
				this.star_data = data
			},

			get_teaching_data(data){  // 上课时间 （数组）
				this.teaching_data = data
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
					this.schoolList = res.data.data
				})
			},

			get_teach_list(){   // 分类下拉
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
					// console.log(res.data.data,'22222')
					this.teach_list = res.data.data
				})
				
			},

			get_courseware_list(){  // 课件下拉
				this.$axios({
				url: this.$linkurl.get_course_ware_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					category_id:this.teach_id,
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
					this.courseware_list = res.data.data
				})
			},

			change_teach_id(){  // 重新加载子项（二级联动）
				this.get_courseware_list()
			},

			get_classroom_list(){  // 教室
				this.$axios({
				url: this.$linkurl.get_classroom_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					page:0,
					school_id:0
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
					this.classroom_list = res.data.data
				})
			},

			get_teacher_list(){  // 老师列表
				this.$axios({
				url: this.$linkurl.get_teacher_list,
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
					// console.log(res.data.data,'22222')
					this.teacher_list = res.data.data
				})
			},

			add_class(){  // 新增
				this.$axios({
				url: this.$linkurl.handle_class,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.getids,
					school_id:this.school_id,
					name:this.class_name,
					max:this.max,
					courseware_id:this.courseware_id,
					category_id:this.teach_id, // 教学品类id
					open_date:this.star_data,  // 开班日期
					student_hours:this.student_hours,
					teacher_hours:this.teacher_hours,
					start_date:this.teaching_data[0],  // 开始
					end_date:this.teaching_data[1],		// 结束
					classroom_id:this.classroom_id,
					class_teacher_user_id:this.chargeteacher_id,
					teaching_teacher_user_id:this.teacher_id,
					expect_number:this.expect_number,
					actual_number:this.actual_number,
					remark:this.remark,
					class_course:JSON.stringify(this.weak_ids)
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
					console.log(res.data,'test')
					this.$router.push({path:'/class'})					
				})
			},

			// 判断
			get_judge(){
				this.$Message.destroy()
				if(this.school_id == ""){
					 this.$Message.warning('请选择校区');
				}else if(this.class_name == ""){
					this.$Message.warning('请填写班级名称');
				}else if(this.teach_id == ""){
					this.$Message.warning('请选择课件');
				}else if(this.courseware_id == ""){
					this.$Message.warning('请选择课件');
				}else if(this.star_datas == ""){
					this.$Message.warning('请选择开班日期');
				}else if(this.student_hours == ""){
					this.$Message.warning('请填写学生学时');
				}else if(this.teacher_hours == ""){
					this.$Message.warning('请填写老师学时');
				}else if(this.teaching_data == ""){
					this.$Message.warning('请填写上课日期');
				}else if(this.max == ""){
					this.$Message.warning('请填写上课次数');
				}else if(this.classroom_id == ""){
					this.$Message.warning('请选择教室');
				}else if(this.chargeteacher_id == ""){
					this.$Message.warning('请选择班主任');
				}else if(this.teacher_id == ""){
					this.$Message.warning('请选择任课老师');
				}else if(this.expect_number == ""){
					this.$Message.warning('请输入预招人数');
				}else if(this.actual_number == ""){
					this.$Message.warning('请输入开班人数');
				}else if(this.weak_id == ""){
					this.$Message.warning('请添加上课频率');
				}else{
					this.add_class()
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/css/alert.css';/*二级菜单 以及下面的框框*/
	@import '../../assets/css/input_style.scss';
	 .input_div .table_a{
  display:inline-block;
  width:90px;
  text-align:right;
  height:30px;
  line-height:30px;
  float:left;
  margin-right:5px;
}
</style>
