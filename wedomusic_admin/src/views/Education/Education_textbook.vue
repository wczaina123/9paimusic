<template>
  <div>
    <div class="topbox">
      <div class="content big_content content_padding_delete">
        <div class="contentlist" @click="teach"><span class="teachlist">教学品类</span></div>
        <div class="contentlist" @click="textbook"><span class="booklist">教材管理</span></div>
        <div class="contentlist" @click="master"><span class="masterlist">大师管理</span></div>
        <div class="contentlist" @click="course"><span class="courselist">视频课程管理</span></div>
        <div class="contentlist" @click="ware"><span class="warelist">课件管理</span></div>      
        <div class="contentlist" @click="music"><span class="warelist">乐曲管理</span></div>      
      </div>
    </div>
    <br>
    <!--头部-->
    <div class="mainbox">
      <p class="home_text">音频管理</p>
      <!--添加排序-->
      <p class="home_p">
        <Select v-model="txtbook" style="width:160px !important;" @on-change="changeclass" placeholder="请选择课件分类">
          <Option value="0">全部品类</Option>
          <Option v-for="item in cityList" :value="item.id" :key="item.id" >{{ item.name }}</Option>
        </Select>
        <em class="add_jia" @click="add">
          <i class="fa fa-plus-square-o fa-lg mt-4"></i>
          <a>新增</a>
        </em>
      <em class="add_jia" @click="changemaster" v-show="masters">
          <Icon type="shuffle"></Icon>
          排序
        </em>
        <em class="add_jia" @click="truemsater" v-show="masterstore">
          <Icon type="checkmark"></Icon>
          保存排序
        </em>
    </p>
  <!--表格-->
  <div class="tablebox">
    <table class="table-list">
      <thead>
        <tr>
          <th style="width:5%;">ID</th>
          <th style="width:12%;">封面</th>
          <th style="width:20%;">类别</th>
          <th style="width:15%;">标题</th>
          <th style="width:10%;">单元数</th>
          <th v-show="masters">子项操作</th>
          <th v-show="masterstore">排序</th>
          <th >操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="res in book_list" :key="res.id">
          <td style="text-align:center;">{{res.id}}</td>
          <td style="text-align:center;"><img :src="res.cover_url"></td> 
          <td style="text-align:center;">{{res.category}}</td>
          <td style="text-align:center;">{{res.name}}</td>
          <td style="text-align:center;">{{res.unit_number}}</td>
          <td style="text-align:center;"  class="acolor" v-show="masters">
            <a style="margin-left:6px;"  @click="addmusic(res.id,res.name)">音频</a>
            <a style="margin-left:6px;"  @click="addscore(res.id,res.name)">跟谱练习</a>
            <a style="margin-left:6px;"  >生成二维码</a>
          </td>
          <td style="text-align:center;"  class="acolor" v-show="masterstore">
            <a style="margin-left:6px;" @click="teaching_materials(res.id,0)">上移</a>
            <a style="margin-left:6px;" @click="teaching_materials(res.id,1)">下移</a>
            <a style="margin-left:6px;" @click="teaching_materials(res.id,2)">置顶</a>
          </td>
          <td style="text-align: center;" class="acolor">
            <a @click="alter(res.id)">修改</a>  
            <a style="margin-left:6px;" @click="delbook(res.id)">删除</a>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</div>

  <!--删除弹框-->
  <div class="aaa">
    <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
      <div class="tit" style="margin-top:20px;  ">是否确定该教材</div>
      <div slot="footer" class="btns">
        <button class="btn btn1" @click="cancel">取消</button>
        <button class="btn btn2" @click="deletetextbook">确定</button>
      </div>
    </Modal>
  </div>
</div>
</template>

<script>

  export default {
    data () {
      return {
        txtbook:'',
        cityList: "",
        masters:true,
        masterstore:false,
        soldout: false,

        books_id:"",
        book_list:"",
        class_id:"",
      }
    },
    mounted(){
      $('.booklist').css({'color':'#363F4C','font-weight':'bolder'})
      this.gettecha_class()
      this.gettextbook_list()
    },
    methods:{

      teach(){
        this.$router.push({path:'/education'})
      },
      textbook(){
        this.$router.push({path:'/education/textbook'})
      },
      master(){
        this.$router.push({path:'/education/master'})
      },
      music(){
        this.$router.push({path:'/education/music_list'})        
      },
      course(){
        this.$router.push({path:'/education/video'})
      },
      ware(){
       this.$router.push({path:'/education/courseware'})
     },

    add(){   // 新增教材
      this.$router.push({path:"/education/textbookadd"})
    },
    alter(id){   // 修改教材
      this.$router.push({path:"/education/textbookadd"+'?'+ id})
    },
    addmusic(id,name){  // 音频
      localStorage.setItem('text_name',name)
      localStorage.setItem('textbook_id',id)
      this.$router.push({path:'/textbookmusic'+ '?' + id})
    },
    addscore(id,name){  // 跟谱
      localStorage.setItem('text_name',name)
      localStorage.setItem('textbook_id',id)
      this.$router.push({path:'/textbookmusicscore'+ '?' + id})
    },

    changemaster(){  // 开始排序
      this.masterstore = true
      this.masters = false
    },
    truemsater(){  // 保存排序
      this.masters = true
      this.masterstore = false
    },

    changeclass(id){    // 切换分类

      this.class_id = id
      this.gettextbook_list()

    },

    gettecha_class(){   // 获取分类
      this.$axios({
        url: this.$linkurl.get_category_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
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
            // console.log(res.data.data)
            this.cityList = res.data.data
      })
      .catch(err=>{
        console.log("获取分类列表",err)
      })
    },

    gettextbook_list(){   // 获取全部教材列表
      this.$axios({
        url: this.$linkurl.get_materials_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          category_id:this.class_id,
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
        // console.log(res.data.data)
        this.book_list = res.data.data
      })
      .catch(err=>{
        console.log("获取全部教材列表",err)
      })
    },

    teaching_materials(id,change){  // 排序
        this.$axios({
          url: this.$linkurl.teaching_materials,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:id,
            up_down:change,
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
          // console.log(res)
          this.gettextbook_list()
        })
        .catch(err=>{
          console.log("排序失败",err)
        })
    },

    delbook(id){ 
      this.soldout = true
      this.books_id = id
    },
    cancel(){
      this.soldout = false
    },

    deletetextbook(id){   // 删除教材
      this.$axios({
        url: this.$linkurl.delete_teaching_materials,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.books_id,
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
        this.gettextbook_list()
        this.soldout = false
      })
      .catch(err=>{
        console.log("删除音频失败",err)
      })
    },

  },
}
</script>

<style scoped>
  @import '../../assets/css/index.scss';
  @import '../../assets/css/alert.css';
  .content_padding_delete{
    padding:0 !important;
  }
  .minetoplink{
    margin-bottom:30px; 
    cursor:pointer;
  }
</style>