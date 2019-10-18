<template>
  <div id="community">
    <div class="container">
      <div class="navs">
        <div class="newPost" @click="getAllPostsData">
          最新
        </div>
        <div class="hotPost" @click="getHotPost">
          热门
        </div>
        <div class="cusList" @click="getPostsByType('1')">
          妆容分享
        </div>
        <div class="teachList" @click="getPostsByType('2')">
          化妆教程
        </div>
        <div class="cosList" @click="getPostsByType('3')">
          妆品推荐
        </div>
        <div class="imgList" @click="getPostsBystyle('1')">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图文
        </div>
        <div class="videoList" @click="getPostsBystyle('2')">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;视频
        </div>
        <div class="aboutMe"  @click="openMessage">
          <el-badge value="new" class="item">
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
              <publish-page @func="addPost"/>
            </div>
          </div>
          <div
          v-loading="loading"
          element-loading-text="玩命加载中"
          element-loading-background="rgba(255, 255, 255, 0)">
            <!-- 帖子列表组件 -->
            <post-list 
            :arrayList="postList" 
            v-if="bodyStatus === 1"
            @fuc="addPost"/>
            <!-- 消息列表 -->
            <message-list v-if="bodyStatus === 2"/>
          </div>
        </ul>
      </div>
      <div class="aside">
        <div 
        class="youLike"
        v-loading="loading2"
        element-loading-text="玩命加载中"
        element-loading-background="rgba(255, 255, 255, 0)">
          <!-- 猜你喜欢组件 -->
          <you-like :arrayList="youLikeList"/>
        </div>
        <div 
        class="recommend"
        v-loading="loading3"
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
      hotPostList: [],
      youLikeList: [],
      hotRecommendList: [],
      loading: true,
      loading2: true,
      loading3: true
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
    // 发表帖子成功后刷新
    addPost(){
      this.getAllPostsData()
    },
    // 切换类型
    changePost(i){
      this.status = i
      this.bodyStatus = 1
      document.documentElement.scrollTop = 0
    },
    openMessage(){
      this.bodyStatus = 2,
      document.documentElement.scrollTop = 0
    },
    // 获取所有帖子
    getAllPostsData(){
      this.bodyStatus = 1
      this.postList = {}
      this.loading = true
      getAllPosts().then(data => {
        this.postList = data
        this.postList.sort((a, b) => {
          let x = a["postTime"]
          let y = b["postTime"]
          return x > y ? -1 : x < y ? 1 : 0
        })
        this.youLikeList = data.slice(0,8)
        this.hotRecommendList = data.slice(0,10)
        this.loading = false
        this.loading2 = false
        this.loading3 = false
      })
    },
    // 获取热门帖子
    getHotPost(){
      this.bodyStatus = 1
      this.postList = {}
      this.loading = true
      getAllPosts().then(data => {
        this.postList = data
        this.postList.sort((a, b) => {
          let x = a["likeCount"]
          let y = b["likeCount"]
          return x > y ? -1 : x < y ? 1 : 0
        })
        this.loading = false
      })
    },
    // 根据类型获取所有帖子
    getPostsByType(i){
      this.bodyStatus = 1
      this.postList = {}
      this.loading = true
      getAllPostsByType({type: i, user_ID: this.$store.state.userInfo.id})
      .then(res => {
        this.postList = res.data.detailMsg.data
        this.postList.sort((a, b) => {
          let x = a["postTime"]
          let y = b["postTime"]
          return x > y ? -1 : x < y ? 1 : 0
        })
        this.loading = false
      })
    },
    // 根据风格获取所有帖子
    getPostsBystyle(i){
      this.bodyStatus = 1
      this.postList = {}
      this.loading = true
      getAllPostsByStyle({style: i, user_ID: this.$store.state.userInfo.id})
      .then(res => {
        this.postList = res.data.detailMsg.data
        this.postList.sort((a, b) => {
          let x = a["postTime"]
          let y = b["postTime"]
          return x > y ? -1 : x < y ? 1 : 0
        })
        this.loading = false
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