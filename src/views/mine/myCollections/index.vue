<template>
  <div id="detail">
    <div class="title">我的收藏</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="帖子" 
      name="post"
      v-loading="loading"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <post-item :oper="2" :arrayList="postList"/>
      </el-tab-pane>
      <el-tab-pane label="妆品" name="commodity">
        <cosmetic-item/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'
import CosmeticItem from '@/components/pubComponents/cosmeticItem'
import { 
  getPostsByUserID, 
  getCollectionPosts, 
  getAttents, 
  getFanses, 
  getUserInfo 
} from '@/api/user'

export default {
  name: 'myCollection',
  data(){
    return {
      activeName: 'post',
      postList: [],
      userInfo: {},
      loading: true
    }
  },
  methods: {
    // 获取该用户收藏的帖子
    getCollections(){
      getCollectionPosts({user_ID: this.$store.state.viewUserId || this.$store.state.userInfo.id})
      .then(res => {
        this.postList = res.data.detailMsg.data
        this.loading = false
      })
    }
  },
  components:{
    PostItem,
    CosmeticItem
  },
  created(){
    this.getCollections()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>