<template>
  <d2-container>
    <div class="container-list">
      <!-- 表格 -->
      <el-table :data="messageList" style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column prop="vehicleNumber" label="车辆编号"></el-table-column
        ><el-table-column prop="email" label="邮箱"></el-table-column
        ><el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column
          label="预约时间"
          width="150"
          prop="appointmentTime"
          :formatter="formatterTime"
        >
        </el-table-column>
        <el-table-column prop="message" label="信息"></el-table-column>
        <el-table-column
          label="创建时间"
          width="150"
          prop="createTime"
          :formatter="formatterTime"
        >
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total,sizes, prev, pager, next,  jumper "
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog title="流程进度" :visible.sync="processDialog" width="1300px">
      <img :src="imgSrc" alt="" />
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "message",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      loading: true,
      stateTags: ["待审核", "未通过", "通过"],
      stateTagsType: ["primary", "danger", "success"],
      messageList: [],
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      renewContractForm: {
        contractName: "",
        content: "",
      },
      editDialog: false,
      auditTaks: {
        content: "你是傻子吧，没多得了",
      },
      searchForm: {
        contractName: "",
        state: "",
        pageSize: 10,
        pageNum: 1,
      },
      value1: [],
      processDialog: false,
      contractRenewDialog: false,
      contractDialog: false,
      imgSrc: "",
    };
  },
  created() {
    this.taskList = [];
    this.init();
  },
  methods: {
    ...mapActions("d2admin/message", ["findPage"]),
    init() {
      this.loading = true;
      this.searchForm.pageSize = this.pagination.pageSize;
      this.searchForm.pageNum = this.pagination.pageNum;
      this.findPage(this.searchForm).then((res) => {
        this.messageList = res.list;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
        this.loading = false;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    editDialogShow(index, row) {
      this.imgSrc = "";
      this.imgSrc =
        row.state == "1"
          ? "http://127.0.0.1:9090/api/v1/car/contract/activitiHistory/queryProPlan?processInstanceId=" +
            row.taskInfo.processInstanceId +
            "&f=true"
          : "http://8.131.59.205:9090/bpmn/contract.png";
      this.processDialog = true;
    },
    editDialogShow2(row) {
      this.renewContractForm = JSON.parse(JSON.stringify(row));
      this.contractDialog = true;
    },
    reset() {
      this.searchForm = {
        contractName: "",
        state: "",
      };
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.init();
    },
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss" scoped>
.tool-btn {
  width: 100%;
  padding: 5px;
  .clear {
    clear: both;
  }
  .screen {
    // float: right;
    margin: 10px 3%;
  }
}

.tool-form {
  max-width: 90%;
  margin: 10px auto 10px 6%;
}

.container-list {
  max-width: 90%;
  margin: 0 auto;
}
.pagination {
  width: 50%;
  margin: 15px auto 0 auto;
}
</style>