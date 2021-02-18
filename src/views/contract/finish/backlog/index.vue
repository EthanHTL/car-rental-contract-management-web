<template>
  <d2-container>
    <!-- 工具栏 -->
    <div class="tool-btn">
      <el-button class="screen" type="primary" size="small" :icon="btnIcon" @click="toggle">{{!showForm ?'筛选':'收起'}}</el-button>
      <div class="clear"></div>
    </div>
    <el-form :model="searchForm" :inline="true" class="demo-form-inline tool-form" v-show="showForm">
      <el-form-item label="合同名称:">
        <el-input
          v-model="searchForm.contractName"
          placeholder="请输入合同名称"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchForm.state" placeholder="请选择" size="small">
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
    </div>

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
      btnIcon: 'el-icon-arrow-down',
      showForm:false,
      loading: false,
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
    this.taskList = []
    this.init();
  },
  methods: {
    ...mapActions("d2admin/contract", ["myTaskList","completeTask"]),
    init() {
      this.loading  = true
        this.myTaskList().then((res) => {
          this.taskList = res;
          this.loading  = false
        });
    },
    toggle: function(){
      this.btnIcon = this.showForm ? 'el-icon-arrow-down': 'el-icon-arrow-up'
      this.showForm = !this.showForm;
    },
    reset(){
      this.searchForm =  {
        contractName: "",
        state: "",
      }
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
        this.completeTask(data).then(res =>{
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.editDialog = false;
            this.init();
        })
    },
    
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss" scoped>
.tool-btn{
  width: 100%;
  padding: 5px;
  .clear{
    clear: both;
  }
  .screen{
    // float: right;
    margin: 10px 3%;
  }
}

.tool-form{
  max-width: 90%;
  margin: 10px auto 10px 6%;
}

.container-list{
    max-width: 90%;
    margin: 0 auto;
}
</style>