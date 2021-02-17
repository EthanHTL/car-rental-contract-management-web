<template>
  <d2-container>
    <!-- 工具栏 -->
    <el-form :model="searchForm" :inline="true" class="demo-form-inline">
      <el-form-item label="合同名称:">
        <el-input
          v-model="searchForm.contractName"
          placeholder="请输入合同名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchForm.state" placeholder="请选择">
          <el-option key="1" label="启用" value="1"> </el-option>
          <el-option key="0" label="禁用" value="0"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="dictInsert = true"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="dictInsert = true"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="taskList" style="width: 100%" v-loading="loading" >
      <el-table-column prop="contractName" label="合同名" width="180">
      </el-table-column>
      <el-table-column prop="contractNumbers" label="合同编号" width="100">
      </el-table-column>
      <el-table-column prop="payment" label="支付方式" width="100">
      </el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间1"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            icon="el-icon-edit"
            @click="editDialogShow(scope.$index, scope.row)"
            >审核进度
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="流程进度"
      :visible.sync="processDialog"
      width="1300px">
      <img :src="imgSrc" alt="" height="500px">
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "",
  data() {
    return {
      loading: true,
      taskList: [],
      editDialog: false,
      auditTaks: {
        content: "你是傻子吧，没多得了",
      },
      searchForm: {
        contractName: "",
        state: "",
      },
      processDialog:false,
      imgSrc:''
    };
  },
  created() {
      this.loading = true
      this.taskList = []
      this.init();
  },
  methods: {
    ...mapActions("d2admin/contract", ["myStart"]),
    init() {
        
      this.myStart().then((res) => {
        this.taskList = res;
        this.loading = false
        console.log(res);
      });
    },
    editDialogShow(index, row) {
      
      this.imgSrc = 'http://localhost:9090/api/v1/car/contract/activitiHistory/queryProPlan?processInstanceId='+row.taskInfo.processInstanceId+'&f=true'
      this.processDialog = true;
    },
    auditTask(state, remark) {
      var data = {
        taskId: this.auditTaks.taskInfo.taskId,
        state: state,
        remark: remark,
      };
      console.log(data);
      //  this.editDialog = false;
      this.completeTask(data).then((res) => {
        console.log(res);
        this.editDialog = false;
      });
    },

    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
  },
};
</script>