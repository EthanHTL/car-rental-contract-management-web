<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <br>
    <a @click="securitytest">测试有权限</a><br>
    <a @click="securitytest2">测试无权限</a>

     <d2-crud
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
  </d2-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'page1',
  data() {
    return {
      columns: [
        {
          title: '卡密',
          key: 'key',
          width: 320
        },
        {
          title: '面值',
          key: 'value'
        },
        {
          title: '管理员',
          key: 'admin'
        },
        {
          title: '创建时间',
          key: 'dateTimeCreat'
        },
        {
          title: '使用时间',
          key: 'dateTimeUse'
        }
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
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
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      DEMO_BUSINESS_TABLE_1_LIST({
        ...this.pagination
      }).then(res => {
        this.data = res.list
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
