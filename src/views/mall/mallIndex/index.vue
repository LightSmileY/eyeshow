<template>
  <div id="mallIndex">
    <div class="banner">
      <ul class="navbar-ul">
        <li class="navbar-li">
          <div class="li-title">眼影</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">眼线</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">睫毛角</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">画笔</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">辅助品</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">眼影</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">眼线</div>
          <div class="navbar2">
            <nav-bar2/>
          </div>
        </li>
      </ul>
      <div class="slide">
        <el-carousel direction="vertical">
          <el-carousel-item v-for="item in 5" :key="item">
            <img src="http://tva1.sinaimg.cn/large/0060lm7Tly1g64rb3s5djj32f80rs7gw.jpg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="mallIndex-section">
      <div class="mallLIst eyeShadow">
        <div class="title">
          眼影
        </div>
        <ul>
          <cosmetic-item :arrayList="eyeShadowList"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div class="mallLIst eyeliner">
        <div class="title">
          眼线
        </div>
        <ul>
          <cosmetic-item :arrayList="eyeLineList"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div class="mallLIst brush">
        <div class="title">
          画笔
        </div>
        <ul>
          <cosmetic-item :arrayList="eyePancilList"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div class="mallLIst auxiliary">
        <div class="title">
          辅助品
        </div>
        <ul>
          <cosmetic-item :arrayList="eyeHelpList"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CosmeticItem from '@/components/pubComponents/cosmeticItem'
import NavBar2 from '@/components/mall/navbar2'

import {
  getAllCommodityByType
} from '@/api/commodity'

export default {
  name: 'mallIndex',
  data(){
    return {
      eyeShadowList: [],
      eyeLineList: [],
      eyePancilList: [],
      eyeHelpList: []
    }
  },
  methods: {
    getComsByType(i){
      return getAllCommodityByType({
        type: i,
        user_ID: this.$store.state.userInfo.id
      })
    }
  },
  components:{
    CosmeticItem,
    NavBar2
  },
  created(){
    this.getComsByType("1").then(res => {
      this.eyeShadowList = res.data.detailMsg.data
    })
    this.getComsByType("2").then(res => {
      this.eyeLineList = res.data.detailMsg.data
    })
    this.getComsByType("3").then(res => {
      this.eyePancilList = res.data.detailMsg.data
    })
    this.getComsByType("4").then(res => {
      this.eyeHelpList = res.data.detailMsg.data
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mall/mallIndex/index.scss";
</style>