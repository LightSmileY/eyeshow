<template>
  <div id="mallIndex">
    <div class="banner">
      <ul class="navbar">
        <li>眼影</li>
        <li>眼线</li>
        <li>睫毛角</li>
        <li>画笔</li>
        <li>辅助品</li>
        <li>眼影</li>
        <li>眼线</li>
      </ul>
      <div class="slide">
        <el-carousel direction="vertical">
          <el-carousel-item v-for="item in 5" :key="item">
            <img src="http://tva1.sinaimg.cn/large/0060lm7Tly1g64rb3s5djj32f80rs7gw.jpg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mallIndex',
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
  @import "../../../assets/scss/mall/mallIndex/index.scss";
</style>