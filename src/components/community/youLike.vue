<template>
  <div id="youLike">
    <div class="title">
      猜你喜欢
    </div>
    <ul class="items">
      <li v-for="item in arrayList">{{item.title}}</li>
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
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/youLike.scss";
</style>