<template>
  <div id="community">
    <div class="container">
      <div class="navs">
        <dl class="teachList">
          <dt>化妆教程</dt>
          <dd :class="{navActive: status === 0}" @click="changePost(0)">最新</dd>
          <dd :class="{navActive: status === 1}" @click="changePost(1)">热门</dd>
          <dd :class="{navActive: status === 2}" @click="changePost(2)">图文</dd>
          <dd :class="{navActive: status === 3}" @click="changePost(3)">视频</dd>
        </dl>
        <!-- <el-divider></el-divider> -->
        <dl class="cusList">
          <dt>妆容分享</dt>
          <dd :class="{navActive: status === 4}" @click="changePost(4)">最新</dd>
          <dd :class="{navActive: status === 5}" @click="changePost(5)">热门</dd>
          <dd :class="{navActive: status === 6}" @click="changePost(6)">图文</dd>
          <dd :class="{navActive: status === 7}" @click="changePost(7)">视频</dd>
        </dl>
        <!-- <el-divider></el-divider> -->
        <dl class="cosList">
          <dt>妆品推荐</dt>
          <dd :class="{navActive: status === 8}" @click="changePost(8)">最新</dd>
          <dd :class="{navActive: status === 9}" @click="changePost(9)">热门</dd>
        </dl>
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

import {getAllPosts} from '@/api/post.js'

export default {
  name: 'community',
  data(){
    return {
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
        this.youLikeList = data.slice(0,8)
        this.hotRecommendList = data.slice(0,10)
        this.loading = false
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