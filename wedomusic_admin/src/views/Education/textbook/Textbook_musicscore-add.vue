<template>
    <div id="new_myboxstyle">
       <p class="line_p">
          <a href="javascript:;" @click="eixt">跟谱练习管理></a>
          <a href="javascript:;">跟谱练习</a>
      </p>
      <div class="content content_model content_model_add" style="margin-bottom:30px;">
          <div class="home_text">跟谱练习
                <div >
                    <button @click="eixt" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;margin-right:20px;">取消</button>
                    <button  @click="not_null" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
          </div>
          <p class="text_work" style="font-size:16px;font-weight:600;line-height:30px;color:#363f4c;margin:20px 0 10px 0;">教材:{{text_name}}</p>
          <div class="input_div">
             <a class="table_a">上传跟谱压缩包(.zip格式)</a>
             <form name=theform style="width:300px;background:#f6f6f6;margin-left:193px;">
                <div class="modify-img-border upload-bg" id="textbook_audio_content" style="padding-top:50%;">
                    <div class="edit-upload-plus">
                        <a href="javascript:void(0);" class="upload-file" id="textbook_audio_plus">
                            <span class="fa fa-plus" id="textbook_audio_span" style="margin-top:20px;"></span>
                            <input style="width:100%;height:100%;" type="file" name="file" id="textbook_audio" @change="upload('textbook_audio')">
                        </a>
                    </div>
                    <div id="textbook_audio_pro_con" class="upload-pro-con">
                        <div class="upload-pro-border">
                            <div id="textbook_audio_progress" class="upload-progress"></div>
                        </div>
                    </div>
                </div>
                <input id="textbook_audio_value" ng-model="formData.audio_url" style="display: none;">
            </form>
        </div>
        <div class="input_div">
         <a class="table_a">上传跟谱练习Music(.xml格式):</a>
         <form name=theform style="width:300px;background:#f6f6f6;margin-left:193px;">
            <div class="modify-img-border upload-bg" id="textbook_xml_content" style="padding-top:50%;">
                <div class="edit-upload-plus">
                    <a href="javascript:void(0);" class="upload-file" id="textbook_xml_plus">
                        <span class="fa fa-plus" id="textbook_xml_span" style="margin-top:20px;"></span>
                        <input style="width:100%;height:100%;" type="file" name="file" id="textbook_xml" @change="upload2('textbook_xml')">
                    </a>
                </div>
            </div>
        </form>
    </div>
    <div class="input_div">
      <a class="table_a">标题:</a>
      <Input placeholder="请输入音频名称" style="width: 300px" v-model="music_name"></Input>
  </div>
    <div class="input_div">
        <a class="table_a" style="float: left;">课程: </a>
        <Select placeholder='请选择课程' style="width:300px !important;" v-model="unit" @on-change="changeunit(unit)">
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
            <Option value=11>11 lessons</Option>
            <Option value=12>12 lessons</Option>
            <Option value=13>13 lessons</Option>
            <Option value=14>14 lessons</Option>
            <Option value=15>15 lessons</Option>
            <Option value=16>16 lessons</Option>
            <Option value=17>17 lessons</Option>
            <Option value=18>18 lessons</Option>
            <Option value=19>19 lessons</Option>
            <Option value=20>20 lessons</Option>
        </Select>
    </div>

    <div class="input_div" style="margin-bottom:30px;">
        <a class="table_a" style="float: left;">顺序码:</a>
        <Select placeholder='请选择顺序码' style="width:300px !important;" v-model="sort" @on-change="changsort(sort)">
            <Option value=1>1</Option>
            <Option value=2>2</Option>
            <Option value=3>3</Option>
            <Option value=4>4</Option>
            <Option value=5>5</Option>
            <Option value=6>6</Option>
            <Option value=7>7</Option>
            <Option value=8>8</Option>
            <Option value=9>9</Option>
            <Option value=10>10</Option>
            <Option value=11>11</Option>
            <Option value=12>12</Option>
            <Option value=13>13</Option>
            <Option value=14>14</Option>
            <Option value=15>15</Option>
            <Option value=16>16</Option>
            <Option value=17>17</Option>
            <Option value=18>18</Option>
            <Option value=19>19</Option>
            <Option value=20>20</Option>
            <Option value=21>21</Option>
            <Option value=22>22</Option>
            <Option value=23>23</Option>
            <Option value=24>24</Option>
            <Option value=25>25</Option>
            <Option value=26>26</Option>
            <Option value=27>27</Option>
            <Option value=28>28</Option>
            <Option value=29>29</Option>
            <Option value=30>30</Option>
            <Option value=31>31</Option>
            <Option value=32>32</Option>
            <Option value=33>33</Option>
            <Option value=34>34</Option>
            <Option value=35>35</Option>
            <Option value=36>36</Option>
            <Option value=37>37</Option>
            <Option value=38>38</Option>
            <Option value=39>39</Option>
            <Option value=40>40</Option>
        </Select>
    </div>
    
