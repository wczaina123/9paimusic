import Vue from 'vue';
import Router from 'vue-router';

// Containers
const Full = resolve=>require(['@/containers/Full'],resolve);
// Views - Icons
const FontAwesome = resolve=>require([ '@/views/icons/FontAwesome'],resolve);
// Views
const Login = resolve=>require([ '@/views/Login/Login.vue'],resolve); // 登陆
const Logingpwd = resolve=>require([ '@/views/Login/Loginpwd.vue'],resolve);
const Logingpwdnext = resolve=>require([ '@/views/Login/Loginpwd_next.vue'],resolve);
const Telmessage = resolve=>require([ '@/views/Login/Loginpwd_tel-number.vue'],resolve);
const Newpassword = resolve=>require([ '@/views/Login/Newpassword.vue'],resolve);
const Newsignin = resolve=>require([ '@/views/Login/signin/Signin.vue'],resolve);
const Newsignin_sign = resolve=>require([ '@/views/Login/signin/Signin_next.vue'],resolve);
const AddInfo = resolve=>require([ '@/views/Header/Addinfo.vue'],resolve); //通知栏->添加通知
const MoreInfo = resolve=>require([ '@/views/Header/Moreinfo.vue'],resolve); //通知栏->更多通知
const HelpInfo = resolve=>require([ '@/views/Header/Helpinfo.vue'],resolve); //通知栏->帮助
const Home = resolve=>require([ '@/views/Home/home.vue'],resolve); //首页
// import Home from '@/views/Home/home.vue'
const recommend = resolve=>require([ '@/views/Recommend/recommend.vue'],resolve); //推荐位管理
const recommend_index = resolve=>require([ '@/views/Recommend/home.vue'],resolve);
const recommend_find = resolve=>require([ '@/views/Recommend/find.vue'],resolve);
const recommend_shop = resolve=>require([ '@/views/Recommend/shopping.vue'],resolve);

const Living = resolve=>require([ '@/views/Living/Living.vue'],resolve); // 直播管理
const addliving = resolve=>require([ '@/views/Living/livingadmin/Living_add.vue'],resolve); // 新增直播
const addgift = resolve=>require([ '@/views/Living/gift/gift_add.vue'],resolve); // 增加礼物

const Special = resolve=>require([ '@/views/Special/Special.vue'],resolve); //专栏管理
const comment = resolve=>require([ '@/views/Special/comment.vue'],resolve); //专栏管理/评论
const New_ticles = resolve=>require([ '@/views/Special/Newarticles.vue'],resolve);  // 新增文章
const Data = resolve=>require([ '@/views/Special/data.vue'],resolve); // 数据
const Specialcolumn = resolve=>require([ '@/views/Special/Specialcolumn.vue'],resolve);


// 商场
const Store = resolve=>require([ '@/views/Store/Store.vue'],resolve);
const Store_addgoods = resolve=>require([ '@/views/Store/goodslist/add_goods.vue'],resolve); // 新增商品
const Store_order = resolve=>require([ '@/views/Store/order/Store_order.vue'],resolve);   // 订单
const Store_timelimit = resolve=>require([ '@/views/Store/promotion/promotion.vue'],resolve); // 促销
const Store_category = resolve=>require([ '@/views/Store/category/category.vue'],resolve); // 品类
const Store_goods_sku = resolve=>require([ '@/views/Store/goodslist/goods_sku.vue'],resolve);// sku

const Education = resolve=>require([ '@/views/Education/Education.vue'],resolve);
const Master = resolve=>require([ '@/views/Education/master/Education_master-add.vue'],resolve);
const Textbook = resolve=>require([ '@/views/Education/textbook/Education_textbook-add.vue'],resolve); //教材管理
const Textbookmusic = resolve=>require([ '@/views/Education/textbook/Textbook_music.vue'],resolve); // 音频管理
const Textbookmusicadd = resolve=>require([ '@/views/Education/textbook/Textbook_music-add.vue'],resolve); // 新增音频
const Textbookmusicscore = resolve=>require([ '@/views/Education/textbook/Textbook_musicscore.vue'],resolve); // 跟谱管理
const Textbookmusicscoreadd = resolve=>require([ '@/views/Education/textbook/Textbook_musicscore-add.vue'],resolve); // 新增跟谱
const Course = resolve=>require([ '@/views/Education/course/Educatin_course-add.vue'],resolve); // 视频课程管理
const Courseclass = resolve=>require([ '@/views/Education/course/Educatin_course-calss.vue'],resolve); // 课程章节
const Courseclassadd = resolve=>require([ '@/views/Education/course/Educatin_course-calss-add.vue'],resolve); // 增加课程章节
const Coursewareadd = resolve=>require([ '@/views/Education/courseware/Education_courseware-add.vue'],resolve); // 新增课件
const Coursechildlist = resolve=>require([ '@/views/Education/courseware/Education_childware.vue'],resolve); // 课件子列表
const Coursimage = resolve=>require([ '@/views/Education/courseware/Education_coursimage.vue'],resolve); // 子列表-增加白班
const Coursvideo = resolve=>require([ '@/views/Education/courseware/Education_coursvideo.vue'],resolve); // 子列表-增加视频
const Coursitem = resolve=>require([ '@/views/Education/courseware/Education_courseitem.vue'],resolve); // 子列表-增加跟谱练习

