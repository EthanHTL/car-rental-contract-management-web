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
    <el-table :data="taskList" style="width: 100%">
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
        label="创建时间"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link icon="el-icon-edit" @click="editDialogShow(scope.$index, scope.row)"
            >审核
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增角色 -->
    <el-dialog title="审核合同" :visible.sync="editDialog">
      <div v-html="auditTaks.content"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auditTask(1,'审核通过')">通过</el-button>
        <el-button type="primary" @click="auditTask(0,'审核不通过')">不通过</el-button>
      </div>
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
      taskList: [],
      editDialog: false,
      auditTaks: {
          content:'你是傻子吧，没多得了'
      },
      searchForm: {
        contractName: "",
        state: "",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/contract", ["myTaskList","completeTask"]),
    init() {
      this.myTaskList().then((res) => {
        this.taskList = res;
        console.log(res);
      });
    },
    editDialogShow(index,row) {
        console.log(row);
        this.auditTaks = row
      this.editDialog = true;
    },
    auditTask(state,remark){
        var data = {
            taskId: this.auditTaks.taskInfo.taskId,
            state: state,
            remark: remark
        }
        console.log(data);
        //  this.editDialog = false;
        this.completeTask(data).then(res =>{
            console.log(res);
            this.editDialog = false;
        })
    },
    
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
  },
};
</script>