<template>
  <div id="searchDetail">
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
            @keyup.enter.native="getAllByKeyWord">
              <el-button 
              slot="append" 
              icon="el-icon-search"
              @click="getAllByKeyWord"></el-button>
            </el-input>
            <!-- 搜索框推荐 -->
            <div class="hoverRecommendCon">
              <div class="hoverRecommend">
                <div class="hotSearch">
                  <div class="h-title">热门搜索</div>
                  <ul>
                    <li v-for="item in mallHotSearchList" @click="getAllByKeyWord2(item)">{{item}}</li>
                  </ul>
                </div>
                <div class="youLike">
                  <div class="y-title">猜你喜欢</div>
                  <ul>
                    <li v-for="item in mallYouLikeList" @click="getAllByKeyWord2(item)">{{item}}</li>
                  </ul>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navs">
      <div class="navBox">
        <div class="type">妆品类型</div>
        <div class="infos">
          <li v-for="item in types" @click="getCoByType(item.id)">{{item.name}}</li>
        </div>
      </div>
      <div class="navBox">
        <div class="type">妆品品牌</div>
        <div class="infos brands">
          <li v-for="item in brands" @click="getCoByBrand(item.id)">{{item.name}}</li>
        </div>
      </div>
      <div class="navBox">
        <div class="type">使用效果</div>
        <div class="infos effacicy">
          <li v-for="item in effacicis" @click="getCoByeffacicy(item.id)">{{item.name}}</li>
        </div>
      </div>
    </div>
    <div class="navbar">
      <el-button plain size="mini">
        综合
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-button plain size="mini">
        喜欢
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-button plain size="mini">
        评论
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-button plain size="mini">
        价格
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
    <div 
    class="product-main"
    v-loading="loading"
    element-loading-text="玩命加载中"
    element-loading-background="rgba(255, 255, 255, 0)">
      <cosmetic-item :arrayList="commodityList"/>
    </div>
    <div class="return" @click="returnLastPage">
      <el-button 
      icon="el-icon-arrow-left" 
      circle
      title="返回上一页">
      </el-button>
    </div>
  </div>
</template>

<script>
import CosmeticItem from '@/components/pubComponents/cosmeticItem'
import { mallHotSearchList, mallYouLikeList } from '@/assets/js/staticData'
import {
  getAllType,
  getAllBrand,
  getAllEffacicy,
  getAllCommodity,
  getAllCommodityByKeyWord,
  getAllCommodityByType,
  getAllCommodityByBrand,
  getAllCommodityByEffacicy
} from '@/api/commodity'

export default {
  name: 'searchDetail',
  data(){
    return {
      mallHotSearchList,
      mallYouLikeList,
      keyword: this.$route.query.s,
      types: [],
      brands: [],
      effacicis: [],
      commodityList: [],
      loading: true
    }
  },
  methods: {
    toSearchDetailPage(){
      this.$router.push({name:'SearchDetail'});
    },
    returnLastPage(){
      this.$router.go(-1);
    },
    // 获取商品类型
    getComTypes(){
      getAllType().then(res => {
        console.log(res.data.detailMsg.data.content)
        this.types = res.data.detailMsg.data.content
      })
    },
    // 获取商品品牌
    getComBrands(){
      getAllBrand().then(res => {
        this.brands = res.data.detailMsg.data.content
      })
    },
    // 获取商品功效
    getComeffacicis(){
      getAllEffacicy().then(res => {
        this.effacicis = res.data.detailMsg.data.content
      })
    },
    //获取所有商品
    getAll(){
      getAllCommodity({
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        this.loading = false
      })
    },
    // 根据关键词获取所有商品
    getAllByKeyWord(){
      getAllCommodityByKeyWord({
        keyword: this.keyword,
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        this.loading = false
      })
    },
    // 根据已有关键词获取所有商品
    getAllByKeyWord2(i){
      getAllCommodityByKeyWord({
        keyword: i,
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        this.loading = false
      })
    },
    // 根据类型获取商品
    getCoByType(i){
      getAllCommodityByType({
        type: i,
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        console.log(this.commodityList)
      })
    },
    // 根据品牌获取商品
    getCoByBrand(i){
      getAllCommodityByBrand({
        brand: i,
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        console.log(this.commodityList)
      })
    },
    // 根据功效获取商品
    getCoByeffacicy(i){
      getAllCommodityByEffacicy({
        effacicy: i,
        user_ID: this.$store.state.userInfo.id
      })
      .then(res => {
        this.commodityList = res.data.detailMsg.data
        console.log(this.commodityList)
      })
    },
    // 根据点赞数排序
    sortByLike(){
      this.commodityList.sort((a, b) => {
        let x = a["likesCount"]
        let y = b["likesCount"]
        return x > y ? -1 : x < y ? 1 : 0
      })
    },
    // 根据评论数排序
    sortByComment(){
      this.commodityList.sort((a, b) => {
        let x = a["commentCount"]
        let y = b["commentCount"]
        return x > y ? -1 : x < y ? 1 : 0
      })
    },
    // 根据价格排序
    sortByPrice(){
      this.commodityList.sort((a, b) => {
        let x = a["price"]
        let y = b["price"]
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
  },
  components:{
    CosmeticItem
  },
  created(){
    this.getComTypes()
    this.getComBrands()
    this.getComeffacicis()
    getAllCommodityByKeyWord({
      keyword: this.$route.query.s,
      user_ID: this.$store.state.userInfo.id
    })
    .then(res => {
      this.commodityList = res.data.detailMsg.data
      this.loading = false
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mall/searchDetail/index.scss";
</style>