<template>
  <div id="detail">
    <div class="title">我的收藏</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="帖子" name="post">
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
      user_ID: this.$store.state.userInfo.id
    }
  },
  methods: {
    // 获取该用户收藏的帖子
    getCollections(){
      getCollectionPosts({user_ID: this.user_ID})
      .then(res => {
        console.log(res)
        this.postList = Object.values(res.data.detailMsg.data)[0]
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