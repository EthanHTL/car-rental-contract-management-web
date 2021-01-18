<template>
  <vue-ueditor-wrap
    ref="ueditor"
    v-model="currentValue"
    :config="config"
    :destroy="true"
    @ready="ready"
    :init="init"/>
</template>

<script>
// 参考 https://github.com/HaoChuan9421/vue-ueditor-wrap
import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import config from './ueditor.config'
// import buttonD2admin from './button/d2admin'
import template from './dialogs/template/template'
Vue.component('VueUeditorWrap', VueUeditorWrap)
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      config,
      currentValue: ''
    }
  },
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      immediate: true
    },
    // 对外提供 v-model
    currentValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    init () {
      // 注册一个测试按钮
      // this.$refs.ueditor.registerButton(buttonD2admin)
      // 将ueditor的实例加入到状态管理
      this.$store.commit("d2admin/system/UPDATE_EDITOR",this.$refs.ueditor)
      // console.log(this.$refs.ueditor);
    },
    ready (editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      // this.$store.commit("d2admin/system/UPDATE_EDITOR",editorInstance)
    },
    
  }
}
</script>
