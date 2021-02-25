<template>
  <d2-container>
    <template slot="header"> 角色管理 </template>
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
        @click="createMenuHandle"
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
      ref="pageForm"
    >
      <el-form-item label="名称">
        <el-input
          v-model="pageForm.apiName"
          placeholder="请输入名称"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="接口">
        <el-input
          v-model="pageForm.url"
          placeholder="请输入接口"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="init" size="small"
          >搜索</el-button
        >
        <el-button
          type="info"
          plain
          @click="resetRoleForm('pageForm')"
          size="small"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 新增角色 -->
    <el-dialog
      :title="isInsert ? '新增角色' : '修改角色'"
      :visible.sync="roleFormVisible"
    >
      <el-form :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleZH" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="备注">
          <el-input type="textarea" v-model="roleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="assignPermissionVisible">
      <el-button
        type="primary"
        size="small"
        @click="assignSaveHandle"
        class="saveBtn"
        >保存</el-button
      >
      <div class="clear"></div>
      <div class="tree-assign">
        <el-row :gutter="10">
          <!-- 菜单权限 -->
          <el-col :span="12">
            <p>菜单权限</p>
            <el-tree
              :props="menuProps"
              :data="menuData"
              node-key="id"
              ref="menuTree"
              show-checkbox
              default-expand-all
            >
            </el-tree>
          </el-col>
          <!-- 接口权限 -->
          <el-col :span="12">
            <p>接口权限</p>
            <el-tree
              :props="apiProps"
              :data="apiData"
              node-key="id"
              ref="apiTree"
              show-checkbox
              default-expand-all
            >
            </el-tree>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="roleList" class="role-table">
      <el-table-column prop="roleZH" label="角色名" width="180">
      </el-table-column>
      <el-table-column prop="roleName" label="角色标识" width="100">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="100">
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
      <el-table-column
        label="创建时间"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link icon="el-icon-edit" @click="updateMenuHandle(scope.row)"
            >编辑
          </el-link>
          <el-link icon="el-icon-edit" @click="assignDialogHandle(scope.row)"
            >权限分配</el-link
          >
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
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";
import log from "@/libs/util.log";
export default {
  name: "role",
  components: {},
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      roleList: [],
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        roleZH: "",
        flag: "",
        pageNum: "1",
        pageSize: "5",
      },
      roleFormVisible: false,
      isInsert: false,

      roleForm: {
        roleName: "1",
        roleZH: "1",
        remark: "1",
      },
      assignPermissionVisible: false,
      filterText: "",
      menuProps: {
        label: "menuName",
        children: "children",
      },
      menuData: [],
      apiProps: {
        children: "children",
        label: "apiName",
      },
      apiData: [],
      checkMenus: [],
      checkApis: [],
      permissionForm: {
        apiIds: [],
        menuIds: [],
        id: "",
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/role", [
      "showRole",
      "assignPermission",
      "createRole",
      "updateRole",
      "deleteRole",
      "updateRolePermission",
      "getRolePermission",
    ]),
    ...mapActions("d2admin/sysmenu", ["showMenuTree"]),
    ...mapActions("d2admin/sysapi", ["showApisTree"]),
    init() {
      this.showRole().then((res) => {
        this.roleList = res;
      });
      this.showMenuTree().then((res) => {
        // console.log(res);
        this.menuData = res;
      });
      this.showApisTree().then((res) => {
        // console.log(res);
        this.apiData = res;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    handleSizeChange(val) {
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.init();
    },
    changeSwitch(row) {
      console.log(row);
    },
    resetMenuForm(formName) {
      this.$refs[formName].resetFields();
    },
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
    handleDelete(row) {
      this.deleteRole(row).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.init();
      });
    },
    createMenuHandle() {
      this.roleForm.roleZH = "";
      this.roleForm.roleName = "";
      this.roleForm.remark = "";
      this.isInsert = true;
      this.roleFormVisible = true;
    },
    updateMenuHandle(row) {
      this.roleForm = JSON.parse(JSON.stringify(row));
      this.isInsert = false;
      this.roleFormVisible = true;
    },
    comfirmHandle() {
      if (this.isInsert) {
        this.createRole(this.roleForm).then(() => {
          this.init();
          this.roleFormVisible = false;
        });
      } else {
        this.updateRole(this.roleForm).then(() => {
          this.init();
          this.roleFormVisible = false;
        });
      }
    },
    assignDialogHandle(row) {
      this.permissionForm.id = row.id;
      var apii = [];
      var menuu = [];
      var data = [];
      data.push(row);
      this.getRolePermission(data)
        .then((res) => {
          let api;
          let menu;
          for (api in res.apiResponseInfos) {
            apii.push(res.apiResponseInfos[api].id);
          }
          for (menu in res.menuResponseInfos) {
            menuu.push(res.menuResponseInfos[menu].id);
          }
          console.log(apii);
          console.log(menuu);
          // console.log(this.checkMenus);
          this.assignPermissionVisible = true;
        })
        .then(() => {
          this.$refs.apiTree.setCheckedKeys([]);
          this.$refs.apiTree.setCheckedKeys(apii);
          this.$refs.menuTree.setCheckedKeys([]);
          this.$refs.menuTree.setCheckedKeys(menuu);
        });
    },
    assignSaveHandle() {
      this.permissionForm.apiIds = this.$refs.apiTree.getCheckedKeys();
      this.permissionForm.menuIds = this.$refs.menuTree.getCheckedKeys();
      // console.log(this.permissionForm);
      this.assignPermission(this.permissionForm).then((res) => {
        // console.log(res);
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.assignPermissionVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clear {
  clear: both;
}
.tool-btn {
  width: 65%;
  padding: 5px;
  margin: 0 auto;
  .createBtn {
    float: right;
    margin: 10px 5% auto auto;
  }

  .screen {
    // float: right;
    margin: 10px 3%;
  }
}
.role-table {
  width: 55%;
  margin: 10px auto 0 auto;
}
.saveBtn {
  float: right;
  margin: 0 10% 20px auto;
}
.el-row {
  width: 100%;
  // margin: 0 auto;
  .el-col {
    text-align: center;
    font-size: 16px;
  }
}
.tree-assign {
  margin: 0 auto;
  width: 80%;
}
</style>