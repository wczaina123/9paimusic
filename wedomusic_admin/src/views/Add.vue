<template>
	<div class="box">
		<div class="title">
			订单管理系统 > 商品维护 > 新增商品
		</div>
		<div class="shopmain">
			<p class="shoptitle">商品详细信息</p>
			<div class="shopmain">
				<p class="tags">商品分类： 入户门 > 钢质门</p>
				<p class="basicTitle">基本属性</p>
				<ul class="basicInformation">
					<li>
						<label class="star">商品名称：</label>
						<span>
							<el-input :class="isShopname?'el-input__inner-error':''" v-model="isShopnameval" @blur="validate(isShopnameval,'isShopname')" style="width:200px" placeholder="请输入内容"></el-input>
							<p class="errorText" v-if="isShopname">商品名称不能为空！</p>
						</span>
					</li>
					<li>
						<label class="star">商品编码：</label>
						<span>
							<el-input :class="isShopnum?'el-input__inner-error':''" v-model="isShopnumval" @blur="validate(isShopnumval,'isShopnum')" style="width:200px" placeholder="请输入内容"></el-input>
							<p class="errorText" v-if="isShopnum">商品编码不能为空！</p>
						</span>
					</li>
					<li>
						<label class="star">商品型号：</label>
						<span>
							<el-input :class="isShopsign?'el-input__inner-error':''" v-model="isShopsignval" @blur="validate(isShopsignval,'isShopsign')" style="width:200px" placeholder="请输入内容"></el-input>
							<p class="errorText" v-if="isShopsign">商品型号不能为空！</p>
						</span>
					</li>
					<li>
						<label>商品基本价格：</label>
						<span>
							<el-input style="width:200px" placeholder="请输入内容"></el-input>
						</span>&ensp;<span>元</span>
					</li>
					<li>
						<label class="star">商品供货周期：</label>
						<span>
							<el-input :class="isShoptime?'el-input__inner-error':''" v-model="isShoptimeval" @blur="validate(isShoptimeval,'isShoptime')" style="width:200px" placeholder="请输入内容"></el-input>&ensp;<span>天</span>
							<p class="errorText" v-if="isShoptime">商品供货周期不能为空！</p>
						</span>
						
					</li>
				</ul>
				<ul class="tab-li">
					<li @click="taggle(0)" :class="active == 0?'active':''">组价属性</li>
					<li @click="taggle(1)" :class="active == 1?'active':''">商品详情描述</li>
					<li @click="taggle(2)" :class="active == 2?'active':''">上传商品图片</li>
				</ul>
				<div class="tabmain">
					<div class="priceInfo" v-if="active == 0">
						<p class="tabmaintitle">组价属性：</p>
						<ul class="infoMain">
							<li  v-for="(item,k) in signData" :key="k">
								<label>{{item.specName}}：</label>
								<div class="inforight">
									<div>
      									<el-checkbox
										   v-for="(items,i) in item.childs" 
										   :label="items.specValue" 
										   :key="i"
										   :checked="signData[k].childs[i].isChecked"
										   @change="checkHeadle(k,i)"
										   >
										   </el-checkbox>
      								</div>
								</div>
							</li>
							<li>
								<label>税率维护：</label>
								<div class="inforight">
									<el-select placeholder="请选择">
										<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value">
										</el-option>
									</el-select>
								</div>
							</li>
							<li>
								<label>价格配置：</label>
								<div class="inforight">
									<el-radio v-model="radio" label="1">全局价格配置</el-radio>
									<el-radio v-model="radio" label="2">穷举价格配置</el-radio>
									<el-radio v-model="radio" label="3">公式价格配置</el-radio>
								</div>
							</li>
							<li v-if="radio == 1">
								<label>商品实际价格：</label>
								<div class="inforight">
									<el-input style="width:200px" placeholder="请输入内容"></el-input>
								</div>
							</li>
							<li v-if="radio == 2">
								<label>详细价格：</label>
								<div class="inforight">
									<table border="1" class="table">
										<thead>
											<th>档次</th>
											<th>尺寸</th>
											<th>价格</th>
											<th>是否禁用</th>
										</thead>
										<tbody>
											<tr>
												<td>二档钢质门</td>
												<td>1500*2200</td>
												<td>
													<el-input placeholder="请输入内容"></el-input>
												</td>
												<td>
													<el-button type="text" size="small">禁用</el-button>
												</td>
											</tr>
											<tr>
												<td>二档钢质门</td>
												<td>1500*2200</td>
												<td>
													<el-input placeholder="请输入内容"></el-input>
												</td>
												<td>
													<el-button type="text" size="small">禁用</el-button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</li>
							<li v-if="radio == 3">
								<label>详细价格：</label>
								<div class="inforight">
									<table border="1" class="table">
										<thead>
											<th>项目名称</th>
											<th>规格型号</th>
											<th>规格类型</th>
											<th>产地和品牌</th>
											<th>单位</th>
											<th>数量</th>
											<th>单价</th>
											<th>总价</th>
											<th>备注</th>
										</thead>
										<tbody v-for="(v,i) in detailedPrice" :key="i">
											<tr>
												<td class="t-title" colspan="9">{{v.specName}}</td>
											</tr>
											<tr v-for="(val,ind) in v.goodsFormulaSpeclist" :key="ind">
												<td></td>
												<td>{{val.specValue}}</td>
												<td>
													<el-select v-model="value" placeholder="请选择">
														<el-option
															v-for="item in options"
															:key="item.value"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</td>
												<td><el-input v-model="val.sepcBrand" style="width:90px;height:20px" placeholder=""></el-input></td>
												<td><el-input v-model="val.specUnit" style="width:50px;height:20px" placeholder=""></el-input></td>
												<td><el-input @change="totalPrice(i,ind)" v-model="val.specCount" style="width:50px;height:20px" placeholder=""></el-input></td>
												<td><el-input @change="totalPrice(i,ind)" v-model="val.specPrice" style="width:60px;height:20px" placeholder=""></el-input></td>
												<td :ref="'total'+i+ind"></td>
												<td>
													<el-input v-model="val.remark" style="width:120px;height:20px" placeholder=""></el-input>
												</td>
											</tr>
										</tbody>
									</table>
									<div>
										<p style="line-height: 30px;background: #eee;">公司填写</p>
										<div>
											<p style="border:1px solid #f6f6f6">公式内容</p>
											<div style="min-height:100px;border:1px solid #f6f6f6">
												<!--[入户门-尺寸]+[入户门-尺寸]-->
												{{formula.join('')}}
											</div>
										</div>
									</div>
									<div class="reckon">
										<div >
											<input type="button" v-for='item in specName' style=" margin-top: 5px;" @click="spec(item)" class="button_ellipse noChage" :value="item" />
										</div>
										<div>
											<input type="button" style="width: 28px;" id="add" @click="add" ref='add' class="button_ellipse noChage" value="+" />
											<input type="button" style="width: 28px;" id="reduce" @click="reduce" ref='reduce' class="button_ellipse noChage" value="-" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="take" @click="take" ref='take'  class="button_ellipse noChage" value="×" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="del" @click="del" ref='del' class="button_ellipse noChage" value="÷" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="seven" @click="seven" ref='seven' class="button_ellipse noChage" value="7" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="eight" @click="eight" ref='eight' class="button_ellipse noChage" value="8" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="nine" @click="nine" ref='nine' class="button_ellipse noChage" value="9" />
											<br>
											<input type="button" style="width: 60px; margin-top: 5px;" id="back" @click="back" ref='back' class="button_ellipse noChage" value="←" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="left"  @click="left" ref='left' class="button_ellipse noChage" value="(" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="right"  @click="right" ref='right' class="button_ellipse noChage" value=")" />

											<input type="button" style="width: 28px; margin-top: 5px;" id="four" @click="four" ref='four' class="button_ellipse noChage" value="4" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="five" @click="five" ref='five' class="button_ellipse noChage" value="5" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="six" @click="six" ref='six' class="button_ellipse noChage" value="6" />
											<br>

											<input type="button" id="clear" style="width:60px;margin-top: 5px;" @click="clear" ref='clear' class="button_ellipse noChage" value="clear" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="point" @click="point" ref='point' class="button_ellipse noChage" value="." />
											<input type="button" style="width: 28px; margin-top: 5px;" id="zero" @click="zero" ref='zero' class="button_ellipse noChage" value="0" />
											<input type="button" id="one" style="width:28px;margin-top: 5px;" @click="one" ref='one' class="button_ellipse noChage" value="1" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="two" @click="two" ref='two' class="button_ellipse noChage" value="2" />
											<input type="button" style="width: 28px; margin-top: 5px;" id="three" @click="three" ref='three' class="button_ellipse noChage" value="3" />
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="shoprigest" v-if="active == 1">
						<p class="tabmaintitle" style="text-indent: 0;">商品详情描述：</p>
						<div style="display: flex;">
							<label class="star" style="width:8%">商品品牌：</label>
							<span>
      						<el-input :class="isShoppp?'el-input__inner-error':''" v-model="isShopppval" @blur="validate(isShopppval,'isShoppp')" placeholder="请输入商品品牌"></el-input>
      						<p class="errorText" v-if="isShoppp">商品品牌不能为空！</p>
      					</span>
						</div>
						<div style="display: flex;margin-top:10px">
							<label style="width:100px">商品描述：</label>
							<div>
								<quill-editor ref="myTextEditor" :content="content" :options="editorOption" @change="onEditorChange($event)">
								</quill-editor>
							</div>
						</div>
					</div>
					<div class="piclist" v-if="active == 2">
						<p style="width:10%;">商品图片</p>
						<div>
							<p>上传图片</p>
							<div>
								<el-upload :action='baseUrl+"/web/api/goods/addPhoto"' list-type="picture-card" limit=5 :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</div>
							<p>上传水印</p>
							<div>
								<el-upload :action='baseUrl+"/web/api/goods/addPhoto"' limit=1 list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</div>
						</div>
					</div>
				</div>
				<div style="margin-top:20px;padding-bottom:30px;text-align: center;">
					<el-button @click="submit()">保存</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import validate from "../assets/js/common.js";
