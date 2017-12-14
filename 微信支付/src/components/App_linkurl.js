// 这是接口

var linkurl = {
    app_download:"http://a.app.qq.com/o/simple.jsp?pkgname=com.ken.ninebeats",  // 下载链接

    app_returnapp:"jiupaipeinilian://ninebeatsteachertv.jiupai.com",        // 跳转到app

    app_login : "http://testapi.9beats.com/login",  // phone，password，type(h5)

    app_moneyList : "http://testapi.9beats.com/get_coin_goods",  // f(wx)   金币价格列表

    app_myMoney : "http://testapi.9beats.com/get_user_coin",  // user_id (用户id)  token ／／ 用户金币余额

    app_moneyDetail : "http://testapi.9beats.com/get_coin_detail", //user_id, page	 金币详情页

    app_getyerMoney : "http://testapi.9beats.com/get_vip_goods",  // f  (wx)    年费会员的价格

    app_getOrder : "http://testapi.9beats.com/coin_recharge"  ,   // user_id  goods_id  f(h5)  token

    app_getsign : "http://testapi.9beats.com/get_beecloud_sign" , // user_id   token  order_no  生成sign

    app_openid :"http://testapi.9beats.com/get_wx_open_id"  // 空
}


export default linkurl