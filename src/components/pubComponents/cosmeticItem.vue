<template>
  <div id="cosmeticItem">
    <li 
    class="youLikeList-item" 
    v-for="item in arrayList" 
    @click="toDetailPage(item.cid)">
      <div class="image">
        <el-image
        :src="item.imgUrl[0]"
        lazy
        fit="cover"></el-image>
      </div>
      <div class="cosmetic-info">
        <div class="desc">
          <div class="desc-con">
            {{getName(item.name)}}
          </div>
        </div>
        <div class="price">
          ￥<span>{{item.price}}</span>
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
  computed: {
    getName(){
      return i => {
        if (i.length > 15) {
          return i.slice(0, 15)
        }
        return i
      }
    }
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