<template>
  <d2-container>
    <!-- 工具栏 -->
    <div class="tool-btn">
      <el-button
        class="screen"
        type="primary"
        size="small"
        :icon="btnIcon"
        @click="toggle"
        >{{ !showForm ? "筛选" : "收起" }}</el-button
      >
      <div class="clear"></div>
    </div>
    <el-form
      :model="searchForm"
      :inline="true"
      class="demo-form-inline tool-form"
      v-show="showForm"
    >
      <el-form-item label="合同名称:">
        <el-input
          v-model="searchForm.contractName"
          placeholder="请输入合同名称"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          v-model="searchForm.state"
          placeholder="请选择"
          clearable
          size="small"
        >
          <el-option key="1" label="待审核" value="1"> </el-option>
          <el-option key="2" label="通过" value="2"> </el-option>
          <el-option key="3" label="不通过" value="3"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="init" size="small"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain @click="reset" size="small"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <div class="container-list">
      <!-- 表格 -->
      <el-table :data="taskList" style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="contractName"
          label="合同名"
          show-overflow-tooltip
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="contractNumbers"
          label="合同编号"
        ></el-table-column>
        <el-table-column
          prop="contractUsername"
          label="客户名"
          width="130"
        ></el-table-column>
        <el-table-column label="审核状态" width="150" prop="state">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.flow!=null"
              :type="stateTagsType[scope.row.flow.state - 1]"
              disable-transitions
              >{{ stateTags[scope.row.flow.state - 1] }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="合同状态" width="150" prop="state">
          <template slot-scope="scope">
            <el-tag
                v-if="scope.row.state!=null"
              :type="stateTagsType[scope.row.state - 1]"
              disable-transitions
              >{{ contractStateTags[scope.row.state - 1] }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="150"
          prop="createTime"
          :formatter="formatterTime"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-view"
              type="info"
              @click="editDialogShow2(scope.row)"
              style="margin-right: 10px"
              >详情
            </el-link>

            <el-link
              icon="el-icon-finished"
              @click="editDialogShow(scope.row)"
              type="success"
              >进度
            </el-link>
          </template>
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
    <el-dialog title="合同" :visible.sync="contractDialog" width="1300px">
      <div v-html="renewContractForm.content"></div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "contract",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      loading: true,
      stateTags: ["待审核", "未通过", "通过"],
      contractStateTags: ["未生效", "已过期", "已生效"],
      stateTagsType: ["primary", "danger", "success"],
      taskList: [],
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
    ...mapActions("d2admin/contract", ["findPage", "renewContract"]),
    init() {
      this.loading = true;
      this.searchForm.pageSize = this.pagination.pageSize;
      this.searchForm.pageNum = this.pagination.pageNum;
      this.findPage(this.searchForm).then((res) => {
        // console.log(res);
        this.taskList = res.list;
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
    editDialogShow(row) {
      this.imgSrc = "";
      this.imgSrc =
        row.flow.state == "1"
          ? "/api/api/v1/car/contract/activitiHistory/queryProPlan?processInstanceId=" +
            row.flow.processInstanceId +
            "&f=true"
          : "/api/bpmn/contract.png";
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
  margin: 0 auto;
}
</style>