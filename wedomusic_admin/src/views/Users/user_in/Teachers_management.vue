<template>
  <div id="teacher_power" >
    <!-- 教师管理 -->
    <div class="content content_model content_campus">
      <p class="home_text">教师管理</p>
      <p class="home_p">
        <Select  style="width:160px;" v-model="school_id" placeholder="选择校区" v-if="(vuex_school==0)?true:false" @on-change='change_shchool_id'>
          <Option value="0">全部校区</Option>
          <Option v-for="item in school_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>

          <em class="add_jia" @click="get_teacher_join_qrcode">
            <i class="fa fa-plus-square-o fa-lg mt-4"></i>
            <a>新增</a>
          </em>
        <span class="add_list">
          <Select v-model="user_name_value" style="width:160px !important;margin-right:20px;" placeholder="用户昵称">
            <Option v-for="item in user_name" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input icon="ios-clock-outline" @on-keyup='choise_user_name' v-model="user_name_choise" placeholder="请输入用户昵称" style="width: 180px"></Input>
          <button class="btn_style" style="width:100px" @click="add_link">
             <i class="fa fa-plus-square-o fa-lg mt-4" style="color:#fff !important;vertical-align:middle;"></i>
            新建标签</button>
        </span>

      </p>
      <div class="table_left_right" style="width:100%;">
        <table style="width:100%;border:1px solid #c5d1e2;" >
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
            
            <li v-for="(res,index) in teach_main" :key="res.id" class="uls_li" >
              <div class="li_children">
                <input type="checkbox" class="left_input" />
                <div class="list">
                  <dl>
                    <dt>
                      <div @click="hover_hide(index,res.user_id)" ></div>
                      <!-- <img src="images/l_05.gif" alt=""> -->
                    </dt>
                    <dd>
                      <h1>{{res.nick_name}}</h1>
                      <!-- <h2 class="list_h2">暂无标签<span></span></h2> -->
                      <h4 class="list_h4">
                        <a>标星老师</a>

                      </h4>
                      <div class="btn" @click="teacherinfo=true">
                        <button class="btn_style" @click="get_teacher_detail(res.user_id)">详情</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- 这里是划过li的时候显示的 -->
              <div class="li_hover" v-if="res.flag" @click="hover_hide(index,res.user_id)">
                <dl>
                  <dt>
                    <div></div>
                    <!-- <img src="images/l_05.gif" alt=""> -->
                  </dt>
                  <dd>
                    <div class="dd_style">
                      <h1>{{res.nick_name}}
                        <span class="btn_style" @click="addblacklist=true" style="background:#fff;color:#596980;cursor:pointer;">加入黑名单</span>
                      </h1>
                      <p>
                        <span>手机号:{{res.phone}}</span>
                      </p>
                      <p>
                        <span>备注:</span>
                        {{teacher.span}}
                      </p>
                      <p>
                        <span>标签:</span>
                        <ol class="ols_style">
                          <li v-for="main in user_tag" :key="main.tag_id">{{main.name}}</li>
                        </ol>
                      </p>
                      <!-- <p class="p_style">2017-10-12加入</p> --><!--暂无-->
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
            <!--显示校区总人数-->
            <li style="cursor:pointer;" v-for="res in school_lists" :key="res.id">{{res.school_name}}<span>({{res.count}})</span></li>            
            <li @click="change_child_name(res)" style="cursor:pointer;" v-for="res in link_name" :key="res.id">{{res.name}}<span>({{res.count}})</span></li>
          </ul>
        </div>
      </div>
    </div>

    <!--点击新增老师-->
    <div id="app2">
      <Modal width="400" v-model="add" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">新增</div>
        <div class="power_img">
          <!--这里放二维码-->
          <img :src="join_img">
        </div>
        <h5 style="margin-top:20px">请老师使用【九拍陪你练】APP的扫一扫功能扫描二维码，扫描成功后填写信息。</h5>
        <h5>(注：信息填写后使用APP不可修改，请务必如实填写。)</h5>
        <div slot="footer">
          <button @click="add=false" style="margin-right:132px;width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">关闭</button>
        </div>
      </Modal>
    </div>

    <!-- 点击 加入黑名单 -->
    <div id="app2">
      <Modal width="400" v-model="addblacklist" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">加入黑名单</div>
        <h5 style="margin-top:20px">加入黑名单后，该用户无法参与直播和评论，确认加入黑名单吗？</h5>
        <div slot="footer" style="text-align:center !important;">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
      </Modal>
    </div>

    <!-- 点击备注 -->
      <!-- <div id="app2">
        <Modal width="400" v-model="addremark" class-name="vertical-center-modal">
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

    <!-- 点击详情出教师详情 -->
    <div id="app2">
      <Modal width="500" v-model="teacherinfo" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">教师详情</div>
        <div class="table_style" style="padding-top:20px;">
          <div>
            <span class="table_span">姓名:</span>
            <Input placeholder="请输入教师姓名" readonly v-model="teacher.name" style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">手机号:</span>
            <Input placeholder="请输入手机号码" readonly v-model="teacher.phone"  style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">身份证号:</span>
            <Input placeholder="请输入身份证号码" readonly v-model="teacher.idcard"  style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">银行卡号:</span>
            <Input placeholder="请输入银行卡号" readonly v-model="teacher.bank.card_number"  style="width: 200px"></Input>
          </div>
          <div>
            <span class="table_span">教学方向:</span>
            <CheckboxGroup v-model="music">
              <Checkbox v-for="main in category_list" :key="main.id" :label="main.id">{{main.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <span class="table_span">所属校区:</span>
            <!-- <RadioGroup v-model="school">
              <Radio v-for="res in teacher.school_list" :key="res.id" :label="res.id">{{res.name}}</Radio>
            </RadioGroup> -->
            <CheckboxGroup v-model="school">
              <Checkbox v-for="res in teacher.school_list" :key="res.id" :label="res.id">{{res.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <span class="table_span">备注:</span>
            <Input style="width:200px" v-model="teacher.span" type="textarea" :rows="2" placeholder="可不填"></Input>
          </div>
        </div>
        <div slot="footer">
          <button @click="close" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
          <button @click="update_teacher_user" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>
      </Modal>
    </div>
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
      user_name:[
        {
          value: '手机号',
          label: '手机号'
        },
        {
          value: '昵称',
          label: '昵称'
        }
      ],
      user_name_value:'手机号',
      user_name_choise:'',
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
      teacher:{
        name:'',
        phone:'',
        idcard:'',
        span:'',
        school_list:'',
        id:'',
        bank:'',
      },
      user_tag:[],
      category_list:[],
      join_img:'',
      school_list:'',  // 校区
      school_id:'',   // 校区id
      school_lists :"", // 校区人数
    }
  },

  mounted() {
    this.get_school_list()
    this.get_link_list()
    this.get_teacher_list()
    if(this.vuex_school != 1){
      this.get_mechanism_school_teacher_count()
    }
    
    
  },
  computed:{
      vuex_school(){
        return localStorage.getItem('right')
      },
  },

  methods: {
     hover_show() {
            this.hover = true;
        },
        hover_hide(id,main_id) {
            // this.hover = false;
            this.teach_main[id].flag = !this.teach_main[id].flag;
            this.get_teacher_detail(main_id,0)
        },

        close(){  // 关闭
            this.addlabel = false
            this.new_name = false
            this.teacherinfo = false
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
            this.link_main_num = b  // 总人数
          })
          // console.log(this.vuex_school)
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

        choise_user_name(){   // 键盘弹起事件
            this.get_teacher_list()
        },

        change_shchool_id(){
          this.get_teacher_list()
        },

        get_teacher_list(){   // 获取老师列表
          this.$axios({
          url: this.$linkurl.get_teacher_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            type:(this.user_name_choise!='')?this.user_name_value:'',
            keyword	:this.user_name_choise,
            tag_ids:'',
            school_id:this.school_id,
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
            console.log(res.data.data,'teacher_id1')
            let a = res.data.data
            // 
            a.forEach((item,idx) => {
              item.flag = false;
              // this.get_teacher_detail(a[idx].user_id,0)
              // if(this.user_tag!=[]){
              //     item.user_tag = this.user_tag        
              // }
            })
            this.teach_main = a
            // for(let i = 0;i<a.length;i++){
            //   console.log(a[i].user_id)
            // }
            // console.log(this.teach_main,'333333')
          })
        },

        get_teacher_detail(id,flag){   // 获取老师详情
          this.teacher.id = id
          this.$axios({
          url: this.$linkurl.get_teacher_detail,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            user_id:id,
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
            console.log(res.data.data,'1')
            let i = res.data.data
            
            if(flag!=0){           
              this.teacher.name = i.name
              this.teacher.phone = i.phone
              this.teacher.span = i.remark
              this.teacher.idcard = i.cert_number                
              if(i.bank!=null){
                this.teacher.bank = i.bank
              }
              this.teacher.school_list = i.school_list
              this.school[0] = i.school_id
              this.category_list = i.category_list
              this.teaching_category = i.teaching_category
              for(let a=0;a<this.teaching_category.length;a++){   // 筛选教学方向
                for(let l=0;l<this.category_list.length;l++){
                  if(this.teaching_category[a].category_id == this.category_list[l].id){
                      // console.log(this.teaching_category[a].category_id)
                     var mu = this.teaching_category[a].category_id
                     this.music.push(mu)
                  }
                }
                
              }
              
            }else{
              this.user_tag = i.user_tag
              this.teacher.span = i.remark
            }
          })
        },

        update_teacher_user(){  // 更新教师详情
          this.$axios({
          url: this.$linkurl.update_teacher_user,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            user_id:this.teacher.id,
            teaching_category_ids:JSON.stringify(this.music),
            school_ids:JSON.stringify(this.school),
            remark:this.teacher.span,
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
            let i = res.data
            console.log(i)
            this.music = []
            this.teacherinfo = false            
          })
        },

        get_school_list(){   //  获取校区列表
          this.$axios({
          url: this.$linkurl.get_school_list,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            status_id:1,
            type:0,
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
            console.log(res.data.data) 
            this.school_list = res.data.data
          })
        },

        get_mechanism_school_teacher_count(){    // 获取校区人数
          this.$axios({
          url: this.$linkurl.get_mechanism_school_teacher_count,
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
            this.school_lists = res.data.data
          })
        },
        

        

        get_teacher_join_qrcode(){  // 二维码
              if(this.vuex_school == 1){  // 校区
                // this.school_id = 0
                let a = 'http://test_duolaixue_admin.9beats.com/get_teacher_join_qrcode?token='+localStorage.getItem('token')+'&school_id='+this.vuex_school+''
                this.join_img = a;
                this.add = true
              }else{             // 机构
                if(this.school_id==''||this.school_id=='0'){
                  this.$Message.warning('请选择校区')
                  this.add = false
                  return ; 
                }
                let a = 'http://test_duolaixue_admin.9beats.com/get_teacher_join_qrcode?token='+localStorage.getItem('token')+'&school_id='+this.school_id+''
                console.log(this.school_id,'this.school_id')
                this.join_img = a;
                this.add = true
              }
              
              
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
  z-index: 100;
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
  // background: red;
  margin: 0 auto;
  img{
    width: 100%;height: 100%;
  }
}

.vertical-center-modal h5 {
  font-size: 14px;
  color: #596980;
  width: 80%;
  margin-left: 10%;
  text-align: center;
}
</style>