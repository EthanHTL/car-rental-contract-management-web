<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <br>
    <a @click="securitytest">测试有权限</a><br>
    <a @click="securitytest2">测试无权限</a>
  </d2-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'page1',
  data() {
    return {}
  },
  methods: {
    ...mapActions('d2admin/user', [
      'test','test2'
    ]),
    securitytest() {
      this.test()
    },
    securitytest2() {
      this.test2({
        pageNum : 1,
        pageSize : 1
      })
    }
  }
}
</script>
