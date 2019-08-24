<template>
  <div id="g-header">
    <el-row>
      <el-col :span="2">
        <div class="logo" @click="toIndexPage">
          <img src="../../assets/images/logo.png" alt="logo">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search">
          <el-input
            size="small"
            width="90%"
            placeholder="搜索您想要的内容···"
            suffix-icon="el-icon-search"
            v-model="input3">
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="nav">
          <ul>
            <router-link to="/index"><li>首页</li></router-link>
            <router-link to="/community"><li>社区</li></router-link>
            <router-link to="/mall/mallIndex"><li>眼妆商城</li></router-link>
            <router-link to="/mine/myPosts"><li>个人中心</li></router-link>
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
      isActive: 1,
      input3: ''
    }
  },
  methods: {
    // 跳转到首页
    toIndexPage(){
      this.$router.push({name:'Index'});
      this.isActive = 1;
    },
    // 跳转到社区页
    toCommunityPage(){
      this.$router.push({name:'Community'});
      this.isActive = 2;
    },
    // 跳转到商城页
    toMallPage(){
      this.$router.push({name:'Mall'});
      this.isActive = 3;
    },
    // 跳转到登录页
    toLoginPage(){
      this.$router.push({name:'Login'});
    },
    // 跳转到注册页
    toRegisterPage(){
      this.$router.push({name:'Register'});
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