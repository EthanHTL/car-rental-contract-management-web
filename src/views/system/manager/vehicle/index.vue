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
          v-model="searchForm.contractName"
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
          label="车辆类型"
          show-overflow-tooltip
          min-width="80"
        >
        </el-table-column>
        <el-table-column prop="vehicleNo" label="库存"></el-table-column>
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
              @click="editDialogShow2(scope.$index, scope.row)"
              style="margin-right: 10px"
              >详情
            </el-link>
            <el-link
              icon="el-icon-finished"
              @click="detailDrawer(scope.row)"
              type="success"
              >进度
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
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
          @click="typeDialog = true"
          >新增</el-button
        >
        <div class="clear"></div>
      </div>
      <el-form
        :model="searchForm"
        :inline="true"
        class="demo-form-inline tool-form2"
        v-show="showForm2"
      >
        <el-form-item label="类型名称:">
          <el-input
            v-model="searchForm.contractName"
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
            <img :src="scope.row.picPath"
          /></template>
        </el-table-column>
        <el-table-column
          property="isAccident"
          label="事故"
          width="150"
        ></el-table-column>
        <el-table-column
          property="isRentOut"
          label="出租"
          width="150"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="pagination2.currentPage"
        :page-sizes="pagination2.pageSizes"
        :page-size="pagination2.pageSize"
        :total="pagination2.total"
        layout="total,sizes, prev, pager, next,  jumper "
      >
      </el-pagination>
    </el-drawer>

    <el-dialog title="新增类别" :visible.sync="typeDialog" width="550px">
        <!-- action="https://jsonplaceholder.typicode.com/posts/"
        http://localhost:9090/api/v1/car/vehicle/upload
         -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:9090/api/v1/car/vehicle/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :on-progress="uploadImageProcess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl!='' && imageFlag == false" :src="imageUrl" class="avatar" />
        <i v-else-if="imageUrl=='' && imageFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress v-if="imageFlag == true" type="circle" :percentage="parseFloat(imageUploadPercent)" style="margin:28px;"></el-progress>
        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>  
      <el-dialog :visible.sync="dialogVisible" >
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <el-row :gutter="5">
        <el-form
          ref="contractForm"
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
        <el-button>取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
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
        currentPage: 1,
        pageCount: 6,
        pageSizes: [2, 5, 20, 50],
        pageSize: 5,
        total: 500,
      },
      pagination2: {
        currentPage: 1,
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
        id: "",
        pageSize: 5,
        pageNum: 1,
      },
      processDialog: false,
      typeDialog: false,
      imageUrl: "",
      dialogImageUrl: '',
      dialogVisible: false,
      imageFlag: false,
      imageUploadPercent: 0,
      typeData: {
        imageUrl: "",
        vehicleTypeName: undefined,
        remark: undefined,
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
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("d2admin/vehicle", ["typeFindPage", "vehicleFindPage"]),
    init() {
      this.loading = true;
      this.searchForm.pageSize = this.pagination.pageSize;
      this.searchForm.pageNum = this.pagination.currentPage;
      this.typeFindPage(this.searchForm).then((res) => {
        this.vehicleTypeList = res.list;
        this.pagination.currentPage = res.navigateFirstPage;
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
        contractName: "",
        state: "",
      };
    },
    createType() {
      this.typeData = {
        imageUrl: "",
        vehicleTypeName: undefined,
        remark: undefined,
      };
      this.typeDialog = true;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.init();
    },
    getVehicleList() {
      this.searchVechileForm.pageSize = this.pagination2.pageSize;
      this.searchVechileForm.pageNum = this.pagination2.currentPage;
      return this.vehicleFindPage(this.searchVechileForm).then((res) => {
        // console.log(res);
        this.vehicleList = res.list;
        this.pagination2.currentPage = res.navigateFirstPage;
        this.pagination2.pageSize = res.pageSize;
        this.pagination2.pageNum = res.pageNum;
        this.pagination2.total = res.total;
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
      this.$refs["contractForm"].validate((valid) => {
        if (!valid) return;
        this.close();
      });
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imageFlag = false;
      this.imageUploadPercent = 0;
    },
    uploadImageProcess(event, file, fileList){
        this.imageFlag = true;
        this.imageUploadPercent = file.percentage.toFixed(2);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    detailDrawer(row) {
      this.title = row.vehicleTypeName;
      this.searchVechileForm.id = row.id;
      this.getVehicleList().then(() => {
        this.vehicleDrawer = true;
      });
    },
  },
};
</script>

<style lang="scss">
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
}

.container-list {
  max-width: 60%;
  margin: 0 auto;
}
.el-row {
  width: 86%;
}
.avatar-uploader {
  width: 180px;
  margin: 0 auto 15px auto;
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