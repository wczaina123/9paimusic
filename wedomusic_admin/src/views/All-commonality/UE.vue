<template>
  <div>
    <div id="editor" type="text/plain" ></div>
  </div>
</template>
<script>
  import {Event} from '../All-commonality/bus'
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
        editor_main:'',
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },

    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });

      this.editor.addListener('keyup',function(){   // 键盘抬起事件
        var txtval=(UE.getEditor('editor').getContent());
        Event.$emit('newval',txtval)
      })

      // this.editor.setContent
      
      

    
     
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>