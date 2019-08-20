<template>
  <div id="cosmeticItem">
    <li class="youLikeList-item" v-for="item in 12">
      <img src="http://tva1.sinaimg.cn/large/0060lm7Tly1g64usg9qfpj30rs0ku410.jpg" alt="">
      <div class="desc">
        精致的眼妆品
      </div>
    </li>
  </div>
</template>

<script>

export default {
  name: 'cosmeticItem',
  data(){
    return {

    }
  },
  props: {

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/pubComponents/cosmeticItem.scss";
</style>