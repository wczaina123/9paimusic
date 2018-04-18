<template>
    <div id="Specialcolumn">
        <div class="content content_model">
            <div class="list" style="margin:15px 4px;">
                <p class="home_text">
                    会员权限
                </p>
                <p class="home_p">
                    <em style="float:right;margin-fight:30px;color: #287af2;" v-if="show_ch"  @click="show_add" >
                        <Icon type="plus-round"></Icon>
                        <span>修改</span>
                    </em>
                    <em style="float:right;margin-fight:30px;color: #287af2;" v-if="show_change" @click="close_add" >
                        <Icon type="checkmark"></Icon>
                        <span>完成</span>
                    </em>
                </p>
                <!-- 头条表格以下 -->
                <div class=" x_hidden">
                    <table class="table-list" style="width:100%;overflow-x:scroll">
                        <thead class="home_thead">
                            <tr>
                                <th style="width:30%">顺序</th>
                                <th style="width:30%">名称</th>
                                <th v-if="show_change" style="width:30%">操作</th>
                            </tr>
                        </thead>
                        <tbody class="home_tbody">
                            <tr v-for="(res,index) in main_list" :key="res.id">
                                <td style="text-align:center;">{{index+1}}</td>
                                <td style="text-align:center;">{{res.name}}</td>
                                <td v-if="show_change" style="text-align: center;">
                                    <a @click="del_list(index)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="table_bottom_p" @click="add_list" v-if="show_change" >
                        <i class="fa fa-plus-circle fa-lg mt-4"></i>
                        <span>新增</span>
                    </p>
                </div>
                
            </div>
        </div>

        <!--成功后的提示框-->
        <div id="app2">
            <Modal width="400" v-model="add" class-name="vertical-center-modal">
                <h5>已将新的需求提交至哆来学，将由工作人员和您进行详细的沟通。</h5>   
                <div slot="footer" style="text-align:center;">
                    <button @click="add=false" style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;">确定</button>
                </div>
            </Modal>
        </div>

        <!--新增会员特权-->
        <Modal width="300" v-model="add_style" class-name="vertical-center-modal">
			<div slot="header" style="text-align:center;font-size:16px;margin:0">新增</div>
            <div class="order_home_input">
                <ul>
                    <li v-for="(res,index) in style_list" :key="index" >
                        <label ><input type="checkbox"  :id='index' :value="res.id" :checked='res.flag' :disabled="res.flag" @change="add_classlist($event,index)">{{res.name}}</label>
                    </li>

                </ul>
            </div>
            <div slot="footer" style="display:flex;justify-content:space-around;align-items:center;">
                <button  style="width:100px;height:30px;font-size:14px;border:none;border-radius:5px;background:#F0B46E; color:white;" @click="confirm_add">确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            add: false,
            add_style:false,
            name: "",
            main_list:'',
            newlist:[],
            style_list:'',
            addclass_list:[],
            test_arr:[],
            old_main_list:[],
            show_change:false,
            show_ch:true,

        }
    },
    mounted(){
        this.get_list()        
    },
    updated(){
        // this.get_list()
    },
    methods: {

        show_add(){  // 显示修改
            this.show_change = true
            this.show_ch = false
        },

        close_add(){
            this.show_ch = true
            this.show_change = false
            this.add = true
        },

        add_list(){
            this.add_style = true;
            this.addclass_list = [];
        },

        add_classlist(e,idx){
            if(e.target.checked==true){
                this.addclass_list.push(this.style_list[idx]); 
            }else{
                let curitem = this.style_list[idx];
                this.addclass_list.forEach((v,i,arr)=>{
                    if(curitem==v){
                        this.addclass_list.splice(i,1)
                    }
                })
            }
        },

        get_list(){   // 列表
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
                    // console.log(res.data.data.content_list,'upad')
                    this.main_list = JSON.parse(res.data.data.content_list)
                    this.old_main_list = JSON.parse(res.data.data.content_list)
                    this.get_list_main()                    
				})
        },

        del_list(idx){   // 删除
            this.main_list.splice(idx,1);
            this.$axios({
				url: this.$linkurl.update_vip_config_content,
				method: 'POST',
				data: {
                    token: localStorage.getItem('token'),
                    content:JSON.stringify(this.main_list)
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
                // console.log(res.data,'dele')
                if(res.data.code==0){
                    this.get_list()
                }
            })
            
        },

        confirm_add(){
            let newclasslist = this.main_list.concat(this.addclass_list);
            this.$axios({
				url: this.$linkurl.update_vip_config_content,
				method: 'POST',
				data: {
                    token: localStorage.getItem('token'),
                    content:JSON.stringify(newclasslist)
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
                    // console.log(res.data,'dele')
                    if(res.data.code==0){
                        this.get_list()
                        this.add_style = false;
                    }
				})
        },
        get_list_main(){   // 新增
            this.$axios({
				url: this.$linkurl.get_vip_all_list,
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
                    // console.log(res.data.data)
                    let a = res.data.data
                    this.main_list.forEach((mval,midx,mitem)=>{
                        a.forEach((aval,aidx,aitem)=>{
                            if(mval.name==aitem[aidx].name){
                                aval.flag = 'true'
                            }
                        })
                    })
                    this.style_list = a;

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

.add_jia {
    margin-left: 0 !important;
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
    padding-top:30px;
}

</style>