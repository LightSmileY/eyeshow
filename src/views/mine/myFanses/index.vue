<template>
  <div id="myFanses">
    <user-list/>
  </div>
</template>

<script>
import UserList from '@/components/pubComponents/userList'

export default {
  name: 'myFanses',
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
  @import "../../../assets/scss/mine/myFanses/index.scss";
</style>