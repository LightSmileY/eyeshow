<template>
  <div id="mallIndex">
    <div class="header">
      <div class="container">
        <div class="title">
          眼妆商城
        </div>
        <div class="search">
          <div class="input">
            <el-input 
            placeholder="搜索眼妆品" 
            v-model="keyword" 
            class="input-with-select"
            size="small"
            @keyup.enter.native="toSearchDetailPage">
              <el-button 
              slot="append" 
              icon="el-icon-search"
              @click="toSearchDetailPage"></el-button>
            </el-input>
            <!-- 搜索框推荐 -->
            <div class="hoverRecommendCon">
              <div class="hoverRecommend">
                <div class="hotSearch">
                  <div class="h-title">热门搜索</div>
                  <ul>
                    <li v-for="item in mallHotSearchList" @click="toSearchDetailPage2(item)">{{item}}</li>
                  </ul>
                </div>
                <div class="youLike">
                  <div class="y-title">猜你喜欢</div>
                  <ul>
                    <li v-for="item in mallYouLikeList" @click="toSearchDetailPage2(item)">{{item}}</li>
                  </ul>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <ul class="navbar-ul">
        <li class="navbar-li">
          <div class="li-title">眼影</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs1"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">睫毛膏</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs2"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">粉底液</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs3"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">假睫毛</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs4"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">口红</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs5"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">眼线笔</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs6"/>
          </div>
        </li>
        <li class="navbar-li">
          <div class="li-title">散粉</div>
          <div class="navbar2">
            <nav-bar2 :arrayList="navsData.navs7"/>
          </div>
        </li>
      </ul>
      <div class="slide">
        <el-carousel direction="vertical">
          <el-carousel-item v-for="item in slideList" :key="item">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="mallIndex-section">
      <div 
      class="mallLIst eyeShadow"
      v-loading="loading1"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <div class="title">
          眼影
        </div>
        <ul>
          <cosmetic-item :arrayList="commodityList1"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div 
      class="mallLIst eyeliner"
      v-loading="loading2"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <div class="title">
          口红
        </div>
        <ul>
          <cosmetic-item :arrayList="commodityList2"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div 
      class="mallLIst brush"
      v-loading="loading5"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <div class="title">
          睫毛膏
        </div>
        <ul>
          <cosmetic-item :arrayList="commodityList3"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div 
      class="mallLIst auxiliary"
      v-loading="loading4"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <div class="title">
          彩妆盘
        </div>
        <ul>
          <cosmetic-item :arrayList="commodityList4"/>
        </ul>
      </div>
      <el-divider></el-divider>
      <div 
      class="mallLIst brush"
      v-loading="loading3"
      element-loading-text="玩命加载中"
      element-loading-background="rgba(255, 255, 255, 0)">
        <div class="title">
          粉底液
        </div>
        <ul>
          <cosmetic-item :arrayList="commodityList5"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CosmeticItem from '@/components/pubComponents/cosmeticItem'
import NavBar2 from '@/components/mall/navbar2'
import { navsData } from '@/assets/js/staticData'
import { mallHotSearchList, mallYouLikeList } from '@/assets/js/staticData'

import {
  getAllCommodityByType
} from '@/api/commodity'

export default {
  name: 'mallIndex',
  data(){
    return {
      mallHotSearchList,
      mallYouLikeList,
      navsData: navsData,
      keyword: "",
      commodityList1: [],
      commodityList2: [],
      commodityList3: [],
      commodityList4: [],
      commodityList5: [],
      commodityList6: [],
      commodityList7: [],
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading5: true,
      loading6: true,
      loading7: true,
      slideList: [
        "http://tva1.sinaimg.cn/large/0060lm7Tly1g64rb3s5djj32f80rs7gw.jpg",
        "http://cdn.fengblog.xyz/slides/4.jpg",
        "http://cdn.fengblog.xyz/slides/1%20%281%29.jpg",
        "http://cdn.fengblog.xyz/slides/3.jpg",
        "http://cdn.fengblog.xyz/slides/5.jpg"
      ]
    }
  },
  methods: {
    getComsByType(i){
      return getAllCommodityByType({
        type: i,
        user_ID: this.$store.state.userInfo.id
      })
    },
    toSearchDetailPage(){
      this.$router.push({
        name:'SearchDetail',
        query: { s: this.keyword }
      })
    },
    toSearchDetailPage2(i){
      this.$router.push({
        name:'SearchDetail',
        query: { s: i }
      })
    }
  },
  components:{
    CosmeticItem,
    NavBar2
  },
  created(){
    this.getComsByType("d3b72fd5-1788-4093-9fbc-a2b08366d246").then(res => {
      this.commodityList1 = res.data.detailMsg.data.slice(0,12)
      this.loading1 = false
      console.log(res)
    })
    this.getComsByType("2c3213e0-d1e7-4e3c-82de-a023477fa0c7").then(res => {
      this.commodityList2 = res.data.detailMsg.data.slice(0,12)
      this.loading2 = false
    })
    this.getComsByType("191e204e-b78e-4c6f-8007-6547368dc66d").then(res => {
      this.commodityList3 = res.data.detailMsg.data.slice(0,12)
      this.loading3 = false
      console.log(res)
    })
    this.getComsByType("3d158bcf-47ff-4474-bfea-e2041b25182b").then(res => {
      this.commodityList4 = res.data.detailMsg.data.slice(0,12)
      this.loading4 = false
      console.log(res)
    })
    this.getComsByType("50a6ba0c-0017-4081-a8c3-1b16cc3d34a7").then(res => {
      this.commodityList5 = res.data.detailMsg.data.slice(0,12)
      this.loading5 = false
      console.log(res)
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