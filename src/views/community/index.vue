<template>
  <div id="community">
    <div class="container">
      <div class="main">
        <ul class="nav">
          <!-- <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>最新</el-dropdown-item>
                <el-dropdown-item>热门</el-dropdown-item>
                <el-dropdown-item>图文</el-dropdown-item>
                <el-dropdown-item>视频</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->
          <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                眼妆教程<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>全部</el-dropdown-item>
                <el-dropdown-item>最新</el-dropdown-item>
                <el-dropdown-item>热门</el-dropdown-item>
                <el-dropdown-item>图文</el-dropdown-item>
                <el-dropdown-item>视频</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                妆品推荐<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>全部</el-dropdown-item>
                <el-dropdown-item>最新</el-dropdown-item>
                <el-dropdown-item>最热</el-dropdown-item>
                <el-dropdown-item>图文</el-dropdown-item>
                <el-dropdown-item>视频</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        <!-- <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#F8BABA"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
        <publish-page/> -->
        <ul class="posts">
          <!-- 帖子列表组件 -->
          <post-list :arrayList="postList"/>
        </ul>
      </div>
      <div class="aside">
        <div class="youLike">
          <!-- 猜你喜欢组件 -->
          <you-like :arrayList="youLikeList"/>
        </div>
        <div class="recommend">
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
import YouLike from '@/components/community/youLike'
import HotRecommend from '@/components/community/hotRecommend'


export default {
  name: 'community',
  data(){
    return {
      postList: [],
      youLikeList: [],
      hotRecommendList: []
    }
  },
  components:{
    PublishPage,
    PostList,
    YouLike,
    HotRecommend
  },
  methods: {
    // toPostDetailPage(){
    //   this.$router.push({name:'PostDetails'});
    // }
  },
  
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/index.scss";
</style>