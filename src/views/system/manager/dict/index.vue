<template>
  <d2-container>
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
        @click="createDictDialog"
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
    >
      <el-form-item label="名称:">
        <el-input
          v-model="pageForm.name"
          placeholder="请输入字典名称"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="代码:">
        <el-input
          v-model="pageForm.code"
          placeholder="请输入代码"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="init" size="small"
          >搜索</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增字典 -->
    <el-dialog :title="dictTitle" :visible.sync="dictDialog">
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
        <el-button @click="dictDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmDictBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 字典选项模态框 -->
    <el-dialog title="字典选项" :visible.sync="dictDeTailshow">
      <el-button type="primary" @click="createDetailDialog">新增</el-button>
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
          <template slot-scope="scope">
            <el-link
              type="warning"
              @click="updateDetailDialog(scope.row)"
              style="margin-right: 5px"
              >修改</el-link
            >
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="deleteDetailBtn(scope.row)"
              ><el-link icon="el-icon-delete" type="danger" slot="reference"
                >删除
              </el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增选项模态框 -->
      <el-dialog
        width="30%"
        :title="detailTitle"
        :visible.sync="dictDetailDialog"
        append-to-body
      >
        <el-form :model="detailForm">
          <el-form-item label="代码" label-width="100">
            <el-input v-model="detailForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" label-width="100">
            <el-input v-model="detailForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmDetailBtn">提 交</el-button>
        </div>
      </el-dialog>
    </el-dialog>

    <!-- 字典table -->
    <el-table :data="dictData" class="dict-table"  v-loading="loading">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="name"
        label="字典名称"
        show-overflow-tooltip
        min-width="30"
      >
      </el-table-column>
      <el-table-column prop="code" label="代码"></el-table-column>
      <el-table-column prop="descript" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            icon="el-icon-view"
            type="info"
            @click="updateDictDialog(scope.row)"
            style="margin-right: 10px"
            >修改
          </el-link>
          <el-link
            icon="el-icon-finished"
            @click="showDetail(scope.row)"
            type="success"
            style="margin-right: 10px"
            >查看选项
          </el-link>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="deleteDictBtn(scope.row)"
            ><el-link icon="el-icon-delete" type="danger" slot="reference"
              >删除
            </el-link>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
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
import dayjs from "dayjs";
import log from "@/libs/util.log";

export default {
  name: "dict",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      dictData: [],
      dictTitle: "",
      detailTitle: "",
      dictInsert: false,
      detailInsert: false,
      detailData: [],
      loading: false,
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        name: "",
        code: "",
        pageNum: "1",
        pageSize: "5",
      },
      dictDialog: false,
      dictDeTailshow: false,
      dictDetailDialog: false,
      dictForm: { name: "", code: "", descript: "" },
      detailForm: { name: "", code: "", dictCode: "" },
    };
  },
  mounted() {
    this.init();
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
    init() {
      this.loading = true;
      this.showDict(this.pageForm).then((res) => {
        this.dictData = res.list;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageForm.pageSize = val;
      this.init();
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.init();
    },
    createDictDialog() {
      this.dictForm.code = "";
      this.dictForm.descript = "";
      this.dictForm.name = "";
      this.dictTitle = "新增字典";
      this.dictInsert = true;
      this.dictDialog = true;
    },
    updateDictDialog(row) {
      this.dictForm = JSON.parse(JSON.stringify(row))
      this.dictTitle = "修改字典";
      this.dictInsert = false;
      this.dictDialog = true;
    },
    confirmDictBtn() {
      if (this.dictInsert) {
        this.insertDict(this.dictForm).then((res) => {
          this.init();
          this.dictDialog = false;
        });
      } else {
        this.updateDict(this.dictForm).then((res) => {
          this.init();
          this.dictDialog = false;
        });
      }
    },
    deleteDictBtn(row) {
      this.deleteDict({ id: row.id }).then(() => {
        this.detailForm.dictCode = row.id;
        this.init();
      });
    },
    createDetailDialog() {
      this.detailForm.name = "";
      this.detailForm.code = "";
      this.detailTitle = "新增选项";
      this.detailInsert = true;
      this.dictDetailDialog = true;
    },
    updateDetailDialog(row) {
      this.detailForm = row;
      this.detailTitle = "修改选项";
      this.detailInsert = false;
      this.dictDetailDialog = true;
    },
    deleteDetailBtn(row) {
      this.deleteDetail({ id: row.id })
        .then(() => {
          return this.showDictDetail({ code: this.detailForm.dictCode });
        })
        .then((res) => {
          this.detailData = res;
        });
    },
    confirmDetailBtn() {
      if (this.detailInsert) {
        this.insertDetail(this.detailForm).then((res) => {
          this.showDictDetail({ code: this.detailForm.dictCode }).then(
            (res) => {
              this.detailData = res;
            }
          );
          this.dictDetailDialog = false;
        });
      } else {
        this.updateDetail(this.detailForm).then((res) => {
          this.showDictDetail({ code: this.detailForm.dictCode }).then(
            (res) => {
              this.detailData = res;
            }
          );
          this.dictDetailDialog = false;
        });
      }
    },
    /**
     * 查看字典配置项
     */
    showDetail(row) {
      console.log(row);
      this.detailForm.dictCode = row.code;
      this.showDictDetail(row).then((res) => {
        this.detailData = res;
        this.dictDeTailshow = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tool-btn{
  width: 80%;
  padding: 5px;
  margin: 0 auto;
  .createBtn {
    float: right;
    margin: 10px 5% auto auto;
  }
  .clear{
    clear: both;
  }
  .screen{
    // float: right;
    margin: 10px 3%;
  }
}
.tool-form {
  max-width: 60%;
  margin: 0 auto 0 22%;
  height: 50px;
}
.dict-table {
  width: 80%;
  margin: 0 auto;
}
</style>
