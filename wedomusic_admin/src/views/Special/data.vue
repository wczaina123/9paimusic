<!--数据页面-->
<template>
<div>
	<br>
	<div class="topbox">
      <div class="content big_content  content_padding_delete">
        <div class="contentlist order" @click="column"><span>名师专栏</span></div>
        <div class="contentlist home" @click="newarticle"><span >新增文章</span></div>
        <div class="contentlist find" @click="Specialcolumn"><span >专栏管理</span></div>
        <div class="contentlist shopping  bg" @click="specialdata"><span>数据</span></div>
      </div>
    </div>
	<br>
	<div id="specialdata">
		<div class="content content_model">
			<div class="list">
				<p class="home_p home_p_top">
					<span style="font-size:14px;">所属专栏：</span>
					<Select v-model="model1" style="width:160px !important;" placeholder="请选择可见范围">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</p>
				<p class="home_text">
					<a class="font_weight">昨日关键指标</a>
					<span class="float_right">
						<i class="fa fa-question-circle fa-lg mt-4"></i>
					</span>
				</p>
				<ul class="ul_uls">
					<li>
						<i>新关注人数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
					<li>
						<i>取消关注人数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
					<li>
						<i>净增关注人数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
					<li>
						<i>累计关注人数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
					<li>
						<i>昨日阅读数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
					<li>
						<i>昨日评论数</i>
						<em>200</em>
						<a href="javascript:;">
							<u>日</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>周</u>
							<span>--</span>
						</a>
						<a href="javascript:;">
							<u>月</u>
							<span>--</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- 以上 -->
		<!-- 图先空下 -->
		<!-- 以上 -->
		<!-- 表格 -->
		<div class="content content_model" style="margin-top:30px;">
			<div class="list" style="margin:15px 4px;">
			<p class="home_text">
				<a class="font_weight">昨日关键指标</a>
				<span class="float_right">
					<em style="cursor:pointer;height:100%;padding-right:10px;border-right:1px solid #C5D1E2;">下载表格</em>
					<i class="fa fa-question-circle fa-lg mt-4" style="margin-left:10px;"></i>
				</span>
			</p>
			</div>
			<table cellspacing="0" cellpadding="0" border="0" style="width:100%;" class="sort-table">
				<thead>
					<tr>
						<th class="">
							<div class="ivu-table-cell">
								<span>时间</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>新关注人数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>取消关注人数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>净增关注人数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>累计关注人数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>阅读数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
						<th class="">
							<div class="ivu-table-cell">
								<span>评论数</span>
								<span class="ivu-table-sort">
									<i class="ivu-icon ivu-icon-arrow-up-b"></i>
									<i class="ivu-icon ivu-icon-arrow-down-b"></i>
								</span>
							</div>
						</th>
					</tr>
				</thead>
				<tbody class="ivu-table-tbody">
					<tr class="ivu-table-row">
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
						<td style="text-align:center;">001</td>
					</tr>
				</tbody>
			</table>
			<div class="page" style="text-align:right;margin-top:10px;height:30px;">
				 <Page :current="2" :total="50" simple></Page>
			</div>
		</div>
		<!-- 以上 -->
		
	</div>
</div>
</template>
<script>
export default {
	name: "",
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
			model1: '',
			add: false,
		}
	},
	methods:{
		column() {
		this.$router.push({path:'/special'})
		},
		newarticle() {
		this.$router.push({path:'/special/new_ticles'+'?'+0})
		},
		Specialcolumn() {
		this.$router.push({path:'/special/Specialcolumn'})
		},
		specialdata() {
		this.$router.push({path:'/special/data'})
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/alert.css';
/*二级菜单 以及下面的框框*/
.content_padding_delete{
	padding:0 !important;
}
* {
	text-decoration: none;
	font-style: normal;
}
a {
	&:hover {
		text-decoration: none;
	}
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
	height: 200px;
	border: 1px solid #C5D1E2;
	border-top: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	li {
		flex: 1;
		text-align: center;
		border-right: 1px solid #C5D1E2;
		&:last-child {
			border-right: 0;
		}
		i {
			font-size: 16px;
			color: #596980;
		}
		em {
			display: block;
			font-size: 36px;
			font-weight: 400;
			color: #596980;
		}
		a {
			display: block;
			font-size: 14px;
			color: #596980;
			u {
				text-decoration: none;
			}
			span {
				margin-left: 5px;
			}
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