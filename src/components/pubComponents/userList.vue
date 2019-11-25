<template>
  <div id="userList">
    <div 
    class="userList-li" 
    v-for="item in arrayList">
      <div class="user">
        <div class="userInfo">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="name-signature">
            <div class="name">{{item.nickname.slice(0,6)}}</div>
            <div class="signature">{{item.profile.slice(0,8)}}</div>
          </div>
        </div>
        <div class="attent">
          <el-button size="mini" type="primary">关注TA</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userList',
  data(){
    return {

    }
  },
  props: {
    arrayList: Array
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/pubComponents/userList.scss";
</style>