import Vue from "vue";
export default {
  data() {
    return {
      active: 0,
      dialogVisible: false,
      radio: "1",
      content: "",
      //多选框列表
      signData: [],
      checked: false,
      //保存验证
      isShopnameval: "",
      isShopname: false,
      isShopnumval: "",
      isShopnum: false,
      isShopsignval: "",
      isShopsign: false,
      isShoptimeval: "",
      isShoptime: false,
      isShoplevelval: "",
      isShoplevel: false,
      //下拉框信息
      options: [
        {
          value: "1",
          label: "增值税专用发票"
        },
        {
          value: "2",
          label: "增值税普通发票"
        },
        {
          value: "3",
          label: "其他票据"
        }
      ],
      value: "",
      checkList: {},
      //详细价格
      detailedPrice: [],
      //多选父级数组
			tempArr: [],
			formula: [],
			specName: ['入户门-尺寸', '入户门-防火等级'],
			allCheck:[]
    };
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    console.log("this is my editor", this.editor);
    // this.editor to do something...
  },
  methods: {
    //计算总价
    totalPrice(i, ind) {
      this.detailedPrice[i].goodsFormulaSpeclist[ind].specAllPrice =
        this.detailedPrice[i].goodsFormulaSpeclist[ind].specCount *
        this.detailedPrice[i].goodsFormulaSpeclist[ind].specPrice;
      this.$refs["total" + i + ind][0].innerHTML = this.detailedPrice[
        i
      ].goodsFormulaSpeclist[ind].specAllPrice;
    },
    //checkbox点击事件
    checkHeadle(a, b) {
      var that = this;
      this.signData[a].childs[b].isChecked = !this.signData[a].childs[b]
        .isChecked;
      this.signData[a].childs[b].specPrice = 0; //单价
      this.signData[a].childs[b].specCount = 0; //数量
      this.signData[a].childs[b].total = 0; //总价
      this.signData[a].childs[b].specValueId = ""; //规格值id
      this.signData[a].childs[b].specVauleName = this.signData[a].childs[
        b
      ].specVaule;
      this.signData[a].childs[b].specType = ""; //规格类型
      this.signData[a].childs[b].specBrand = ""; //产地名称
      this.signData[a].childs[b].specunit = ""; //单位
      this.signData[a].childs[b].remark = ""; //备注
      if (this.signData[a].childs[b].isChecked) {
        if (this.detailedPrice.length > 0) {
          if (this.tempArr.indexOf(this.signData[a].specName) == -1) {
            //如果选中的父级没有现在点的这个，我就push父级一个
            this.detailedPrice.push({
              specName: this.signData[a].specName,
              id: this.signData[a].id,
              goodsFormulaSpeclist: [this.signData[a].childs[b]]
            });
          } else {
            //							console.log(this.tempArr)
            //							console.log(this.tempArr.indexOf(this.signData[a].specName))
            this.detailedPrice[
              this.tempArr.indexOf(this.signData[a].specName)
            ].goodsFormulaSpeclist.push(this.signData[a].childs[b]);
          }
        } else {
          this.detailedPrice.push({
            specName: this.signData[a].specName,
            goodsFormulaSpeclist: [this.signData[a].childs[b]]
          });
        }
        if (this.tempArr.indexOf(this.signData[a].specName) == -1) {
          this.tempArr.push(this.signData[a].specName);
        }
      }
      //    console.log(that.detailedPrice);
      this.getCombinationArr(that.detailedPrice); //调用穷举
    }, //验证函数
    validate(name, tags) {
      this[tags.toString()] = validate({ name: name, flag: tags });
      console.log(this[tags.toString()]);
    },
    submit() {
      if (
        !this.isShopnameval ||
        !this.isShopnumval ||
        !this.isShoptimeval ||
        !this.isShopsignval ||
        !this.isShopppval
      ) {
        this.$message.error("请填写必填项！");
      } else {
				this.$message("保存成功！");
				this.$http({
					url:this.baseUrl+
				})
      }
    },
    //组件tab切换
    taggle(index) {
      this.active = index;
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //富文本
    editorOption() {},
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
    },
    //获取所有详细信息的复选框
    getList() {
      this.$http({ url: this.baseUrl + "web/api/spec/list", method: "get" })
        .then(
          function(response) {
            console.log(response.data.data);
            let list = response.data.data;
            this.signData = list;
            list.forEach((val, i) => {
              this.checkList["checkItem" + i] = [];
            });
            list.forEach((v, i) => {
              v.childs.forEach((val, ind) => {
                val.isChecked = false;
              });
            });
            this.checkList.length = list.length;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    //验证函数
    validate(name, tags) {
      this[tags.toString()] = validate({ name: name, flag: tags });
      console.log(this[tags.toString()]);
    },
    getCombinationArr(obj) {
      //获取穷举
      console.log(obj);
      var priceTitle = [];
      for (var i = 0; i < obj.length; i++) {
        priceTitle.push(obj[i].specName);
      }
      console.log(priceTitle);
		},
		add() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.add.value);
				//				}
			},
			reduce() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.reduce.value);
				//				}
			},
			take() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.take.value);
				//				}
			},
			del() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.del.value);
				//				}
			},
			zero() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.zero.value);
				//				}
			},
			one() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.one.value);
				//				}
			},
			two() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.two.value);
				//				}
			},
			three() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.three.value);
				//				}
			},
			four() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.four.value);
				//				}
			},
			five() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.five.value);
				//				}
			},
			six() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.six.value);
				//				}
			},
			seven() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.seven.value);
				//				}
			},
			eight() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.eight.value);
				//				}
			},
			nine() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.nine.value);
				//				}
			},
			back() {
				//				if(this.checkExpForOP()) {
				//					this.formula += this.$refs.back.value;
				//				}

				this.formula.splice(this.formula.length - 1, 1)
			},
			left() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.left.value);
				//				}
			},
			right() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.right.value);
				//				}
			},
			point() {
				//				if(this.checkExpForOP()) {
				this.formula.push(this.$refs.point.value);
				//				}
			},
			clear() {
				//				if(this.checkExpForOP()) {
				//					this.formula += this.$refs.clear.value;
				//				}
				this.formula = []
			},
			spec(name) { //规格值

				this.formula.push(name);
			},
			checkExpForOP() { //符号检测
				console.log(this.getLastSign())
			},
			getLastSign() { //获取点击按钮的类型
				const lastStr = this.formula[this.formula.length - 1]
				console.log(lastStr)
				var attr = '';
				if(lastStr == '') {
					attr = '00'
				} else if(lastStr == '+' || lastStr == '-' || lastStr == '*' || lastStr == '/') {
					attr = '01'
				} else if(lastStr == '(') {
					attr = '03'
				} else if(lastStr == ')') {
					attr = '04'
				} else
				if(lastStr == '0' || lastStr == '1' || lastStr == '2' || lastStr == '3' || lastStr == '4' || lastStr == '5' || lastStr == '6' || lastStr == '7' || lastStr == '8' || lastStr == '9') {
					attr = '05'
				} else if(lastStr == '.') {
					attr = '06'
				} else {
					attr = '07'
				}

				return attr;
			}
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.box {
  overflow-x: hidden;
}

