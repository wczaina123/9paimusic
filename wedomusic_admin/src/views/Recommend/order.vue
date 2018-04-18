<template>
	<div id="orderfind">
		<div class="content  content_model content_padding content_bottom">
			<ul class="content_uls">
				<li class="content_order orderhome bgg" @click="orderhome">
					<span>首页推荐位列表</span>
				</li>
				<li class="content_order orderfind" @click="orderfind">
					<span>发现页推荐位列表</span>
				</li>
				<li class="content_order ordershopping" @click="ordershopping">
					<span>商城页推荐位列表</span>
				</li>
			</ul>
			<br>
			<orderhome v-show="tech"></orderhome>
			<orderfind v-show="tetbook"></orderfind>
			<ordershopping v-show="mst"></ordershopping>
		</div>
	</div>
</template>
<script>
import orderhome from "./order_recommend/order_home";//推荐位管理/推荐位顺序 模块/首页推荐位列表
import orderfind from "./order_recommend/order_find";//推荐位管理/推荐位顺序 模块/发现页推荐位列表
import ordershopping from "./order_recommend/order_shopping";//推荐位管理/推荐位顺序 模块/商城页推荐位列表

export default {
	components: { orderhome, orderfind, ordershopping },
	name: "dashboard",
	data() {
		return {
			style: 'light',
			tech: true,
			tetbook: false,
			mst: false,

			data: [],//列表
		}
	},


	methods: {
		orderhome() {
			$(".orderhome").addClass("bgg").siblings().removeClass("bgg");
			this.tech = true
			this.mst = false
			this.tetbook = false
		},
		orderfind() {
			$(".orderfind").addClass("bgg").siblings().removeClass("bgg");
			this.tech = false
			this.tetbook = true
			this.mst = false

		},
		ordershopping() {
			$(".ordershopping").addClass("bgg").siblings().removeClass("bgg");
			this.tech = false
			this.tetbook = false
			this.mst = true
		},

	},
}
</script>
<style lang="scss">
/*点击新增 input*/

.order_home_input {
	width: 100%;
	height: auto;
	ul {
		width: 100%;
		display:flex;
		justify-content:space-between;
		align-items:center;
		flex-wrap:wrap;
		margin-bottom:0;
		li {
			width:40%;
			
		}
	}
}
// 盒子去除padding值
.content {
	padding: 40px;
} // content_padding的padding都为40px
.content_padding{
	margin-top:10px !important;
}
.content_padding .content_uls{
	height: 60px;
	background: #eee;
}

.content_order {
	float: left;
	height:60px;
	line-height:60px;
	padding:0 12px;
	margin:0;
	cursor:pointer;

}
.content_order span{
	font-size:16px;
}

.bgg {
	background: rgb(197, 209, 226)
}

@media screen and(max-width:510px) {
	.ivu-menu-light {
		background: #fff;
	}
	.ivu-menu-horizontal {
		line-height: 60px;
	}
}
</style>
