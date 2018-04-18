<template>
  <div id="teacher_power">
    <!-- 教师管理 -->
    <div class="content content_model content_campus">
      <p class="home_text">教师管理</p>
      <p class="home_p">
          <em class="add_jia" @click="add=true">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            <a>新增</a>
          </em>
        <span class="add_list">
          <Select v-model="model1" style="width:160px !important;margin-right:20px;" placeholder="用户昵称">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input icon="ios-clock-outline" v-model="value4" placeholder="请输入用户昵称" style="width: 180px"></Input>
          <button class="btn_style" style="width:100px" @click="add_link">
            <i class="fa fa-plus-square-o fa-lg mt-4" style="color:#fff;vertical-align:middle;"></i>
            新建标签</button>
        </span>

      </p>
      <!-- 以下表格 -->
      <div class="table_left_right" style="width:100%;">
        <table style="width:100%;border:1px solid #c5d1e2;">
          <thead>
            <tr style="height:60px;background:#F6F6F6;" >
              <td style="width:80%;padding-left:20px;" v-if="link_father">
                <input type="checkbox" />
                <button class="btn_style">打标签</button>
                <button class="btn_style" @click="addblacklist=true">加入黑名单</button>
              </td>

              <td style="width:80%;padding-left:20px;" v-else>
                <button class="btn_style">{{link_child_name}}</button>
                <button class="btn_style" @click="open_new_name">重命名</button>                
                <button class="btn_style" @click="del_link">删除</button>
              </td>
              
              <td @click="show_all_link" style="cursor:pointer;width:20%;border-left:1px solid #C5D1E2;text-align:center;">
                全部用户(<span>{{link_main_num}}</span>)
              </td>
            </tr>
          </thead>
        </table>
        <div class="left">
          <ul class="left_uls">
            
            <li v-for="(res,index) in teach_main" :key="res.id" class="uls_li" @mouseleave="hover_hide(index)">
              <div class="li_children">
                <input type="checkbox" class="left_input" />
                <div class="list">
                  <dl>
                    <dt>
                      <div @mouseenter="hover_show"></div>
                      <!-- <img src="images/l_05.gif" alt=""> -->
                    </dt>
                    <dd>
                      <h1>{{res.nick_name}}</h1>
                      <!-- <h2 class="list_h2">暂无标签<span></span></h2> -->
                      <h4 class="list_h4">
                        <a href="javascript:;">标星老师</a>
                        <span class="span_san"></span>
                      </h4>
                      <div class="btn" @click="teacherinfo=true">
                        <button class="btn_style">详情</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- 这里是划过li的时候显示的 -->
              <div class="li_hover" v-if="hover">
                <dl>
                  <dt>
                    <div></div>
                    <!-- <img src="images/l_05.gif" alt=""> -->
                  </dt>
                  <dd>
                    <div class="dd_style">
                      <h1>赵晓明
                        <a href="javascript:;" @click="teacherinfo=true">详情</a>
                        <span class="btn_style" @click="addblacklist=true" style="background:#fff;color:#596980;cursor:pointer;">加入黑名单</span>
                      </h1>
                      <p>
                        <span>手机号:</span>
                      </p>
                      <p>
                        <span>备注:</span>
                        <i class="fa fa-hand-grab-o fa-lg mt-4"></i>
                      </p>
                      <p>
                        <span>标签:</span>
                        <ol class="ols_style">
                          <li>会员</li>
                          <li>老师</li>
                          <li>红领巾班</li>
                        </ol>
                      </p>
                      <p class="p_style">2017-10-12加入</p>
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
            <p class="table_bottom_p" @click="add=true" style="padding:0;margin:0">
              <i class="fa fa-plus-circle fa-lg mt-4"></i>
              <span>新增</span>
            </p>
          </ul>
        </div>
        <div class="right">
          <!-- <p class="right_p">
              <i class="fa fa-plus-circle fa-lg mt-4"></i>
              <span>新建标签</span>
            </p> -->
          <ul class="uls">
            <li @click="change_child_name(res)" style="cursor:pointer;" v-for="res in link_name" :key="res.id">{{res.name}}<span>({{res.count}})</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!--以上-->
    <!--点击新增-->
    <div id="app2">
      <Modal width="600" v-model="add" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">新增</div>
        <div class="power_img">
          <!--这里放二维码-->
        </div>
        <h5 style="margin-top:20px">请老师使用【九拍陪你练】APP的扫一扫功能扫描二维码，扫描成功后填写信息。</h5>
        <h5>(注：信息填写后使用APP不可修改，请务必如实填写。)</h5>
        <div slot="footer">
          <button style="margin-right:220px;width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">保存二维码</button>
        </div>
      </Modal>
    </div>
    <!--以上-->
    <!-- 点击 加入黑名单 -->
    <div id="app2">
      <Modal width="600" v-model="addblacklist" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">加入黑名单</div>
        <h5 style="margin-top:20px">加入黑名单后，该用户无法参与直播和评论，确认加入黑名单吗？</h5>
        <div slot="footer" style="text-align:center !important;">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
      </Modal>
    </div>
    <!-- 以上 -->
    <!-- 点击备注 -->
    <!-- <div id="app2">
            <Modal width="600" v-model="addremark" class-name="vertical-center-modal">
              <div slot="header" style="text-align:center;font-size:16px;margin:0">备注</div>
              <div class="table_style" style="padding-top:20px;">
                <div class="style_input">
                  <a href="javascript:;"><i>0</i>/30</a>
                  <span>备注名称:</span>
                  <Input v-model="name" style="width: 200px"></Input>
                </div>
             </div>
             <div slot="footer">
              <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
              <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
            </div>
          </Modal>
          </div> -->
    <!-- 以上 -->
    <!-- 点击详情出校区详情 -->
    <div id="app2">
      <Modal width="600" v-model="teacherinfo" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">教师详情</div>
        <div class="table_style" style="padding-top:20px;">
          <div>
            <span class="table_span">姓名:</span>
            <Input placeholder="请输入校区名称" style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">手机号:</span>
            <Input placeholder="请输入手机号码" style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">身份证号:</span>
            <Input placeholder="请输入身份证号码" style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">银行卡号:</span>
            <Input placeholder="请输入银行卡号" style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">教学方向:</span>
            <CheckboxGroup v-model="music">
              <Checkbox label="吉他"></Checkbox>
              <Checkbox label="架子鼓"></Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <span class="table_span">所属校区:</span>
            <CheckboxGroup v-model="school">
              <Checkbox label="吉他"></Checkbox>
              <Checkbox label="架子鼓"></Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <span class="table_span">备注:</span>
            <Input style="width:200px" v-model="value6" type="textarea" :rows="2" placeholder="可不填"></Input>
          </div>
        </div>
        <div slot="footer">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
      </Modal>
    </div>
    <!-- 以上 -->
     <!-- 点击新增标签 -->
    <div id="app2">
      <Modal width="500" v-model="addlabel" class-name="vertical-center-modal">
          <div slot="header" style="text-align:center;font-size:16px;margin:0">新建标签</div>
          <div class="table_style" style="padding-top:20px;">
              <Input v-model="name" style="width: 200px;" placeholder="请输入新标签"></Input>
        </div>
        <div slot="footer" >
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="close">取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="add_link_list">确定</button>
        </div>
      </Modal>
    </div>
     <!-- 重命名 -->
    <div id="app2">
      <Modal width="500" v-model="new_name" class-name="vertical-center-modal">
          <div slot="header" style="text-align:center;font-size:16px;margin:0">重命名</div>
          <div class="table_style" style="padding-top:20px;">
              <Input v-model="new_names" style="width: 200px;" placeholder="请输入新标签"></Input>
        </div>
        <div slot="footer" >
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="close">取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="new_link_name">确定</button>
        </div>
      </Modal>
    </div>
  <!-- 以上 -->
  </div>
