// 侧边列表

var items = []
var right = localStorage.getItem('right')

if(right==0){     // 机构
    items = [
        {
            name: '首页',
            url: '/index',
            icon: 'fa fa-home fa-lg mt-4'
        },
        {
            name: '推荐位管理',
            url: '/recommend',
            icon: 'fa fa-bookmark fa-lg mt-4'
        },
        {
            name: '直播管理',
            url: '/living',
            icon: 'fa fa-youtube-play fa-lg mt-4'
        },
        {
            name: '专栏管理',
            url: '/special',
            icon: 'fa fa-book fa-lg mt-4'
        },
        {
            name: '商城管理',
            url: '/store',
            icon: 'fa fa-shopping-bag fa-lg mt-4'
        },
        {
            name: '教学管理',
            url: '/education',
            icon: 'fa fa-cubes fa-lg mt-4'
        },
        {
            name: '校区管理',
            url: '/campus',
            icon: 'fa fa-university fa-lg mt-4'
        },
        {
            name: '班级管理',
            url: '/class',
            icon: 'fa fa-address-book fa-lg mt-4'
        },
        {
            name: '用户管理',
            url: '/users',
            icon: 'fa fa-flag fa-lg mt-4'
        },
        {
            name: '会员管理',
            url: '/vip',
            icon: 'fa fa-credit-card-alt fa-lg mt-4'
        },
        // {
        //     name: '金币管理',
        //     url: '/gold',
        //     icon: 'fa fa-database fa-lg mt-4'
        // },
        {
            name: '系统管理',
            url: '/setting',
            icon: 'fa fa-cog fa-lg mt-4'
        },
    ];
}

if(right==1){    // 校区
    items = [
        {
            name: '首页',
            url: '/index',
            icon: 'fa fa-home fa-lg mt-4'
        },
        // {
        //     name: '推荐位管理',
        //     url: '/recommend',
        //     icon: 'fa fa-bookmark fa-lg mt-4'
        // },
        {
            name: '直播管理',
            url: '/living',
            icon: 'fa fa-youtube-play fa-lg mt-4'
        },
        {
            name: '专栏管理',
            url: '/special',
            icon: 'fa fa-book fa-lg mt-4'
        },
        // {
        //     name: '商城管理',
        //     url: '/store',
        //     icon: 'fa fa-shopping-bag fa-lg mt-4'
        // },
        // {
        //     name: '教学管理',
        //     url: '/education',
        //     icon: 'fa fa-cubes fa-lg mt-4'
        // },
        // {
        //     name: '校区管理',
        //     url: '/campus',
        //     icon: 'fa fa-university fa-lg mt-4'
        // },
        {
            name: '班级管理',
            url: '/class',
            icon: 'fa fa-address-book fa-lg mt-4'
        },
        {
            name: '用户管理',
            url: '/users',
            icon: 'fa fa-flag fa-lg mt-4'
        },
        // {
        //     name: '会员管理',
        //     url: '/vip',
        //     icon: 'fa fa-credit-card-alt fa-lg mt-4'
        // },
        // {
        //     name: '金币管理',
        //     url: '/gold',
        //     icon: 'fa fa-database fa-lg mt-4'
        // },
        // {
        //     name: '系统管理',
        //     url: '/setting',
        //     icon: 'fa fa-cog fa-lg mt-4'
        // },
    ]
    
}


export default {items}