<template>
  <div id="myFocus">
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

  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/myFocus/index.scss";
</style>