</template>
<script>
export default {
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
      value4: "",
      add: false,
      school: [],
      music: [],
      addblacklist: false,//加入黑名单
      teacherinfo: false,//点击详情
      value6: "",
      hover: false,
      

      // wss_name
      new_name:false,
      link_name:'',
      link_main_num:Number,
      name:"",
      addlabel:false,//点击新增标签
      link_father:true,
      link_child_name:'',
      link_del_id:'',
      new_names:'',  
      teach_main:'', // 老师列表
    }
  },

  mounted() {
    this.get_link_list()
    this.get_teacher_list()
  },

  methods: {
     hover_show() {
            this.hover = true;
        },
        hover_hide() {
            this.hover = false;
        },

        close(){  // 关闭
            this.addlabel = false
            this.new_name = false
        },

        show_all_link(){  
          this.link_father=true
        },

        get_link_list(){  // 获取老师标签分组
          this.$axios({
          url: this.$linkurl.get_user_tag_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            type_id:2,
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
            this.link_name = res.data.data
            let a = res.data.data
            let b = 0
            for(let i=0;i<a.length;i++){
              b = b+a[i].count
            }
            this.link_main_num = b  // 标签总数
          })
        },

        add_link(){
          this.addlabel = true
        },

        add_link_list(){  // 新增标签
          this.$axios({
          url: this.$linkurl.handle_user_tag,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:0,
            name:this.name,
            type_id:2,
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
            this.addlabel = false
            this.link_father = true
            this.get_link_list()
          })
        },

        change_child_name(res){   // 点击切换照片
          this.link_father = false
          this.link_child_name = res.name
          this.link_del_id = res.id
        },

        del_link(){  //删除标签
          this.$axios({
          url: this.$linkurl.delete_user_tag,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.link_del_id,
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
            this.link_father = true
            this.get_link_list()
          })
        },

        open_new_name(){  // 打开重命名
          this.new_name = true
        },

        new_link_name(){  // 重命名
          this.$axios({
          url: this.$linkurl.handle_user_tag,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.link_del_id,
            name:this.new_names,
            type_id:2,
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
            // this.link_father = true
            this.new_name = false
            this.link_father = true
            this.get_link_list()
          })
        },

        get_teacher_list(){   // 获取老师列表
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
            console.log(res.data.data)
            this.teach_main = res.data.data
          })
        },
   
  }
}
</script>
<style lang="scss" scoped>
//因为加了 “备注”座椅距离上面了50像素
// .ivu-modal-footer{
//   margin-top:50px !important;
// }
a {
  text-decoration: none;
  color: #596980;
  &:hover {
    text-decoration: none;
  }
}