.title {
  height: 70px;
  background: #fff;
  line-height: 70px;
  text-indent: 1em;
}

.tags {
  text-indent: 0.8em;
  border: 1px solid #f6f6f6;
  line-height: 40px;
}

.basicTitle {
  text-indent: 0.8em;
  font-size: 16px;
  background: #eee;
}

.t-title {
  text-align: left;
  background: #00bfff;
  padding-left: 15px;
}

.table {
  width: 100%;
  border: 1px solid #f6f6f6;
  text-align: center;
  margin-bottom: 30px;
  thead {
    background: #f1f1f1;
  }
}
.table td {
  height: 40px;
  line-height: 40px;
}
.quill-editor .ql-container {
  height: 125px;
}

.piclist {
  display: flex;
  width: 95%;
  margin: 10px auto;
}

.shoprigest {
  width: 95%;
  padding: 0 2.5%;
}

.reckon {
  display: flex;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  margin-top: 10px;
  padding: 5px;
  div {
    &:nth-child(1) {
      width: 70%;
    }
    &:nth-child(2) {
      width: 28%;
      border-left: 1px solid #f6f6f6;
      padding-left: 2%;
    }
  }
}

.infoMain {
  width: 100%;
  border: 1px solid #f6f6f6;
  li {
    width: 90%;
    padding: 8px 5%;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    label {
      width: 17%;
    }
    .inforight {
      width: 83%;
    }
  }
}

