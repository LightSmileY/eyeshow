<template>
  <div id="navbar2">
    <div class="navbar2Box">
      <ul>
        <li v-for="item in arrayList" @click="toSearchDetailPage(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar2',
  data(){
    return {

    }
  },
  props: {
    arrayList: Array
  },
  methods: {
    toSearchDetailPage(i){
      this.$router.push({
        name:'SearchDetail',
        query: { s: i }
      })
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mall/mallIndex/navbar2.scss";
</style>