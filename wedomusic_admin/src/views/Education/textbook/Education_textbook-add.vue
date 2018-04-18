<template>
  <div>
    <div id="new_text_add">
      <p class="line_p">
        <a href="javascript:;" @click="exit">教材管理</a>&gt;
        <a href="javascript:;">新增教材</a>
      </p>
      <div class="content content_model content_model_add" style="margin-bottom:30px;">
        <p class="home_text">新增教材</p>
        <div class="input_div modify-img-out" style="margin:0;margin:30px 0 10px 0;padding:0;">
          <a class="table_a">上传教材封面(尺寸:600*800):</a>
          <form name=theform style="width:300px;background:#f6f6f6;margin-left:210px;">
            <div class="modify-img-border upload-bg" :sre="textbookimg" id="textbook_content" style="padding-top:133%;">
              <div class="edit-upload-plus">
                <a href="javascript:void(0);" class="upload-file" id="textbook_plus">
                  <span class="fa fa-plus" id="textbook_span" style="margin-top:70px;"></span>
                  <input type="file" name="file" id="textbook" @change="upload('textbook')" style="width:300px;height:200px;" title="点击更换图片">
                </a>
              </div>
              <div id="textbook_pro_con" class="upload-pro-con">
                <div class="upload-pro-border">
                  <div id="textbook_progress" class="upload-progress"></div>
                </div>
              </div>
            </div>
            <input id="textbook_value" style="display: none;">
          </form>
        </div>
        <div class="input_div modify-img-out" style="margin:10px 0;padding:0;">
          <a class="table_a">上传正方形封面（尺寸：1:1）:</a>
          <form name=theform style="width:300px;background:#f6f6f6;margin-left:210px;">
            <div class="modify-img-border upload-bg" :src="textbook_square" id="textbook_square_content" style="padding-top:100%;">
              <div class="edit-upload-plus">
                <a href="javascript:void(0);" class="upload-file" id="textbook_square_plus">
                  <span class="fa fa-plus" id="textbook_square_span" style="margin-top:70px;"></span>
                  <input type="file" name="file" id="textbook_square" @change="upload('textbook_square')" style="width:300px;height:100px;" title="点击更换图片">
                </a>
              </div>
              <div id="textbook_square_pro_con" class="upload-pro-con">
                <div class="upload-pro-border">
                  <div id="textbook_square_progress" class="upload-progress"></div>
                </div>
              </div>
            </div>
            <input id="textbook_square_value" style="display: none;">
          </form>
        </div>
        <div class="input_div modify-img-out" style="margin:10px 0;padding:0">
          <a class="table_a">上传首页封面（尺寸：1:1）:</a>
          <form name=theform style="width:300px;background:#f6f6f6;margin-left:210px;">
            <div class="modify-img-border upload-bg" :src='textbook_home' id="textbook_home_content" style="padding-top:100%;">
              <div class="edit-upload-plus">
                <a href="javascript:void(0);" class="upload-file" id="textbook_home_plus">
                  <span class="fa fa-plus" id="textbook_home_span"  style="margin-top:70px;"></span>
                  <input type="file" name="file" id="textbook_home" @change="upload('textbook_home')" style="width:300px;height:100px;" title="点击更换图片">
                </a>
              </div>
              <div id="textbook_home_pro_con" class="upload-pro-con">
                <div class="upload-pro-border">
                  <div id="textbook_home_progress" class="upload-progress"></div>
                </div>
              </div>
            </div>
            <input id="textbook_home_value" style="display: none;">
          </form>
        </div>
        <div class="input_div">
          <a class="table_a" style="float: left;margin-right: 5px;">请选择教材分类:</a>
          <Select style="width:200px !important;font-size:12px;" v-model="classlist" @on-change="changeclass(classlist)" placeholder='请选择教材'>
            <Option v-for="res in cityList" :key="res.id" :value="res.id">{{res.name}}</Option>
          </Select>
        </div>
        <div class="input_div">
          <a class="table_a">标题:</a>
          <Input placeholder="请输入教材标题" style="width: 200px" v-model="name"></Input>
        </div>
        <div class="input_div">
          <a class="table_a">描述:</a>
          <Input style="width:300px !important;" v-model="description" type="textarea" :rows="4" placeholder="请输入教材描述"></Input>
        </div>
        <div class="input_div">
          <a class="table_a">是否需要解锁:</a>
          <span class="checkbox">
            <label><input type="checkbox" :checked='is_lock_chack' @change="lock">是</label>
          </span>
        </div>
        <div class="input_div">
          <a class="table_a">是否关联商品:</a>
          <span class="checkbox">
            <label><input type="checkbox" :checked='is_link_chack' @change="lock_link">关联商品</label>
          </span>
          <template class="goodsid">
            <Input placeholder="请输入商品ID" v-model="goodsID" style="width: 160px"></Input>
          </template>
        </div>
        <div class="input_div">
          <a class="table_a" style="float: left;margin-right: 5px;">课程期数:</a>
          <Select placeholder='请选择课程期数' style="width:200px;font-size:12px;" v-model="semester" @on-change="semester_number(semester)">
            <Option value=1>第 1 期</Option>
            <Option value=2>第 2 期</Option>
            <Option value=3>第 3 期</Option>
            <Option value=4>第 4 期</Option>
            <Option value=5>第 5 期</Option>
            <Option value=6>第 6 期</Option>
            <Option value=7>第 7 期</Option>
            <Option value=8>第 8 期</Option>
            <Option value=9>第 9 期</Option>
            <Option value=10>第 10 期</Option>
          </Select>
        </div> 
        <div class="input_div" style="margin-bottom:30px;">
          <a class="table_a" style="float: left;margin-right: 5px;">课程总单元数:</a>
          <Select  placeholder='请选择课程总单元数' style="width:200px;font-size:12px;" v-model="unit" @on-change="unit_number(unit)">
            <Option value=1>1 lessons</Option>
            <Option value=2>2 lessons</Option>
            <Option value=3>3 lessons</Option>
            <Option value=4>4 lessons</Option>
            <Option value=5>5 lessons</Option>
            <Option value=6>6 lessons</Option>
            <Option value=7>7 lessons</Option>
            <Option value=8>8 lessons</Option>
            <Option value=9>9 lessons</Option>
            <Option value=10>10 lessons</Option>
          </Select>
        </div>
        <div style="margin:0 auto"> 
          <button @click="exit" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
          <button @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      goodsID: '',
      cityList: "",
      classlist: "",
      // 常用参数   
      textid: "",
      classid: "",
      name: "",
      description: "",
      is_lock: 0,   // 是否解锁
      is_lock_chack: false,
      relation_goods_id: 0,  // 关联商品
      is_link_chack: false,
      semester: "",   // 期数
      unit: "",      // 单元数

      textbookimg: "",
      textbook_square: "",
      textbook_home: "",
    }
  },
  computed:{
        ...mapState({uptoken:'uptoken'})
  },
  mounted() {
    this.getosstoken()
    this.geturl_id()   // 获取id
    this.getclasslist()   // 获取分类
  },
  methods: {
    ...mapActions({getosstoken:'get_token'}),  // 获取oss token

    upload(id) {   // 上传1
      var cdnDomain = this.$linkurl.ossurl;
      var timestamp = new Date().getTime();
      if (!document.getElementById(id).files[0].name) { return false; }
      var filename = document.getElementById(id).files[0].name;
      var index = filename.lastIndexOf(".");
      var indexname = filename.substr(0, index)
      var ext = filename.substr(index + 1);
      var key = id + '/' + timestamp + '.' + ext

      if(ext!='jpg'&&ext!='png'){
        this.$Message.warning('上传jpg或者png的图片');
        return;
      }

      var data = {
        OSSAccessKeyId: this.uptoken.accessid,
        policy: this.uptoken.policy,
        signature: this.uptoken.signature,
        success_action_status: '200',
        key: key         // 定义文件名
      };

      var oMyForm = new FormData();

      for (var field_name in data) {
        oMyForm.append(field_name, data[field_name]);
      }

      oMyForm.append("file", document.getElementById(id).files[0]);

      var oReq = new XMLHttpRequest();

      oReq.open("POST", this.$linkurl.osspost)
      oReq.send(oMyForm)
      var that = this
      oReq.onreadystatechange = function(e) {   // 上传oss后改变图片
        // console.log(oReq.status)
        if (oReq.readyState == 4) {
          if (oReq.status == 200) {
            if (id == 'textbook') {
              that.textbookimg = cdnDomain + key;
              $('#' + id + '_content').css('background-image', 'url("' + that.textbookimg + '")');
              $('#' + id + '_span').css('display', 'none')
            }
            if (id == 'textbook_square') {
              that.textbook_square = cdnDomain + key;
              $('#' + id + '_content').css('background-image', 'url("' + that.textbook_square + '")');
              $('#' + id + '_span').css('display', 'none')
            }
            if (id == 'textbook_home') {
              that.textbook_home = cdnDomain + key;
              $('#' + id + '_content').css('background-image', 'url("' + that.textbook_home + '")');
              $('#' + id + '_span').css('display', 'none')
            }
          } else {
            that.$Message.warning('上传失败');
          }
        }
      };
    },

    geturl_id() {   // 获取urlid
      let urlid = window.location.search
      this.textid = urlid.substring(1)
      if (this.textid == "") {
        return;
      } else {
        this.textid = urlid.substring(1)
        this.getbooks_main()
      }
    },

    getbooks_main() {  // 获取教材详情
      this.$axios({
        url: this.$linkurl.get_teaching_materials_detail,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id: this.textid,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      })
        .then(res => {
          console.log(res.data.data)
          let i = res.data.data
          this.name = i.name
          this.description = i.description
          this.classlist = i.category_id
          this.semester = i.semester_number.toString() 
          this.unit = i.unit_number.toString()
          this.goodsID = i.relation_goods_id
          if (i.is_lock != 0) {  // 勾选状态
            this.is_lock_chack = true
            this.is_lock = 1
          } else {
            this.is_lock = 0
          }

          if (i.relation_goods_id != 0) {
            this.is_link_chack = true
            this.relation_goods_id = 1
          } else {
            this.relation_goods_id = 0
          }
          this.textbookimg = i.cover_url
          this.textbook_square = i.square_cover_url
          this.textbook_home = i.home_cover_url


          $('#textbook_content').css('background-image', 'url("' + i.cover_url + '")');
          $('#textbook_square_content').css('background-image', 'url("' + i.square_cover_url + '")');
          $('#textbook_home_content').css('background-image', 'url("' + i.home_cover_url + '")');
          $('#textbook_span').css('display', 'block')
          $('#textbook_square_span').css('display', 'block')
          $('#textbook_home_span').css('display', 'block')
        })
        .catch(err => {
          console.log("获取全部教材列表", err)
        })
    },

    unit_number(id) {  // 单元数
      this.unit = id
    },

    semester_number(id) {   // 选择课程期数
      this.semester = id
      // console.log(this.semester)
    },

    lock_link(e) {    // 是否关联商品
      let i = e.target.checked
      if (i == false) {
        this.goodsID = 0     // 不需要
        this.is_link_chack = false
      } else {
        this.is_link_chack = true    // 需要
      }
    },

    lock(e) {    // 是否需要解锁
      let i = e.target.checked
      if (i == false) {
        this.is_lock = 0     // 不需要
      } else {
        this.is_lock = 1    // 需要
      }
    },

    getclasslist() {   // 获取分类
      this.$axios({
        url: this.$linkurl.get_category_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          page: 0,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      })
        .then(res => {
          // console.log(res.data.data)
          this.cityList = res.data.data
        })
    },

    changeclass(classid) {  // 获取分类id
      this.classid = classid
    },

    addtextbook() {   // 确认添加
      this.$axios({
        url: this.$linkurl.handle_teaching_materials,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id: this.textid,
          name: this.name,
          category_id: this.classlist,
          cover_url: this.textbookimg,
          square_cover_url: this.textbook_square,
          home_cover_url: this.textbook_home,
          description: this.description,
          semester_number: this.semester,
          unit_number: this.unit,
          is_lock: this.is_lock,
          relation_goods_id: this.goodsID,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
       
      })
        .then(res => {
          // console.log(res.data.data)
          this.$router.push({ path: '/education/textbook' })
        })
    },

    not_null(){   // 判断
        if(this.name ==''){
          this.$Message.warning('标题不能为空')
        }else if(this.classlist == ''){
          this.$Message.warning('请选择教材分类')
        }else if(this.description == ''){
          this.$Message.warning('请填写描述')          
        }else if(this.unit ==''){
          this.$Message.warning('请选择单元总数')                    
        }else if(this.semester ==''){
          this.$Message.warning('请选择课程期数')                              
        }else if(this.textbook_home ==''){
          this.$Message.warning('请上传首页封面')                              
        }else if(this.textbook_square ==''){
          this.$Message.warning('请上传正方形封面')                              
        }else if(this.textbookimg ==''){
          this.$Message.warning('请上传教材封面')                              
        }else{
          this.addtextbook()
        }
    },

    exit() {  // 退出
      this.$router.push({ path: '/education/textbook' })
    },


  },
}
</script>

<style scoped>
@import '../../../assets/css/input_style.scss';
@import '../../../assets/css/alert.css';
 .input_div .table_a{
  display:inline-block;
  width:205px;
  text-align:right;
  height:30px;
  line-height:30px;
  float:left;
  margin-right:5px;
}
/*二级菜单 以及下面的框框*/
</style>