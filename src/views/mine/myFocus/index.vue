<template>
  <div id="detail">
    <div class="title">我的关注</div>
    <user-list :arrayList="userList"/>
  </div>
</template>

<script>
import UserList from '@/components/pubComponents/userList'
import { 
  getPostsByUserID, 
  getCollectionPosts, 
  getAttents, 
  getFanses, 
  getUserInfo 
} from '@/api/user'

export default {
  name: 'myFocus',
  data(){
    return {
      user_ID: this.$store.state.userInfo.id,
      userList: [],
      userInfo: {}
    }
  },
  methods: {
    // 获取该用户的所有关注
    getMyAttents(){
      getAttents({user_ID: this.user_ID})
      .then(res => {
        this.userList = res.data.detailMsg.data
        console.log(this.userList)
      })
    }
  },
  components:{
    UserList
  },
  created(){
    this.getMyAttents()
    getUserInfo({ id: this.$route.query.uid})
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