<template>
  <div id="index">
    <div class="container">
      <div class="banner">
        <div class="picStyle" @click="toStyleMigrationPage">
          风格迁移页入口
        </div>
        <div class="slide">
          幻灯片
        </div>
      </div>
      <div class="main">
        <div class="list youLike">
          猜你喜欢
        </div>
        <div class="list hotPosts">
          热门帖子
        </div>
        <div class="list hotCosmetics">
          热门妆品
        </div>
      </div>          
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {

    }
  },
  methods: {
    // 跳转到图像风格迁移页
    toStyleMigrationPage(){
      this.$router.push({name:'StyleMigration'});
    }
  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/index/index.scss";
</style>