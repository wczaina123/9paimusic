<?php

$code=$_REQUEST['code'];

$appid = 'wx75f6ee289a0666bf';
$secret = 'c4901b5d9e7b185969cfbd2f9689f240';

$json=file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid . "&secret=" . $secret . "&code=" . $code . "&grant_type=authorization_code");
$openid=json_decode($json)->openid;

$data = array(
    "app_id" =>  "38646bd6-9cbe-48ec-ba55-8b0c5e8cb715",
    "title" => "充值蜜罐",
    "amount" => null,
    "out_trade_no" => "WX".time(),
    "openid" => $openid,
    "instant_channel" => "wx"
);

$app_secret = "98d81ca6-7601-45c9-98c1-f2c4a4b2c0e0";
$data["optional"] = null;

?>
<!DOCTYPE html>
<html>
<head>
    <title>酷熊直播蜜罐充值</title>
    <meta name="keywords" content="酷熊,直播,酷熊直播,双人直播,宇宙直播,星座,星座直播,好玩的直播,美女,主播,美女主播,网红,网红直播,网红主播,同道,同道大叔,Cos,cosplay,二次元,非主流,动漫,漫画,动漫直播,漫画直播">
    <meta name="description" content="酷熊直播是以星座和动漫、二次元为主题的双人直播APP">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="http://cdn.kuxiongzhibo.com/web/images/ico_la_64_64.ico">
    <link rel="stylesheet" href="http://cdn.kuxiongzhibo.com/web/css/bootstrap.min.css">
    <style type="text/css">
        body{background-color: #f4f5f6;}
       .title{
           padding:20px 0;
           text-align: center;
           font-size:16px;
           color:#fff;
           background-color: #89b2ea;
       }
        .text{
            padding:20px 0 10px 20px;
            font-size: 14px;
            color:#999;
            background-color: #fff;
        }
        .room-input{
            background-color: #fff;
            padding:10px 20px 30px 20px;
        }
        .room-input div input{
            height:46px;
            border:1px solid #999;
        }
        .room-input div button{
            margin-top:16px;
            font-size:14px;
        }
        .step2{
            display:none;
        }
        .userinfo{
            padding:15px;
            background-color: #89b2ea;
        }
        .roomid{
            font-size:14px;
            color:#fff;
        }
        .user{
            padding:10px 0;
            border-bottom: 1px solid #fff;
        }
        .username{
            font-size:26px;
            color:#fff;
            float:left;
        }
        .changeuser{
            float:right;
            font-size: 14px;
            text-align: right;
            color:#fff;
            padding-top:10px;
        }
        .account{
            padding:6px 0 0 0;
        }
        .acc-text{
            padding-top:10px;
            float: left;
            font-size: 16px;
            color:#fff;
        }
        .acc-number{
            float: right;
            font-size: 26px;
            color: #fff;
            text-align: right;
        }
        .prolist{
            margin-top:15px;
        }
        .proitem{
            background-color: #fff;
            padding:15px;
            margin-top:2px;
        }
        .proitem div:nth-child(1){
            float: left;
        }
        .proitem div:nth-child(1) img{
            width: 20px;
        }
        .proitem div:nth-child(2){
            float: left;
            font-size: 16px;
            color:#f5a623;
            padding-left:10px;
        }
        .proitem div:nth-child(3){
            float:right;
            font-size: 16px;;
            text-align: right;
            color:#666;
        }
        .step3_ok, .step3_error{
            text-align: center;
            padding:60px 15px 60px 15px;
            background-color: #fff;
            display:none;
        }
        .step3_ok div:nth-child(1) img,.step3_error div:nth-child(1) img{
            width:20%;
        }
        .step3_ok div:nth-child(2),.step3_error div:nth-child(2){
            font-size: 14px;
            padding-top:26px;
        }
        .step3_ok div:nth-child(3){
            padding-top: 20px;;
            font-size:30px;
            color:#ff0000;
            font-weight:bold;
        }
        .step3_ok div:nth-child(4){
            padding-top:20px;
            font-size:14px;
        }
        .step3_ok div:nth-child(5),.step3_error div:nth-child(3){
            padding-top:30px;
            text-align: center;;
        }
        .step3_ok div:nth-child(5) button,.step3_error div:nth-child(3) button{
            font-size:16px;
        }
    </style>
</head>
<body>
    <div id="error_info" class="alert alert-danger alert-dismissable" style="display: none;margin: 0;text-align: center;">
    </div>
    <div class="step1">
        <div class="title">Hi～, 欢迎充值酷熊直播蜜罐！</div>
        <div class="text">请输入你的酷熊直播房间号</div>
        <div class="room-input">
            <div>
                <input type="tel" class="form-control" id="roomid" placeholder="请输入酷熊直播房间号">
            </div>
            <div>
                <button id="submit" type="button" class="btn btn-primary btn-lg btn-block">提交房间号</button>
            </div>
        </div>
    </div>
    <div class="step2">
        <div class="userinfo">
            <div class="roomid"></div>
            <div class="user">
                <div class="username"></div>
                <div class="changeuser">更换账号</div>
                <div style="clear:both;"></div>
            </div>
            <div class="account">
                <div class="acc-text">我的蜜罐余额</div>
                <div class="acc-number"></div>
                <div style="clear:both;"></div>
            </div>
        </div>
        <div class="prolist">
            <div class="proitem" num="1">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>10 蜜罐</div>
                <div>￥1.00</div>
                <div style="clear:both;"></div>
            </div>
            <div class="proitem" num="6">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>60 蜜罐</div>
                <div>￥6.00</div>
                <div style="clear:both;"></div>
            </div>
            <div class="proitem" num="30">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>300 蜜罐</div>
                <div>￥30.00</div>
                <div style="clear:both;"></div>
            </div>
            <div class="proitem" num="98">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>980 蜜罐</div>
                <div>￥98.00</div>
                <div style="clear:both;"></div>
            </div>
            <div class="proitem" num="120">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>1200 蜜罐</div>
                <div>￥120.00</div>
                <div style="clear:both;"></div>
            </div>
            <div class="proitem" num="500">
                <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/miguan.png"></div>
                <div>5000 蜜罐</div>
                <div>￥500.00</div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </div>
    <div class="step3_ok">
        <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/zhifuchenggong.png"></div>
        <div>蜜罐购买成功，请记住订单号：</div>
        <div id="out_trade_no"></div>
        <div>如果有任何支付问题，请与客服联系</div>
        <div><button type="button" class="btn btn-primary btn-default btn-block repeatpay">继续充值</button></div>
    </div>
    <div class="step3_error">
        <div><img src="http://cdn.kuxiongzhibo.com/web/images/pay/zhifushibai.png"></div>
        <div>你取消了充值或充值失败，请重新充值</div>
        <div><button type="button" class="btn btn-primary btn-default btn-block repeatpay">重新充值</button></div>
    </div>
</body>
<script src="http://cdn.kuxiongzhibo.com/web/js/jquery.min.js"></script>
<script src="http://cdn.kuxiongzhibo.com/web/js/bootstrap.min.js"></script>
<script src="/js/jquery.md5.js"></script>
<script id='spay-script' src='https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=38646bd6-9cbe-48ec-ba55-8b0c5e8cb715'></script>
<script>
    var openid = "<?php echo($openid) ?>";
    var num = '';
    var roomid = '';
    var out_trade_no = '';
    $(document).ready(function(){
        $('#submit').click(function(){
            roomid = $("#roomid").val();
            if(roomid == ''){showHideInfo('block','请输入房间号');return;}
            getData();
        });
        $('.changeuser').click(function(){
            $("#roomid").val('');
            $(".step1").css('display','block');
            $(".step2").css('display','none');
        });
        $('.proitem').click(function(){
            num = $(this).attr("num") * 100;
            asyncPay();
        });
        $('.repeatpay').click(function(){
            getData();
            $('.step1').css('display','none');
            $('.step2').css('display','block');
            $('.step3-ok').css('display','none');
            $('.step3-error').css('display','none');
        });
    });

    function getData(){
        var url = 'http://api.kuxiongzhibo.com/checkroomid/' + roomid;
        $.get(url,function(data){
            if(data.ret != 0){
                showHideInfo('block',data.message);
            }else{
                $('.roomid')[0].innerHTML = '我的房间号：' + data.data.room_id;
                $('.username')[0].innerHTML = data.data.username;
                $('.acc-number')[0].innerHTML = data.data.d_bal;
                showHideInfo('none','');
                $(".step1").css('display','none');
                $(".step2").css('display','block');
                $('.step3_ok').css('display','none');
                $('.step3_error').css('display','none');
            }
        });
    }

    function showHideInfo(status,text){
        $("#error_info").css('display',status);
        $("#error_info")[0].innerHTML = text;
    }

    function bcPay(){
        var data = <?php echo json_encode($data)?>;
        var timestamp = Date.parse(new Date());
        out_trade_no = data['out_trade_no'];
        data['out_trade_no'] = 'weixin' + timestamp;
        data['amount'] = num;
        var sign = $.md5(data['app_id'] + data['title'] + data['amount'] + data['out_trade_no'] + '<?php echo $app_secret ?>');
        data["sign"] = sign;
        var optional = '{ "roomid": "' + roomid + '", "amount": "' + num + '" }';
        data['optional'] = JSON.parse(optional);
        BC.click(data, {
            wxJsapiFinish : function(res) {
                $('.step2').css('display','none');
                if(res.err_msg.indexOf("ok") > 0 ){
                    $('#out_trade_no')[0].innerHTML = out_trade_no;
                    $('.step3_ok').css('display','block');
                }
                else
                {
                    $('.step3_error').css('display','block');
                }
            }
        });
    }

    function asyncPay() {
        if (typeof BC == "undefined") {
            if (document.addEventListener) { // 大部分浏览器
                document.addEventListener('beecloud:onready', bcPay, false);
            } else if (document.attachEvent) { // 兼容IE 11之前的版本
                document.attachEvent('beecloud:onready', bcPay);
            }
        } else {
            bcPay();
        }
    }
</script>
</html>