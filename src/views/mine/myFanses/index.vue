<template>
  <div id="detail">
    <div class="title">我的粉丝</div>
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
  name: 'myFanses',
  data(){
    return {
      user_ID: this.$store.state.userInfo.id,
      userList: [],
      userInfo: {}
    }
  },
  methods: {
    // 获取该用户的所有收藏
    getMyFanses(){
      getAttents({user_ID: this.$route.query.id})
      .then(res => {
        this.userList = res.data.detailMsg.data
      })
    }
  },
  components:{
    UserList
  },
  created(){
    this.getMyFanses()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>