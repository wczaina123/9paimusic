<template>
	<div id="wrap" style="margin-top:30px;">
		<!-- 新增通知 -->
		<div class="content content_model content_campus content_bottom content_min">
			<p class="home_text class_mana">新增通知</p>
			<p class="home_p">
				<Select v-model="model1" style="width:160px !important;margin-right:40px;" placeholder="请选择">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Input type="text" placeholder="请输入标题" style="width:160px !important;"></Input>
			</p>
			<!-- 文本 -->
			<div class="animated">
				<Ueditor id='ue_box' :defaultMsg="defaultMsg" :config='config'></Ueditor>					
			</div>
			<!--高级设置-->
			<div class="heigt_page" >
				<div class="input_div">
					<a class="table_a" style="font-size: 20px;">高级设置:</a>
					<CheckboxGroup v-model="show_low" style="line-height: 30px;" @on-change='show_lows'>
							<Checkbox label="a">是</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="input_div" v-if="show_add">
					<div>
						<a class="table_a">初始阅读量:<Input style="width: 100px"></Input></a>
						<a class="table_a">阅读量增长系数:<Input style="width: 100px"></Input></a><br><br>
						<a class="table_a">初始点赞数:<Input style="width: 100px"></Input></a>
						<a class="table_a">点赞数增长系数:<Input style="width: 100px"></Input></a><br><br>
						<a class="table_a">推送至制定首页:</a>
					</div>
				</div>
			</div>
			<!-- 表格以上 -->
			<div slot="footer" id="footer" style="display:flex;justify-content:space-around;align-items:center;">
				<div>
					<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">预览</button>
				</div>
				<div>
					<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;margin-left:20px;">发布</button>
					<span style="font-size:14px;color:#287af2;margin-left:20px;cursor:pointer;" @click="add_show">设置群发对象</span>
				</div>
			</div>
			
		</div>
		<!--设置群发对象-->
		<div id="app2">
			<Modal width="500" v-model="add" class-name="vertical-center-modal">
				<div slot="header" style="text-align:center;font-size:16px;margin:0">设置群发对象</div>
				<div class="table_style" style="height:auto;">
					<div>设置群发对象：</div>
					<div>
						<span class="table_span">类型:</span>
						<CheckboxGroup v-model="fruit">
							<Checkbox label="全部"></Checkbox>
							<Checkbox label="苹果"></Checkbox>
							<Checkbox label="西瓜"></Checkbox>
						</CheckboxGroup>
					</div>
					<div>
						<span class="table_span">校区:</span>
						<CheckboxGroup v-model="fruit">
							<Checkbox label="全部"></Checkbox>
							<Checkbox label="苹果"></Checkbox>
							<Checkbox label="西瓜"></Checkbox>
						</CheckboxGroup>
					</div>
					<div>
						<span class="table_span">乐器:</span>
						<CheckboxGroup v-model="fruit">
							<Checkbox label="全部"></Checkbox>
							<Checkbox label="苹果"></Checkbox>
							<Checkbox label="西瓜"></Checkbox>
						</CheckboxGroup>
					</div>
					<div>
						<span class="table_span">级别:</span>
						<CheckboxGroup v-model="fruit">
							<Checkbox label="全部"></Checkbox>
							<Checkbox label="苹果"></Checkbox>
							<Checkbox label="西瓜"></Checkbox>
						</CheckboxGroup>
					</div>
					<div>
						<label for="checkbox"><input type="checkbox" id="checkbox">自定义标签</label>
						<br>
							<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
							<label for="jack">Jack</label>
							<input type="checkbox" id="john" value="John" v-model="checkedNames">
							<label for="john">John</label>
							<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
							<label for="mike">Mike</label>
							<br>
							<span class="span_show_hide">您已选择: {{ checkedNames }}</span> 
						</div>
					</div>
					<div slot="footer" @click="add_hide">
						<button style="margin-right:220px;width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
					</div>
				</Modal>
		</div>

	</div>
</template>
<script>
import Ueditor from '../All-commonality/UE.vue'
import {Event} from '../All-commonality/bus'

export default {
	components:{Ueditor},	
	data() {
		return {
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
			defaultMsg:'',   // 父子组建传递的内容
			config: {
				initialFrameWidth: 1050,
				initialFrameHeight:300,
				BaseUrl: '',
				toolbars: [
					['fullscreen', 'source', 'undo', 'redo'],
					['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','simpleupload']
				],
			},
			model1: '',
			fruit: ['第一教室'],
			add: false,
			checkedNames: [],
			show_low:[],
			show_add:false,
		}
	},
	mounted(){
		 Event.$on('newval',ueval=>{
          this.defaultMsg = ueval;
          console.log(this.defaultMsg)
        })
	},
	created:function(){
		if(this.checkedNames.length == 0){
				// $('.span_show_hide').hide()
				console.log(111)
			}
	},
	methods: {
		add_show(){
			this.add=true;
			
		},
		add_hide(){
			this.add=false;
			
		},

		show_lows(){
			if(this.show_low == 'a'){
				this.show_add = true
				// this.get_edu_List()
			}else{
				this.show_add = false
			}
		},
		
    }
}
</script>
<style scoped lang="scss">
	@import '../../assets/css/alert.css';
	.table_style div{
		margin-bottom:0 ;  
		
	}
	.table_span{
		margin-left:-50px;
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
	.home_p{
		em{
			float:right;
		}
		z-index: 1000;
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
	.ql-container .ql-snow{
		background:red;
	}

	.animated{
		margin: 0 auto;
		padding-bottom:30px; 
	}
	.heigt_page{
		padding: 20px 0; 
	}
	.table_a{
		padding:10px 0; 
	}
</style>
