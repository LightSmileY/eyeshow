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
              <el-carousel-item v-for="image in commodity.imgUrl">
                <el-image
                :src="image"
                fit="cover"></el-image>
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
          <div class="produtcPrice">￥{{commodity.price}}</div>
          <a :href="commodity.link" class="productUrl" target="_blank"><div>商品链接</div></a>
        </div>
      </div>
      <!-- 描述、评论区 -->
      <div class="desc-comment">
        <div class="header">
          <div class="changeBar">
            <div 
            class="changeBar-desc"
            :class="{'changeBarActive': status==2}"
            @click="change(1)">描述</div>
            <div 
            class="changeBar-comment"
            :class="{'changeBarActive': status==1}"
            @click="change(2)">评论</div>
          </div>
          <div class="productOperate">
            <div class="operate">
              <div class="like" title="点赞">
                <img :src="isLike(commodity.isLike)" class="like" @click="toLike">
                <div>{{commodity.likesCount}}</div>
              </div>
              <div class="collection" title="收藏">
                <img :src="isCollection(commodity.isCollect)" class="collection" @click="toCollect">
                <div>{{commodity.collectCount}}</div>
              </div>
              <div class="forward" title="分享" @click="toForward">
                <img src="@/assets/icons/forward.png" class="forward">
              </div>
            </div>
          </div>
        </div>
        <!-- 商品描述 -->
        <div 
        class="desc changeBarActive">
          {{commodity.content}}
        </div>
        <!-- 商品评论 -->
        <div 
        class="comments" 
        v-if="status==1">
          <div class="tocomment">
            <el-input
              type="textarea"
              autosize
              placeholder="我也要评论..."
              v-model="content">
            </el-input>
            <el-button 
            type="primary"
            size="mini"
            @click="toComment">
              评论
            </el-button>
          </div>
          <li 
          class="commentList" 
          v-for="item in commodity.comments"
          title="回复TA">
            <span class="name">{{$store.state.userInfo.nickname}}：&nbsp;</span>
            <span class="comentInfo">{{item.content}}</span>
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
import LikeIcon from '@/assets/icons/like.png'
import LikeActiveIcon from '@/assets/icons/like-active.png'
import CollectionIcon from '@/assets/icons/collection.png'
import CollectionActiveIcon from '@/assets/icons/collection-active.png'
import ForwardIcon from '@/assets/icons/forward.png'

import { uuid, getTime } from '@/assets/js/pubFunctions'
import { attentUser, unAttentUser } from '@/api/user'
import { 
  addPost,
  addPostImage 
} from '@/api/post'
import { 
  getCommodityByIdLogin, 
  getAllCommodity,
  likeCommodity, 
  unLikeCommodity, 
  collectCommodity, 
  unCollectCommodity, 
  commentCommodity
} from '@/api/commodity'

export default {
  name: 'productDetail',
  data(){
    return {
      textarea: '',
      commentCount: 37,
      commodity: {},
      loading: true,
      status: 1,
      commandList: [],
      content: "" //评论框
    }
  },
  computed: {
    isLike(){
      return i => this.commodity.isLike ? LikeActiveIcon : LikeIcon
    },
    isCollection(){
      return i => this.commodity.isCollect ? CollectionActiveIcon : CollectionIcon
    }
  },
  methods: {
    change(i){
      this.status = i
      console.log(status)
    },
    openDrawer(title, arr){
      this.drawer = true;
    },
    toDetailPage(){
      this.$router.push({name:'PostDetails'});
    },
    returnLastPage(){
      this.$router.go(-1);
    },
    // 点赞&&取消点赞
    toLike(){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      if(this.commodity.isLike){
        this.unLike()
      }else{
        this.like()
      }
    },
    // 收藏&&取消收藏
    toCollect(){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      if(this.commodity.isCollect){
        this.unCollect()
      }else{
        this.collect()
      }
    },
    // 点赞
    like(){
      let _this = this
      let likeInfo = {
        id: uuid(),
        time: getTime(),
        cid: this.commodity.cid,
        uid: this.$store.state.userInfo.id
      }
      likeCommodity(likeInfo)
      .then(res => {
        console.log(res)
        _this.commodity.isLike = true
        _this.commodity.likesCount ++
        console.log(res)
      })
    },
    // 取消点赞
    unLike(){
      let _this = this
      let unlikeInfo = {
        post_ID: this.commodity.cid,
        user_ID: this.$store.state.userInfo.id
      }
      console.log(unlikeInfo)
      unLikeCommodity(unlikeInfo)
      .then(res => {
        console.log(res)
        _this.commodity.isLike = false
        _this.commodity.likesCount --
        console.log(res)
      })
    },
    // 收藏
    collect(){
      let _this = this
      let collectInfo = {
        id: uuid(),
        time: getTime(),
        cid: this.commodity.cid,
        uid: this.$store.state.userInfo.id
      }
      collectCommodity(collectInfo)
      .then(res => {
        console.log(res)
        _this.commodity.isCollect = true
        _this.commodity.collectCount ++
        console.log(res)
      })
    },
    // 取消收藏
    unCollect(){
      let _this = this
      let unCollectInfo = {
        post_ID: this.commodity.cid,
        user_ID: this.$store.state.userInfo.id
      }
      unCollectCommodity(unCollectInfo)
      .then(res => {
        console.log(res)
        _this.commodity.isCollect = false
        _this.commodity.collectCount --
        console.log(res)
      })
    },
    // 转发
    openForwardBox(){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      this.dialogFormVisible = true
      this.forwardIndex = i
    },
    toForward(){
      this.$confirm('确定分享该商品到社区?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let forwardInfo = {
          title: "妆品分享",
          content: this.commodity.link,
          type: "3",
          style: "1",
          uid: this.$store.state.userInfo.id,
          id: uuid(),
          time: getTime(),
          fpid: "-1"
        }
        console.log(forwardInfo)
        addPost(forwardInfo)
        .then(res => {
          for(let i in this.commodity.imgUrl){
            addPostImage({
              id: this.commodity.imgUrl[i],
              pid: forwardInfo.id
            })
          }
          this.$message({
            type: 'success',
            message: '分享成功!'
          })
        })
        this.$message({
          type: 'success',
          message: '分享成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分享'
        });          
      })
    },
    // 评论
    toComment(){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      let _this = this
      let commentInfo = {
        id: uuid(),
        time: getTime(),
        cid: this.commodity.cid,
        uid: this.$store.state.userInfo.id,
        content: this.content
      }
      commentCommodity(commentInfo)
      .then(res => {
        _this.commodity.comments.push(commentInfo)
        _this.commodity.commentCount ++
        console.log(res)
      })
    }
  },
  components:{
    GuessYoulike
  },
  created(){
    // 获取帖子详情
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