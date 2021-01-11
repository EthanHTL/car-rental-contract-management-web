<template>
  <div class="page-register">
    <div class="page-register--layer page-register--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-register--layer page-register--layer-time"
      flex="main:center cross:center"
    >
      {{ time }}
    </div>
    <div class="page-register--layer">
      <div
        class="page-register--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-register--content-header">
          <p class="page-register--content-header-motto">
            时间是一切财富中最宝贵的财富---注册
          </p>
        </div>
        <div
          class="page-register--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
          <!-- <img class="page-register--logo" src="./image/logo@2x.png"> -->
          <!-- form -->
          <div class="page-register--form">
            <el-card shadow="never">
              <el-form
                status-icon
                ref="registerForm"
                label-position="right"
                label-width="80px"
                :rules="rules"
                :model="formregister"
                size="default"
              >
                <el-form-item prop="username">
                  
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formregister.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="formregister.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    type="password"
                    v-model="formregister.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    type="password"
                    v-model="formregister.checkPass"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="formregister.sex" size="mini">
                    <el-radio border  v-for="item in sex" :key="item.code" 
                    :label="item.name" :value="item.code"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="formregister.idCard"></el-input>
                </el-form-item>
                <el-form-item label="住址">
                  <el-input v-model="formregister.addr"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                  <el-input v-model="formregister.telephone"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="remark">
                  <el-input type="textarea" v-model="formregister.remark"></el-input>
                </el-form-item>

                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-register"
                >
                  注册用户
                </el-button>
              </el-form>
            </el-card>
            <p class="page-register--options" flex="main:right cross:center">
              <span @click="tologin">已有账户，去登陆</span>
            </p>
          </div>
        </div>

        <div class="page-register--content-footer">
          <p class="page-register--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)"
            >
              {{ language.label }}
            </a>
          </p>
          <p class="page-register--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />
            2018 D2 Projects 开源组织出品
            <a href="https://github.com/FairyEver"> @FairyEver </a>
          </p>
          <p class="page-register--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
import localeMixin from "@/locales/mixin.js";
import log from '@/libs/util.log';
export default {
  mixins: [localeMixin],
  data() {
    var validateusername = (rule, value, callback) =>{
        if(value === ''){
          callback(new Error('请输入用户名'));
        } else {
          this.$store.dispatch("d2admin/system/checkUserName",{"username":value}).then(res =>{
            console.log(res);
            if(!res){
               callback();
            }else{
              callback(new Error('该账户已存在，请重新输入！'));
            }
          })


        }

    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formregister.password !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formregister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 表格数据
      sex: {},
      // 表单
      formregister: {
        username: "admin",
        nickname: "张三",
        password: "",
        checkPass: "",
        sex: 0,
        addr: "重庆市",
        telephone: "12345678911",
        idCard: "500229199905138990",
        remark: "",
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            validator: validateusername,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        idCard: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur",
          },
        ],
        telephone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur",
          },
        ],
        
      },
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch("d2admin/system/getSexs").then(res =>{
      this.sex = this.$store.state.d2admin.system.sexList;
    })

    // this.getSexs().then(res =>{
    //   this.sex = this.$store.state.d2admin.system.sexList;
    // })

    
    
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("d2admin/system/", ["register", "getSexs"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formregister.username = user.username;
      this.formregister.password = user.password;
      this.submit();
    },
    tologin(){
      this.$router.push("/login")
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.register(this.formregister).then(res => {
            console.log(res);
            // 重定向对象不存在则返回顶层路径
            // this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.page-register {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-register--layer {
    @extend %full;
    overflow: auto;
  }
  .page-register--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-register--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-register--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-register--content-header {
    padding: 1em 0;
    .page-register--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-register--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-register--form {
    width: 480px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-register {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .register-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-register--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-register--quick {
      width: 100%;
    }
  }
  
  // footer
  .page-register--content-footer {
    padding: 1em 0;
    .page-register--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-register--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-register--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
