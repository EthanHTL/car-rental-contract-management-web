<template>
  <d2-container>
    <div class="searchBar" style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="sreachText">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- <el-button type="success" plain @click="contractInsertDialog">新增</el-button> -->
    </div>

    <!-- 新增模板 -->
    <!-- <el-dialog title="新增员工" :visible.sync="contractFormVisible">
      <d2-ueditor v-model="contractText"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contractFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertcontractFormVisible"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
    <!-- 修改模板 -->
    <el-dialog title="修改模板" :visible.sync="contractUpdateDialog">
      <d2-ueditor v-model="contractText.content"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contractUpdateDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="5" v-for="(o, index) in data" :key="o.id" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="url" class="image">
          <div style="padding: 14px;">
            <span>{{o.oldFilename}}</span>
            <div class="bottom clearfix">
              <el-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="这是一段内容确定删除吗？"
                @confirm="deleteConract(o)"
              >
                <el-button type="text" class="button" slot="reference"  >删除</el-button>
              </el-popconfirm>
              <el-button type="text" class="button" @click="updateConract(o)">编辑</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

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
import log from '@/libs/util.log';

import { mapActions } from "vuex";

export default {
  name: "contract-tempalte",
  data() {
    return {
      url: "",
      data: [],
      pagination: {
        currentPage: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        pageNum: 1,
        pageSize: 2,
      },
      sreachText:"",
      contractUpdateDialog: false,
      contractText:""
    };
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
      this.loading = true;
      this.findContractPage(this.pageForm).then((res) => {
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
      this.init();
    },
    handleCurrentChange(val) {
      //
        // console.log(`当前页: ${val}`);
      this.pageForm.pageNum = val;
      this.init();
    },
    updateConract(val){
      this.contractText = val;
      this.contractUpdateDialog = true
    },
    deleteConract(val){
      // 删除报表模板
      console.log(val);
      
    },
    save(){
      this.saveContractTemplate(this.contractText).then(res =>{
       this.contractUpdateDialog = false
      })
    }
  },
};
</script>

<style lang="scss">
.el-row {
  width: 70%;
  margin: auto;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-card {
  margin-top: 10px;
}

.image {
  width: 100%;
  display: block;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.searchBar {
  width: 630px;
  background-color: #fff;
  margin: 20px auto 20px auto;
}
.el-pagination{
  max-width: 700px;
  margin: 30px auto;
}


</style>
