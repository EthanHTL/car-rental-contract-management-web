<template>
<d2-container type="card" better-scroll>
    <template slot="header">Header</template>
    内容
    <template slot="footer">
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
    </template>
  </d2-container>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {currentPage4: 4}
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>