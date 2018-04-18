function callback(){
    try{
        var link, json, loader,
            body = (iframe.contentDocument || iframe.contentWindow.document).body,
            result = body.innerText || body.textContent || '';
        json = (new Function("return " + result))();
        link = me.options.imageUrlPrefix + json.url;
        if(json.state == 'SUCCESS' && json.url) {
            loader = me.document.getElementById(loadingId);
            loader.setAttribute('src', link);
            loader.setAttribute('_src', link);

            /*==================自己添加的代码====================*/
            var width='';
            var height='';
            // 创建对象
            var img = new Image();
            // 设置图片的src
            img.src = link;
            //console.log("link:"+link);
            img.onload = function(){
                console.log('width:'+img.width+',height:'+img.height);
                width=img.width;
                height=img.height;
                loader.setAttribute('width',width);
                loader.setAttribute('height',height);
            };
            /*===================结束========================*/

            loader.setAttribute('title', json.title || '');
            loader.setAttribute('alt', json.original || '');
            loader.removeAttribute('id');
            domUtils.removeClasses(loader, 'loadingclass');
        } else {
            showErrorLoader && showErrorLoader(json.state);
        }
    }catch(er){
        showErrorLoader && showErrorLoader(me.getLang('simpleupload.loadError'));
    }
    form.reset();
    domUtils.un(iframe, 'load', callback);
}