<template>
  <div id="detail">
    <div class="title">我的帖子</div>
    <div class="post-li">
      <post-item :oper="1"/>
    </div>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'

export default {
  name: 'myPosts',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{
    PostItem
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>