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