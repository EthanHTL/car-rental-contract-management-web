<template>
  <d2-container type="card" class="main">
    <el-row :gutter="15" class="temp">
      <el-col :span="11">
        <d2-ueditor v-model="text"  @ready="ready"/>
      </el-col>
      <el-col :span="12" >
        <el-card v-if="text" shadow="never" style="border: 1px solid #d4d4d4;">
          <template slot="header">结果预览</template>
          <div v-html="text" style="margin: -10px 0px;"></div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-drawer
      title="合同模板"
      :visible.sync="templateDrawer"
      :with-header="false"
      size="50%"
      >
      <div class="searchBar" >
        <el-input placeholder="请输入内容" v-model="sreachText">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- <el-button type="success" plain @click="contractInsertDialog">新增</el-button> -->
      </div>
      <div class="demo-drawer__body">
        <div class="demo-drawer__content">
          <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in templateList" :key="o.id">
              <!-- <img :src="url" class="image"> -->
              <div style="padding: 14px;">
                <span>{{o.oldFilename}}</span>
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button" @click="choose(o)">确定</el-button>
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          >
          </el-pagination>
      </div>
      </div>
      
      
    </el-drawer>


    <template slot="footer">
      <el-button type="info" @click="text += text">
        <d2-icon name="copy"/> 当前内容 x2
      </el-button>
      <el-button type="primary" @click="chooseTempalte">
        <d2-icon name="trash-o"/> 模板
      </el-button>
      <el-button type="danger" @click="text = ''">
        <d2-icon name="trash-o"/> 清空
      </el-button>
    </template>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import buttonD2admin from '@/components/d2-ueditor/button/d2admin'
export default {
  name: 'contract-manager',
  data () {
    return {
      text: '<p>Hello World</p>',
      templateDrawer:false,
      templateList:[],
      pagination: {
        currentPage: 1,
        pageCount: 6,
        pageSizes: [5, 10],
        pageSize: 5,
        total: 500,
      },
      sreachText:"",
      pageForm: {
        pageNum: 1,
        pageSize: 5,
      },

    }
  },
  created() {
    this.init()

  },
  methods: {
    ...mapActions('d2admin/resource', [
      'findContractPage',
      'saveContractTemplate',
    ]),
    init() {
      // var ue = UE.getEditor('editor');
      // 
      this.$store.state.d2admin.system.myEditor.registerButton(buttonD2admin)
      console.log();
      this.findContractPage(this.pageForm).then((res) => {
        this.templateList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    ready(editorInstance){
       console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
    },
    handleSizeChange(val) {
      // 更改页码大小操作
      //   console.log(`每页 ${val} 条`);
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      //
        // console.log(`当前页: ${val}`);
      this.pageForm.pageNum = val;
      this.init();
    },
    chooseTempalte(){
      this.templateDrawer = true
    },
    choose(tem){
      this.text += tem.content
      this.templateDrawer = false
    },
    updateConract(tem){

    }
  }
}
</script>

<style lang="scss">
  .main{
    .el-row{
      width: 90%;
      margin: 0 auto;
    }
    .searchBar {
      width: 630px;
      background-color: #fff;
      margin: 40px auto 20px auto;
    }
    .demo-drawer__body{
      margin-top: 7%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .demo-drawer__content{
        display: flex;
        flex-flow: wrap row;
        justify-content: space-around;
        .el-card{
          min-width: 250px;
        }
      }

      .demo-drawer__footer{
        .el-pagination{
          display: flex;
          align-items:center;
          justify-content:center;
        }
      }
      
    }
    
  }
  
</style>