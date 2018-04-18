<!--名师专栏-->
<template>
<div>
	<div id="column">
		
		<!-- 头条 -->
		<div class="content content_model content_bottom content_min">
			<div class="list">
				<p class="home_p home_p_top">
                    <!-- <Select v-model="model1" style="width:200px" placeholder="请选择可见范围">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                    <Select v-model="txtmove" style="width:160px !important;" @on-change="changeclass" placeholder="请选择专栏">
                    	<Option value='0'>全部</Option>						
                    	<Option v-for="item in moveList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </p>
                <p class="home_text">
                	<a class="font_weight">专栏整体情况</a>
                	<span class="float_right">更多数据</span>
                </p>
                <ul class="ul_uls">
                	<li>
                		<i>今日新评论</i>
                		<em>200</em>
                	</li>
                	<li>
                		<i>今日阅读量</i>
                		<em>200</em>
                	</li>
                	<li>
                		<i>今日新增关注人数</i>
                		<em>200</em>
                	</li>
                	<li>
                		<i>总关注人数</i>
                		<em>200</em>
                	</li>
                </ul>

            </div>
            <!-- 表格以上 -->
            <p class="home_text" style="margin-top:40px;">
            	专栏文章列表
            </p>
            <p class="home_p">
            	<em class="add_jia" style="margin-left:0 !important;" @click="article(0)">
            		<i class="fa fa-plus-square-o fa-lg mt-4"></i>
            		<a>新增</a>
            	</em>
            </p>
            <!-- 头条表格以下 -->
            <div class=" x_hidden">
            	<table class="table-list" style="width:100%;overflow-x:scroll">
            		<thead class="home_thead">
            			<tr>
							<th>ID</th>
            				<th>日期</th>
            				<th>专栏</th>
            				<th>标题</th>
            				<th>阅读数</th>
            				<th>评论</th>
            				<th>操作</th>
            			</tr>
            		</thead>
            		<tbody class="home_tbody">
            			<tr v-for="res in list" :key="res.id">
							
							<td style="text-align:center;">{{res.id}}</td>
            				<td style="text-align:center;">{{res.created_at*1000 | formatDate}}</td>
            				<td style="text-align:center;">{{res.column_name}}</td>
            				<td style="text-align:center;">{{res.name}}</td>
            				<td style="text-align:center;">{{res.read_count}}</td>
            				<td style="text-align:center;" @click="go_to_comments">
            					<a>{{res.comment_count}}</a>
            				</td>
            				<td style="text-align: center;">
            					<a @click="get_del_id(res.id)">删除</a>
            					<a style="margin-left:6px;"@click="article(res.id)">修改</a>
            					<a style="margin-left:6px;" @click="push_index(res.id,res.column_name)">推送至首页</a>
            				</td>
            			</tr>
            		</tbody>
            	</table>
            </div>
            <p class="table_bottom_p" @click="article(0)">
            	<i class="fa fa-plus-square-o fa-lg mt-4" style="color:#287af2"></i>
            	<span>新增</span>
            </p>
        </div>

        <!--以上-->
		<!--推送到首页-->
		<div class="aaa">
        <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
          <div class="tit" style="margin-top:20px;">是否确定推送到首页</div>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="close">取消</button>
            <button class="btn btn2" @click="push_column_content">确定</button>
          </div>
        </Modal>
		</div>
		<!--删除-->
		<div class="aaa">
        <Modal v-model="del" width="376" class-name="vertical-center-modal">
          <div class="tit" style="margin-top:20px;">是否确定删除</div>
          <div slot="footer" class="btns">
            <button class="btn btn1" @click="close">取消</button>
            <button class="btn btn2" @click="delete_column_content">确定</button>
          </div>
        </Modal>
		</div>

    </div>
</div>
</template>
<script>
import {formatDate} from '../All-commonality/data'
export default {
	data() {
		return {
			cityList: [],
			txtmove:'',
			moveList:[],
			list:'',
			soldout:false,
			push_id:'',
			del:false,
			del_id:'',
			title:'',
		}
	},
	mounted(){
		this.gettecha_class()
		this.get_move_list()
	},
	methods: {

		close(){
			this.soldout = false
			this.del = false
		},


		article(id){
			this.$router.push({path: "/special/new_ticles"+'?'+id})
		},
		changeok() {
			console.log("成功")
		},
		cancel() {
			console.log("失败")
		},
		go_to_comments() {
			this.$router.push({
				path: "/comment"
			})
		},
		changeclass(){    // 切换分类
			// console.log(this.txtmove)
			this.gettecha_class()
		},
				
		gettecha_class(){   // 获取分类
			this.$axios({
				url: this.$linkurl.get_column_content_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					category_id:this.txtmove,
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
				this.list = res.data.data
			})
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
				this.moveList = res.data.data
			})
		},

		push_index(id,tit){  // 推送首页id
			this.push_id = id
			this.title = tit
			this.soldout = true
		},

		push_column_content(){  // 推送到首页
			this.$axios({
				url: this.$linkurl.push_column_content,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
					id:this.push_id,
					title:this.title
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
				this.soldout = false
				this.gettecha_class()

			})
		},

		get_del_id(id){  // 删除id
			this.del_id = id
			this.del = true
		},

		delete_column_content(){  // 删除
			this.$axios({
				url: this.$linkurl.delete_column_content,
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
				// console.log(res.data)
				this.del = false
				this.gettecha_class()

			})
		},

	},

	filters:{
		formatDate(time) {
			var date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd');
		}
	},
}
</script>
<style lang="scss" scoped>
	@import '../../assets/css/alert.css';

	/*二级菜单 以及下面的框框*/

	* {
		text-decoration: none;
		font-style: normal;
	}

	.home_text {
		margin-bottom: 0;
		a {
			font-size: 16px;
		}
		span {
			height: 60px;
			line-height: 60px;
			color: #287AF2;
			float: right;
			margin-right: 20px;
		}
	}

	.content,
	.content_model {
		margin-top: 10px;
	}

	.list {
		p {
			font-size: 18px;
			span {
				font-size: 12px;
				font-weight: 400;
			}
		}
		.font_weight {
			font-size: 18px;
			line-height: 18px;
			color: #363F4C;
		}
		.float_right {
			float: right;
			font-size: 14px;
		}
	}

	.list .ul_uls {
		width: 100%;
		height: 130px;
		border: 1px solid #C5D1E2;
		border-top: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		li {
			width: 25%;
			text-align: center;
			border-right: 1px solid #C5D1E2;
			/*padding-top:35px;*/
			&:last-child {
				border-right: 0;
			}
			i {
				font-size: 16px;
				color: #596980;
			}
			em {
				/*margin-top: 10px;*/
				display: block;
				font-size: 36px;
				font-weight: 400;
				color: #596980;
			}
		}
	}

	.table-list {
		a {
			color: rgb(45, 140, 240);
		}
	}

	.clickname {
		p {
			font-size: 16px;
			font-weight: 600;
			text-align: left;
		}
		ul {
			height: 10px;
			li {
				float: left;
				padding: 0 20px;
				border-right: 1px solid #eee;
				&:last-child {
					border-right: 0;
				}
				span {
					margin-left: 6px;
				}
			}
		}
	}

	@media screen and (max-width:992px) {
		.hidden {
			width: 100%;
			overflow: auto;
			;
			.x_hidden {
				width: 300%;
			}
		}
	}
</style>