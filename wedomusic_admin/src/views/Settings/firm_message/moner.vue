<!--企业财务信息管理-->
<template>

  <div>
    <div class="input_div" style="margin-top:30px;">
      <a class="table_a">企业对公账户银行:</a>
      <Input v-if="input_show"  placeholder="请输入企业对公账户银行" style="width: 300px" v-model="mechanism_public_bank"></Input>
      <span v-else>{{mechanism_public_bank}}</span>
    </div>
 <div class="input_div" >
      <a class="table_a">银行开户名:</a>
      <Input v-if="input_show" placeholder="请输入银行开户名" style="width: 300px"  v-model="public_bank_account_name"></Input>
      <span v-else>{{public_bank_account_name}}</span>
    </div>
 <div class="input_div" >
      <a class="table_a">企业对公账户:</a>
      <Input v-if="input_show" placeholder="请输入企业对公账户" style="width: 300px"  v-model="public_bank_account_number"></Input>
      <span v-else>{{public_bank_account_number}}</span>   
    </div>

    <div class="setting_money_btn">
      <Button v-if="resyes" type="warning" style="background:#F0B46E;border:none;width:150px;height:30px;" @click="if_have">确定</Button>
      <Button v-else style="background:#F0B46E;color:white;border:none;width:150px;height:30px;" @click="getchange">修改</Button>
    </div>
    <!--确认弹框-->
    <div id="app">
      <Modal v-model="soldout" width="376" class-name="vertical-center-modal">
        <div class="tit" style="margin-top:20px;">是否确定修改</div>
        <div slot="footer" class="btns">
          <button class="btn btn1" @click="soldout_clik">取消</button>
          <button class="btn btn2" @click="getyes">确定</button>
        </div>
      </Modal>
    </div>
    
  </div>

</template>

<script>

 export default {
  data(){
    return{
      resyes:true,
      reschange:false,
      soldout:false,
      mechanism_public_bank:"",
      public_bank_account_name:"",
      public_bank_account_number:"",
      input_show:false,

    }
  },
  mounted(){
    this.get_main()
  },
  methods:{
    soldout_clik(){
      this.soldout = false
    },
    soldout_yes(){
      this.resyes = true
      this.soldout = false
    },

    if_have(){  // 判断
        this.$Message.config({top: 50})
        if(this.mechanism_public_bank==''){
            this.$Message.warning('请输入企业对公账户银行');
        }
        else if(this.public_bank_account_name==''){
            this.$Message.warning('请输入银行开户名');
        }
        else if(this.public_bank_account_number==''){
            this.$Message.warning('请输入企业对公账户');
        }
        else{
            this.soldout = true
        }
    },

      get_main(){  // 获取详情
        this.$axios({
          url: this.$linkurl.get_mechanism_finance_detail,
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
          let i = res.data.data
          if( i.mechanism_public_bank == ''){
            this.resyes = true
            return;
          }else{
            this.mechanism_public_bank = i.mechanism_public_bank
            this.public_bank_account_name = i.public_bank_account_name
            this.public_bank_account_number = i.public_bank_account_number
            this.resyes = false
          }
        })
        .catch(err=>{
          console.log("获取详细信息失败",err)
        })
      },

      getyes(){   // 修改
        this.$axios({
          url: this.$linkurl.update_mechanism_finance,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            mechanism_public_bank:this.mechanism_public_bank,
            public_bank_account_name:this.public_bank_account_name,
            public_bank_account_number:this.public_bank_account_number,
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
          this.get_main()
          this.$Message.config({top:50})
          this.$Message.success('修改成功')
          this.resyes = false
          this.soldout = false          
          this.input_show = false
          
        })
        .catch(err=>{
          console.log("获取详细信息失败",err)
        })

      },
      getchange(){  // 修改信息
        this.resyes = true
        this.input_show = true    
      },
    },
  }
</script>
<style lang="scss" scoped>
 @import '../../../assets/css/input_style.scss';
.input_div{
  margin:20px 0;
  span{
    line-height: 32px;
    height: 32px;
    font-size: 14px;
  }
 }
 .input_div .table_a{
  display:inline-block;
  float:left;
  width:120px;
  text-align:right;
  height:30px;
  line-height:30px;
  margin-right:5px;
}
  .app{   // 下架弹框样式
    .tit{text-align:center;font-size:16px;}
    .btns{display:flex;justify-content:center;}
    .btns .btn{width:100px;height:30px;font-size:14px;border:none;border-radius:5px;}
    .btns .btn1{background:#7D93B2; color:white;}
    .btns .btn2{background:#F0B46E; color:white;}
  }
</style>

