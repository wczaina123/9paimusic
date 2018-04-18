<!--校区管理-->
<template>
  <div id="campu">
    <div class="content content_model content_campus">
      <p class="home_text">校区</p>
      <p class="home_p">
        <Select v-model="type1" style="width:160px !important;" placeholder="认证状态" @on-change='chang_status'>
          <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="type2" style="width:160px !important;margin-left:30px;" placeholder="所属机构" @on-change='chang_type'>
          <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!-- <span class="add_list">
          <Input icon="ios-clock-outline"  placeholder="请输入搜索关键词" style="width: 180px"></Input>
          <button class="btn_style">确认</button>
        </span> -->
      </p>
      <!-- 头条表格以下 -->
      <div class=" x_hidden">
        <table class="table-list" style="width:100%;overflow-x:scroll">
          <thead class="home_thead">
            <tr>
              <!-- <th style="display:none"></th> -->
              <th>序号</th>
              <th>类别</th>
              <th>地区</th>
              <th>校区名</th>
              <th>申请人</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody class="home_tbody">
            <tr v-for="(res,index) in list_main" :key="res.id">
              <td style="text-align:center;">{{index+1}}</td>
              <td style="text-align:center;">{{res.type}}</td>
              <td style="text-align:center;">{{res.address}}</td>
              <td style="text-align:center;">{{res.name}}</td>
              <td style="text-align:center;">{{res.liability_name}}</td> 
              <td style="text-align:center;">{{res.status}}</td>
              <td style="text-align: center;color:#287af2;">
                <a @click="open_main(res.id)">详情</a>
                <!-- <a @click="test(item.id)">详情</a> -->
                <a style="margin-left:6px;" @click="suc_school(res.id,res.status_id)">{{(res.status_id==1)?'拒绝':'通过'}}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 表格以上 -->
    </div>
    <!--详情弹框-->
    <div id="app2">
      <Modal width="600"  v-model="listmain" class-name="vertical-center-modal">
        <div slot="header" style="text-align:center;font-size:16px;margin:0">校区详情</div>
        <div class="table_style" style="padding-top:20px;">
          <div>
            <span class="table_span">校区类型:</span>
            <!-- <label for="radio" style="padding-right:30px" name="name">直营：<input type="radio" v-model="school_style" id="radio" name="name"></label>

            <label for="radio"   name="name">加盟：<input type="radio" id="radio" v-model="school_style" name="name"></label>
             -->
             <RadioGroup v-model="school_style" class="school_radio">
                <Radio label="直营"></Radio>
                <Radio label="加盟"></Radio>
            </RadioGroup>
          </div>
          <div>
            <span class="table_span">校区名称:</span>
            <Input placeholder="请输入校区名称" disabled v-model="school_name" style="width: 200px" ></Input>
          </div>
          <div>
            <span class="table_span">校区负责人姓名:</span>
            <Input placeholder="请输入校区负责人姓名" v-model="liability_name" style="width: 200px" ></Input>
          </div>
          <div>
            <span class="table_span">校区负责人手机号:</span>
            <Input placeholder="请输入校区负责人手机号码" v-model="liability_phone" style="width: 200px" ></Input>
          </div>
          <div>
            <span class="table_span">校区负责人身份证号:</span>
            <Input placeholder="请输入校区负责人身份证号码" v-model="liability_id" style="width: 200px" ></Input>
          </div>
          <div>
            <span class="table_span">校区注册地区:</span>
            <Input placeholder="请输入校区注册地区" v-model="address" style="width: 200px" ></Input>
          </div>
          <div>
            <span class="table_span">建校日期:</span>
            <!-- <Select v-model="model1" style="width:200px !important;" placeholder="2017年1月1日">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
            <Input placeholder="请输入建校日期" v-model="create_date"  style="width: 200px" ></Input>
                <!-- <DatePicker type="date" v-model="create_date" placeholder="Select date" style="width: 200px"></DatePicker> -->
          </div>
          <div>
            <span class="table_span">校区面积:</span>
            <Input style="width: 200px" v-model="area" type="textarea" ></Input>平米
          </div>
          <div>
            <span class="table_span">备注:</span>
             <Input style="width:200px"  v-model="remark" type="textarea" :rows="2" placeholder="可不填"></Input>
          </div>
        </div>
        <div slot="footer">
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;" @click="listmain=false" >取消</button>
          <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="not_null">确定</button>
        </div>
      </Modal>
    </div> 

    <!--通过-->
        <div id="app2">
            <Modal v-model="del_good" width="376" class-name="vertical-center-modal">
                <div class="tit" style="margin-top:20px;">是否确定{{school_status}}该校区</div>
                <div slot="footer" class="btns">
                    <button class="btn btn1" @click="clearputway">取消</button>
                    <button class="btn btn2" @click="del_ok">确定</button>
                </div>
            </Modal>
        </div>
    
  </div>
