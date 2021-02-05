// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'


// D2-Crud 表格组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import D2Crud from '@d2-projects/d2-crud'

Vue.use(ElementUI)
Vue.use(D2Crud)

// 时间处理
import dayjs from 'dayjs'

// 定义全局时间戳过滤器
Vue.filter('formatDate', function (value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
Date.prototype.format = function(fmt) { 
  var o = { 
  "M+" : this.getMonth()+1,                 //月份 
  "d+" : this.getDate(),                    //日 
  "h+" : this.getHours(),                   //小时 
  "m+" : this.getMinutes(),                 //分 
  "s+" : this.getSeconds(),                 //秒 
  "q+" : Math.floor((this.getMonth()+3)/3), //季度 
  "S" : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
  fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
  if(new RegExp("("+ k +")").test(fmt)){
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  }
  }
  return fmt; 
 }

// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    '$route.matched'(val) {
      const _side = menuAside.filter(menu => menu.path === val[0].path)
      this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
    }
  }
}).$mount('#app')
