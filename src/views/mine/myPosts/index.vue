<template>
  <div id="detail">
    <div class="title">我的帖子</div>
    <div class="post-li">
      <post-item :arrayList="postList" :oper="1"/>
    </div>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'
import { 
  getPostsByUserID, 
  getCollectionPosts, 
  getAttents, 
  getFanses, 
  getUserInfo 
} from '@/api/user'

export default {
  name: 'myPosts',
  data(){
    return {
      user_ID: this.$store.state.userInfo.id,
      postList: []
    }
  },
  methods: {
    // 获取该用户的所有帖子
    getPostsOfUser(){
      getPostsByUserID({user_ID: this.user_ID})
      .then(res => {
        this.postList = res.data.detailMsg.data
        console.log(this.postList)
      })
    }
  },
  components:{
    PostItem
  },
  created(){
    this.getPostsOfUser()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>