const Educationtextbook = resolve=>require([ '@/views/Education/Education_textbook.vue'],resolve); // 教材管理
const Educationtex_master = resolve=>require([ '@/views/Education/Education_master.vue'],resolve); // 大师管理
const Educationtex_video = resolve=>require([ '@/views/Education/Educatin_course.vue'],resolve); // 视频管理
const Educationtex_courseware = resolve=>require([ '@/views/Education/Education_courseware.vue'],resolve); // 课件管理

const Campus = resolve=>require([ '@/views/Campus/Campus.vue'],resolve);
const Class = resolve=>require([ '@/views/Class/Class.vue'],resolve); //班级管理
const newclass = resolve=>require([ '@/views/Class/newclass.vue'],resolve);//新增班级
const Users = resolve=>require([ '@/views/Users/Users.vue'],resolve); //用户管理
const Vip = resolve=>require([ '@/views/Vip/Vip.vue'],resolve);
const Gold = resolve=>require([ '@/views/Gold/Gold.vue'],resolve);
const Setting = resolve=>require([ '@/views/Settings/Setting.vue'],resolve); // 设置
import { request } from 'http';


// const AAAdd = resolve=>require([ '@/views/Add.vue'
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
        component: Full,
        children: [{
                path: '/AddInfo',
                component: AddInfo
            }

        ]
    },
    {
        path: '/MoreInfo', // 更多通知
        component: Full,
        children: [{
                path: '/Moreinfo',
                component: MoreInfo
            }

        ]
    },
    {
        path: '/Helpinfo', //帮助
        component: Full,
        children: [{
            path: '/HelpInfo',
            component: HelpInfo
        }]
    },
    {
        path: '/index', // 首页
        component: Full,
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
        component: Full,
        children: [
            {
                path: '/recommend',
                component: recommend
            },
            {
                path: '/recommend/index',
                component: recommend_index
            },
            {
                path: '/recommend/find',
                component: recommend_find
            },
            {
                path: '/recommend/shop',
                component: recommend_shop
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/living', // 直播
        component: Full,
        children: [{
                path: '/living',
                component: Living
            },
            {
                path: '/living/livingadd',
                component: addliving
            },
            {
                // path: '/giftadd',
                path: '/giftadd',
                component: addgift,
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/special', // 专栏
        component: Full,
        children: [
            {
                path: '/special',
                component: Special,
            }, 
            {
                path: '/special/new_ticles',
                component: New_ticles,
            },
            {
                path: '/special/Specialcolumn',
                component: Specialcolumn,
            },
            {
                path: '/special/data',
                component: Data,
            },
            {
                path: '/comment',
                component: comment
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/store', // 商城
        component: Full,
        children: [
            {
                path: '/store',
                component: Store
            },
            {
                path: '/store/add_goods',
                component: Store_addgoods
            },
            {
                path: '/store/goods/sku',
                component: Store_goods_sku
            },
            {
                path: '/store/order',
                component: Store_order
            },
            {
                path: '/store/timelimit',
                component: Store_timelimit
            },
            {
                path: '/store/category',
                component: Store_category
            },
        ],
        meta: {
            title: '',
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },

    {
        path: '/education', // 教学
        component: Full,
        children: [{
                path: '/education', // 教学品类
                component: Education
            },
            {
                path: '/education/textbook', // 教材管理
                component: Educationtextbook
            },
            {
                path: '/education/master', // 大师管理
                component: Educationtex_master
            },
            {
                path: '/education/video', // 视频管理
                component: Educationtex_video
            },
            {
                path: '/education/courseware', // 课件管理
                component: Educationtex_courseware
            },


            {
                path: '/education/textbookadd', // 新增教材
                component: Textbook,
            },
            {
                path: '/textbookmusic', // 音频
                component: Textbookmusic,
            },
            {
                path: '/textbookmusicadd', // 音频
                component: Textbookmusicadd,
            },
            {
                path: '/textbookmusicscore', // 跟谱
                component: Textbookmusicscore,
            },
            {
                path: '/textbookmusicscoreadd', // 新增跟谱
                component: Textbookmusicscoreadd,
            },
            {
                path: '/education/masteradd', // 新增大师
                component: Master,
            },
            {
                path: '/education/courseadd', // 新增教材
                component: Course,
            },
            {
                path: '/education/courseclass', // 教材-课程章节
                component: Courseclass,
            },
            {
                path: '/education/courseclassadd', // 教材-新增课程章节
                component: Courseclassadd,
            },
            {
                path: '/education/coursewareadd', // 新增课件
                component: Coursewareadd,
            },
            {
                path: '/education/coursechildlist', // 课件子列表
                component: Coursechildlist,
            },
            {
                path: '/education/coursimage', // 课件子列表-添加白班
                component: Coursimage,
            },
            {
                path: '/education/coursvideo', // 课件子列表-添加视频
                component: Coursvideo,
            },
            {
                path: '/education/coursitem', // 课件子列表-添加视频
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
        component: Full,
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
        component: Full,
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
        component: Full,
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
        component: Full,
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
        component: Full,
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
        component: Full,
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