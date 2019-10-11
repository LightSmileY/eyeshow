<template>
  <div id="detail">
    <div class="title">我的关注</div>
    <user-list/>
  </div>
</template>

<script>
import UserList from '@/components/pubComponents/userList'

export default {
  name: 'myFocus',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{
    UserList
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>