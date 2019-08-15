<template>
  <div id="postDetail">
    <div class="container">
      <div class="title">
        帖子详情
      </div>
      <div class="post">
        帖子
      </div>
      <div class="return" @click="toCommunityPage">
        返回
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postDetail',
  data(){
    return {

    }
  },
  methods: {
    // 跳转到社区页
    toCommunityPage(){
      this.$router.push({name:'Community'});
    }
  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postDetails.scss";
</style>