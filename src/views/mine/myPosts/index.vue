<template>
  <div id="detail">
    <div class="title">{{isMe}}的帖子</div>
    <div class="post-li">
      <post-item :arrayList="postList" :oper="1" :userObj="userInfo"/>
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
    isMe(){
      return this.userInfo.id == this.$store.state.userInfo.id ? "我" : "TA"
    }
  },
  methods: {
    // 获取该用户的所有帖子
    getPostsOfUser(){
      getPostsByUserID({user_ID: this.$store.state.viewUserId || this.$store.state.userInfo.id})
      .then(res => {
        console.log(res)
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
    getUserInfo({ id: this.$store.state.viewUserId})
    .then(res => {
      this.userInfo = res.data.detailMsg.entity
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>