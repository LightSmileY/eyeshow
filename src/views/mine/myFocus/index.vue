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
      userList: []
    }
  },
  methods: {
    // 获取该用户的所有关注
    getMyAttents(){
      getFanses({user_ID: this.$route.query.id})
      .then(res => {
        this.userList = res.data.detailMsg.data
      })
    }
  },
  components:{
    UserList
  },
  created(){
    this.getMyAttents()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>