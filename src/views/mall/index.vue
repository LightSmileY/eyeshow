<template>
  <div id="mall">
    <div class="main">
      <!-- 二级级路由 -->
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mall',
  data(){
    return {
      
    }
  },
  methods: {
    
  },
  components:{
    
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mall/index.scss";
</style>