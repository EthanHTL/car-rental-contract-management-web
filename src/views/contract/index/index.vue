<template>
  <d2-container type="card" class="main">
    <el-row :gutter="15" class="temp">
      <el-col :span="11">
        <d2-ueditor v-model="text" @ready="ready" />
      </el-col>
      <el-col :span="12">
        <div>
          <el-card v-if="text" shadow="never" style="border: 1px solid #d4d4d4">
            <template slot="header">结果预览</template>
            <div
              v-html="text"
              ref="imageDom"
              class="view"
              style="margin: -10px 0px"
            ></div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-drawer
      title="合同模板"
      :visible.sync="templateDrawer"
      :with-header="false"
      size="50%"
    >
      <div class="searchBar">
        <el-input placeholder="请输入内容" v-model="sreachText">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-checkbox v-model="isAdd">保留原有的内容</el-checkbox>
      </div>
      <div class="demo-drawer__body">
        <div class="demo-drawer__content">
          <el-card
            :body-style="{ padding: '0px' }"
            v-for="(o, index) in templateList"
            :key="o.id"
          >
            <img
              v-if="o.path != undefined"
              :src="'http://localhost:9090' + o.path"
              class="image"
            />
            <img
              v-else
              src="http://localhost:9090/bpmn/contract.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>{{ o.oldFilename }}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button" @click="choose(o)"
                  >确定</el-button
                >
              </div>
            </div>
          </el-card>
        </div>
        <div class="demo-drawer__footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="pagination.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-drawer>

    <el-dialog title="创建模板" :visible.sync="templateFormVisible">
      <el-form :model="templateForm">
        <el-form-item label="图片">
          <img :src="templateForm.path" alt="" class="tmImage"/>
        </el-form-item>
        <el-form-item label="模板名">
          <el-input v-model="templateForm.oldFilename" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="templateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmHandle">确 定</el-button>
        </div>
    </el-dialog>

    <template slot="footer">
      <el-button type="info" @click="text += text">
        <d2-icon name="copy" /> 当前内容 x2
      </el-button>
      <el-button type="primary" @click="chooseTempalte">
        <d2-icon name="trash-o" /> 模板
      </el-button>
      <el-button type="danger" @click="text = ''">
        <d2-icon name="trash-o" /> 清空
      </el-button>
      <el-button type="primary" @click="createTemplete">
        <d2-icon name="trash-o" /> 保存
      </el-button>
    </template>
  </d2-container>
</template>

<script>
import html2canvas from "html2canvas";

import { mapActions } from "vuex";
import buttonD2admin from "@/components/d2-ueditor/button/d2admin";
export default {
  name: "contract-manager",
  data() {
    return {
      text: "<p>Hello World</p>",
      templateDrawer: false,
      templateFormVisible: false,
      templateList: [],
      url: "",
      pagination: {
        currentPage: 1,
        pageCount: 6,
        pageSize: 6,
        total: 500,
      },
      sreachText: "",
      templateForm:{
        path: "",
        img: "",
        oldFilename:""
      },
      pageForm: {
        pageNum: 1,
        pageSize: 6,
      },
      isAdd: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/resource", [
      "findContractPage",
      "saveContractTemplate",
      "createTemplate",
    ]),
    init() {
      // var ue = UE.getEditor('editor');
      //
      // this.$store.state.d2admin.system.myEditor.registerButton(buttonD2admin)
      this.findContractPage(this.pageForm).then((res) => {
        this.templateList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    handleSizeChange(val) {
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.init();
    },
    chooseTempalte() {
      this.templateDrawer = true;
    },
    choose(tem) {
      if (this.isAdd) {
        if (tem.content != null) {
          this.text += tem.content;
        }
      } else {
        this.text = tem.content;
      }

      this.templateDrawer = false;
    },
    createTemplete() {
      html2canvas(this.$refs.imageDom, {
        backgroundColor: null, //避免图片有白色边框
      }).then((canvas) => {
        // 转成图片，生成图片地址
        this.templateForm.path = canvas.toDataURL("image/png");
        this.templateFormVisible = true
        // console.log(this.imgUrl);
      });
    },
    comfirmHandle(){
      console.log(this.templateForm);
      this.createTemplate(this.templateForm).then(res =>{
        console.log(res);
        this.templateFormVisible = false
      })
    }
  },
};
</script>

<style lang="scss">
.main {
  .el-row {
    width: 100%;
    margin: 0 auto;
    table {
      border-top: 1px solid #000000;
      border-left: 1px solid #000000;
      border-collapse: collapse; /*设置单元格的边框合并为1*/
    }
    td {
      border-bottom: 1px solid #000000;
      border-right: 1px solid #000000;
    }
  }
  .searchBar {
    width: 630px;
    background-color: #fff;
    margin: 40px auto 20px auto;
    .el-checkbox {
      margin-top: 20px;
    }
  }
  .demo-drawer__body {
    height: 80%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .demo-drawer__content {
      display: flex;
      flex-flow: wrap row;
      justify-content: space-around;
      padding: 10px;
      .el-card {
        width: 180px;
        height: 200px;
        margin: 20px 50px;
        img {
          height: 130px;
        }
      }
    }

    .demo-drawer__footer {
      .el-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .tmImage{
    width: 180px;
    height: 190px;
    border: 2px solid springgreen;
  }
}
</style>