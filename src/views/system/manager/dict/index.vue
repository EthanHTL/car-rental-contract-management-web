<template>
  <d2-container>
    Hello World

    <d2-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      selection-row
    />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";

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
          key: "descript",
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
        pageCount: 6,
        pageSizes: [5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        pageNum: "1",
        pageSize: "5",
      },
      rowHandle: {
        custom: [
          {
            text: "按钮",
            type: "text",
            size: "small",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("d2admin/dict", ["showDict"]),
    paginationCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      this.showDict(this.pageForm).then((res) => {
        this.data = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
        // console.log(res);
      });
    },
    handleSizeChange(val) {
      // 更改页码大小操作
      //   console.log(`每页 ${val} 条`);
      this.pageForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      //
      //   console.log(`当前页: ${val}`);
      this.pageForm.pageNum = val;
      this.fetchData();
    },
  },
};
</script>