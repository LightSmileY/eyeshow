<template>
  <div id="g-header">
    <el-row>
      <el-col :span="2">
        <div class="logo">
          <router-link to="/index">
            <img src="../../assets/images/logo.png" alt="logo">
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search">
          <el-input
            size="small"
            width="90%"
            placeholder="搜索您想要的内容···"
            suffix-icon="el-icon-search"
            v-model="input">
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="nav">
          <ul>
            <router-link to="/index" :class="{'active': status == 1}" @click="changeLink(1)"><li>首页</li></router-link>
            <router-link to="/community" :class="{'active': status == 2}" @click="changeLink(2)"><li>社区</li></router-link>
            <router-link to="/mall/mallIndex" :class="{'active': status == 3}" @click="changeLink(3)"><li>眼妆商城</li></router-link>
            <router-link to="/mine/myPosts" :class="{'active': status == 4}" @click="changeLink(4)"><li>个人中心</li></router-link>
          </ul>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="me">
          <span @click="toLoginPage">登录</span>&nbsp;/
          <span @click="toRegisterPage">注册</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'g-header',
  data(){
    return {
      status: 1,
      input: ''
    }
  },
  methods: {
    // tabbar跳转
    changeLink(i){
      this.status = i
    },
    // 跳转到登录页
    toLoginPage(){
      this.$router.push({name:'Login'})
    },
    // 跳转到注册页
    toRegisterPage(){
      this.$router.push({name:'Register'})
    }
  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/header/header.scss";
</style>