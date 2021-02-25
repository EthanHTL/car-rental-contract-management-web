<template>
  <d2-container>
    <template slot="header"> 菜单管理 </template>

    <!-- 工具栏 -->
    <div class="tool-btn">
      <el-button
        class="createBtn"
        type="primary"
        size="small"
        @click="createMenuHandle"
        >新增</el-button
      >
      <div class="clear"></div>
    </div>

    <!-- 新增菜单 -->
    <el-dialog :title="menuDialogTitle" :visible.sync="menuFormDialog">
      <el-form :model="menuForm" ref="menuForm">
        <el-form-item label="名字">
          <el-input v-model="menuForm.menuName"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="路径">
          <el-input v-model="menuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-tree-select
            popoverClass="test-class-wrap"
            v-model="menuForm.menuPid"
            :styles="styles"
            :selectParams="selectParams"
            :treeParams="treeParams"
            :filterNodeMethod="_filterFun"
            ref="treeSelect"
            :treeRenderFun="_renderFun"
            @searchFun="_searchFun"
          ></el-tree-select>
        </el-form-item>
        <el-form-item label="图标">
          <e-icon-picker
            ref="iconPicker"
            v-model="menuForm.icon"
            :options="options"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="menuFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="comfirmHandle">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      class="menu-table"
      :data="menuTree"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="menuName"
        label="名字"
        width="180"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" width="80">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" show-overflow-tooltip label="路径" width="230"></el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatterTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column label="状态" width="100">
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
          <el-link icon="el-icon-edit" @click="editMenuHandle(scope.row)"
            >编辑
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
import ElTreeSelect from "@/components/el-tree-select/index.vue";

export default {
  name: "sysmenu",
  components: { ElTreeSelect },
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      menuTree: [],
      menuForm: {
        id: "",
        menuPid: 0,
        menuName: "",
        icon: "",
        url: "",
      },
      menuDialogTitle: "",
      isInsert: false,
      menuFormDialog: false,
      options: {
        FontAwesome: true,
        ElementUI: true,
        eIcon: true, //自带的图标，来自阿里妈妈
        eIconSymbol: true, //是否开启彩色图标
        addIconList: [],
        removeIconList: [],
      },
      styles: {
        width: "300px",
      },
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
          label: "menuName",
          rootId: "0",
          disabled: "disabled",
          parentId: "menuPid",
          value: "id",
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/sysmenu", [
      "showMenuTree",
      "updateMenu",
      "createMenu",
      "deleteMenu",
    ]),
    init() {
      this.showMenuTree(this.pageForm).then((res) => {
        // console.log(res);
        this.menuTree = res;
        this.treeParams.data = res;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    formatterTime(row, column) {
      if (row[column.property] == null) return null;
      return dayjs(row[column.property]).format("YYYY-MM-DD");
    },
    createMenuHandle(formName) {
      this.menuForm.menuPid = "";
      this.menuForm.menuName = "";
      this.menuForm.icon = "";
      this.menuForm.url = "";
      this.menuForm.id = "";
      this.menuDialogTitle = "新增菜单";
      this.isInsert = true;
      this.menuFormDialog = true;
    },
    editMenuHandle(row) {
      this.menuForm = JSON.parse(JSON.stringify(row));
      this.menuDialogTitle = "修改菜单";
      this.isInsert = false;
      this.menuFormDialog = true;
    },
    handleDelete(row) {
      this.deleteMenu({ id: row.id }).then((res) => {
        this.init();
      });
    },
    comfirmHandle() {
      console.log(this.menuForm.menuPid);
      if (this.menuForm.menuPid == null || this.menuForm.menuPid == "") {
        this.menuForm.menuPid = 0;
      }
      if (this.isInsert) {
        this.createMenu(this.menuForm)
          .then(() => {
            return this.showMenuTree(this.pageForm);
          })
          .then((res) => {
            this.menuTree = res;
            this.$refs.treeSelect.treeDataUpdateFun(res);
            this.menuFormDialog = false;
          });
      } else {
        this.updateMenu(this.menuForm)
          .then(() => {
            return this.showMenuTree(this.pageForm);
          })
          .then((res) => {
            this.menuTree = res;
            this.$refs.treeSelect.treeDataUpdateFun(res);
            this.menuFormDialog = false;
          });
      }

      this.$message({
        message: "操作成功",
        type: "success",
      });
    },
    _filterFun(value, data, node) {
      if (!value) return true;
      return data.apiName.toString().indexOf(value) !== -1;
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
<style lang="scss" scoped>
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
.menu-table {
  width: 70%;
  margin: 10px auto 0 auto;
}
</style>