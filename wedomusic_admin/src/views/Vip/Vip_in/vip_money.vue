<template>
    <div id="wrap">
        <div class="content content_model">
            <div class="list" style="margin:15px 4px;">
                <p class="home_text">
                    会员价格
                </p>
                <p class="home_p">
                    安卓：
                    <!-- <InputNumber  v-model="android_price" style="width:200px;" placeholder="0"></InputNumber> -->
                    <!-- <input v-model="new_android_price"  style="width:200px;"> -->
                    <Input v-model="android_price" @on-keyup='change_number' placeholder="请输入安卓价格" style="width: 200px"  ></Input>
                </p>
                <p class="home_p">
                    苹果：
                    <Select v-model="ios_price" style="width:160px；margin-left:30px;" placeholder="请入ios选择价格" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <!-- <input v-model.number="ios_price" type="number" style="width:200px;">                     -->
                    <span style="margin-left:20px">
                        <i class="fa fa-exclamation-circle fa-lg mt-4"></i>
                        <a>苹果商店将抽取30%作为手续费</a>
                    </span>
                </p>
                <button class="btn_style" @click="get_price">确定</button>

            </div>
        </div>
        <!--新增专栏-->
        <div id="app2">
            <Modal width="400" v-model="add" class-name="vertical-center-modal">
                <h5>已将新的需求提交至哆来学，将由工作人员和您进行详细的沟通。</h5>
                <div slot="footer" style="text-align:center;">
                    <button @click="close" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
            </Modal>
        </div>
        <!--以上-->

    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            add: false,
            cityList: [
                {
                    value: 1,
                    label: '1'
                },
                {
                    value: 3,
                    label: '3'
                },
                {
                    value: 6,
                    label: '6'
                },
                {
                    value: 8,
                    label: '8'
                },
                {
                    value: 12,
                    label: '12'
                },
                {
                    value: 18,
                    label: '18'
                },
                {
                    value: 25,
                    label: '25'
                },
                {
                    value: 28,
                    label: '28'
                },
                {
                    value: 30,
                    label: '30'
                },
                {
                    value: 40,
                    label: '40'
                },
                {
                    value: 45,
                    label: '45'
                },
                {
                    value: 50,
                    label: '50'
                },
                {
                    value: 60,
                    label: '60'
                },
                {
                    value: 68,
                    label: '68'
                },
                {
                    value: 73,
                    label: '73'
                },
                {
                    value: 78,
                    label: '78'
                },
                {
                    value: 88,
                    label: '88'
                },
                {
                    value: 93,
                    label: '93'
                },
                {
                    value: 98,
                    label: '98'
                },
                {
                    value: 108,
                    label: '108'
                },
                {
                    value: 113,
                    label: '113'
                },
                {
                    value: 118,
                    label: '118'
                }, {
                    value: 123,
                    label: '123'
                }, {
                    value: 128,
                    label: '128'
                }, {
                    value: 138,
                    label: '138'
                }, {
                    value: 148,
                    label: '148'
                }, {
                    value: 153,
                    label: '153'
                }, {
                    value: 158,
                    label: '158'
                }, {
                    value: 163,
                    label: '163'
                }, {
                    value: 168,
                    label: '168'
                }, {
                    value: 178,
                    label: '178'
                }, {
                    value: 188,
                    label: '188'
                }, {
                    value: 193,
                    label: '193'
                }, {
                    value: 198,
                    label: '198'
                }, {
                    value: 208,
                    label: '208'
                }, {
                    value: 218,
                    label: '218'
                }, {
                    value: 223,
                    label: '223'
                }, {
                    value: 228,
                    label: '228'
                }, {
                    value: 233,
                    label: '233'
                }, {
                    value: 238,
                    label: '238'
                },
                {
                    value: 243,
                    label: '243'
                }, {
                    value: 248,
                    label: '248'
                }, {
                    value: 253,
                    label: '253'
                }, {
                    value: 258,
                    label: '258'
                }, {
                    value: 263,
                    label: '263'
                }, {
                    value: 268,
                    label: '268'
                }, {
                    value: 273,
                    label: '273'
                }, {
                    value: 278,
                    label: '278'
                }, {
                    value: 283,
                    label: '283'
                }, {
                    value: 288,
                    label: '288'
                }, {
                    value: 298,
                    label: '298'
                }, {
                    value: 308,
                    label: '308'
                }, {
                    value: 318,
                    label: '318'
                }, {
                    value: 328,
                    label: '328'
                }, {
                    value: 348,
                    label: '348'
                }, {
                    value: 388,
                    label: '388'
                }, {
                    value: 418,
                    label: '418'
                }, {
                    value: 448,
                    label: '448'
                }, {
                    value: 488,
                    label: '488'
                }, {
                    value: 518,
                    label: '518'
                }, {
                    value: 548,
                    label: '548'
                }, {
                    value: 618,
                    label: '618'
                }, {
                    value: 648,
                    label: '648'
                }, {
                    value: 698,
                    label: '698'
                }, {
                    value: 798,
                    label: '798'
                }, {
                    value: 818,
                    label: '818'
                },
                {
                    value: 848,
                    label: '848'
                },
                {
                    value: 898,
                    label: '898'
                },
                {
                    value: 998,
                    label: '998'
                },
            ],
            ios_price: '',
            android_price:'',
        }
    },
    mounted(){
        this.get_price_main()
    },
    computed:{
        new_android_price:{
            get:function(){
                return this.android_price;
            },
            set:function(newValue){
                this.android_price=newValue.replace(/[^\d]/g,'');
            }
        },
    },
    methods:{
        close(){
            this.add = false
        },

        change_number(){
            this.android_price = this.android_price.replace(/[^0-9-]+/,'')
        },

        

        get_price_main(){   // 配置__获取会员配置信息
            this.$axios({
				url: this.$linkurl.get_vip_config_detail,
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
					// console.log(res.data.data,'22222')
                    let i = res.data.data
                    this.android_price = i.android_price
                    this.ios_price = i.ios_price
				})
        },

        get_price(){  // 改价格
        
            this.$axios({
				url: this.$linkurl.update_vip_config_price,
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
					// console.log(res.data.data,'22222')
                    // this.teacher_list = res.data.data
                    this.add = true
                    this.get_price_main()
				})
            
        },

    },
}
</script>

<style lang="scss" scoped>
/*二级菜单 以及下面的框框*/
@import '../../../assets/css/alert.css';
.content,
.content_model {
    margin-top: 10px;
}

.add_jia {
    margin-left: 0 !important;
}


/*alert 的文字样式*/

.vertical-center-modal h5 {
    font-size: 14px;
    color: #596980;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    padding-top: 30px;
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
    margin-left: 45px;
}

.home_p {
    font-size: 14px;
    color: #596980;
}
</style>
