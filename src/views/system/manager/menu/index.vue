<template>
  <d2-container>
    <template slot="header"> 菜单管理 </template>

    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {};
  },
  methods: {},
};
</script>