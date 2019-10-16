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
          <div class="input">
            <el-input
              size="small"
              width="90%"
              placeholder="搜索您想要的内容···"
              suffix-icon="el-icon-search"
              v-model="input">
            </el-input>
            <!-- 搜索框推荐 -->
            <div class="hoverRecommendCon">
              <div class="hoverRecommend">
                <div class="hotSearch">
                  <div class="h-title">热门搜索</div>
                  <ul>
                    <li v-for="item in 15">新化妆品</li>
                  </ul>
                </div>
                <div class="youLike">
                  <div class="y-title">猜你喜欢</div>
                  <ul>
                    <li v-for="item in 5">柔和眼妆品</li>
                  </ul>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="nav">
          <ul>
            <router-link to="/index"><li>首页</li></router-link>
            <router-link to="/community"><li>社区</li></router-link>
            <router-link to="/mall/mallIndex"><li>眼妆商城</li></router-link>
          </ul>
        </div>
      </el-col>
      <el-col :span="4" v-if="!isLogin">
        <div class="me-1">
          <span class="login" @click="toLoginPage">登录</span>&nbsp;/&nbsp;
          <span class="register" @click="toRegisterPage">注册</span>
        </div>
      </el-col>
      <el-col :span="4" v-if="isLogin">
        <div class="me-2" @click="toMine()">
          <div class="avatar-name">
            <div class="avatar">
              <img :src="userInfo.avatar">
            </div>
            <div class="nickName">
              {{userInfo.nickname}}
            </div>
          </div>
          <div class="exit" @click.stop="exit">
            退出
          </div>
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
      input: '',
      userInfo: {},
      userInfo2: {}
    }
  },
  watch: {
    
  },
  computed: {
    isLogin(){
      this.userInfo = this.$store.state.userInfo
      return this.userInfo.id != "-1" && this.userInfo.id
    }
  },
  methods: {
    // tabbar跳转
    /*changeLink(i){
      this.status = i
      console.log(this.status)
    },*/
    toMine(){
      this.$router.push({name:'MyPosts'})
      this.$store.dispatch('getViewUserId', this.$store.state.userInfo.id)
    },
    // 跳转到登录页
    toLoginPage(){
      this.$router.push({name:'Login'})
    },
    // 跳转到注册页
    toRegisterPage(){
      this.$router.push({name:'Register'})
    },
    // 退出登录
    exit(){
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.state.userInfo = {}
        // localStorage.removeItem('userInfo')
        this.$message({
          type: 'success',
          message: '退出登录!'
        });
      })
    }
  },
  components:{

  },
  mounted(){
    this.$store.dispatch('getUserInfo', JSON.parse(localStorage.userInfo))
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/header/header.scss";
</style>