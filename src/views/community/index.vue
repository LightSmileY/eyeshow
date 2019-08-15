<template>
  <div id="community">
    <div class="container">
      <div class="main">
        <ul class="nav">
          <li>全部</li>
          <li>帖子</li>
          <li>商品</li>
        </ul>
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