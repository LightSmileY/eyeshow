<template>
  <div id="community">
    <div class="container">
      <div class="navs">
        <dl class="teachList">
          <dt>化妆教程</dt>
          <dd>最新</dd>
          <dd>热门</dd>
          <dd>图文</dd>
          <dd>视频</dd>
        </dl>
        <el-divider></el-divider>
        <dl class="cusList">
          <dt>妆容分享</dt>
          <dd>最新</dd>
          <dd>热门</dd>
          <dd>图文</dd>
          <dd>视频</dd>
        </dl>
      </div>
      <div class="main">
        <!-- <ul class="nav">
          <li>
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
          </li>
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
        </ul> -->
        
        <ul class="posts">
          <div class="publish">
            <div class="publishDesc">
              <img src="@/assets/images/123.png">
            </div>
            <div class="publishBtn">
              <publish-page/>
            </div>
          </div>
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
      hotRecommendList: [],
      imageUrl: Img
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