/*
    token:都会存在
    
    page:分页
*/



var main = "http://test_duolaixue_admin.9beats.com/"; // 测试
// var main = "http://duolaixue_admin.9beats.com/"; // 正式


var linkurl = {


    token: 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ==.eyJpc3MiOiJEbyIsImF1ZCI6IkFwaSIsIm1lY2hhbmlzbSI6MSwic2Nob29sIjowLCJleHBpcmVkIjoxNTQ4NzQ1MTA5LCJ1c2VyIjoiMSJ9.79a6bba4edd65632570701114dfbcf4e936c772f049bac3c713bd0c53d836e0f',
    getosstoken: "http://service.9beats.com/getalisign.php", //get 请求
    uplodeimg: "../../../static/img/zhanwei.png",

    ossurl: 'http://cdn.9beats.com/', //  oss仓库地址
    osspost: 'http://9beats.oss-cn-beijing.aliyuncs.com', // oss post

    /*教学品类*/
        get_category_list: main + 'get_teaching_materials_category_list', 
        handle_ategory: main + 'handle_teaching_materials_category', 
        delete_category: main + 'delete_teaching_materials_category', 
        get_master_list: main + 'get_master_list', 
        delete_master: main + 'delete_master', 
        handle_master: main + 'handle_master', 
        get_master_detail: main + 'get_master_detail', 
        teaching_materials: main + 'teaching_materials_sort', 
        get_materials_list: main + 'get_teaching_materials_list', 
        get_teaching_materials_detail: main + 'get_teaching_materials_detail', 
        delete_teaching_materials: main + 'delete_teaching_materials', 
        get_teaching_materials_resource_detail: main + 'get_teaching_materials_resource_detail', 
        get_teaching_materials_resource_list: main + 'get_teaching_materials_resource_list', 
        handle_teaching_materials_resource: main + 'handle_teaching_materials_resource', 
        delete_teaching_materials_resource: main + 'delete_teaching_materials_resource', 
        get_video_course_detail: main + 'get_video_course_detail', 
        get_video_course_list: main + 'get_video_course_list', 
        handle_video_course: main + 'handle_video_course', 
        delete_video_course: main + 'delete_video_course', 
        video_course_push_home: main + 'video_course_push_home', 
        get_video_course_resource_list: main + 'get_video_course_resource_list',
        handle_video_course_resource: main + 'handle_video_course_resource',
        delete_video_course_resource: main + 'delete_video_course_resource', 
        get_video_course_resource_detail: main + 'get_video_course_resource_detail',
        get_course_ware_list: main + 'get_course_ware_list', 
        handle_course_ware: main + 'handle_course_ware', 
        get_course_ware_detail: main + 'get_course_ware_detail', 
        delete_course_ware: main + 'delete_course_ware',
        get_course_ware_resource_list: main + 'get_course_ware_resource_list', 
        handle_course_ware_resource: main + 'handle_course_ware_resource', 
        delete_course_ware_resource: main + 'delete_course_ware_resource', 
        get_course_ware_resource_detail: main + 'get_course_ware_resource_detail',
        handle_teaching_materials : main + 'handle_teaching_materials', 
        get_course_homework : main + 'get_course_homework',
        course_homework : main + 'course_homework',

    /*直播*/
        get_live_list : main + 'get_live_list',
        get_live_detail : main + 'get_live_detail',
        handle_live : main + 'handle_live',
        stop_start_live: main + 'stop_start_live',
        delete_live : main + 'delete_live',
        get_live_white_list: main +'get_live_white_list',
        add_live_white : main + 'add_live_white',
        delete_live_white : main + 'delete_live_white',
        get_live_gift_list : main + 'get_live_gift_list',
   

    /*商城*/
        get_goods_category_list: main + 'get_goods_category_list',  
        handle_goods_category: main + 'handle_goods_category', 
        delete_goods_category : main + 'delete_goods_category', 
        get_goods_category_detail : main + 'get_goods_category_detail',
        goods_shelve : main + 'goods_shelve',
        delete_goods : main + 'delete_goods',  
        update_sku : main + 'update_sku',
        get_goods_list : main + 'get_goods_list',
        get_goods_detail : main + 'get_goods_detail',
        handle_goods : main + 'handle_goods', 
        get_order_list: main + 'get_order_list',
        get_express_company: main + 'get_express_company',
        order_delivery : main +'order_delivery',
        get_goods_time_limit_list : main + 'get_goods_time_limit_list',  
        shelve_goods_time_limit : main + 'shelve_goods_time_limit',
        delete_goods_time_limit : main + 'delete_goods_time_limit', 	
        push_goods_time_limit : main + 'push_goods_time_limit' ,
        handle_goods_time_limit : main + 'handle_goods_time_limit', 
        get_goods_package_list : main + 'get_goods_package_list', 
        delete_goods_package : main + 'delete_goods_package', 
        shelve_goods_package : main + 'shelve_goods_package',
        handle_goods_package : main + 'handle_goods_package', 


    /*系统管理*/
        get_mechanism_detail: main + 'get_mechanism_detail', 
        update_mechanism_info: main + 'update_mechanism_info', 
        get_mechanism_finance_detail: main + 'get_mechanism_finance_detail', 
        update_mechanism_finance: main + 'update_mechanism_finance', 
        get_mall_aptitude_info: main + 'get_mall_aptitude_info', 
        update_mall_aptitude: main + 'update_mall_aptitude', 
        get_brand_list: main + 'get_brand_list', 
        handle_brand: main + 'handle_brand', 
        get_brand_detail: main + 'get_brand_detail', 
        get_supplier_list: main + 'get_supplier_list',
        handle_supplier: main + 'handle_supplier', 
        get_supplier_detail: main + 'get_supplier_detail',

    /*推荐位管理*/
        get_recommend_module_all_list: main + 'get_recommend_module_all_list',
        get_recommend_module_sub_list: main + 'get_recommend_module_sub_list', 
        shelves_recommend_module: main + 'shelves_recommend_module',
        sort_recommend_module: main + 'sort_recommend_module',
        get_recommend_module_content_all_list: main + 'get_recommend_module_content_all_list',
        get_recommend_module_content_sub_list: main + 'get_recommend_module_content_sub_list',
        get_recommend_module_content_detail: main + 'get_recommend_module_content_detail',
        handle_recommend_module_content: main + 'handle_recommend_module_content',
        shelves_recommend_module_content: main + 'shelves_recommend_module_content',
        delete_recommend_module_content: main + 'delete_recommend_module_content',
        sort_recommend_module_content: main + 'sort_recommend_module_content',
        handle_column_content:main+'handle_column_content',
        get_column_category_list:main+'get_column_category_list',
        get_column_category_detail:main+'get_column_category_detail',
        handle_column_category:main+'handle_column_category',
        delete_column_category:main+'delete_column_category',
        get_column_content_list:main+'get_column_content_list',
        get_column_content_detail:main+'get_column_content_detail',
        delete_column_content:main+'delete_column_content',
        push_column_content:main+'push_column_content',

    /*校区管理*/
        get_school_code_info:main+'get_school_code_info',
        update_school_code:main+'update_school_code',
        update_school_note:main+'update_school_note',
        get_school_list:main+'get_school_list',
        get_school_detail:main+'get_school_detail',
        handle_examine:main+'handle_examine',
        update_school:main+'update_school',

    /*教室*/
        get_classroom_list : main + 'get_classroom_list',
        get_classroom_detail : main + 'get_classroom_detail',
        handle_classroom  : main + 'handle_classroom',
        delete_classroom : main + 'delete_classroom',
        get_class_list : main + 'get_class_list',
        handle_class : main + 'handle_class',
        delete_class : main + 'delete_class',
        get_class_detail : main + 'get_class_detail',
        

    /*专栏*/
         get_column_content_list : main + 'get_column_content_list',
         handle_column_category : main + 'handle_column_category',
         get_column_category_detail : main +'get_column_category_detail',

    /*会员*/
         get_vip_config_detail : main + 'get_vip_config_detail',
         update_vip_config_price : main + 'update_vip_config_price',
         get_vip_all_list : main + 'get_vip_all_list',
         update_vip_config_content : main + 'update_vip_config_content',

    /*用户管理*/
         get_user_tag_list : main + 'get_user_tag_list',
         handle_user_tag : main + 'handle_user_tag',
         delete_user_tag : main + 'delete_user_tag',
         get_teacher_list : main + 'get_teacher_list',
         get_blacklist_list: main + 'get_blacklist_list',
         get_teacher_detail: main + 'get_teacher_detail',
         update_teacher_user:main + 'update_teacher_user',
         get_teacher_join_qrcode: main + 'get_teacher_join_qrcode',
         get_student_list: main + 'get_student_list',
         get_student_detail : main + 'get_student_detail',
         get_mechanism_school_teacher_count : main + 'get_mechanism_school_teacher_count'


}

export default linkurl