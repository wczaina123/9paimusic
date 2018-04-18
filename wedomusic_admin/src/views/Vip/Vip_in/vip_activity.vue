<template>
    <div id="Specialcolumn">
        <div class="content content_model">
            <div class="list" style="margin:15px 4px;">
                <p class="home_text">
                  会员活动
                </p>
                <p class="home_p">
                    <Select v-model="model1" style="width:200px" placeholder="请选择可见范围">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <em class="add_jia" @click="addbanner=true">
                        <i class="fa fa-plus-square-o fa-lg mt-4"></i>
                        <a>新增</a>
                    </em>
                </p>
                <!-- 头条表格以下 -->
                <div class=" x_hidden">
                    <table class="table-list" style="width:100%;overflow-x:scroll">
                        <thead class="home_thead">
                            <tr>
                                <th>id</th>
                                <th>活动名称</th>
                                <th>简述</th>
                                <th>有效期</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class="home_tbody">
                            <tr>
                                <td style="text-align:center;"></td>
                                <td style="text-align:center;"></td>
                                <td style="text-align:center;"></td>
                                <td style="text-align:center;"></td>
                                <td style="text-align:center;"></td>
                                <td style="text-align: center;">
                                    <a>数据</a>
                                    <a href="javascript:;" style="margin-left:6px;">下架</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="table_bottom_p" @click="add=true">
                    <i class="fa fa-plus-circle fa-lg mt-4"></i>
                    <span>新增</span>
                </p>
            </div>
            <!-- 表格以上 -->
        </div>
     
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            add: false,
            name: "",
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
            model1: '',
            main_list:'',
            
        }
    },
    mounted(){
        // this.get_list()
    },
    methods: {
        changeok() {
            console.log("成功")
        },
        cancel() {
            console.log("失败")
        },

        get_list(){
            this.$axios({
				url: this.$linkurl.get_vip_all_list,
				method: 'POST',
				data: {
					token: localStorage.getItem('token'),
                    android_price:this.android_price,
                    ios_price:this.ios_price
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
					console.log(res.data.data,'22222')
                    this.main_list = res.data.data
				})
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/alert.css';


/*二级菜单 以及下面的框框*/

.content,
.content_model {
    margin-top: 10px;
}

.table-list {
    a {
        color: rgb(45, 140, 240);
    }
}

.addcolumn {
    p {
        span {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 10px;
        }
    }
}

.vertical-center-modal h5 {
    font-size: 14px;
    color: #596980;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    padding-top: 30px;
}

.home_p {
    font-size: 14px;
    color: #596980;
}
</style>