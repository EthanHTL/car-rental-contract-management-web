<template>
  <d2-container>
    <template slot="header">Header</template>
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
        @click="createType"
        >新增</el-button
      >
      <div class="clear"></div>
    </div>
    <el-form
      :model="searchForm"
      :inline="true"
      class="demo-form-inline tool-form"
      v-show="showForm"
    >
      <el-form-item label="类型名称:">
        <el-input
          v-model="searchForm.vehicleTypeName"
          placeholder="请输入车辆类型名称"
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
        <el-button type="info" plain @click="reset" size="small"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <div class="container-list">
      <!-- 表格 -->
      <el-table :data="vehicleTypeList" style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="vehicleTypeName"
          label="类型名"
          show-overflow-tooltip
          min-width="80"
        >
        </el-table-column>
        <el-table-column prop="vehicleNo" label="类型编号"></el-table-column>
        <el-table-column prop="inventory" label="库存"></el-table-column>
        <el-table-column
          prop="rentOutNumber"
          label="出租量"
          width="130"
        ></el-table-column>

        <el-table-column label="备注" width="150" prop="remark">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-view"
              type="info"
              @click="editDialogShow2(scope.row)"
              style="margin-right: 10px"
              >修改
            </el-link>
            <el-link
              icon="el-icon-finished"
              @click="detailDrawer(scope.row)"
              type="success"
              >车辆信息
            </el-link>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="deleteType(scope.row)"
              ><el-link icon="el-icon-finished" type="success" slot="reference">删除 </el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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

    <el-drawer
      :title="title"
      :visible.sync="vehicleDrawer"
      direction="rtl"
      size="60%"
    >
      <!-- 工具栏 -->
      <div class="tool-btn-vehicle">
        <el-button
          class="screen"
          type="primary"
          size="small"
          :icon="btnIcon"
          @click="toggle2"
          >{{ !showForm2 ? "筛选" : "收起" }}</el-button
        >
        <el-button
          class="createBtn"
          type="primary"
          size="small"
          @click="createVehicle"
          >新增</el-button
        >
        <div class="clear"></div>
      </div>
      <el-form
        :model="searchVechileForm"
        :inline="true"
        class="demo-form-inline tool-form2"
        v-show="showForm2"
      >
        <el-form-item label="编号">
          <el-input
            v-model="searchVechileForm.vehicleNumber"
            placeholder="请输入车辆类型名称"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="searchVechileForm.vehicleName"
            placeholder="请输入车辆类型名称"
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label=""
          ><el-checkbox
            size="medium"
            v-model="searchVechileForm.isAccident"
            true-label="1"
            false-label="0"
            >事故</el-checkbox
          ></el-form-item
        >
        <el-form-item label=""
          ><el-checkbox
            size="medium"
            v-model="searchVechileForm.isRentOut"
            true-label="1"
            false-label="0"
            >出租</el-checkbox
          ></el-form-item
        >
        <el-form-item style="margin-left: 20px">
          <el-button type="success" plain @click="getVehicleList" size="small"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain @click="reset" size="small"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="vehicleList" class="vehicle-table">
        <el-table-column
          property="vehicleNumber"
          label="车辆编号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="vehicleName"
          label="车辆名"
          width="200"
        ></el-table-column>
        <el-table-column property="date" label="图片" width="150">
          <template slot-scope="scope">
            <img :src="'http://localhost:9090' + scope.row.picPath"
          /></template>
        </el-table-column>
        <el-table-column label="事故" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.isAccident == 1 ? "否" : "是"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column property="isRentOut" label="出租" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.isRentOut == 1 ? "否" : "是"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-view"
              type="info"
              @click="editDialogShow3(scope.row)"
              style="margin-right: 10px"
              >编辑
            </el-link>
             <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="deleteVehicle(scope.row)"
              ><el-link icon="el-icon-finished" type="success" slot="reference">删除 </el-link>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="pagination2.pageNum"
        :page-sizes="pagination2.pageSizes"
        :page-size="pagination2.pageSize"
        :total="pagination2.total"
        layout="total,sizes, prev, pager, next,  jumper "
      >
      </el-pagination>
    </el-drawer>

    <el-dialog :title="typeTitle" :visible.sync="typeDialog" width="550px">
      <el-row :gutter="5" class="my-el-row">
        <el-form
          ref="typeForm"
          :model="typeData"
          :rules="rules"
          size="medium"
          label-width="111px"
        >
          <el-col :span="24">
            <el-form-item label="类型名" prop="vehicleTypeName">
              <el-input
                v-model="typeData.vehicleTypeName"
                placeholder="请输入类型名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="编号" prop="vehicleNo">
              <el-input
                v-model="typeData.vehicleNo"
                placeholder="请输入类型名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="库存" prop="inventory">
              <el-input-number
                v-model="typeData.inventory"
                size="small"
                :min="0"
                controls-position="right"
                :style="{ width: '100%' }"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="出租数量" prop="rentOutNumber">
              <el-input-number
                v-model="typeData.rentOutNumber"
                controls-position="right"
                size="small"
                :min="0"
                :style="{ width: '100%' }"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="typeData.remark"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="typeDialog = false">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="vehicleTitle"
      :visible.sync="vehicleDialog"
      width="550px"
    >
      <el-row :gutter="5">
        <el-form
          ref="vehicleForm"
          :model="vehicleData"
          :rules="rules"
          size="medium"
          label-width="111px"
        >
          <el-col :span="24">
            <el-form-item label="车辆图片">
              <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="uploadImageProcess"
                :on-error="uploadError"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageUrl != '' && imageFlag == false"
                  :src="imageUrl"
                  class="avatar"
                />
                <i
                  v-else-if="imageUrl == '' && imageFlag == false"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
                <el-progress
                  v-if="imageFlag == true"
                  type="circle"
                  :percentage="parseFloat(imageUploadPercent)"
                  style="margin: 28px"
                ></el-progress>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆编号" prop="vehicleNumber">
              <el-input
                v-model="vehicleData.vehicleNumber"
                placeholder="请输入编号"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车辆名" prop="vehicleName">
              <el-input
                v-model="vehicleData.vehicleName"
                placeholder="请输入名字"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handelConfirmVehicle">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "user",
  data() {
    return {
      btnIcon: "el-icon-arrow-down",
      showForm: false,
      showForm2: false,
      vehicleTypeList: [],
      vehicleList: [],
      loading: false,
      title: "",
      vehicleDrawer: false,
      pagination: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pagination2: {
        pageNum: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      searchForm: {
        vehicleTypeName: "",
        
        pageSize: 5,
        pageNum: 1,
      },
      searchVechileForm: {
        vehicleName: "",
        vehicleTypeId: "",
        isAccident: "0",
        isRentOut: "0",
        pageSize: 5,
        pageNum: 1,
      },
      processDialog: false,
      typeDialog: false,
      typeTitle: "类别",
      vehicleTitle: "类别",
      vehicleDialog: false,
      imageUrl: "",
      imageFlag: false,
      imageUploadPercent: 0,
      actionUrl: "http://localhost:9090/api/v1/car/vehicle/upload",
      // actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
      typeData: {
        isInsert: false,
        vehicleNo: "",
        inventory: "1",
        rentOutNumber: "1",
        imageUrl: "",
        vehicleTypeName: undefined,
        remark: undefined,
      },
      vehicleData: {
        isInsert: false,
        vehicleNumber: "",
        vehicleName: "",
        vehicleTypeId: "",
        picPath: "",
      },
      rules: {
        vehicleTypeName: [
          {
            required: true,
            message: "请输入类型名称",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
        vehicleNumber: [
          {
            required: true,
            message: "请输入车辆编号",
            trigger: "blur",
          },
        ],
        vehicleName: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur",
          },
        ]
        
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/vehicle", [
      "typeFindPage",
      "typeCreate",
      "typeDelete",
      "typeUpdate",
      "vehicleFindPage",
      "vehicleCreate",
      "vehicleUpdate",
      "vehicleDelete",
    ]),
    init() {
      this.loading = true;
      this.searchForm.pageSize = this.pagination.pageSize;
      this.searchForm.pageNum = this.pagination.pageNum;
      this.typeFindPage(this.searchForm).then((res) => {
        this.vehicleTypeList = res.list;
        this.pagination.pageNum = res.navigateFirstPage;
        this.pagination.pageSize = res.pageSize;
        this.pagination.pageNum = res.pageNum;
        this.pagination.total = res.total;
        this.loading = false;
      });
    },
    toggle: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm = !this.showForm;
    },
    toggle2: function () {
      this.btnIcon = this.showForm ? "el-icon-arrow-down" : "el-icon-arrow-up";
      this.showForm2 = !this.showForm2;
    },
    reset() {
      this.searchForm = {
        vehicleTypeName: "",
        vehicleName: "",
        isAccident: "0",
        isRentOut: "0",
        pageSize: 5,
        pageNum: 1,
      };
    },
    // 新增类型
    createType() {
      this.typeTitle = "新增类型";
      this.typeData.isInsert = true
      this.typeData.imageUrl = ""
      this.typeData.vehicleTypeName = ""
      this.typeData.remark = ""
      
      this.typeDialog = true;
    },
    // 修改类型
    editDialogShow2(row) {
      this.typeTitle = "修改类型";
      this.typeData = row;
      this.typeData.isInsert = false;
      this.typeDialog = true;
    },
    createVehicle() {
      this.vehicleTitle = "新增车辆";
      this.imageUrl = "";
      this.vehicleData.isInsert = true
      this.vehicleData.vehicleNumber = ""
      this.vehicleData.vehicleName = ""
      this.vehicleData.picPath = ""
    
      this.vehicleDialog = true;
    },
    // 修改车辆
    editDialogShow3(row) {
      this.vehicleTitle = "修改车辆信息";
      this.vehicleData.isInsert = false
      this.vehicleData = row;
      this.vehicleDialog = true;
      this.imageUrl = "http://localhost:9090" + row.picPath;
    },
    //
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.init();
    },
    // 下一页
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.init();
    },
    // 根据类别获取车辆信息
    getVehicleList() {
      this.vehicleList = []
      this.searchVechileForm.pageSize = this.pagination2.pageSize;
      this.searchVechileForm.pageNum = this.pagination2.pageNum;
      return this.vehicleFindPage(this.searchVechileForm).then((res) => {
        // console.log(res);
        this.vehicleList = res.list;
        this.pagination2.pageNum = res.pageNum;
        this.pagination2.pageSize = res.pageSize;
        this.pagination2.pageNum = res.pageNum;
        this.pagination2.total = res.total;
      });
    },
    // 车辆信息 drawer
    detailDrawer(row) {
      this.title = row.vehicleTypeName;
      this.searchVechileForm.vehicleTypeId = row.id;
      this.vehicleData.vehicleTypeId = row.id;
      this.getVehicleList().then(() => {
        this.vehicleDrawer = true;
      });
    },
    handleSizeChange2(val) {
      this.pagination2.pageSize = val;
      this.getVehicleList();
    },
    handleCurrentChange2(val) {
      this.pagination2.pageNum = val;
      this.getVehicleList();
    },
    handelConfirm() {
      this.$refs["typeForm"].validate((valid) => {
        if (!valid) return;
        if (this.typeData.isInsert) {
          this.typeCreate(this.typeData).then(()=>{
            this.typeDialog = false;
            this.init();
          })
        } else {
          console.log(this.typeData);
          this.typeUpdate(this.typeData).then(()=>{
            this.typeDialog = false;
            this.init();
          });
        }
        
      });
    },
    handelConfirmVehicle(){
      this.$refs["vehicleForm"].validate((valid) => {
        if (!valid) return;
        if (this.vehicleData.isInsert) {
          this.vehicleCreate(this.vehicleData).then(()=>{
            this.vehicleDialog = false;
            this.getVehicleList();
          });
        } else {
          this.vehicleUpdate(this.vehicleData).then(()=>{
            this.vehicleDialog = false;
            this.getVehicleList();
          });
        }
        
      });
    },
    deleteType(row) {
      // console.log(row);
      this.typeDelete({"id":row.id});
      this.init()
    },
    deleteVehicle(row) {
      // console.log(row);
      this.vehicleDelete({"id":row.id});
      this.getVehicleList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 上传失败
    uploadError(err, file, fileList) {
      console.log(file, fileList);
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imageFlag = false;
      this.imageUploadPercent = 0;
      console.log(res);
      this.vehicleData.picPath = res.data;
    },
    // 上传进度条
    uploadImageProcess(event, file, fileList) {
      this.imageFlag = true;
      let precentage = file.percentage.toFixed(2);

      this.imageUploadPercent = precentage;
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      this.imageFlag = true;
      return  isLt2M;
    },
  },
};
</script>

<style lang="scss">
.el-row {
  width: 90%;
}
.tool-btn {
  width: 65%;
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

.tool-btn-vehicle {
  width: 95%;
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
.tool-form2 {
  max-width: 90%;
  margin: 0 auto 0 10%;
  height: 50px;
}

.vehicle-table {
  width: 85%;
  margin: 0 auto;
  img {
    position: relative;
    height: 35px;
    width: 35px;
    float: left;
    overflow: hidden;
    border: 2px solid #f6f6f6;
    box-shadow: 0 0 1px #000;
    -moz-box-shadow: 0 0 1px #000;
    -webkit-box-shadow: 0 0 1px #000;
  }
}

.container-list {
  max-width: 60%;
  margin: 0 auto;
}

.avatar-uploader {
  width: 180px;
  margin: 0 auto 0 auto;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>