</div>
</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
data () {
    return {
        text_name:localStorage.getItem('text_name'),
        textbook_id:localStorage.getItem('textbook_id'),
        music_name:"",
        sort:'',
        unit:'',
        getids:"",
        json_url:"",
        xml_url:"",
    }
},
mounted(){
    this.getid()
    this.getosstoken()
},
computed:{
    ...mapState({uptoken:'uptoken'})
},
methods:{
    eixt() {  // 退出
        this.$router.push({ path: '/textbookmusicscore' +'?'+this.textbook_id})
    },

    add(){
        this.$router.push({path:'/courseadd'})
    },

    getid(){   // 获取urlid（教程资源id）
        let urlid = window.location.search.substring(1)
        if(urlid == ""){
            this.getids = 0
        }else{
            this.getids = urlid   
            this.getmain() 
        }
    },

    getmain(){   // 获取详情
        this.$axios({
          url: this.$linkurl.get_teaching_materials_resource_detail,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id: this.getids,
            category:2,
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
            let i = res.data.data
            this.music_name = i.name
            this.unit = i.relation_unit.toString()
            this.sort = i.sort.toString()
            this.json_url = i.json_url
            this.xml_url = i.xml_url
            if( this.json_url != ""){
               $('#textbook_audio_content').css('background-image','url("'+linkurl.uplodeimg+'")');                
                // $('#textbook_audio_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                $('#textbook_audio_span').css('display','none')
            }
            if( this.xml_url != ""){
               $('#textbook_audio_content').css('background-image','url("'+linkurl.uplodeimg+'")');
                // $('#textbook_xml_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                $('#textbook_xml_span').css('display','none')
            }
        })
        .catch(err=>{
            console.log("获取详情失败",err)
        })
    },

    not_null(){  // 判断
        if(this.music_name==''){
            this.$Message.warning('请输入音频名称')
        }else if(this.sort==''){
            this.$Message.warning('请选择课程')            
        }else if(this.unit==''){
            this.$Message.warning('请选择顺序码')            
        }else if(this.json_url==''){
            this.$Message.warning('请上传压缩包')            
        }else if(this.xml_url==''){
            this.$Message.warning('请上传跟谱练习')            
        }else{
            this.get_teaching_materials()
        }
    },

    get_teaching_materials(){    // 增加
        this.$axios({
          url: this.$linkurl.handle_teaching_materials_resource,
          method: 'POST',
          data: {
            token: localStorage.getItem('token'),
            id:this.getids,   // 0为增加  其他为修改
            name:this.music_name,
            textbook_id:this.textbook_id,
            resource_category_id:2,   // 1为音频 2为跟谱
            sort:this.sort,
            relation_unit:this.unit,
            xml_url:this.xml_url,
            json_url:this.json_url,
            // 可不填
            res_url:"",
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
            // console.log(res.data)
            this.$router.push({path:'/textbookmusicscore' + '?' + this.textbook_id})
        })
        .catch(err=>{
            console.log("添加失败",err)
        })
    },

    changsort(id){   
        this.sort = id
    },
    changeunit(unit){
        this.unit = unit
    },

    // 上传
    ...mapActions({getosstoken:'get_token'}),  // 获取oss token

    upload(id){   // 上传zip
        this.$Loading.start();
        var cdnDomain = this.$linkurl.ossurl;
        var timestamp=new Date().getTime();
        if(!document.getElementById(id).files[0].name ){return false;}
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var indexname =  filename.substr(0,index)
        var ext = filename.substr(index+1);
        if( ext != 'zip'){
            this.$Loading.error();
            this.$Message.warning('请选择".zip"格式');
            return;
        }
        var key =  id + '/' + timestamp + '.' +  ext
        var data = {
            OSSAccessKeyId: this.uptoken.accessid,
            policy: this.uptoken.policy,
            signature: this.uptoken.signature,
            success_action_status:'200', 
            key:key         // 定义文件名
            };
            
            var oMyForm = new FormData();

            for(var field_name in data){
                oMyForm.append(field_name,data[field_name]);
            }

            oMyForm.append("file", document.getElementById(id).files[0]);

            var oReq = new XMLHttpRequest();
            
            oReq.open("POST", this.$linkurl.osspost)
            oReq.send(oMyForm) 
            var that = this
            oReq.onreadystatechange = function(e){   // 上传oss后改变图片
                if(oReq.readyState == 4){
                    if(oReq.status==200){ 
                        that.json_url = cdnDomain + key;
                        that.$Loading.finish();
                        $('#' + id + '_content').css('background-image','url("'+that.$linkurl.uplodeimg+'")');
                        // $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                        $('#' + id + '_span').css('display','none')
                    }else{
                        that.$Loading.error();
                        that.$Message.warning('上传失败');
                    }
                }
            };
    },

    upload2(id){   // 上传xml
        this.$Loading.start();
        var cdnDomain = this.$linkurl.ossurl;
        var timestamp=new Date().getTime();
        if(!document.getElementById(id).files[0].name ){return false;}
        var filename = document.getElementById(id).files[0].name;
        var index = filename.lastIndexOf(".");
        var indexname =  filename.substr(0,index)
        var ext = filename.substr(index+1);
        if( ext != 'xml'){
            this.$Loading.error();
            this.$Message.warning('请选择".xml"格式');
            return;
        }
        var key =  id + '/' + timestamp + '.' +  ext
        var data = {
            OSSAccessKeyId: this.uptoken.accessid,
            policy: this.uptoken.policy,
            signature: this.uptoken.signature,
            success_action_status:'200', 
            key:key         // 定义文件名
            };
            
        var oMyForm = new FormData();

        for(var field_name in data){
            oMyForm.append(field_name,data[field_name]);
        }

        oMyForm.append("file", document.getElementById(id).files[0]);

        var oReq = new XMLHttpRequest();
        
        oReq.open("POST", this.$linkurl.osspost)
        oReq.send(oMyForm) 
        var that = this
        oReq.onreadystatechange = function(e){   // 上传oss后改变图片
            if(oReq.readyState == 4){
                if(oReq.status==200){ 
                    that.xml_url = cdnDomain + key;
                    that.$Loading.finish();
                    $('#' + id + '_content').css('background-image','url("'+that.$linkurl.uplodeimg+'")');
                        // $('#' + id + '_content').css('background-image','url(http://cdn.9beats.com/website/admin/images/uploaded.png)');
                        $('#' + id + '_span').css('display','none')
                }else{
                    that.$Loading.error();
                    that.$Message.warning('上传失败');
                }
            }
        };
    },
},
}
</script>

<style scoped lang="scss">
    @import '../../../assets/css/input_style.scss';
    @import '../../../assets/css/alert.css';
    .line_p{
        width:100%;
        margin-top:30px;
        a{
            color:#7D93B2;
            &:nth-child(1){
                color:#7D93B2;
                padding-right:3px;
            }
            &:nth-child(2){
                padding-left:3px;
                color:#596980;
            }
            &:hover{
                text-decoration: none;
            }
        }
    }
     .input_div .table_a{
              display:inline-block;
              width:193px;
              text-align:right;
              height:30px;
              line-height:30px;
              float:left;
            }

.home_text{   // 弹性和
    display: flex;
    justify-content: space-between;
    div{
        button{
        margin-top: 15px;
        line-height: 30px;
        }
    }
}
</style>