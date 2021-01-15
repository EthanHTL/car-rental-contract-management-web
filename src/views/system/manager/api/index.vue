<template>
  <d2-container>
    <template slot="header"> 接口管理 </template>

    <!-- 新增 -->
    <el-button type="success" plain @click="apiInsert = true">新增</el-button>
    <!-- 新增员工 -->
    <el-dialog title="新增接口" :visible.sync="apiInsert">
      <el-form :model="apiForm">
        <tree-select
          :props="treeProps"
          :options="options"
        ></tree-select>

        <el-form-item label="接口名">
          <el-input v-model="apiForm.apiName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="apiForm.url" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="apiInsert = false">取 消</el-button>
        <el-button type="primary" @click="apiInsertFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改接口" :visible.sync="apiUpdate">
      <el-form :model="apiForm">
        <tree-select
          :props="treeProps"
          :options="options"
        ></tree-select>

        <el-form-item label="接口名">
          <el-input v-model="apiForm.apiName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="apiForm.url" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="apiUpdate = false">取 消</el-button>
        <el-button type="primary" @click="apiUpdateFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table :data="apiList" style="width: 100%">
      <el-table-column prop="apiName" label="名字" width="200">
      </el-table-column>
      <el-table-column prop="url" label="地址" width="200"> </el-table-column>

      <el-table-column
        label="创建时间"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column
        label="修改时间"
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
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total,sizes, prev, pager, next,  jumper "
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";
import treeSelect from '@/components/tree-select/index.vue';

export default {
  components: { treeSelect },
  name: "api",
  data() {
    return {
      apiList: [],
      pagination: {
        currentPage: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        pageNum: "1",
        pageSize: "2",
      },
      apiInsert:false,
      apiUpdate:false,
      apiForm:{
        apiName:"",
        url:"",
      },
      treeProps:{
          value:'id',             // ID字段名
          label: 'apiName',         // 显示名称
          children: 'children'    // 子级字段名
      },
      options:[]

    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/sysapi", ["showApis","showApisTree"]),
    init() {
      this.showApis(this.pageForm).then((res) => {
        this.apiList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
      this.showApisTree().then((res) => {
        // console.log(res);
        this.options = res;
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
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
    apiInsertFormVisible(){

      this.apiInsert = false
    },
    handleEdit(index,data){
      console.log(index,data);
      this.apiUpdate = true
    },
    apiUpdateFormVisible(){

      this.apiUpdate = false
    }
  },
};
</script>
