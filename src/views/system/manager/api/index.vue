<template>
  <d2-container>
    <template slot="header"> 接口管理 </template>

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
        @click="createApiHandle"
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
      ref="pageForm"
    >
      <el-form-item label="名称">
        <el-input
          v-model="pageForm.apiName"
          placeholder="请输入名称"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="接口">
        <el-input
          v-model="pageForm.url"
          placeholder="请输入接口"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="init" size="small"
          >搜索</el-button
        >
        <el-button
          type="info"
          plain
          @click="resetApiForm('pageForm')"
          size="small"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog :title="dialogTitle" :visible.sync="apiDialog">
      <el-form :model="apiForm">
        <el-tree-select
          popoverClass="test-class-wrap"
          v-model="apiForm.apiPid"
          :styles="styles"
          :selectParams="selectParams"
          :treeParams="treeParams"
          :filterNodeMethod="_filterFun"
          ref="treeSelect"
          :treeRenderFun="_renderFun"
          @searchFun="_searchFun"
        ></el-tree-select>
        <el-form-item label="接口名：">
          <el-input v-model="apiForm.apiName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="apiForm.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="apiDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="apiList" class="api-table" border>
      <el-table-column prop="apiName" label="名字" width="130">
      </el-table-column>
      <el-table-column prop="url" label="地址" show-overflow-tooltip resizable>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="150"
        prop="createTime"
        :formatter="formatterTime"
      >
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-link
            type="warning"
            @click="updateApiHandle(scope.row)"
            style="margin-right: 5px"
            >修改</el-link
          >
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
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total,sizes, prev, pager, next,  jumper "
      >
      </el-pagination>
    </div>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";
import TreeSelect from "@/components/tree-select/index.vue";
import ElTreeSelect from "@/components/el-tree-select/index.vue";

export default {
  components: { TreeSelect, ElTreeSelect },
  name: "api",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      apiList: [],
      pageForm: {
        apiName: "",
        url: "",
        pageNum: "1",
        pageSize: "5",
      },
      apiDialog: false,
      isInsertApi: false,
      dialogTitle: "",
      select: "",
      apiForm: {
        apiPid: [],
        apiName: "",
        url: "",
      },
      styles: {
        width: "300px",
      },
      values: [],
      selectParams: {
        multiple: true,
        clearable: true,
        placeholder: "请输入内容",
      },
      treeParams: {
        clickParent: true,
        filterable: true,
        // 只想要子节点，不需要父节点
        leafOnly: false,
        includeHalfChecked: true,
        "check-strictly": true,
        "default-expand-all": true,
        "expand-on-click-node": false,
        "render-content": this._renderFun,
        data: [],
        props: {
          children: "children",
          label: "apiName",
          rootId: "0",
          disabled: "disabled",
          parentId: "apiPid",
          value: "id",
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/sysapi", [
      "showApis",
      "showApisTree",
      "updateApi",
      "deleteApi",
      "createApi",
    ]),
    init() {
      this.showApis(this.pageForm)
        .then((res) => {
          this.apiList = res.list;
          this.pagination.pageSize = res.pageSize;
          this.pagination.pageNum = res.pageNum;
          this.pagination.total = res.total;
        })
        .then((res) => {
          this.apiTree();
        });
    },
    apiTree() {
      // 树
      this.showApisTree().then((res) => {
        this.treeParams.data = res;
        // this.values = res;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
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
    createApiHandle() {
      this.dialogTitle = "新增接口";
      this.isInsertApi = true;
      this.apiDialog = true;
    },
    updateApiHandle(row) {
      this.apiForm = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "修改接口";
      this.isInsertApi = false;
      this.apiDialog = true;
    },
    handleDelete(data) {
      this.deleteApi({ id: data.ig });
    },
    resetApiForm(formName) {
      // console.log(formName);
      this.$refs[formName].resetFields();
    },
    submitForm() {
      // console.log(this.isInsertApi);
      if (this.isInsertApi) {
        this.createApi(this.apiForm).then((res) => {
          this.apiDialog = false;
        });
      } else {
        this.updateApi(this.apiForm).then((res) => {
          this.apiDialog = false;
        });
      }
    },
    _filterFun(value, data, node) {
      if (!value) return true;
      return data.apiName.indexOf(value) !== -1;
    },
    // 树过滤
    _searchFun(value) {
      console.log(value, "<--_searchFun");
      // 自行判断 是走后台查询，还是前端过滤
      this.$refs.treeSelect.filterFun(value);
      // 后台查询
      // this.$refs.treeSelect.treeDataUpdateFun(treeData);
    },
    // 自定义render
    _renderFun(h, { node, data, store }) {
      const { props, clickParent } = this.treeParams;
      return (
        <span
          class={[
            "custom-tree-node",
            !clickParent && data[props.children] && data[props.children].length
              ? "disabled"
              : null,
          ]}
        >
          <span>{node.label}</span>
        </span>
      );
    },
  },
};
</script>

<style lang="scss">
.tool-btn {
  width: 75%;
  padding: 5px;
  margin: 0 auto;
  .createBtn {
    float: right;
    margin: 10px 5% auto auto;
  }
  .clear {
    clear: both;
  }
  .screen {
    // float: right;
    margin: 10px 3%;
  }
}
.tool-form {
  max-width: 60%;
  margin: 0 auto 0 22%;
  height: 50px;
}
.api-table {
  width: 80%;
  margin: 10px auto 0 auto;
}
.pagination {
  width: 50%;
  margin: 15px auto 0 auto;
}
</style>
