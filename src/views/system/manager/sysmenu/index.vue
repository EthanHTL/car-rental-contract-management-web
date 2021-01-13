<template>
  <d2-container>
    <template slot="header"> 菜单管理 </template>

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
          <el-link icon="el-icon-edit">权限分配</el-link>
          <el-link><i class="el-icon-view el-icon--right"></i> 查看 </el-link>
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
  },
};
</script>