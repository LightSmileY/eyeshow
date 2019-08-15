<template>
  <div id="mine">
    <div>
      头像和背景等
    </div>
    <ul>
      <router-link to="/mine/myPosts"><li>我的帖子</li></router-link>
      <router-link to="/mine/myCollections"><li>我的收藏</li></router-link>
      <router-link to="/mine/myFanses"><li>我的粉丝</li></router-link>
      <router-link to="/mine/myFocus"><li>我的关注</li></router-link>
      <router-link to="/mine/myLikes"><li>我的喜欢</li></router-link>
      <router-link to="/mine/myProfile"><li>我的资料</li></router-link>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mine/index.scss";
</style>