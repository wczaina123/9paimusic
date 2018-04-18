<!--新增文章-->
<template>
<div>
	<br>
	<div class="topbox">
	<div class="content big_content content_padding_delete">
		<div class="contentlist order " @click="column"><span>名师专栏</span></div>
		<div class="contentlist home bg" @click="newarticle"><span >新增文章</span></div>
		<div class="contentlist find" @click="Specialcolumn"><span >专栏管理</span></div>
		<div class="contentlist shopping" @click="specialdata"><span>数据</span></div>
	</div>
	</div>
	<br>
	<div id="newsrticle">
		<div class="content content_model">
			<p class="home_text">新增专栏文章</p>
			<!--新增为你定制-->
			<div id="app2">
				<div class="table_style" style="padding-top:20px;height:auto;">
					<div>
						<span>所属专栏:</span>
						<Select v-model="model1" style="width:160px !important;" placeholder="请选择专栏" @on-change="change_statue">
							<Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
						</Select>
					</div>
					<div style="margin-top:-10px;">
						<span>标题:</span>
						<Input placeholder="请输入标题" style="width:350px" v-model="name"></Input>
						<a class="add_list" style="color:#7D93B2;margin-left:20px;">
							<i class="fa fa-exclamation-circle fa-lg mt-4" style="color:#7D93B2;"></i>
							<a>最多可输入35字</a>
						</a>
					</div>
					<div>
						<!--以下是上传图片-->
						<div class="uplode_class">
							<span>封面图：</span>
							<div class="uplode_box">
								<form name=theform>
									<div class="modify-img-border upload-bg"  id="supplier_content" style="padding-top:100%;">
										<div class="edit-upload-plus">
											<a href="javascript:void(0);" class="upload-file" id="supplier_plus">
												<div id="supplier_span">
												<Icon type="images" size="52" style="color:white;"></Icon>
												<p style="font-size: 10px;color: #7D93B2;">图片支持 jpg/png 格式，RGB模式，不超过500k</p>
												<button class="uplode_btn" >点击上传</button>  
												</div>
												<input type="file" name="file" id="supplier" @change="upload('supplier')">
											</a>
										</div>
									</div>
								</form>
							</div>  
						</div> 

					<!-- 文本 -->

						<div class="animated fadeIn">
							<Ueditor  :defaultMsg="defaultMsg" :config='config'></Ueditor>
						</div>

					<!-- 以上 -->
					</div>
					<div slot="footer" id="footer">
						<!-- <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">预览</button> -->
						<button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;margin-left:20px;" @click="add_msg">发布</button>
					</div>
				</div>
				<!--以上-->
			</div>
		</div>
	</div>
</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import Ueditor from '../All-commonality/UE.vue'
import {Event} from '../All-commonality/bus'

export default {
components:{Ueditor},
	data() {
		return {
			cityList: [],
			model1: '',
			supplier_img:'',
			config: {
				initialFrameHeight:300,
				BaseUrl: '',
				toolbars: [
					['fullscreen', 'source', 'undo', 'redo'],
					['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','simpleupload']
				],
			},
			defaultMsg:'',
			name:'',
			urlid:'',
		}
	},
	computed:{
		...mapState({uptoken:'uptoken'})
	},
	mounted(){
		this.getosstoken()
		this.get_url()
		this.get_move_list()
		Event.$on('newval',ueval=>{
			this.defaultMsg = ueval;
			// console.log(this.defaultMsg)
    	})
		
	},
	methods:{
		...mapActions({getosstoken:'get_token'}),  // 获取oss token

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

		get_url(){   // 解析url
			this.urlid = window.location.search.substring(1)
			if(this.urlid!=0){
				this.get_main()
			}
		},

		get_main(){  // 获取详情
			this.$axios({
				url: this.$linkurl.get_column_content_detail,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.urlid,
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
				this.model1 = i.column_category_id
				this.name = i.name
				this.supplier_img = i.cover_url
				this.defaultMsg = i.content
			})
		},

		change_statue(){  // 选择专栏分类->拿到id
			// console.log(this.model1) 
		},

		get_move_list(){   // 下拉
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
				this.cityList = res.data.data
			})
		},

		// 上传
		upload(id){   // 上传1
			this.$Loading.start();
			var cdnDomain = 'http://cdn.9beats.com/';
			var timestamp=new Date().getTime();
			if(!document.getElementById(id).files[0].name ){return false;}
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
			// console.log(oReq.status)
				if(oReq.readyState == 4){
					if(oReq.status==200){ 
							that.$Loading.finish();						
							that.supplier_img = cdnDomain + key
							$('#' + id + '_content').css('background-image','url("'+ that.supplier_img +'")');
							// $('#' + id + '_span').css('display','none')
							
					}else{
						that.$Message.config({top:50})
						that.$Message.warning('上传失败');
					}
				}
			
			};
      	},

		add_msg(){   // 新增
			this.$axios({
				url: this.$linkurl.handle_column_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.urlid,
					column_id:this.model1,
					name:this.name,
					cover_url:this.supplier_img,
					content:this.defaultMsg,
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
				if(res.data.message=='成功'){
					this.$router.push({path:'/special'})
				}else{
					this.$Message.config({top: 50,duration: 3})
					this.$Message.error('请填写完整')
				}
			})
		},
		




		
	}
}
</script>


<style lang="scss" scoped>
@import '../../assets/css/alert.css'; // 表格样式
#supplier{
	width: 100%;
	height: 100%;
}
.uplode_class{
    font-size: 14px;
    padding: 20px 0;
	display: flex;
    .uplode_box{
        width: 40%;
        height: 20%;
        background: #D8D8D8;
        border: none;
        .uplode_btn{
            width: 160px;
            height: 30px;
            background:#F0B46E;
            color: white;
            border: none;
        }
    }
}


.table_style div {
	height: auto;
}

#footer {
	float: right !important;
}

.content,
.content_model {
	margin-top: 10px;
}

.upload_photo {
	width: 360px;
	height: 360px !important;
}

.table_button {
	height: 30px;
	line-height: 30px;
	color: #fff;
	padding: 0 20px;
	border: 0;
	background: #F0B46E;
	border-radius: 5px;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
	height: 200px !important;
}

</style>
