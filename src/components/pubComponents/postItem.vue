<template>
  <div id="postItem">
    <li class="hotPostsList-item" v-for="item in 12">
      <img src="http://tva1.sinaimg.cn/large/0060lm7Tly1g64ut8pyppj30ty0kze59.jpg" alt="">
      <div class="desc">
        人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。
      </div>
    </li>
  </div>
</template>

<script>

export default {
  name: 'index',
  data(){
    return {

    }
  },
  props: {

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/pubComponents/postItem.scss";
</style>