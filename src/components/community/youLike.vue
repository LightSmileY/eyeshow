<template>
  <div id="youLike">
    <div class="title">
      猜你喜欢
    </div>
    <ul class="items">
      <li v-for="item in arrayList" @click="toDetailPage(item.pid)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'youLike',
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
  @import "../../assets/scss/community/youLike.scss";
</style>