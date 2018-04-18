import Vue from 'vue'
import Router from 'vue-router'

// Containers

// Views - Icons
import FontAwesome from '@/views/icons/FontAwesome'
// Views
import Login from '@/views/Login/Login.vue' // 登陆
import Logingpwd from '@/views/Login/Loginpwd.vue'
import Logingpwdnext from '@/views/Login/Loginpwd_next.vue'
import Telmessage from '@/views/Login/Loginpwd_tel-number.vue'
import Newpassword from '@/views/Login/Newpassword.vue'
import Newsignin from '@/views/Login/signin/Signin.vue'
import Newsignin_sign from '@/views/Login/signin/Signin_next.vue'
import AddInfo from '@/views/Header/Addinfo.vue' //通知栏->添加通知
import MoreInfo from '@/views/Header/Moreinfo.vue' //通知栏->更多通知
import HelpInfo from '@/views/Header/Helpinfo.vue' //通知栏->帮助
import Home from '@/views/Home/home.vue' //首页
//import recommend from '@/views/Recommend/recommend.vue' //推荐位管理
// import recommend_index from '@/views/Recommend/home.vue'
// import recommend_find from '@/views/Recommend/find.vue'
// import recommend_shop from '@/views/Recommend/shopping.vue'

// import Living from '@/views/Living/Living.vue' // 直播管理
// import addliving from '@/views/Living/livingadmin/Living_add.vue' // 新增直播
// import addgift from '@/views/Living/gift/gift_add.vue' // 增加礼物

// import Special from '@/views/Special/Special.vue' //专栏管理
// import comment from '@/views/Special/comment.vue' //专栏管理/评论
// import New_ticles from '@/views/Special/Newarticles.vue'  // 新增文章
// import Data from '@/views/Special/data.vue' // 数据
// import Specialcolumn from '@/views/Special/Specialcolumn.vue'


// 商场
// import Store from '@/views/Store/Store.vue' 
// import Store_addgoods from '@/views/Store/goodslist/add_goods.vue' // 新增商品
// import Store_order from '@/views/Store/order/Store_order.vue'   // 订单
// import Store_timelimit from '@/views/Store/promotion/promotion.vue' // 促销
// import Store_category from '@/views/Store/category/category.vue' // 品类
// import Store_goods_sku from '@/views/Store/goodslist/goods_sku.vue'// sku

// import Education from '@/views/Education/Education.vue'
import Master from '@/views/Education/master/Education_master-add.vue'
// import Textbook from '@/views/Education/textbook/Education_textbook-add.vue' //教材管理
// import Textbookmusic from '@/views/Education/textbook/Textbook_music.vue' // 音频管理
// import Textbookmusicadd from '@/views/Education/textbook/Textbook_music-add.vue' // 新增音频
// import Textbookmusicscore from '@/views/Education/textbook/Textbook_musicscore.vue' // 跟谱管理
// import Textbookmusicscoreadd from '@/views/Education/textbook/Textbook_musicscore-add.vue' // 新增跟谱
import Course from '@/views/Education/course/Educatin_course-add.vue' // 视频课程管理
import Courseclass from '@/views/Education/course/Educatin_course-calss.vue' // 课程章节
import Courseclassadd from '@/views/Education/course/Educatin_course-calss-add.vue' // 增加课程章节
import Coursewareadd from '@/views/Education/courseware/Education_courseware-add.vue' // 新增课件
import Coursechildlist from '@/views/Education/courseware/Education_childware.vue' // 课件子列表
import Coursimage from '@/views/Education/courseware/Education_coursimage.vue' // 子列表-增加白班
import Coursvideo from '@/views/Education/courseware/Education_coursvideo.vue' // 子列表-增加视频
import Coursitem from '@/views/Education/courseware/Education_courseitem.vue' // 子列表-增加跟谱练习

// import Educationtextbook from '@/views/Education/Education_textbook.vue' // 教材管理
// import Educationtex_master from '@/views/Education/Education_master.vue' // 大师管理
// import Educationtex_video from '@/views/Education/Educatin_course.vue' // 视频管理
// import Educationtex_courseware from '@/views/Education/Education_courseware.vue' // 课件管理

import Campus from '@/views/Campus/Campus.vue'
import Class from '@/views/Class/Class.vue' //班级管理
import newclass from '@/views/Class/newclass.vue'//新增班级
import Users from '@/views/Users/Users.vue' //用户管理
import Vip from '@/views/Vip/Vip.vue'
import Gold from '@/views/Gold/Gold.vue'
import Setting from '@/views/Settings/Setting.vue' // 设置
import { request } from 'http';


