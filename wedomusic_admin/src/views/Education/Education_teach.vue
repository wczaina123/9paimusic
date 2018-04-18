<!--新增品类-->
<template>
  <div>
    <div class="maintop-one">
      <span>教学品类</span>
    </div>
    <div class="mainstyle">
      <span style="margin-left:30px;color:#287AF2;" @click="add = true">
        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
        新增品类
      </span>
    </div>
    <!--表格-->
    <div class="tablebox">
      <table class="table-list">
        <thead>
          <tr>
            <th>编号</th>
            <th style="width:59%;">名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in classlist" :key="res.id">
            <td style="text-align:center;">{{res.id}}</td>
            <td style="text-align:center;">{{res.name}}</td>
            <td style="text-align: center;" class="acolor">
              <a @click="change(res.id)">修改</a>
              <a style="margin-left:6px;" @click="delclass(res.id)">删除</a>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <!--弹框新增品类-->
    <div class="aaa">
      <Modal width="400" v-model="add" style="text-align:center" class-name="vertical-center-modal">
      <div slot="header" style="text-align:center;font-size:16px;margin:0">新增品类</div>
        <Input v-model="classname" placeholder="输入教学品类名称" style="width: 160px"></Input>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="cancel">取消</button>
          <button class="btn btn2" @click="changeok">确定</button>
        </div>
      </Modal>
    </div>
    <!--修改-->
    <div class="aaa">
      <Modal v-model="changadd" title="修改品类" style="text-align:center" class-name="vertical-center-modal">
        <Input v-model="classname" placeholder="输入教学品类名称" style="width: 300px"></Input>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="cancel">取消</button>
          <button class="btn btn2" @click="changeadd">确定</button>
        </div>
      </Modal>
    </div>

    <!--删除弹框-->
    <div class="aaa">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit">是否确定删除品类</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="cancel">取消</button>
          <button class="btn btn2" @click="deletclass">确定</button>
        </div>
      </Modal>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
// import linkurl from '../All-commonality/LinkUrl.js'
export default {
  data() {
    return {
      add: false,
      soldout: false,
      changadd: false,
      name: "",
      classlist: "",
      classname: "",
      classid: "",
      changeid: "",

    }
  },
  mounted() {
    this.getcategory_list()
  },
  methods: {

    cancel() {  // 取消事件
      this.soldout = false
      this.add = false
      this.changadd = false
    },
    getcategory_list() {   //  获取类别列表
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
          this.classlist = res.data.data
        })
        .catch(err => {
          console.log("获取分类失败", err)
        })
    },

    change(id) {
      this.changadd = true
      this.changeid = id

    },

    changeadd() {   // 修改品类
      this.$Message.destroy()  
      if (this.classname != '') {
        this.$axios({
          url: this.$linkurl.handle_ategory,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id: this.changeid,
            name: this.classname
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
            this.classname = ''
            this.changadd = false
            this.getcategory_list()
          })
          .catch(err => {
            console.log("新增失败", err)
          })
      } else {
        this.$Message.config({ top: 50 })
        this.$Message.warning('教学品类不能为空');
      }

    },

    delclass(id) {    // 删除
      this.soldout = true
      this.classid = id
    },

    changeok() {    // 弹框新增
      this.$Message.destroy()   
      if (this.classname != '') {
        this.$axios({
          url: this.$linkurl.handle_ategory,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id: 0,
            name: this.classname
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
            this.classname = ""
            this.getcategory_list()
            this.add = false

            // this.classlist = res.data.data
          })
          .catch(err => {
            console.log("新增失败", err)
          })
      } else {
        this.$Message.config({ top: 50 })
        this.$Message.warning('教学品类不能为空');
      }

    },

    deletclass() {    // 弹框的删除事件
      this.$axios({
        url: this.$linkurl.delete_category,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id: this.classid
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
          this.soldout = false
          this.getcategory_list()

          // this.classlist = res.data.data
        })
        .catch(err => {
          console.log("删除失败", err)
        })
    },
  },
}
</script>

<style scoped lang='scss'>
.app {
  .tit {
    text-align: center;
    font-size: 16px;
  }
  .btns {
    display: flex;
    justify-content: center;
  }
  .btns .btn {
    width: 100px;
    height: 30px;
    font-size:14px;
    border: none;
    border-radius: 5px;
  }
  .btns .btn1 {
    background: #7D93B2;
    color: white;
  }
  .btns .btn2 {
    background: #F0B46E;
    color: white;
  }
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>