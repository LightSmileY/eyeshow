<template>
  <div id="index">
    <div class="container">
      <div class="banner">
        <div class="picStyle animated rotateIn" @click="toStyleMigrationPage">
        </div>
        <!--****************** 幻灯片 ******************-->
        <div class="slide">
          <el-carousel
           :interval="4000" 
           arrow="always">
            <el-carousel-item 
            v-for="item in slideList" 
            :key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="main">
        <div class="list youLike">
          <div class="title">
            猜你喜欢
          </div>
          <div 
          class="youLikeList"
          v-loading="loading1"
          element-loading-text="玩命加载中"
          element-loading-background="rgba(255, 255, 255, 0)">
            <div 
            class="youLikeList-items">
              <!--****************** 帖子列表 ******************-->
              <post-item :oper="0" :arrayList="hotPostList"/>
            </div>
            <div class="youLikeList-items">
              <!--****************** 妆品列表 ******************-->
              <cosmetic-item :arrayList="hotCommodityList"/>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div 
        class="list hotPosts">
          <div class="title">
            热门帖子
          </div>
          <ul class="hotPostsList">
            <!--****************** 帖子列表 ******************-->
            <post-item :oper="0" :arrayList="hotPostList"/>
          </ul>
        </div>
        <el-divider></el-divider>
        <div 
        class="list hotCosmetics">
          <div class="title">
            热门妆品
          </div>
          <ul class="hotCosmeticsList">
            <!--****************** 妆品列表 ******************-->
            <cosmetic-item :arrayList="hotCommodityList"/>
          </ul>
        </div>
      </div>          
    </div>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'
import CosmeticItem from '@/components/pubComponents/cosmeticItem'

import {getAllPosts} from '@/api/post.js'
import {getAllCommodity} from '@/api/commodity.js'

export default {
  name: 'index',
  data(){
    return {
      loading1: true,
      hotPostList: [],
      hotCommodityList: [],
      search: '',
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
    // 跳转到图像风格迁移页
    toStyleMigrationPage(){
      this.$router.push({name:'StyleMigration'});
    },
    // 获取所有帖子
    getAllPostsData(){
      getAllPosts().then(data => {
        this.hotPostList = data.slice(0,12)
        this.loading1 = false
      })
    },
    // 获取所有商品
    getAllCommodityData(){
      getAllCommodity().then(res => {
        console.log(res)
        this.hotCommodityList = res.data.detailMsg.data.slice(0,12)
      })
    }
  },
  components:{
    PostItem,
    CosmeticItem
  },
  created(){
    this.getAllPostsData()
    this.getAllCommodityData()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/index/index.scss";
</style>