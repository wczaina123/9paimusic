<!--评论页面-->
<template>
	<div id="comment">
		<p class="line_p"><a href="javascript:;" @click="column">名师专栏</a>&gt;<a href="javascript:;">评论</a></p>
		<div class="content content_model">
			<div class="list">
				<p class="home_text">
					评论
				</p>
				<p class="home_p">

					<em class="add_jia" @click="add=true">
						<i class="fa fa-plus-square-o fa-lg mt-4"></i>
						<a>新增</a>
					</em>

					<span class="add_list">

						<Input icon="ios-clock-outline" v-model="value4" placeholder="请输入搜索关键词" style="width: 180px"></Input>
						<button class="btn_style">
							搜索</button>
						</span>

					</p>
					<!-- 头条表格以下 -->
					<div class=" x_hidden">
						<table class="table-list" style="width:100%;overflow-x:scroll">
							<thead class="home_thead">
								<tr>
									<th style="width:10%">时间</th>
									<th style="width:15%">昵称</th>
									<th style="width:15%">ID</th>
									<th style="width:35%">内容</th>
									<th style="width:25%">操作</th>
								</tr>
							</thead>
							<tbody class="home_tbody">
								<tr>
									<td style="text-align:center;"></td>
									<td style="text-align:center;"></td>
									<td style="text-align:center;"></td>
									<td style="text-align:center;"></td>
									<td style="text-align: center;">
										<a>回复</a>
										<a style="margin-left:6px;">删除</a>
										<a style="margin-left:6px;">拉入黑名单</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!-- 表格以上 -->
			</div>	
		</div>
	</div>
</template>
<script>
	export default {
		name:"",
		data(){
			return{

			}
		},
		methods:{
			column(){
				this.$router.push({
					path:'/special'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../assets/css/alert.css';/*二级菜单 以及下面的框框*/

	/* btn 样式 */

	.btn_style {
		width: 80px;
		height: 30px;
		border: none;
		border-radius: 5px;
		background: #7D93B2;
		color: white;
		font-size: 12px;
		margin-left: 20px;
	}
	.home_tbody tr td a{
		color: #2d8cf0;
	}
	.line_p{
		width:100%;
		margin-top:30px;
		a{
			color:#7D93B2;
			&:nth-child(1){
				color:#7D93B2;
				padding-right:3px;
			}
			&:nth-child(2){
				padding-left:3px;
				color:#596980;
			}
			&:hover{
				text-decoration: none;
			}
		}
	}
</style>
