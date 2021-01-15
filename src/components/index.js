import Vue from 'vue'

import d2Container from './d2-container'
import d2LinkBtn from './d2-link-btn'


// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-link-btn', d2LinkBtn)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
<<<<<<< HEAD
Vue.component('d2-ueditor', () => import('./d2-ueditor'))
=======
Vue.component('d2-ueditor', () => import('./d2-ueditor'))
>>>>>>> f101280505917ad4e04deb6ce0ab196cce2c118f
