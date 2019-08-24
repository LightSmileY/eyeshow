<template>
  <div id="myPosts">
    <div class="time-line">
      <post-list/>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/community/postList"

export default {
  name: 'myPosts',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{
    PostList
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/myPosts/index.scss";
</style>