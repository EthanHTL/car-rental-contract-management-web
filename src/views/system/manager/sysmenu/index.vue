<template>
  <d2-container>
    <template slot="header"> 菜单管理 </template>

    <!-- 筛选 -->
    <el-form :model="searchForm" :inline="true" class="demo-form-inline">
      <el-form-item label="菜单名称:">
        <el-input
          v-model="searchForm.menuName"
          placeholder="请输入菜单名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单路径:">
        <el-input
          v-model="searchForm.url"
          placeholder="请输入菜单名称"
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
      <el-form :model="insertRole">
        <el-form-item label="角色名">
          <el-input v-model="insertRole.roleZH" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色代码">
          <el-input v-model="insertRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="备注" >
          <el-input type="textarea" v-model="insertRole.remark"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertMenuFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    


    <el-table
      :data="menuTree"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="menuName"
        label="名字"
        width="180"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" width="180"> </el-table-column>
      <el-table-column prop="url" label="路径" width="180"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
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
          <el-link icon="el-icon-edit">编辑 </el-link>
          <el-link><i class="el-icon-view el-icon--right"></i> 删除 </el-link>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "sysmenu",
  data() {
    return {
      menuTree: [],
      searchForm:{
        menuName:"",
        url:"",
        flag:""
      },
      insertFormVisible: false,
      insertRole:{
        menuName:"",
        icon:"",
        url:"",
        flag:""
      },
      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/sysmenu", ["showMenuTree"]),
    init() {
      this.showMenuTree(this.pageForm).then((res) => {
        console.log(res);
        this.menuTree = res;
      });
    },
    // 新增菜单
    insertMenuFormVisible(){
      this.insertFormVisible = false;
    }
  },
};
</script>