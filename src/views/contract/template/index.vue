<template>
  <d2-container>
    <template slot="header">
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <el-button type="primary" plain>筛选</el-button>
          </template>
          <el-input placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-collapse-item>
      </el-collapse>
    </template>

    <!-- 新增 -->
    <el-button type="success" plain @click="dictInsert = true">新增</el-button>

    <!-- 主体 -->

    <el-row>
      <el-col
        :span="8"
        v-for="(o, index) in 2"
        :key="o"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: "contract-tempalte",
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {},
};
</script>

<style>
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

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>