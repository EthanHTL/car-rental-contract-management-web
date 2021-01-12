<template>
  <d2-container>
    Hello World

    <d2-crud :columns="columns" :data="data" :rowHandle="rowHandle" selection-row/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </d2-container>
</template>

<script>
export default {
  name: "dict",
  data() {
    return {
      columns: [
        {
          title: "字典名称",
          key: "name",
          width: 150,
        },
        {
          title: "代码",
          key: "code",
        },
        {
          title: "备注",
          key: "remark",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
      ],
      data: [
        {
          name: "1",
          code: "1",
          remark: "1",
          createTime: "",
        },
        {
          name: "2",
          code: "2",
          remark: "2",
          createTime: "",
        },
      ],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 1,
        small: true,
        pageCount:6,
        pageSizes:[5,20,50],
        pageSize: 5,
        total: 500
      },
      rowHandle: {
        custom: [
          {
            text: "按钮",
            type: "warning",
            size: "small",
            emit: "custom-emit-1",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    paginationCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
    },
  },
};
</script>