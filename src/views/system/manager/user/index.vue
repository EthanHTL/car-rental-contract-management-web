<template>
  <d2-container>
    <template slot="header"> 员工管理 </template>
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
      <el-button
        class="createBtn"
        type="primary"
        size="small"
        >新增</el-button
      >
      <div class="clear"></div>
    </div>
    <!-- 搜索条件 -->
    <el-form
      :model="pageForm"
      :inline="true"
      class="demo-form-inline tool-form"
      v-show="showForm"
    >
      <el-form-item label="名称:">
        <el-input
          v-model="pageForm.username"
          placeholder="请输入用户名"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="init" size="small"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="employees" style="width: 70%; margin:0 auto">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.nickname }}</p>
            <p>身份证号: {{ scope.row.idCard }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100">
        <template slot-scope="scope">
          {{scope.row.sex == '1' ? '男':'女'}}
        </template>
        </el-table-column>
      <el-table-column prop="addr" label="地址" width="200"> </el-table-column>
      <el-table-column prop="telephone" width="150" label="电话">
      </el-table-column>
      <el-table-column
        label="注册时间"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.flag"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="info" @click="handleEdit(scope.row)">分配角色</el-link>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.row)"
            ><el-link icon="el-icon-delete" type="danger" slot="reference"
              >删除
            </el-link>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <!-- 新增员工 -->
    <el-dialog title="分配角色" width="400px" :visible.sync="userFormVisible">
      <el-checkbox-group v-model="checkRoleList" class="role-list">
        <el-checkbox v-for="item in roleList" :label="item.id" :key="item.id">{{
          item.roleZH
        }}</el-checkbox>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertUserRoleBtn">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "sysuser",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      employees: [],
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        pageNum: "1",
        pageSize: "2",
        username: "",
      },
      checkRoleList: [],
      roleList: [],
      rowUser: {},
      userFormVisible: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/employee", ["findUserPage"]),
    ...mapActions("d2admin/dict", ["showDictDetail"]),
    ...mapActions("d2admin/role", ["assignRole", "getUserRoles", "showRole"]),
    init() {
      this.findUserPage(this.pageForm).then((res) => {
        this.employees = res.list;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
      this.showRole().then((res) => {
        this.roleList = res;
      });
    },
    handleSizeChange(val) {
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.init();
    },
    changeSwitch(scope) {
      console.log(scope);
    },
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
    insertEmployeeFormVisible() {
      this.employeeFormVisible = false;
    },
    handleEdit(row) {
      this.checkRoleList = [];
      this.rowUser = row;
      this.getUserRoles(row).then((res) => {
        var i = 0;
        for (i; i < res.length; i++) {
          this.checkRoleList.push(res[i].id);
        }
        this.userFormVisible = true;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    handleDelete() {},
    insertUserRoleBtn() {
      var data = this.rowUser;
      var roleList = [];
      var i = 0;
      for (i; i < this.checkRoleList.length; i++) {
        roleList.push({ id: this.checkRoleList[i] });
      }
      data.roleList = roleList;
      this.assignRole(data).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.userFormVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 50%;
  margin: 15px auto 0 auto;
}
</style>