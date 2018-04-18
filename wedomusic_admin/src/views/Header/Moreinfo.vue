<template>
	<div id="Specialcolumn">
		<div class="content content_model content_bottom content_min" style="margin-top:30px;">
			<div class="list"">
				<p class="home_text">
					通知
				</p>
				<p class="home_p">
					<em class="add_jia" @click="add=true">
						
	<button type="" @click="del" class="btn_style">删除</button>

					</em>
				</p>
				<!-- 头条表格以下 -->
				<div class=" x_hidden">
					<table class="table-list" style="width:100%;">
						<thead class="home_thead">
							<tr>
								<th style="width:5%">
									<label>
										<input type="checkbox" class="checkbox" @click="selectAll" />
									</label>
								</th>
								<th style="width:5%">id</th>
								<th style="width:10%">发信人</th>
								<th style="width:15%">时间</th>
								<th style="width:20%">标题</th>
								<th style="width:45%">内容</th>
							</tr>
						</thead>
						<tbody class="home_tbody">
							<tr v-for="(item,index) in proData" :key="item.id">
								<td>
									<label for="">
										<input type="checkbox" :value="index" v-model="selectArr">
									</label>
								</td>
								<td style="text-align:center;">1</td>
								<td style="text-align:center;">朝阳校区</td>
								<td style="text-align:center;">2018-02-02</td>
								<td style="text-align:center;">【讨论一下重要的事情】</td>
								<td class=" text text_left" style="text-align: left;">
									<p>张三李四王麻子请今天来办公室一起讨论一些事情，巴拉巴拉的，有很多的事情叽里咕噜。</p><a href="javascript:;" @click="look_main" v-if="text_a">【查看详情】</a>
									<a href="javascript:;" @click="no_main" v-if="!text_a">【收起】</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!-- 表格以上 -->
		</div>
	</div>
</template>
<script>
var proData = [{
	"name": "j1ax"
}]
export default {
	name: "",
	data() {
		return {
			add: false,
			name: "",
			 proData: proData,
			selectArr: [],
			text_a:true,//展开详情
		}
	},
	methods: {
		changeok() {
			console.log("成功")
		},
		cancel() {
			console.log("失败")
		},
		// 点击a查看详情
		look_main(){
			$('.text').removeClass('text_left')
			this.text_a=false
		},
		// 点击收起
		no_main(){
			$('.text').addClass('text_left')
			this.text_a = true
		},
		//删除
		del() {
			let arr = [];
			var len = this.proData.length;
			for (var i = 0; i < len; i++) {
				if (this.selectArr.indexOf(i) >= 0) {
					console.log(this.selectArr.indexOf(i))
				} else {
					arr.push(proData[i])
				}
			}

			this.proData = arr;
			this.selectArr = []
		},
		//实现全选
		selectAll(event) {
			var _this = this;
			console.log(event.currentTarget)
			if (!event.currentTarget.checked) {
				this.selectArr = [];
			} else { //实现全选
				_this.selectArr = [];
				_this.proData.forEach(function(item, i) {
					_this.selectArr.push(i);
				});
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/alert.css';
/*a的样式*/
a {
  text-decoration: none;
  color: #596980;
  &:hover {
    text-decoration: none;
  }
}
/*按钮的样式*/
.btn_style{
	width: 80px;
	height: 30px;
	border: none;
	border-radius: 5px;
	background: #7D93B2;
	color: white;
	font-size: 12px;
}

/*内容栏省略号*/
.text_left p{
	width:70%;
	display:-webkit-box;
	word-break:break-all;
	-webkit-line-clamp:1;
	-webkit-box-orient:vertical;
	overflow:hidden;
	float:left;
}
/*二级菜单 以及下面的框框*/

.content,
.content_model {
	margin-top: 10px;
}

.add_jia {
	margin-left: 0 !important;
}

.table-list {
	a {
		color: rgb(45, 140, 240);
	}
}

.addcolumn {
	p {
		span {
			display: inline-block;
			width: 100px;
			text-align: right;
			margin-right: 10px;
		}
	}
}

.vertical-center-modal h5 {
	font-size: 14px;
	color: #596980;
	width: 80%;
	margin-left: 10%;
	text-align: center;
	padding-top: 30px;
}
</style>