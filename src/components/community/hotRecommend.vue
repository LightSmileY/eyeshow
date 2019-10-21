<template>
  <div id="hotRecommend">
    <div class="title">
      热门话题
    </div>
    <ul class="items">
      <li v-for="item in arrayList" @click="toDetailPage(item.pid)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hotRecommend',
  data(){
    return {

    }
  },
  props: {
    arrayList: Array
  },
  methods: {
    // 去帖子详情页
    toDetailPage(i){
      this.$router.push({
        name:'PostDetails',
        query: { id: i }
      })
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/hotRecommend.scss";
</style>