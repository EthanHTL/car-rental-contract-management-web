<template>
  <d2-container>
    <template slot="header"> 角色管理 </template>

     <el-table :data="roleList" style="width: 100%">
      <el-table-column
        prop="roleZH"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色标识"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="100">
      </el-table-column>
      <el-table-column
        label="状态"
        width="150">
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
import status from '@/views/system/manager/employee/status'

export default {
  name: "role",
  components: {
    status
  },
  data() {
    return {
      roleList: [],
      pagination: {
        currentPage: 1,
        pageSize: 1,
        pageCount: 6,
        pageSizes: [2,5, 20, 50],
        pageSize: 5,
        total: 500,
      } 
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/role", ["showRole"]),
    init() {
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
    changeSwitch(scope){
      console.log(scope);
    },
    formatterTime(row, column) {
      if(row[column.property] ==null) return "";
      var date = new Date(parseInt(row[column.property]) * 1000);
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      return year + "/" +mon +  "/" + day 
      
    }    
  },
};
</script>