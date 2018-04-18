<template>
     <div id="code">
        <div class="content content_model">
            <p class="home_text">校区验证码
                <i class="fa fa-exclamation-circle fa-lg mt-4" style="font-size:18px; margin-left:5px;color:#7D93B2;"></i>
            </p>
            <!--校区验证码-->
            <div id="app2">
                <div class="table_style" style="padding-top:20px;height:auto;">
                    <div>
                        <span style="width:80px;">校区验证码:</span>
                        <Input placeholder="请输入验证码" style="width: 100px;" readonly v-model="old_code" class="input_code"></Input>
                        <!-- <button class="btn_style btn_1" v-if="show_yes">确认</button> -->
                        <button class="btn_style btn_2"  @click="show_code">修改</button>
                        <a class="add_list" style="color:#7D93B2;margin-left:20px;">
                            <i class="fa fa-exclamation-circle fa-lg mt-4" style="color:#7D93B2;"></i>
                            <a style="color:#7D93B2;font-size:12px;">长度限制为6位数,仅支持数字,每季度可修改一次</a>
                        </a>
                    </div>
                    <div class="erwei_img" >
                        <div class="img">
                        <img :src="join_qr_code_url" alt="" style="width:100%;height:100%" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <!-- 验证码提示 -->
            <div class="content content_model content_margin">
                <p class="home_text">验证码提示
                    <i class="fa fa-exclamation-circle fa-lg mt-4" style="font-size:18px;
                        margin-left:5px;color:#7D93B2;"></i>
                </p>
                <h6>验证码获取提示文字:
                    <span>{{note_message}}</span>
                    <div slot="footer" id="footer" @click="changeadd=true">
                        <button style="width:80px;height:30px;border:none;border-radius:5px;background:#F0B46E; color:white;margin-left:20px;">修改</button>
                    </div>
                </h6>
            </div>
        <!--修改验证码-->
        <div class="aaa">
            <Modal v-model="changecode" title="修改校区验证码" style="text-align:center" class-name="vertical-center-modal">
                <Input v-model="join_code" placeholder="请输入修改验证码提示" @on-keyup='change_number' :maxlength='6'  style="width: 300px"></Input>
                <div slot="footer" class="btns">
                    <button class="btn btn1" @click="cancel">取消</button>
                    <button class="btn btn2" @click="sure_code">确定</button>
                </div>
            </Modal>
        </div>
        <!--修改验证码提示弹框-->
        <div class="aaa">
            <Modal v-model="changeadd" title="修改验证码提示" style="text-align:center" class-name="vertical-center-modal">
                <Input v-model="note" placeholder="请输入修改验证码" style="width: 300px"></Input>
                <div slot="footer" class="btns">
                    <button class="btn btn1" @click="cancel">取消</button>
                    <button class="btn btn2" @click="sure">确定</button>
                </div>
            </Modal>
        </div>


    </div> 
</template>
<script>
/*
    修改思路  在后端获取allow_updated_code字段 如果为0  则为修改按钮改为禁止使用
*/

export default {
    data() {
        return {
            changeadd: false,//修改校区
            changecode: false,//修改验证码
            join_code: "",//修改了的验证码
            join_code: "",//机构验证码
            note: "",//修改的文字
            join_qr_code_url: "",//二维码地址
            note_message: "",//文字
            allow_updated_code: "",//还有几次修改机会

            show_yes:false,
            old_code:'',
        }
    },
    mounted() {
        this.get_school_code_info()
    },
    methods: {

        change_number(){
            this.join_code = this.join_code.replace(/[^0-9-]+/,'')
        },

        cancel() { // 取消事件
            this.changeadd = false
            this.changecode = false
        },

        show_code(){   // 打开校区验证码弹框
            this.changecode = true
        },

        get_school_code_info() {  // 详情
            this.$axios({
                url: this.$linkurl.get_school_code_info,
                method: 'POST',
                data: {
                    token: localStorage.getItem('token'),
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
                    console.log(res.data.data,'main')
                    let i = res.data.data;
                    this.old_code = i.join_code
                    this.join_code = i.join_code;//验证码
                    this.join_qr_code_url = i.join_qr_code_url;//二维码地址
                    this.note_message = i.note_message;//文字
                    this.note = i.note_message
                    this.allow_updated_code = i.allow_updated_code;//还剩几次修改的机会
                })
                .catch(err => {
                    console.log("获取校区验证码失败", err)
                })
        },

        sure_code() {  // 修改验证码
            this.$Message.destroy()        
            if(this.join_code!=''){
                this.$axios({
                url: this.$linkurl.update_school_code,
                method: 'POST',
                data: {
                    token: localStorage.getItem('token'),
                    code: this.join_code,
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
                    this.join_code = ''
                    this.changecode = false
                    this.get_school_code_info()
                })
            }else{
                this.$Message.config({ top: 50 })
                this.$Message.warning('验证码不能为空');
            }
            
        },
        
        sure() {    // 修改提示字
            this.$Message.destroy()
            if (this.note != '') {
                // console.log(this.note.length)
                this.$axios({
                    url: this.$linkurl.update_school_note,
                    method: 'POST',
                    data: {
                        token: localStorage.getItem('token'),
                        note: this.note,

                    },
                    transformRequest: [function(data) {
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => {
                        console.log(res.data.data)
                        this.note = ''
                        this.changeadd = false
                        this.get_school_code_info()
                    })
                    .catch(err => {
                        console.log("校区提示文字修改失败", err)
                    })
            } else {
                this.$Message.config({ top: 50 })
                this.$Message.warning('校区提示文字不能为空');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/alert.css';
.btn_2 {

    background: #F0B46E;
}

.btn_1 {
    background: #C5D1E2;
}

.btn_style {
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 12px;
    margin-left: 30px;
} // 上下游margin的content
.content_margin {
    margin: 30px 0 !important;
    h6 {
        font-size: 14px;
        color: #363f4c;
        margin-top: 20px;
        span {
            font-size: 12px;
            color: #596980;
        }
    }
} // 确认时变颜色
.btn_bg {
    background: #F0B46E;
} //二维码的样式
.erwei_img {
    width: 200px;
    height: 200px;
    background: #F6F6F6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .img {
        text-align: center;
        i {
            padding: 20px;
            background: #fff;
            margin: 10px 0;
        }
        button {
            color: #fff;
            border: 0;
            height: 30px;
            line-height: 0%;
            padding: 0 10px;
            background: #F0B46E;
            border-radius: 4px;
        }
    }
} // 表格样式
.table_style div[data-v-6e567216] {
    height: auto;
}

#footer {
    float: right !important;
}

.content,
.content_model {
    margin-top: 10px;
}

.upload_photo {
    width: 360px;
    height: 360px !important;
}

.table_button {
    height: 30px;
    line-height: 30px;
    color: #fff;
    padding: 0 20px;
    border: 0;
    background: #F0B46E;
    border-radius: 5px;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
    height: 200px !important;
}
</style>

