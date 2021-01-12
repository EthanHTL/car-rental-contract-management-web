<template>
  <d2-container>
    <template slot="header"> 员工管理 </template>
    <d2-crud :columns="columns" :data="employees" />
    <!-- 
        @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     -->
    <el-pagination
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.total"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "employee",
  data() {
    return {
      employees: [],
      columns: [
        {
          title: "用户名",
          key: "username",
          width: 150,
        },
        {
          title: "昵称",
          key: "nickname",
        },
        {
          title: "性别",
          key: "sex",
        },
        {
          title: "住址",
          key: "addr",
        },
        {
          title: "电话",
          key: "telephone",
        },
        {
          title: "身份证号",
          key: "idCard",
        },
      ],
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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/employee", ["findAllEmployee"]),
    init() {
      this.findAllEmployee().then((res) => {
        this.employees = res;
      });
    },
  },
};
</script>