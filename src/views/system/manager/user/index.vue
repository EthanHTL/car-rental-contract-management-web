<template>
  <d2-container>
    <template slot="header"> 员工管理 </template>

    <!-- 新增员工 -->
    <el-dialog title="新增员工" :visible.sync="employeeFormVisible">

      <div slot="footer" class="dialog-footer">
        <el-button @click="employeeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertEmployeeFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table :data="employees" style="width: 100%">
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
      <el-table-column prop="sex" label="性别" width="100"> </el-table-column>
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "user",
  data() {
    return {
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
      },
      employeeFormVisible:false,

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/employee", ["findUserPage"]),
    init() {
      this.findUserPage(this.pageForm).then((res) => {
        this.employees = res.list;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
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
    insertEmployeeFormVisible(){
      this.employeeFormVisible = false
    },
    handleEdit(){

    },
    handleDelete(){

    }
  },
};
</script>
