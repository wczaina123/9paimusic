<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

use Common;
use OSS\Core\OssException;

include 'aliyun-oss-php-sdk-2.2.4/samples/Common.php';

$type = 'zdmlive_mark';
    
//$url = 'http://picture.service.smzdm.com:809/upload/home';
$url = 'http://testapi.9beats.com/ueditor_image_upload';
$fp = fopen($_FILES['upfile']['tmp_name'], "rb");
$buf = fread($fp, $_FILES['upfile']["size"]);

$bucket = Common::getBucketName();
$ossClient = Common::getOssClient();
$options = array();

    $filePathName = 'music_description_image/'.$_FILES['upfile']['name'];
    $ossClient->putObject($bucket, $filePathName, $buf, $options);

    $FileInfo = array(
        "state" => "SUCCESS",
        "url"   => Common::cdnURL.'/'.$filePathName,
        "title" => '图片上传',
        "original" => '',
        "type" => explode('.',$_FILES['upfile']['name'])[1],
        "size" => $_FILES['upfile']["size"],
    );
    return json_encode($FileInfo);

?>
