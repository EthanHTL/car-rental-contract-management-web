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
    
    <el-dialog title="模板" :visible.sync="templateDialog" :fullscreen="true">
      <el-row>
      <el-col :span="5" v-for="(o, index) in templateList" :key="o.id" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="url" class="image">
          <div style="padding: 14px;">
            <span>{{o.oldFilename}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" @click="updateConract(o)">编辑</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>


      <div slot="footer" class="dialog-footer" >
        <el-button @click="templateDialog = false">取 消</el-button>
      </div>
    </el-dialog>

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

export default {
  name: 'contract-manager',
  data () {
    return {
      text: '<p>Hello World</p>',
      templateDialog:false,
      templateList:[]

    }
  },
  methods: {
    chooseTempalte(){

      this.templateDialog = true
    }
  }
}
</script>