.stepCont {
  width: 100%;
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
  span {
    padding: 0 80px 0 30px;
  }
}

.shoptitle {
  font-size: 18px;
  font-weight: 500;
  border-top: 4px solid #f6f6f6;
  border-bottom: 3px solid #f6f6f6;
}

.shopmain {
  background: #fff;
  .basicInformation {
    width: 100%;
    border: 1px solid #f6f6f6;
    li {
      width: 90%;
      display: flex;
      border-bottom: 1px solid #f6f6f6;
      padding: 10px 5%;
      label {
        width: 17%;
      }
    }
  }
  .tab-li {
    display: flex;
    li {
      line-height: 40px;
      margin-left: 20px;
      cursor: pointer;
    }
    .active {
      border-bottom: 3px solid deepskyblue;
    }
  }
  .tabmaintitle {
    text-indent: 20px;
    line-height: 60px;
    font-size: 20px;
    color: #0086b3;
  }
}
/*星星*/

.star {
  position: relative;
}

.star:after {
  content: "*";
  position: absolute;
  left: -7px;
  top: 2px;
  z-index: 3;
  color: red;
  width: 12px;
  height: 12px;
}
.errorText {
  width: 100%;
  color: red;
  font-size: 12px;
}
.el-input__inner-error {
  width: 195.5px;
  border: 1px solid red;
  border-radius: 5px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-select {
  width: 110px;
}
</style>
