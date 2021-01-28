<template>
  <d2-container>
    <el-steps :active="active" finish-status="success" class="active">
      <el-step title="选择合同"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="创建合同"></el-step>
    </el-steps>
    <div v-if="active == 1">
      <el-input placeholder="请输入内容" v-model="searchText">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-row>
        <el-col :span="5" v-for="(o, index) in contractList" :key="o.id" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="url" class="image">
            <div style="padding: 14px;">
              <span>{{o.oldFilename}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="chooseConract(o)">选择</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="contract-form" v-if="active == 2">
      <el-row :gutter="5">
        <el-form ref="contractForm" :model="contractData" :rules="rules" size="medium" label-width="111px">
          <el-col :span="24">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="contractData.contractName" placeholder="请输入合同名称" clearable
                :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户证件号" prop="customerID">
              <el-input v-model="contractData.customerID" placeholder="请输入客户证件号" show-word-limit clearable
                prefix-icon='el-icon-s-custom' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="customerPhone">
              <el-input v-model="contractData.customerPhone" placeholder="请输入联系电话" show-word-limit clearable
                prefix-icon='el-icon-phone-outline' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="员工证件号" prop="employeeID">
              <el-input v-model="contractData.employeeID" placeholder="请输入员工证件号" clearable
                prefix-icon='el-icon-user-solid' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="employeePhone">
              <el-input v-model="contractData.employeePhone" placeholder="请输入联系电话" show-word-limit clearable
                prefix-icon='el-icon-phone-outline' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="合同有效期" prop="contractLife">
              <el-date-picker type="datetimerange" v-model="contractData.contractLife" :default-time="['00:00:00', '12:00:00']"
                 :style="{width: '100%'}" start-placeholder="开始日期"  value-format="yyyy年MM月dd日"
                end-placeholder="结束日期" range-separator="至" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contractType">
              <el-select v-model="contractData.contractType" placeholder="请选择合同类型" clearable
                :style="{width: '100%'}">
                <el-option v-for="(item, index) in contractTypeOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式" prop="payment">
              <el-select v-model="contractData.payment" placeholder="请选择支付方式" clearable
                :style="{width: '100%'}">
                <el-option v-for="(item, index) in paymentOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input-number v-model="contractData.contractAmount" placeholder="合同金额" controls-position=right>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已付金额" prop="paidAmount">
              <el-input-number v-model="contractData.paidAmount" placeholder="已付金额" controls-position=right>
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="contractData.remark" type="textarea" placeholder="请输入备注"
                :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
              <el-button style="margin-top: 12px;" @click="pre">上一步</el-button> 
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div v-if="active == 3">
      <d2-ueditor v-model="contractText.content"/>
      <el-button type="primary" @click="submitContract">提交</el-button>
      <el-button style="margin-top: 12px;" @click="pre">上一步</el-button> 
    </div>
    
    
  </d2-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  components: {},
  props: [],
  data() {
    return {
      active: 1,
      contractList:[],
      searchText:"",
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
      contractData: {
        contractName: "测试合同",
        customerID: '500229',
        customerPhone: '123456789',
        employeeID: "500230",
        employeePhone: '987412365',
        contractLife: null,
        contractType: 1,
        payment: 1,
        contractAmount: 100,
        paidAmount: 0,
        remark: undefined,
      },
      contractText:{
        // content:'<p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">&nbsp; &nbsp; &nbsp; 出租方(甲方)： 身份证号码：${customerID}</span></p><p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　承租方(乙方)： 身份证号码：${contractName}</span></p><p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　甲、乙双方通过友好协商，就档口租赁事宜达成协议如下：</span></p>'
        content:'<p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">出租方(甲方)： 身份证号码：<span style="text-decoration:underline;">${contractLife}</span></span></p><p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　承租方(乙方)： 身份证号码：${contractName}</span></p><p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　甲、乙双方通过友好协商，就档口租赁事宜达成协议如下：</span></p>'
        },
      rules: {
        contractName: [{
          required: true,
          message: '请输入合同名称',
          trigger: 'blur'
        }],
        customerID: [{
          required: true,
          message: '请输入客户证件号',
          trigger: 'blur'
        }],
        customerPhone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        employeeID: [{
          required: true,
          message: '请输入员工编号',
          trigger: 'blur'
        }],
        employeePhone: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        }],
        contractLife: [{
          required: true,
          message: '合同有效期不能为空',
          trigger: 'change'
        }],
        contractType: [{
          required: true,
          message: '请选择合同类型',
          trigger: 'change'
        }],
        payment: [{
          required: true,
          message: '请选择支付方式',
          trigger: 'change'
        }],
        contractAmount: [{
          required: true,
          message: '合同金额',
          trigger: 'blur'
        }],
        paidAmount: [{
          required: true,
          message: '已付金额',
          trigger: 'blur'
        }],
        remark: [],
      },
      contractTypeOptions: [{
        "label": "租房合同",
        "value": 1
      }, {
        "label": "租车合同",
        "value": 2
      }],
      paymentOptions: [{
        "label": "支付宝",
        "value": 1
      }, {
        "label": "微信",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    ...mapActions('d2admin/resource', [
      'findContractPage',
    ]),
    init() {
      this.findContractPage(this.pageForm).then((res) => {
        this.contractList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    submitContract() {
      // this.$refs['contractForm'].validate(valid => {
      //   if (!valid) return
      //   // TODO 提交表单
      // })
      console.log("====》创建成功");
    },
    getValueByObject(content){
      var returnValue   = "";
      var strPrefix   = "${";
      var strSuffix  = "}";
      var start = content.indexOf(strPrefix);
      if (start == -1) {
         return content;
      }else{
        var result = content
        while(start != -1){
          const end = result.indexOf(strSuffix, start);
          const key = result.substring(start + strPrefix.length, end);
          const replaceContent = "";
          if(key != null) {
            if(this.contractData[key] != null){
              console.log(this.contractData);
              if (key == "contractLife") {
                replaceContent = this.contractData[key][0]+"至"+this.contractData[key][1]
              }else{
                replaceContent = this.contractData[key];
              }

            }
          }
          // console.log(replaceContent);
          returnValue=result.substring(0,start)+replaceContent+result.substring(end + strSuffix.length)
          result = returnValue
          start = result.indexOf(strPrefix, start + replaceContent.length);
        }
      }
      return returnValue;


    },
    resetForm() {
      this.$refs['contractForm'].resetFields()
    },
    next() {
      this.contractText.content = this.getValueByObject(this.contractText.content);
       this.active ++;
    },
    next2() {
      this.active ++;
    },
    pre() {
      if (this.active-- < 2) this.active = 1;
    },
    chooseConract(contract){
      console.log(contract);
      this.active ++;
    }
  }
}

</script>
<style lang="scss">
.active{
  width: 60%;
  margin: 10px auto 20px auto;
  background: center;
}
  .contract-form{
    width: 90%;
    text-align: center;
    .el-row{
      display: inline-block;
    }
  }
</style>