</template>
<script>

export default {
  data() {
    return {
      status: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '已通过'
        },
        {
          value: '2',
          label: '拒绝'
        },
        {
          value: '3',
          label: '认证中'
        },
      ],
      type:[
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '直营'
        },
        {
          value: '2',
          label: '加盟'
        },
      ],
      list_main:'',
      type1:'',
      type2:'',
      del_good:false,
      del_good_id:'',
      school_status:"",
      chool_id:"",
      listmain:false,
      // 详细信息
      school_name:"",
      liability_name:"",
      liability_phone:'',
      liability_id:"",
      address:"",
      area:'',
      remark:'',
      create_date:'',
      change_id:'',
      school_style:'',
      
    }
  },
  mounted:function(){
    this.get_list()
  },
  methods:{

    chang_status(){  
      this.get_list()
    },
    chang_type(){
      this.get_list()
    },

    clearputway(){ // 关闭按钮
      this.del_good = false
      this.listmain = false
    },
    
    suc_school(id,name){ // 是否通过 弹框
      if(name == '1'){
        this.school_status = '拒绝'
      }else{
        this.school_status = '通过'        
      }
      this.del_good_id = name
      this.chool_id = id
      this.del_good = true
    },

    del_ok(){  // 通过事件
      this.$axios({
        url: this.$linkurl.handle_examine,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          status_id:(this.del_good_id==1)?2:1 ,
          id:this.chool_id
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
          this.del_good = false
          this.get_list()
      })
    },

    open_main(id){   // 打开详情
      this.listmain = true
      this.change_id = id
      this.$axios({
        url: this.$linkurl.get_school_detail,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:id
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
          let i = res.data.data
          this.school_name = i.name
          this.liability_name = i.liability_name
          this.liability_phone = i.liability_phone
          this.liability_id = i.liability_id
          this.address = i.address
          this.create_date = i.create_date
          this.area = i.area
          this.remark = i.remark
          if(i.type_id == 1){
            this.school_style = '直营'
          }else{
            this.school_style = '加盟'
          }
          this.type_id = i.type_id
      })
    },

    not_null(){   // 判断
      if(this.liability_name==''){
        this.$Message.warning('请输入校区负责人姓名')  
      }else if(this.liability_phone==''){
        this.$Message.warning('请输入校区负责人电话')
      }else if(this.liability_id==''){
        this.$Message.warning('请输入校区负责人身份证')
      }else if(this.address==''){
        this.$Message.warning('请输入校区注册地区')
      }else if(this.create_date==''){
        this.$Message.warning('请输入建校日期')
      }else if(this.area==''){
        this.$Message.warning('请输入建校面积')
      }else if(this.remark==''){
        this.$Message.warning('请输入备注')
      }else{
        this.change_main()
      }
    },

    change_main(){  // 更改
      this.$axios({
        url: this.$linkurl.update_school,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          id:this.change_id,
          name:this.school_name,
          type_id:(this.school_style == '直营')?1:2,
          liability_name:this.liability_name,
          liability_phone:this.liability_phone,
          liability_id:this.liability_id,
          address:this.address,
          create_date:this.create_date,
          area:this.area,
          remark:this.remark,

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
        this.listmain = false
        this.get_list()
          // console.log(res.data.data)
          
      })
    },
    

    get_list(){   // 获取列表
      this.$axios({
        url: this.$linkurl.get_school_list,
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          status_id:this.type1,
          type:this.type2,
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
          this.list_main = res.data.data
      })
    },
  }
}
</script>
<style scoped lang="scss">
.table_span{
  width:130px;
}
.ivu-input-wrapper,
.ivu-input-type {
  position: relative !important;
  .ivu-input-wrapper,
  .ivu-input-type {
    i {
      position: absolute !important;
      left: 0 !important;
    }
  }
}




/* btn 样式 */


/*有一个确定按钮时输入了验证码才变颜色的*/

.sure_button {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #C5D1E2;
  color: white;
}

.sure_button_bg {
  background: #F0B46E;
}

.btn_style {
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: #C5D1E2;
  color: white;
  font-size: 12px;
  margin-left: 20px;
}

.vertical-center-modal h5 {
  line-height: 20px;
  font-size: 14px;
  color: #596980;
  width: 80%;
  text-align: center;
}

.vertical-center-modal h6 {
  margin-bottom: 10px;
}
</style>


