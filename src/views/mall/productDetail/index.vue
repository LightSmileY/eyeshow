<template>
  <div id="productDetail">
    <div 
    class="detail"
    v-loading="loading"
    element-loading-text="玩命加载中"
    element-loading-background="rgba(255, 255, 255, 0)">
      <div class="postList-main">
        <div class="cosImage">
          <el-carousel direction="vertical">
            <el-carousel height="190px" arrow="never">
              <el-carousel-item v-for="image in commodity.imgUrl" :key="item">
                <img :src="image">
              </el-carousel-item>
            </el-carousel>
          </el-carousel>
        </div>
        <div class="desc-operate">
          <div class="prductTitle">{{commodity.name}}</div>
          <div class="tags">
            <el-tag size="small">{{commodity.type}}</el-tag>
            <el-tag size="small" type="success">{{commodity.brand}}</el-tag>
            <el-tag size="small" type="info">{{commodity.effacicy}}</el-tag>
          </div>
          <div class="produtcPrice">￥298{{commodity.price}}</div>
          <div class="productUrl">{{commodity.link}}</div>
        </div>
      </div>
      <!-- 描述、评论区 -->
      <div class="desc-comment">
        <div class="header">
          <div class="changeBar">
            <div class="changeBar-desc">描述</div>
            <div class="changeBar-comment">评论</div>
          </div>
          <div class="productOperate">
            <div class="operate">
              <div class="like" title="点赞">
                <img src="@/assets/icons/like.png" class="like">
                <div>334</div>
              </div>
              <div class="collection" title="收藏">
                <img src="@/assets/icons/collection.png" class="collection">
                <div>223</div>
              </div>
              <div class="forward" title="转发">
                <img src="@/assets/icons/forward.png" class="forward">
                <div>135</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品描述 -->
        <div class="desc" v-if="false">
          这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述
        </div>
        <!-- 商品评论 -->
        <div class="comments">
          <div class="tocomment">
            <el-input
              type="textarea"
              autosize
              placeholder="我也要评论..."
              v-model="textarea">
            </el-input>
            <el-button 
            type="primary"
            size="mini">
              评论
            </el-button>
          </div>
          <li 
          class="commentList" 
          v-for="item in 5"
          title="回复TA"
          @click="openMessageBox('袁乾峰')">
            <span class="obj">
              <span>
                <span>袁乾峰&nbsp;</span>
                <span v-if="false">
                  <span class="reply">回复</span>
                  胡健龙
                </span>
              </span>
              :&nbsp;
            </span>
            <span>
              哈哈哈哈哈哈哈哈哈哈
            </span>
          </li>
        </div>
      </div>
    </div>
    <div class="recommend">
      <guess-youlike/>
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
import GuessYoulike from '@/components/mall/guessYouLike'
import { getCommodityByIdLogin } from '@/api/commodity'

export default {
  name: 'productDetail',
  data(){
    return {
      textarea: '',
      commentCount: 37,
      commodity: [],
      loading: true
    }
  },
  methods: {
    openDrawer(title, arr){
      this.drawer = true;
    },
    openMessageBox(i){
      this.$prompt('回复  '+i, {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        // beforeClose: 
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '回复成功'
        });
      }).catch(() => {
             
      })
    },
    toDetailPage(){
      this.$router.push({name:'PostDetails'});
    },
    returnLastPage(){
      this.$router.go(-1);
    }
  },
  components:{
    GuessYoulike
  },
  created(){
    getCommodityByIdLogin({
      commodity_ID: this.$route.query.cid,
      user_ID: this.$store.state.userInfo.id
    })
    .then(res => {
      this.commodity = res.data.detailMsg.data[0]
      this.loading = false
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mall/productDetail/index.scss";
</style>