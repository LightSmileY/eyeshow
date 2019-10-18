<template>
  <div id="cosmeticItem">
    <li 
    class="youLikeList-item" 
    v-for="item in arrayList" 
    @click="toDetailPage(item.cid)">
      <div class="image">
        <img :src="item.imgUrl[0]" alt="">
      </div>
      <div class="cosmetic-info">
        <div class="desc">{{item.name}}</div>
        <div class="price">
          ￥<span>298</span>
        </div>
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
    arrayList: Array
  },
  methods: {
    toDetailPage(i){
      this.$router.push({
        name:'ProductDetail',
        query: { cid: i }
      })
    },
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/pubComponents/cosmeticItem.scss";
</style>