<template>
  <div id="postDetail">
    <div class="container">
      <div class="detail-title">
        帖子详情
      </div>
      <div 
      class="post" 
      v-loading="loading"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">

        <post-list :arrayList="postList"/>   <!-- 帖子列表 -->

      </div>
      <div class="return" @click="returnLastPage">
        <el-button 
        icon="el-icon-arrow-left" 
        circle
        title="返回上一页">
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/community/postList'
import { getPostById } from '@/api/post'

export default {
  name: 'postDetail',
  data(){
    return {
      postList: [],
      loading: true
    }
  },
  methods: {
    // 跳转到社区页
    returnLastPage(){
      this.$router.go(-1);
    }
  },
  components:{
    PostList
  },
  created(){
    getPostById({post_ID: this.$route.query.id})
    .then(res => {
      this.postList = res.data.detailMsg.data
      this.loading = false
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postDetails.scss";
</style>