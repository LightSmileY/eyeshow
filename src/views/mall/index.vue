<template>
  <div id="mall">
    <div class="header">
      <div class="container">
        <div class="title">
          眼妆商城
        </div>
        <div class="search">
          <div class="input">
            <el-input 
            placeholder="搜索眼妆品" 
            v-model="input" 
            class="input-with-select"
            size="small">
              <el-button 
              slot="append" 
              icon="el-icon-search"
              @click="toSearchDetailPage"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
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
      input: ""
    }
  },
  methods: {
    toSearchDetailPage(){
      this.$router.push({name:'SearchDetail'});
    }
  },
  components:{
    
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mall/index.scss";
</style>