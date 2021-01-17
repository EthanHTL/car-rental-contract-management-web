<template>
  <d2-container type="card">
    <el-row :gutter="20">
      <el-col :span="20">
        <d2-ueditor v-model="text"  />
      </el-col>
      <el-col :span="20" >
        <el-card v-if="text" shadow="never" style="border: 1px solid #d4d4d4;">
          <template slot="header">结果预览</template>
          <div v-html="text" style="margin: -20px 0px;"></div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-drawer
      title="合同模板"
      :visible.sync="templateDrawer"
      >
      
      <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in templateList" :key="o.id">
          <img :src="url" class="image">
          <div style="padding: 14px;">
            <span>{{o.oldFilename}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="updateConract(o)">确定</el-button>
            </div>
          </div>
      </el-card>
      
    </el-drawer>


    <template slot="footer">
      <el-button type="primary" @click="text += text">
        <d2-icon name="copy"/> 当前内容 x2
      </el-button>
      <el-button type="danger" @click="text = ''">
        <d2-icon name="trash-o"/> 清空
      </el-button>
      <el-button type="danger" @click="chooseTempalte">
        <d2-icon name="trash-o"/> 模板
      </el-button>
    </template>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'contract-manager',
  data () {
    return {
      text: '<p>Hello World</p>',
      templateDrawer:false,
      templateList:[],
      pageForm: {
        pageNum: 1,
        pageSize: 2,
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
      this.loading = true;
      this.findContractPage(this.pageForm).then((res) => {
        this.templateList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    chooseTempalte(){
      this.templateDrawer = true
    },
    updateConract(tem){

    }
  }
}
</script>
