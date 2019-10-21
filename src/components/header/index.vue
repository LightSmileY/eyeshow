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
                    <li v-for="item in headerHotSearchList">{{item}}</li>
                  </ul>
                </div>
                <div class="youLike">
                  <div class="y-title">猜你喜欢</div>
                  <ul>
                    <li v-for="item in headerYouLikeList">{{item}}</li>
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
            <router-link to="/mall/mallIndex"><li>商城</li></router-link>
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
              <img :src="$store.state.userInfo.avatar">
            </div>
            <div class="nickName">
              {{$store.state.userInfo.nickname}}
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
import { getUserInfo, updateUserInfo } from '@/api/user'
import { headerHotSearchList, headerYouLikeList } from '@/assets/js/staticData'

export default {
  name: 'g-header',
  data(){
    return {
      input: '',
      userInfo: {},
      userInfo2: {},
      headerHotSearchList,
      headerYouLikeList
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
    getInfo(uid){
      getUserInfo({ user_ID: uid})
      .then(res => {
        this.userInfo = res.data.detailMsg.data[0]
        this.$store.dispatch('getUserInfo', res.data.detailMsg.data[0])
        localStorage.setItem('userInfo', JSON.stringify(res.data.detailMsg.data[0]))
      })
    },
    toMine(){
      this.$store.dispatch('getViewUserId', this.$store.state.userInfo.id)
      this.$router.push({name:'MyPosts'})
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
        localStorage.removeItem('userInfo')
        this.$message({
          type: 'success',
          message: '退出登录!'
        })
      })
    }
  },
  components:{

  },
  mounted(){
    let uid = JSON.parse(localStorage.userInfo).id
    this.$store.dispatch('getViewUserId', uid)
    this.getInfo(uid)
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/header/header.scss";
</style>