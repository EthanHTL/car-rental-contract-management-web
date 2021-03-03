<template>
  <d2-container>
    <!-- 工具栏 -->

    <!-- 表格 -->
    <el-table :data="deployList" class="deploy-table">
      <el-table-column prop="name" label="流程名" width="180">
      </el-table-column>
      <el-table-column
        label="部署时间"
        width="150"
        prop="deploymentTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link icon="el-icon-edit" @click="updateFormVisible = true"
            >流程暂停
          </el-link>
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

export default {
  name: "",
  data() {
    return {
      deployList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/activiti", ["showDeploies","deleteDeploy"]),
    init() {
      this.showDeploies().then((res) => {
        this.deployList = res;
      });
    },
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
    handleDelete(row){
        // console.log(row);
        this.deleteDeploy(row).then(() =>{
            this.$message({
              message: '操作成功',
              type: 'success'
            });
        })
    }
  },
};
</script>
<style lang="scss">
.deploy-table {
  width: 60%;
  margin: 50px auto;
}
</style>