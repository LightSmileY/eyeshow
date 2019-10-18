<template>
  <div id="login">
    <div class="master">
      <div class="loginbox">
        <div class="form">
          <div class="title">
            登录
          </div>
          <el-form 
          :model="loginInfo" 
          status-icon 
          :rules="rules" 
          ref="ruleForm" 
          label-width="70px"
          label-position="left" 
          class="demo-ruleForm"
          size="small">
            <el-form-item 
            label="用户名" 
            prop="username"
            style="margin-bottom: 20px;">
              <el-input 
              type="text" 
              v-model="loginInfo.username" 
              autocomplete="off"
              size="medium"></el-input>
            </el-form-item>
            <el-form-item 
            label="密码" 
            prop="password">
              <el-input 
              type="password" 
              v-model="loginInfo.password" 
              autocomplete="off"
              size="medium"></el-input>
            </el-form-item>
          </el-form>
          <div class="operate">
            <el-button 
            size="small" 
            type="primary" 
            @click="login">登录</el-button>
            <div class="tip">
              <div class="words">
                还没有账号？去
                <span class="link" 
                @click="toRegisterPage">注册</span>
              </div>
            </div>
          </div>
          <i class="el-icon-close" @click="sendUnLogin"></i>
        </div>
        <div class="info">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {signIn} from '@/api/user'

export default {
  name: 'login',
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'));
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    }
    return {
      msg: false,
      toRegisterInfo: {
        isMask: true,
        isLogin: false,
        isRegister: true
      },
      /*登录信息*/
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /*点击右上角的取消图标*/
    sendUnLogin(){
      this.$router.go(-1);
    },
    /*点击去注册*/
    toRegisterPage(){
      this.$router.push({name:'Register'});
    },
    /*登录成功后给nav组件发送传递信息*/
    sendLoginInfo(){
      
    },
    success() {
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    },
    error() {
      this.$message({
        message: '登录失败',
        type: 'error'
      });
    },
    login(){
      let _this = this
      if(this.loginInfo.username!=''&&this.loginInfo.password!=''){
        /*任何一项为空时不允许提交，并执行表单验证*/
        signIn(this.loginInfo)
        .then(res => {
          //将后台获取到的userInfo存到store
          console.log(res)
          this.$store.dispatch('getUserInfo', res.data.userMessage[0])  //用户信息存入vuex
          this.$store.dispatch('getViewUserId', this.$store.state.userInfo.id)  //资料页用户切换
          localStorage.setItem('userInfo', JSON.stringify(res.data.userMessage[0]))  //用户信息存入localstorage
          _this.$message({
            message: '登录成功',
            type: 'success'
          })
          _this.$router.push({
            name:'MyPosts'
          })
        })
        .catch(() => {
          this.error()          //网络或服务器错误时"登录失败"消息提示
        })
      }else{
        this.$refs.loginInfo.validate()
      }
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/login/index.scss";
</style>