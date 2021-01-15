<template>
  <d2-container>
    <div class="searchBar" style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input3">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <el-row>
      <el-col :span="5" v-for="(o, index) in 10" :key="o" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="url" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
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
export default {
  name: "contract-tempalte",
  data() {
    return {
      currentDate: new Date(),
      url: "",
      pagination: {
        currentPage: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      input3:""
    };
  },
  created() {
    //  http://localhost:9090/files/sys_head_img/20210115122756f1257c44918a2cce786f80ed7c.png
    this.$store.dispatch("d2admin/register/urlImg").then(res => {
      // console.log(res)
      this.url = res
    })
    // "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  methods: {
    init() {
      this.loading = true;
      // this.showDict(this.pageForm).then((res) => {
      //   this.data = res.list;
      //   this.pagination.currentPage = res.navigateFirstPage;
      //   this.pagination.pageSize = res.pageSize;
      //   this.pagination.pageNum = res.pageNum;
      //   this.pagination.total = res.total;
      // });
    },
    handleSizeChange(val) {
      // 更改页码大小操作
      //   console.log(`每页 ${val} 条`);
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      //
      //   console.log(`当前页: ${val}`);
      this.pageForm.pageNum = val;
      this.init();
    },
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
