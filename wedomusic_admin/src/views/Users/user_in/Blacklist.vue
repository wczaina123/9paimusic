<template>
    <div id="teacher_power">
        <!-- 师资管理 -->
        <div class="content content_model content_campus">
            <p class="home_text">黑名单</p>
            <!-- 以下表格 -->
            <!-- <div class="table_left_right" style="width:100%;" v-for="res in back_list" :key="res.id"> -->
            <div class="table_left_right" style="width:100%;">
                <table style="width:100%;border:1px solid #c5d1e2;">
                    <thead>
                        <tr style="height:60px;background:#F6F6F6;">
                            <td style="width:100%;padding-left:20px;">
                                <input type="checkbox" />
                                <button class="btn_style" @click="addblacklist=true">移出黑名单</button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <div class="left">
                    <ul class="left_uls">
                        <li class="uls_li" @mouseleave="hover_hide">
                            <div class="li_children">
                                <input type="checkbox" class="left_input" />
                                <div class="list">
                                    <dl>
                                        <dt>
                                            <div @mouseenter="hover_show"></div>
                                            <!-- <img src="images/l_05.gif" alt=""> -->
                                        </dt>
                                        <dd>
                                            <h1>赵晓明</h1>
                                            <div class="btn" @click="remark=true">
                                                <button class="btn_style">修改备注</button>
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
                                                <span class="btn_style" @click="addblacklist=true" style="background:#fff;color:#596980;cursor:pointer;">移出黑名单</span>
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
                                            <p class="p_style">2017-10-12关注</p>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                            <!-- 以上 -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 点击 移出黑名单 -->
        <div id="app2">
            <Modal width="400" v-model="addblacklist" class-name="vertical-center-modal">
                <h5 style="margin-top:20px">确定移出黑名单？</h5>
                <div slot="footer">
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
            </Modal>
        </div>

        <!-- 点击修改备注 -->
        <div id="app2">
            <Modal width="400" v-model="remark" class-name="vertical-center-modal">
                <div slot="header" style="text-align:center;font-size:16px;margin:0">备注</div>
                <div class="table_style" style="padding-top:20px;">
                    <div class="style_input">
                        <a href="javascript:;">
                            <i>0</i>/30</a>
                        <span style="line-height:25px;font-size:14px;">备注名称:</span>
                        <Input v-model="name" style="width: 200px"></Input>
                    </div>
                </div>
                <div slot="footer">
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#7D93B2; color:white;">取消</button>
                    <button style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
            </Modal>
        </div>
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
            add: false,
            addblacklist: false,//加入黑名单
            teacherinfo: false,//点击详情
            hover: false,
            addlabel: false,//点击新增标签
            name: "",
            remark: false,//点击修改备注

            back_list:'',
            add_mian:'',
        }
    },
    mounted(){
        this.get_blacklist_list()
    },
    methods: {
        hover_show() {
            this.hover = true;
        },
        hover_hide() {
            this.hover = false;
        },

        get_blacklist_list(){   // 拿到黑名单列表
            this.$axios({
            url: this.$linkurl.get_blacklist_list,
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
                // console.log(res.data.data,'back')
                let a  = res.data.data 
                for(let i=0;i<a.length;i++){
                    let id = a[i].user_id
                    this.get_teacher_detail(id)
                }
            })
            },

        get_teacher_detail(id){   // 拿到用户详情
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
                // console.log(res.data.data,'back_main')
                this.add_mian = res.data.data 
                for(let i=0;i<this.back_list.length;i++){   // 取出详情加入到列表中
                    this.back_list[i].main = this.add_mian
                }

                // console.log(this.back_list,'new')
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


/*表格*/

.left .list {

    width: 100%;
    height: auto;
    position: absolute;
    left: 20px;
    top: 20px;
}

.left .list dl {
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
    margin-left: 20px;
}

.left .list dl dd {
    height: auto;
    margin-left: 90px;
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
    left: 90px;
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