<template>
  <div id="productDetail">
    商品详情页(二级路由)
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'productDetail',
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
  @import "../../../assets/scss/mall/productDetail/index.scss";
</style>