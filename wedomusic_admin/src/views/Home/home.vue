<template>
  <div id="wrap">
    <div class="content content_model" style="margin-top:40px;">
      <p class="class_mana">概览
        <!-- <span>
          <i class="fa fa-plus-square-o fa-lg mt-4"></i>
          自定义首页数据
        </span> -->
      </p>
    </div>
    <!-- 关键指标 -->
    <div class="content content_model content_home">
      <div class="list" style="margin:15px 4px;">
        <p class="home_text text_home">关键指标
          <i class="fa fa-exclamation-circle fa-lg mt-4"></i>
        </p>

        <ul class="ul_uls">
          <li>
            <i>学生增长(昨日)</i>
            <em>200</em>
          </li>
          <li>
            <i>APP日活(昨日)</i>
            <em>200</em>
          </li>
          <li>
            <i>商城流水(昨日)</i>
            <em>200</em>
          </li>
        </ul>
        <!-- 此处加一个echarts -->
<!-- 
        <div class="animated fadeIn">
          <b-card>
            <div class="chart-wrapper">
              <bar-example/>
            </div>
          </b-card>

        </div> -->
          <div class="echarts">
            <schart :canvasId="canvasId"
              :type="type"
              :width="width"
              :height="height"
              :data="data"
              :options="options"
          ></schart>
          </div>

      </div>
      <!-- 表格以上 -->
    </div>
    <!--以上-->

    <!-- 关键指标 -->
    <!-- <div class="content content_model content_home content_bottom">
      <div class="list" style="margin:15px 4px;">
        <p class="home_text text_home">自定义首页数据
          <i class="fa fa-exclamation-circle fa-lg mt-4"></i>
        </p>
        <div class="setting_uplode">
          <span>
            <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-format-error="handleFormatError"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            type="drag"
            action="http://tv-package.oss-cn-beijing.aliyuncs.com"
            style="width:450px;padding-left:30px">
            <div class="input" style="background:#f6f6f6">
              <div style="padding-top:32px;padding-bottom:20px">
                <Icon type="images" size="52" style="color:white;"></Icon><br>  
                <Button type="warning" style="border:0;padding:3px 5px;background: #F0B46E;border-radius: 4px;">添加指标</Button>    
              </div>
            </div>
          </Upload>
        </span>
      </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import BarExample from './BarExample'
import Schart from 'vue-schart';
export default {
  name: 'dashboard',
  // components: {
  //   BarExample,
  // },
  components:{
        Schart
    },
  data(){
    return{
      //
         canvasId: 'myCanvas',
            type: 'bar',
            width: 700,
            height: 400,
            data: [
                {name: '老生复报', value: 134},
                {name: '今日新生', value: 213},
                {name: '新增会员', value: 154},
            ],
            color:['#eee','#ccc','#333'],
            options: {
                // title: 'Total sales of stores in recent years'
            }
            //
    }
  },
  methods:{
    //上传图片
    handleSuccess (res,file) {
      console.log(res,file)
    },
    handleFormatError (file) {
      console.log(file)
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
          },//以上
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/alert.css';
@import '../../assets/css/index.scss';
.content_home {
  padding: 40px;
  height: auto;
  margin-top:40px;
}

.text_home {
  color: #596980;
  line-height: 60px;
  font-size: 16px;
  i {
    color: #596980;
  }
}

.class_mana {
  padding-left: 40px;
  background: #fff;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  color: #363f4c;
  span {
    float: right;
    font-size: 16px;
    color: #287AF2;
    margin-right: 40px;
    i {
      color: #287AF2;
    }
  }
}

.list .ul_uls {
  width: 100%;
  height: 130px;
  border: 1px solid #C5D1E2;
  border-top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    width: 33%;
    text-align: center;
    border-right: 1px solid #C5D1E2;
    /*padding-top:35px;*/
    &:last-child {
      border-right: 0;
    }
    i {
      font-size: 16px;
      color: #596980;
    }
    em {
      /*margin-top: 10px;*/
      display: block;
      font-size: 36px;
      font-weight: 400;
      color: #596980;
    }
  }
}
.setting_uplode{
	margin-top:30px;
}
.echarts{
  text-align:center;
}
</style>
