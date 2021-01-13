<template>
  <d2-container>
    <template slot="header">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <el-button type="primary" plain>筛选</el-button>
          </template>
          <el-input placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-collapse-item>
      </el-collapse>

      <!-- 新增 -->
      <el-button type="success" plain @click="dictInsert = true"
        >新增</el-button
      >
      <!-- 新增字典 -->
      <el-dialog title="新增字典" :visible.sync="dictInsert">
        <el-form :model="dictForm">
          <el-form-item label="代码" label-width="100">
            <el-input v-model="dictForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名字" label-width="100">
            <el-input v-model="dictForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="100">
            <el-input v-model="dictForm.descript" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dictInsert = false">取 消</el-button>
          <el-button type="primary" @click="insertDictBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 字典选项模态框 -->
      <el-dialog title="字典选项" :visible.sync="dictDeTailshow">
        <el-button type="primary" @click="dictDetailInsert = true"
          >新增</el-button
        >
        <el-table :data="detailData">
          <el-table-column
            property="code"
            label="代码"
            width="150"
          ></el-table-column>
          <el-table-column
            property="name"
            label="名字"
            width="200"
          ></el-table-column>
          <el-table-column label="操作">
            <el-link type="warning" style="margin-right: 5px">修改</el-link>
            <el-link type="danger">删除</el-link>
          </el-table-column>
        </el-table>
        <!-- 新增选项模态框 -->
        <el-dialog
          width="30%"
          title="新增选项"
          :visible.sync="dictDetailInsert"
          append-to-body
        >
          <el-form :model="detailForm">
            <el-form-item label="活动名称" label-width="100">
              <el-input v-model="detailForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" label-width="100">
              <el-input v-model="detailForm.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dictDetailInsert = false">提 交</el-button>
          </div>
        </el-dialog>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dictDeTailshow = false">取 消</el-button>
        </div>
      </el-dialog>
    </template>

    <d2-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @showDetail="showDetail"
      selection-row
    />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "dict",
  data() {
    return {
      columns: [
        {
          title: "字典名称",
          key: "name",
          width: 150,
        },
        {
          title: "代码",
          key: "code",
        },
        {
          title: "备注",
          key: "descript",
        },
        {
          title: "创建时间",
          key: "createTime",
          formatter(row, column, cellValue, index) {
            if (cellValue == null) return null;
            var date = new Date(parseInt(cellValue) * 1000);
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            return   year + "/" +  mon + "/" +  day
          },
        },
      ],
      data: [],
      detailData: [
        {
          code: "0",
          name: "男",
        },
        {
          code: "1",
          name: "女",
        },
      ],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 1,
        pageCount: 6,
        pageSizes: [2,5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        pageNum: "1",
        pageSize: "2",
      },
      rowHandle: {
        custom: [
          {
            text: "修改",
            type: "text",
            size: "small",
          },
          {
            text: "查看选项",
            type: "text",
            emit: "showDetail",
            size: "small",
          },
          {
            text: "删除",
            type: "text",
            size: "small",
          },
        ],
      },
      dictInsert: false,
      dictDeTailshow: false,
      dictDetailInsert: false,
      dictForm: { name: "", code: "", descript: "" },
      detailForm: { name: "", code: "" },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("d2admin/dict", [
      "showDict",
      "showDictDetail",
      "insertDict",
      "updateDict",
      "deleteDict",
      "insertDetail",
      "updateDetail",
      "deleteDetail",
      "getDict",
    ]),
    paginationCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      this.showDict(this.pageForm).then((res) => {
        this.data = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    handleSizeChange(val) {
      // 更改页码大小操作
      //   console.log(`每页 ${val} 条`);
      this.pageForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      //
      //   console.log(`当前页: ${val}`);
      this.pageForm.pageNum = val;
      this.fetchData();
    },
    /**
     * 新增字典
     */
    insertDictBtn() {
      console.log(this.dictForm);
      this.insertDict(this.dictForm).then((res) => {
        this.fetchData();
        this.dictInsert = false;
      });
    },
    /**
     * 查看字典配置项
     */
    showDetail({ index, row }) {
      this.showDictDetail(row).then((res) => {
        console.log(res);
        this.detailData = res;
        this.dictDeTailshow = true;
      });
      console.log(index);
      console.log(row);
    },
  },
};
</script>