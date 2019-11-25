<template>
  <div id="detail">
    <div class="title">我的收藏</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="帖子" name="post">
        <post-item :oper="2" :arrayList="postList"/>
      </el-tab-pane>
      <el-tab-pane label="妆品" name="commodity">
        <cosmetic-item :arrayList="commodityList"/>
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
  getCollectionCommoditys,
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
      commodityList: [],
      userInfo: {}
    }
  },
  methods: {
    // 获取该用户收藏的帖子
    getCollectionPostsData(){
      getCollectionPosts({user_ID: this.$route.query.id})
      .then(res => {
        this.postList = res.data.detailMsg.data
      })
    },
    // 获取该用户收藏的商品
    getCollectionCommoditysData(){
      getCollectionCommoditys({user_ID: this.$route.query.id})
      .then(res => {
        console.log(res.data)
        this.commodityList = res.data.detailMsg.data
      })
    }
  },
  components:{
    PostItem,
    CosmeticItem
  },
  created(){
    this.getCollectionPostsData()
    this.getCollectionCommoditysData()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>