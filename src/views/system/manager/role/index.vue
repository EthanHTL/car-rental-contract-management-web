<template>
  <d2-container>
    <template slot="header"> 角色管理 </template>
    <el-form :model="searchForm" :inline="true" class="demo-form-inline">
      <el-form-item label="角色名称:">
        <el-input
          v-model="searchForm.roleZH"
          placeholder="请输入角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="searchForm.flag" placeholder="请选择">
          <el-option key="1" label="启用" value="1"> </el-option>
          <el-option key="0" label="禁用" value="0"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="dictInsert = true"
          >搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="dictInsert = true"
          >重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="insertFormVisible = true"
          >新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="insertFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleZH" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="备注" >
          <el-input type="textarea" v-model="roleForm.remark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertRoleFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="updateFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleZH" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="备注" >
          <el-input type="textarea" v-model="roleForm.remark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRoleFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="assignPermissionVisible">
      <el-button type="primary" @click="insertRoleFormVisible"
          >保存</el-button>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-row :gutter="10">
        <!-- 菜单权限 -->
        <el-col :span="12">
          <p>菜单权限</p>
          <el-tree
            :props="menuProps"
            :data="menuData"
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
            show-checkbox
            default-expand-all>
          </el-tree>
        </el-col>
      </el-row>



    </el-dialog>

    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%">
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
          <el-link icon="el-icon-edit"  @click="updateFormVisible = true">编辑 </el-link>
          <el-link icon="el-icon-edit" @click="assignPermissionVisible = true">权限分配</el-link>
          <el-link><i class="el-icon-view el-icon--right"></i> 查看 </el-link>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "role",
  components: {},
  data() {
    return {
      roleList: [],
      pagination: {
        currentPage: 1,
        pageSize: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      searchForm: {
        roleZH: "",
        flag: "",
      },
      insertFormVisible: false,
      updateFormVisible: false,
      roleForm:{
        roleName:"1",
        roleZH:"1",
        remark:"1",
      },
      assignPermissionVisible: false,
      filterText:"",
      menuProps:{
        label: 'menuName',
        children:"children"
      },
      menuData:[],
      apiProps:{
        children: 'children',
        label: 'apiName'
      },
      apiData:[],
      assignPermission:{
        
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/role", ["showRole"]),
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
    insertRoleFormVisible(){
      
      this.insertFormVisible = false
    },
    updateRoleFormVisible(){
    
      this.updateFormVisible = false
    }

  },
};
</script>