<template>
  <div id="register">
    <div class="master">
      <div class="loginbox">
        <div class="form">
          <div class="title">
            注册
          </div>
          <el-form 
          :model="ruleForm" 
          status-icon 
          :rules="rules" 
          ref="ruleForm" 
          label-width="70px"
          label-position="left" 
          class="demo-ruleForm"
          size="small">
            <el-form-item label="用户名" prop="login_name">
              <el-input type="text" v-model="ruleForm.login_name" autocomplete></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input type="password" v-model="ruleForm.checkPassword"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="operate">
            <el-button size="small" type="primary" @click="register">提交</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
            <div class="tip">
              <div class="words">
                已经有账号？去
                <span class="link" @click="toLogin">登录</span>
              </div>
            </div>
          </div>
          <i class="el-icon-close" @click="sendUnRegister"></i>
        </div>
        <div class="info">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid, getTime } from '@/assets/js/pubFunctions'
import { signUp } from '@/api/user'

export default {
  name: 'register',
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'));
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致!'));
      } else {
        callback();
      }
    }
    let checkNickname = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'));
      }
    }
    return {
      msg: false,
      ruleForm: {
        id: '',
        login_name: '',
        password: '',
        checkPassword: '',
        nickname: '',
        phone_number: '',
        mailbox: '',
        register_date: '',
        sex: '',
        birthday: '',
        avatar: '',
        profile: '',
        avatar: 'http://fengblog.xyz/images/flyy/avatar.jpg'
      },
      rules: {
        login_name: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          { validator: checkNickname, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /*点击右上角的取消图标*/
    sendUnRegister(){
      this.$router.go(-1);
    },
    /*点击去登录*/
    toLogin(){
      this.$router.push({name:'Login'});
    },
    registerSuccess() {
      this.$message({
        message: '注册成功',
        type: 'success'
      })
    },
    loginSuccess() {
      this.$message({
        message: '自动登录成功',
        type: 'success'
      })
    },
    fail() {
      this.$message({
        message: '注册失败, 该用户名已存在',
        type: 'error'
      })
    },
    error() {
      this.$message({
        message: '注册失败',
        type: 'error'
      });
    },
    register(){
      if(this.ruleForm.login_name != ''
        &&this.ruleForm.password != ''
        &&this.ruleForm.checkPassword !=''
        &&this.ruleForm.nickname != ''){
        /*任何一项为空时不允许提交，并执行表单验证*/
        let _this = this
        _this.ruleForm.id = uuid()
        _this.ruleForm.register_date = getTime()
        signUp(_this.ruleForm)
        .then(res => {
          console.log(res)
          if(res.data.message == "程序员开小差了，请您稍后再试。"){
            this.$message.error('注册失败~')
            return
          }
          _this.$store.dispatch('getUserInfo', res.data.detailMsg.data)
          localStorage.setItem('userInfo', JSON.stringify(res.data.detailMsg.data))
          _this.registerSuccess()
          setTimeout(() => {
            _this.$router.push({
              name:'MyPosts'
            })
          },1000)
        })
        .catch(err => {
          _this.error()
        })
      }else{
        this.$refs.ruleForm.validate()
      }
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/register/index.scss";
</style>