<template>
  <d2-container>
    <el-steps :active="active" finish-status="success" class="activeLi">
      <el-step title="选择合同"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="创建合同"></el-step>
    </el-steps>
    <div v-if="active == 0" class="search">
      <el-input
        placeholder="请输入内容"
        v-model="pageForm.oldFilename"
        class="search-input"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @change="searchBtn"
        ></el-button>
      </el-input>
      <el-row  v-for="(page, index) of pages" :key="index" >
        <el-col :span="5" v-for="(o, innerindex) of page" :key="o.id" :offset="innerindex > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '2px' }">
            <img style="width:100%;height:150px" v-if="o.path!=''&&o.path!=null" :src="'http://127.0.0.1:9090'+o.path" class="image" />
            <img style="width:100%;height:150px" v-else :src="url" class="image" />
            <div style="padding: 14px">
              <span>{{ o.oldFilename }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="chooseConract(o)"
                  >选择</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="pagination">
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
      </div>
    </div>
    <div class="contract-form" v-if="active == 1">
      <el-row :gutter="5">
        <el-form
          ref="contractForm"
          :model="contractData"
          :rules="rules"
          size="medium"
          label-width="111px"
        >
          <el-col :span="24">
            <el-form-item label="合同名称" prop="contractName">
              <el-input
                v-model="contractData.contractName"
                placeholder="请输入合同名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="合同编号" prop="contractNumbers">
              <el-input
                v-model="contractData.contractNumbers"
                placeholder="请输入合同名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆编号" prop="vehicleId">
              <el-input
                v-model="contractData.vehicleId"
                placeholder="请输入车辆编号"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方" prop="customerName">
              <el-input
                v-model="contractData.customerName"
                placeholder="请输入甲方"
                show-word-limit
                clearable
                prefix-icon="el-icon-s-custom"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方" prop="companyName">
              <el-input
                v-model="contractData.companyName"
                placeholder="请输入乙方"
                show-word-limit
                clearable
                prefix-icon="el-icon-s-custom"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方证件号" prop="customerID">
              <el-input
                v-model="contractData.customerID"
                placeholder="请输入客户证件号"
                show-word-limit
                clearable
                prefix-icon="el-icon-s-custom"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方证件号" prop="companyID">
              <el-input
                v-model="contractData.companyID"
                placeholder="请输入员工证件号"
                clearable
                prefix-icon="el-icon-user-solid"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方联系电话" prop="customerPhone">
              <el-input
                v-model="contractData.customerPhone"
                placeholder="请输入联系电话"
                show-word-limit
                clearable
                prefix-icon="el-icon-phone-outline"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系电话" prop="companyPhone">
              <el-input
                v-model="contractData.companyPhone"
                placeholder="请输入联系电话"
                show-word-limit
                clearable
                prefix-icon="el-icon-phone-outline"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="合同有效期" prop="contractLife">
              <el-date-picker
                type="datetimerange"
                v-model="contractData.contractLife"
                :default-time="['00:00:00', '12:00:00']"
                :style="{ width: '100%' }"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contractType">
              <el-select
                v-model="contractData.contractType"
                placeholder="请选择合同类型"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in contractTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式" prop="payment">
              <el-select
                v-model="contractData.payment"
                placeholder="请选择支付方式"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in paymentOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input-number
                v-model="contractData.contractAmount"
                placeholder="合同金额"
                controls-position="right"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已付金额" prop="paidAmount">
              <el-input-number
                v-model="contractData.paidAmount"
                placeholder="已付金额"
                controls-position="right"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="contractData.remark"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large" style="margin-top: 12px">
              <el-button @click="pre">上一步</el-button>
              <el-button @click="next">下一步</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div v-if="active == 2">
      <d2-ueditor v-model="contractData.content" />
      <el-button type="primary" @click="submitContract" :loading="subLoad"
        >提交</el-button
      >
      <el-button style="margin-top: 12px" @click="pre">上一步</el-button>
    </div>
  </d2-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  components: {},
  props: [],
  data() {
    var checkVehicle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("车辆不能为空"));
      }
      this.checkVehicleByNum({ vehicleNumber: value }).then((res) => {
        if (res == null || res == "") {
          return callback(new Error("车辆不存在"));
        }
        callback();
      });
    };

    return {
      active: 0,
      subLoad: false,
      contractList: [],
      searchText: "",
      url: "http://127.0.0.1:9090/bpmn/contract.png",
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [10, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pageForm: {
        oldFilename: "",
        pageNum: 1,
        pageSize: 10,
      },
      contractData: {
        contractName: "测试合同",
        vehicleId: "123",
        contractNumbers: "123adfseaf-sdf445",
        customerName: "张三",
        companyName: "某宝汽车租赁公司",
        customerID: "370103197507106796",
        companyID: "5201314",
        customerPhone: "15978907074",
        companyPhone: "010-62752114",
        contractLife: null,
        contractType: 1,
        payment: 1,
        contractAmount: 100,
        paidAmount: 0,
        content: null,
        remark: undefined,
      },
      contractText: {
        // content:'<p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">&nbsp; &nbsp; &nbsp; 出租方(甲方)： 身份证号码：${customerID}</span></p><p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　承租方(乙方)： 身份证号码：${contractName}</span></p><p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　甲、乙双方通过友好协商，就档口租赁事宜达成协议如下：</span></p>'
        content:
          '<p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">出租方(甲方)： 身份证号码：<span style="text-decoration:underline;">${contractLife}</span></span></p><p style="text-align:left;line-height:30px"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　承租方(乙方)： 身份证号码：${contractName}</span></p><p style="text-align: left; line-height: 30px;"><span style="font-size:16px;font-family:&#39;微软雅黑&#39;,sans-serif;color:#333333">　　甲、乙双方通过友好协商，就档口租赁事宜达成协议如下：</span></p>',
      },
      rules: {
        contractName: [
          {
            required: true,
            message: "请输入合同名称",
            trigger: "blur",
          },
        ],
        contractNumbers: [
          {
            required: true,
            message: "请输入合同编号",
            trigger: "blur",
          },
        ],
        vehicleId: [
          {
            required: true,
            validator: checkVehicle,
            trigger: "blur",
          },
        ],
        customerName: [
          {
            required: true,
            message: "请输入甲方名",
            trigger: "blur",
          },
        ],
        companyName: [
          {
            required: true,
            message: "请输入乙方名",
            trigger: "blur",
          },
        ],
        customerPhone: [
          {
            required: true,
            message: "请输入甲方电话",
            trigger: "blur",
          },
        ],
        companyPhone: [
          {
            required: true,
            message: "请输入乙方电话",
            trigger: "blur",
          },
        ],
        customerID: [
          {
            required: true,
            message: "请输入甲方ID",
            trigger: "blur",
          },
        ],
        companyID: [
          {
            required: false,
            message: "请输入乙方ID",
            trigger: "blur",
          },
        ],
        contractLife: [
          {
            required: true,
            message: "合同有效期不能为空",
            trigger: "change",
          },
        ],
        contractType: [
          {
            required: true,
            message: "请选择合同类型",
            trigger: "change",
          },
        ],
        payment: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change",
          },
        ],
        contractAmount: [
          {
            required: true,
            message: "合同金额",
            trigger: "blur",
          },
        ],
        paidAmount: [
          {
            required: true,
            message: "已付金额",
            trigger: "blur",
          },
        ],
        remark: [],
      },
      contractTypeOptions: [
        {
          label: "租房合同",
          value: 1,
        },
        {
          label: "租车合同",
          value: 2,
        },
      ],
      paymentOptions: [
        {
          label: "支付宝",
          value: 1,
        },
        {
          label: "微信",
          value: 2,
        },
      ],
    };
  },
  computed: {
    pages () {
      const pages = []
      this.contractList.forEach((item, index) => {
        const page = Math.floor(index / 4)//4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    ...mapActions("d2admin/resource", [
      "findContractPage",
      "findContractWholePage",
    ]),
    ...mapActions("d2admin/contract", ["createContract", "getAll"]),
    ...mapActions("d2admin/vehicle", ["checkVehicleByNum"]),
    init() {
      this.findContractWholePage(this.pageForm).then((res) => {
        this.contractList = res.list;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
      });
    },
    searchBtn() {
      this.init();
    },
    handleSizeChange(val) {
      this.pageForm.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.init();
    },
    submitContract() {
      var contract = {
        contractName: this.contractData.contractName,
        contractNumbers: this.contractData.contractNumbers,
        signUnit: this.contractData.companyID,
        vehicleId: this.contractData.vehicleId,
        payment: this.contractData.payment,
        principal: this.$store.state.d2admin.user.info.id,
        contractUserId: this.contractData.customerID,
        contractUsername: this.contractData.customerName,
        remark: this.contractData.remark,
        contractAmount: this.contractData.contractAmount,
        paidAmount: this.contractData.paidAmount,
        startTime: this.contractData.contractLife[0],
        endTime: this.contractData.contractLife[1],
        contractType: this.contractData.contractType,
        content: this.contractData.content,
      };
      console.log(contract);
      this.subLoad = true;
      this.createContract(contract).then((res) => {
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        this.subLoad = false
        this.active = 0;
      });
    },
    getValueByObject(content) {
      var returnValue = "";
      var strPrefix = "${";
      var strSuffix = "}";
      var start = content.indexOf(strPrefix);
      if (start == -1) {
        return content;
      } else {
        var result = content;
        while (start != -1) {
          const end = result.indexOf(strSuffix, start);
          const key = result.substring(start + strPrefix.length, end);
          const replaceContent = "";
          if (key != null) {
            if (this.contractData[key] != null) {
              // console.log(this.contractData);
              if (key == "contractLife") {
                replaceContent =
                  new Date(this.contractData[key][0]).format("yyyy年MM月dd日") +
                  "至" +
                  new Date(this.contractData[key][1]).format("yyyy年MM月dd日");
              } else {
                replaceContent = this.contractData[key];
              }
            }
          }
          // console.log(replaceContent);
          returnValue =
            result.substring(0, start) +
            replaceContent +
            result.substring(end + strSuffix.length);
          result = returnValue;
          start = result.indexOf(strPrefix, start + replaceContent.length);
        }
      }
      return returnValue;
    },
    resetForm() {
      this.$refs["contractForm"].resetFields();
    },
    next() {
      this.$refs["contractForm"].validate((valid) => {
        console.log(valid);
        if (!valid) return;
        this.contractData.content = this.getValueByObject(
          this.contractText.content
        );
        this.active++;
        console.log(this.active);
      });
    },
    pre() {
      this.active--;
    },
    chooseConract(contract) {
      // this.getAll().then(res =>{
      //   console.log(res);
      // })
      // console.log(contract);
      this.contractText = contract;
      this.active++;
    },
  },
};
</script>
<style lang="scss" scope>
.pagination {
  width: 50%;
  margin: 15px auto 0 auto;
}
.activeLi {
  width: 60%;
  margin: 10px auto 20px auto;
  background: center;
}
.contract-form {
  margin: 0 auto;
  width: 80%;
  text-align: center;
  
}

.search {
  .search-input {
    margin: 0 auto 20px 35%;
    width: 400px;
    height: 25px;
  }
}
</style>
