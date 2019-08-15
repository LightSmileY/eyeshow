<template>
  <div id="mall">
    <el-container>
      <!-- 商城页头部 -->
      <el-header>
        <div class="mall-header">
          <el-row>
            <el-col :span="5">
              <div class="logo">
                眼妆商城....
              </div>
            </el-col>
            <el-col :span="14">
              <div class="mall-search">
                搜索框
              </div>
            </el-col>
            <el-col :span="5">
              <div class="aboutMe">
                <el-col :span="12">
                <div class="myCart">
                  购物车
                </div>
                </el-col>
                <el-col :span="12">
                <div class="myOrder">
                  我的订单
                </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <!-- 二级级路由 -->
        <router-view/>
      </el-main>
    </el-container>
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

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mall/index.scss";
</style>