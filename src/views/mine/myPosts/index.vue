<template>
  <div id="detail">
    <div class="title">发表的帖子</div>
    <div class="post-li">
      <post-item :arrayList="postList"/>
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
      postList: [],
      userInfo: {}
    }
  },
  computed: {
    // isMe(){
    //   return this.userInfo.id == this.$store.state.userInfo.id ? "发表的帖子"
    // }
  },
  methods: {
    // 获取该用户的所有帖子
    getPostsOfUser(){
      getPostsByUserID({user_ID: this.$route.query.id})
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
    getUserInfo({ user_ID: this.$route.query.id})
    .then(res => {
      this.userInfo = res.data.detailMsg.data[0]
    })
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