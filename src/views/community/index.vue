<template>
  <div id="community">
    <div class="container">
      <div class="navs">
        <div class="allPost">
            <span class="el-dropdown-link">
              最新帖子
            </span>
        </div>
        <div class="allPost">
            <span class="el-dropdown-link">
              热门帖子
            </span>
        </div>
        <div class="cusList">
          <!-- <el-dropdown placement="bottom-start"> -->
            <span class="el-dropdown-link" @click="getAllPostsByType('1')">
              妆容分享
            </span>
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-view">最新</el-dropdown-item>
              <el-dropdown-item icon="el-icon-sunny">热门</el-dropdown-item>
              <el-dropdown-item icon="el-icon-picture">图文</el-dropdown-item>
              <el-dropdown-item icon="el-icon-video-camera-solid">视频</el-dropdown-item>
            </el-dropdown-menu> -->
          <!-- </el-dropdown> -->
        </div>
        <div class="teachList">
          <!-- <el-dropdown placement="bottom-start"> -->
            <span class="el-dropdown-link">
              化妆教程
            </span>
            <!-- <el-dropdown-menu slot="dropdown" @click="getAllPostsByType('2')"> -->
              <!-- <el-dropdown-item icon="el-icon-view">最新</el-dropdown-item> -->
              <!-- <el-dropdown-item icon="el-icon-sunny">热门</el-dropdown-item> -->
              <!-- <el-dropdown-item icon="el-icon-picture">图文</el-dropdown-item> -->
              <!-- <el-dropdown-item icon="el-icon-video-camera-solid">视频</el-dropdown-item> -->
            <!-- </el-dropdown-menu> -->
          <!-- </el-dropdown> -->
        </div>
        <div class="cosList">
          <!-- <el-dropdown placement="bottom-start"> -->
            <span class="el-dropdown-link">
              妆品推荐
            </span>
            <!-- <el-dropdown-menu slot="dropdown"> -->
              <!-- <el-dropdown-item icon="el-icon-view">最新</el-dropdown-item> -->
              <!-- <el-dropdown-item icon="el-icon-sunny">热门</el-dropdown-item> -->
            <!-- </el-dropdown-menu> -->
          <!-- </el-dropdown> -->
        </div>
        <div class="aboutMe"  @click="openMessage">
          <el-badge :value="100" :max="10" class="item">
            与我相关
          </el-badge>
        </div>
      </div>
      <div class="main">
        <ul class="posts">
          <div class="publish">
            <div class="publishDesc">
              <img src="@/assets/images/123.png">
            </div>
            <div class="publishBtn">
              <publish-page/>
            </div>
          </div>
          <div
          v-loading="loading"
          element-loading-text="玩命加载中"
          element-loading-background="rgba(255, 255, 255, 0)">
            <!-- 帖子列表组件 -->
            <post-list :arrayList="postList" v-if="bodyStatus === 1"/>
            <!-- 消息列表 -->
            <message-list v-if="bodyStatus === 2"/>
          </div>
        </ul>
      </div>
      <div class="aside">
        <div 
        class="youLike"
        v-loading="loading"
        element-loading-text="玩命加载中"
        element-loading-background="rgba(255, 255, 255, 0)">
          <!-- 猜你喜欢组件 -->
          <you-like :arrayList="youLikeList"/>
        </div>
        <div 
        class="recommend"
        v-loading="loading"
        element-loading-text="玩命加载中"
        element-loading-background="rgba(255, 255, 255, 0)">
          <!-- 热门推荐组件 -->
          <hot-recommend :arrayList="hotRecommendList"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublishPage from '@/components/community/publish'
import PostList from '@/components/community/postList'
import MessageList from '@/components/community/messageList'
import YouLike from '@/components/community/youLike'
import HotRecommend from '@/components/community/hotRecommend'

import { getAllPosts, getAllPostsByType, getAllPostsByStyle } from '@/api/post.js'

import { arraySort } from '@/assets/js/pubFunctions'

export default {
  name: 'community',
  data(){
    return {
      activeName: '1',
      status: 0,
      bodyStatus: 1,
      postList: [],
      youLikeList: [],
      hotRecommendList: [],
      loading: true
    }
  },
  components:{
    PublishPage,
    PostList,
    MessageList,
    YouLike,
    HotRecommend
  },
  computed: {
    
  },
  methods: {
    // 切换类型
    changePost(i){
      this.status = i,
      this.bodyStatus = 1,
      document.documentElement.scrollTop = 0
    },
    openMessage(){
      this.bodyStatus = 2,
      document.documentElement.scrollTop = 0
    },
    // 获取所有帖子
    getAllPostsData(){
      getAllPosts().then(data => {
        this.postList = data
        this.postList.sort((a,b) => a.postTime > b.postTime)
        this.youLikeList = data.slice(0,8)
        this.hotRecommendList = data.slice(0,10)
        this.loading = false
        console.log(this.postList)
      })
    },
    // 根据类型获取所有帖子
    getAllPostsByType(i){
      getAllPosts({type: i, user_ID: this.$store.state.userInfo.id})
      .then(res => {
        console.log(res)
        this.postList = res.data.detailMsg.data.sort((a,b) => Number(a.postTime) - Number(b.postTime))
        console.log(this.postList)
      })
    }
  },
  created(){
    this.getAllPostsData()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/index.scss";
</style>