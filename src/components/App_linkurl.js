

// 这是接口

var linkurl = {
    app_download:"http://a.app.qq.com/o/simple.jsp?pkgname=com.ken.ninebeats",      // 跳转下载链接

    app_list:"http://api.9beats.com/home_live_list" , // userid    page  直播列表页

    app_validation:"http://api.9beats.com/get_appointment",  // liveid，userid  分享页

    app_living:"http://api.9beats.com/get_live_info_web",   // id  直播间

    app_course:"http://api.9beats.com/app_lesson_detail", // userid   id   课程列表

    app_coursemain:"http://api.9beats.com/app_lesson_video_list", // userid   id   课程详情

    app_wxjsdk:"http://api.9beats.com/get_wx_shared_sign" // 这是微信调用jssdk
}  

export default linkurl