// import AAAdd from '@/views/Add.vue'
Vue.use(Router)


let routes = [
    {
        path: '/', // 登陆
        component: Login,
    },
    {
        path: '/logingpwd', // 修改密码
        component: Logingpwd,
    },
    {
        path: '/logingpwd/pwdnext', // 输入企业信息
        component: Logingpwdnext,
    },
    {
        path: '/logingpwd/pwdnext/telmessage', // 输入短信验证码
        component: Telmessage,
    },
    {
        path: '/logingpwd/pwdnext/newpassword', // 重新输入新密码
        component: Newpassword,
    },
    {
        path: '/logingpwd/pwdnext/newsignin', // 注册新号
        component: Newsignin,
    },
    {
        path: '/logingpwd/pwdnext/newsignin_sign', // 注册新号_下一步
        component: Newsignin_sign,
    },
    {
        path: '/AddInfo', // 添加通知
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/AddInfo',
                component: AddInfo
            }

        ]
    },
    {
        path: '/MoreInfo', // 更多通知
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/Moreinfo',
                component: MoreInfo
            }

        ]
    },
    {
        path: '/Helpinfo', //帮助
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/HelpInfo',
            component: HelpInfo
        }]
    },
    {
        path: '/index', // 首页
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/index',
                component: Home
            }
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/recommend', //  推荐位
            component: resolve => require(["@/containers/Full"],resolve),
            children: [
                {
                    path: '/recommend',
                    // component: recommend
                    component:resolve => require(["@/views/Recommend/recommend.vue"],resolve),
                },
                {
                    path: '/recommend/index',
                    // component: recommend_index
                    component:resolve => require(["@/views/Recommend/home.vue"],resolve),
                },
                {
                    path: '/recommend/find',
                    // component: recommend_find
                    component:resolve => require(["@/views/Recommend/find.vue"],resolve),
                    
                },
                {
                    path: '/recommend/shop',
                    // component: recommend_shop
                    component:resolve => require(["@/views/Recommend/shopping.vue"],resolve),
                    
                },
            ],
            meta: {
                title: '',
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
    },
    {
        path: '/living', // 直播
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/living',
                // component: Living
                component: resolve => require(['@/views/Living/Living.vue'],resolve),
            },
            {
                path: '/living/livingadd',
                // component: addliving
                component: resolve => require(["@/views/Living/livingadmin/Living_add.vue"],resolve),
                
            },
            {
                // path: '/giftadd',
                path: '/giftadd',
                // component: addgift,
                component: resolve => require(['@/views/Living/gift/gift_add.vue'],resolve),
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/special', // 专栏
        component: resolve => require(["@/containers/Full"],resolve),
        children: [
            {
                path: '/special',
                // component: Special,
                component: resolve => require(['@/views/Special/Special.vue'],resolve),
                
            }, 
            {
                path: '/special/new_ticles',
                // component: New_ticles,
                component: resolve => require(['@/views/Special/Newarticles.vue'],resolve),
            },
            {
                path: '/special/Specialcolumn',
                // component: Specialcolumn,
                component: resolve => require(['@/views/Special/Specialcolumn.vue'],resolve)
            },
            {
                path: '/special/data',
                // component: Data,
                component: resolve => require(['@/views/Special/data.vue'],resolve)                
            },
            {
                path: '/comment',
                // component: comment
                component: resolve => require(['@/views/Special/comment.vue'],resolve)                                
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/store', // 商城
        component: resolve => require(["@/containers/Full"],resolve),
        children: [
            {
                path: '/store',
                // component: Store
                component: resolve => require(["@/views/Store/Store.vue"],resolve),
            },
            {
                path: '/store/add_goods',
                // component: Store_addgoods
                component: resolve => require(["@/views/Store/goodslist/add_goods.vue"],resolve),
            },
            {
                path: '/store/goods/sku',
                // component: Store_goods_sku
                component: resolve => require(["@/views/Store/goodslist/goods_sku.vue"],resolve),
            },
            {
                path: '/store/order',
                component: resolve => require(["@/views/Store/order/Store_order.vue"],resolve),
                // component: Store_order
            },
            {
                path: '/store/timelimit',
                component: resolve => require(["@/views/Store/promotion/promotion.vue"],resolve),
                // component: Store_timelimit
            },
            {
                path: '/store/category',
                component: resolve => require(["@/views/Store/category/category.vue"],resolve),
                // component: Store_category
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },

    {
        path: '/education', // 教学
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/education', // 教学品类
                component: resolve => require(["@/views/Education/Education.vue"],resolve),
                // component: Education
            },
            {
                path: '/education/textbook', // 教材管理
                component: resolve => require(["@/views/Education/Education_textbook.vue"],resolve),                
                // component: Educationtextbook
            },
            {
                path: '/education/master', // 大师管理
                component: resolve => require(["@/views/Education/Education_master.vue"],resolve),
                // component: Educationtex_master
            },
            {
                path: '/education/video', // 视频管理
                component: resolve => require(["@/views/Education/Educatin_course.vue"],resolve),
                // component: Educationtex_video
            },
            {
                path: '/education/courseware', // 课件管理
                component: resolve => require(["@/views/Education/Education_courseware.vue"],resolve),
                // component: Educationtex_courseware
            },


            {
                path: '/education/textbookadd', // 新增教材
                component: resolve => require(["@/views/Education/textbook/Education_textbook-add.vue"],resolve),
                // component: Textbook,
            },
            {
                path: '/textbookmusic', // 音频
                component: resolve => require(["@/views/Education/textbook/Textbook_music.vue"],resolve),
                // component: Textbookmusic,
            },
            {
                path: '/textbookmusicadd', // 音频
                component: resolve => require(["@/views/Education/textbook/Textbook_music-add.vue"],resolve),
                // component: Textbookmusicadd,
            },
            {
                path: '/textbookmusicscore', // 跟谱
                component: resolve => require(["@/views/Education/textbook/Textbook_musicscore.vue"],resolve),
                // component: Textbookmusicscore,
            },
            {
                path: '/textbookmusicscoreadd', // 新增跟谱
                component: resolve => require(["@/views/Education/textbook/Textbook_musicscore-add.vue"],resolve),
                // component: Textbookmusicscoreadd,
            },
            {
                path: '/education/masteradd', // 新增大师
                component: resolve => require(["@/views/Education/master/Education_master-add.vue"],resolve),
                // component: Master,
            },
            {
                path: '/education/courseadd', // 新增教材
                component: resolve => require(["@/views/Education/course/Educatin_course-add.vue"],resolve),
                // component: Course,
            },
            {
                path: '/education/courseclass', // 教材-课程章节
                component: resolve => require(["@/views/Education/course/Educatin_course-calss.vue"],resolve),
                // component: Courseclass,
            },
            {
                path: '/education/courseclassadd', // 教材-新增课程章节
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Courseclassadd,
            },
            {
                path: '/education/coursewareadd', // 新增课件
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Coursewareadd,
            },
            {
                path: '/education/coursechildlist', // 课件子列表
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Coursechildlist,
            },
            {
                path: '/education/coursimage', // 课件子列表-添加白班
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Coursimage,
            },
            {
                path: '/education/coursvideo', // 课件子列表-添加视频
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Coursvideo,
            },
            {
                path: '/education/coursitem', // 课件子列表-添加视频
                // component: resolve => require(["@/containers/Full"],resolve),
                component: Coursitem,
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/campus', // 校区
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/campus',
            component: Campus
        }],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/class', // 班级
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
                path: '/class',
                component: Class,
            },{
                path: '/class/newclass', //新增班级
                component: newclass,
            }
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/Users', // 师资
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/Users',
            component: Users
        }],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/vip', // 会员
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/vip',
            component: Vip
        }],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/gold', // 金币
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/gold',
            component: Gold
        }],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/setting', // 系统设置
        component: resolve => require(["@/containers/Full"],resolve),
        children: [{
            path: '/setting',
            component: Setting
        }],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
]

const router = new Router({
    // history: true,
    mode: 'history',
    // mode: 'hash',
    linkActiveClass: 'open active',   // 链接激活时触发的class
    scrollBehavior: () => ({ y: 0 }),  // 跳转到新页面，自动定位到顶端
    routes : routes
});

router.beforeEach((to, from, next) => {   // 判断路由，没匹配到跳到登陆页
    if (to.matched.length ===0) {                                    
      from.name ? next({ name:from.name }) : next('/');   
    } else {
      next();                                                                          
    }
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
      if (localStorage.getItem('token')) {  // 判断当前的token是否存在
        next();
      }
      else {
      from.name ? next({ name:from.name }) : next('/');   
      }
    }
    else {
      next();
    }
  });

export default router