// 这里是写了复选框 所以让他们在一行内显示。
.ivu-checkbox-group {
  display: inline-block !important;
}


/* 点击备注的样式*/

.style_input {
  width: 400px;
  position: relative;
  a {
    position: absolute;
    top: 5px;
    right: 85px;
    z-index: 1;
    color: #596980;
    &:hover {
      text-decoration: none;
      color: #C5D1E2;
    }
  }
}

/*这里是ul 它叫left_uls*/

.left_uls {
  .uls_li {
    width: 100%;
    height: 100px;
    border: 1px solid #C5D1E2;
    border-top: 0; // line-height: 100px;
    position: relative;
    .li_children {
      input {
        position: absolute;
        left: 10px;
        top: 30px;
        width: 20px;
        height: 20px;
      }
    }
  }
}


/*右边列表*/

.table_left_right {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .left {
    width: 80%;
    height: auto;
    float: left;
    ul {
      padding: 0;
      margin: 0;
      li {
        // width: 100%;
        // height: 100px;
        // border: 1px solid #C5D1E2;
        // border-top: 0;
        // border-right: 0;
        // line-height: 100px;
      }
    }
  }
  .li_children {
    height: 50px;
    padding-top: 25px;
  }

  .left_input {
    vertical-align: middle;
    margin-left: -3px;
    display: inline-block;
    float: left;
  }
  .right {
    width: 20%;
    height: auto;
    border: 1px solid #C5D1E2;
    border-top: 0;
    .right_p {
      width: 80%;
      border: 1px solid #eee;
      margin: 10px auto;
      padding: 0 10px;
      i {
        font-size: 16px;
      }
      span {
        font-size: 14px;
      }
    }
    .uls {
      width: 80%;
      height: auto;
      margin: 0 auto;
      li {
        font-size: 14px;
        color: #596980;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}



/*表格*/

.left .list {

  width: 100%;
  height: auto;
  position: absolute;
  left: 20px;
  top: 20px;
}

.left .list,
dl {
  width: 100%;
  height: auto;
}

.left .list dl dt {
  float: left;
}

.left .list dl dt div {
  width: 50px;
  height: 50px;
  background: red;
  margin-left: 35px;
}

.left .list dl dd {
  height: auto;
  position: relative;
  margin-left: 110px;
  vertical-align: middle;
}

.left .list dl dd h1 {
  font-size: 16px;
  color: #363F4C;
  line-height: 16px;
  padding-top: 5px;
}

.left .list dl dd h2 {
  margin-top: 10px;
  width: 80px;
  font-size: 12px;
  color: #596980;
  line-height: 12px;
  position: relative;
}

.list_h2 {
  cursor: pointer;
}

.list_h4 {
  width: 120px;
  position: relative;
}

.left .list dl dd h4 a {
  border: 1px solid #C5D1E2;
  border-radius: 15px;
  padding: 2px 15px;
  margin-right: 10px;
  font-size: 14px;
}

.span_san {
  width: 0;
  height: 0;
  border: 6px solid #fff;
  border-top: 6px solid #596980;
  position: absolute;
  top: 10px;
  right: 10px;
}

.left .list dl dd .btn {
  position: absolute;
  right: 30px;
  top: 0;
}



/*以上*/



/*这里是划过每一个li的时候显示的*/

.li_hover {
  position: absolute;
  left: 105px;
  top: 20px;
  width: 80%;
  height: 180px;
  background: #fff;
  border: 1px solid #C5D1E2;
  dl {
    width: 100%;
    dt {
      float: left;
      div {
        width: 180px;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
        }
        background:red;
      }
    }
    dd {
      margin-left: 190px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      .dd_style {
        width: 90%;
        height: auto;
        margin-left: 5%;
        h1 {
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          position: relative;
          a {
            margin-left: 5px;
            text-decoration: none;
            &:hover {
              text-decoration: none;
            }
          }
          span {
            position: absolute;
            right: 0;
            top: 5px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid #c5d1e2;
          }
        }
        p {
          width: 100%;
          margin: 0;
          .ols_style {
            height: auto;
            margin-bottom: 10px;
            li {
              float: left;
              padding: 0 10px;
              border: 1px solid #c5d1e2;
              border-radius: 27px;
              margin-right: 10px;
              font-size: 12px;
            }
          }
        }
        .p_style {
          margin-top: 8px;
          width: 100%;
          float: right;
          text-align: right;
          font-size: 12px;
          border-top: 1px solid #c5d1e2;
        }
      }
    }
  }
}


/*以上*/


.table_flex {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}






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

.power_img {
  width: 150px;
  height: 150px;
  background: red;
  margin: 0 auto;
}

.vertical-center-modal h5 {
  font-size: 14px;
  color: #596980;
  width: 80%;
  margin-left: 10%;
  text-align: center;
}
</style>