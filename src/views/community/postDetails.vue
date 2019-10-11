<template>
  <div id="postDetail">
    <div class="container">
      <div class="detail-title">
        帖子详情
      </div>
      <div class="post">
        <li class="postList-li">
          <div class="user">
            <div class="userInfo">
              <div class="avatar">
                <img :src="post.avatarUrl" alt="">
              </div>
              <div class="name-time">
                <div class="name">{{post.nickname}}</div>
                <div class="time">{{post.postTime}}</div>
              </div>
            </div>
            <div class="attent">
              <el-button type="primary" size="mini">{{isAttent}}</el-button>
            </div>
          </div>
          <div class="body">
            <p class="ptitle">#{{post.title}}#</p>
            <p>{{post.body}}</p>
          </div>
          <div class="images">
            <el-image 
              :src="image"
              :preview-src-list="post.images"
              v-for="image in post.images"
              v-if="post.images.length">
            </el-image>
          </div>
          <div class="video">
            <video 
            :src="post.video[0]" 
            width="100%" 
            controls="controls"
            v-if="post.video.length">
              您的浏览器不支持 video 标签。
            </video>
          </div>
          <div class="operate">
            <div class="like" title="点赞" @click="toLike(index)">
              <img :src="isLike" class="like" @click="toLike(index)">
              <div>{{post.likeCount}}</div>
            </div>
            <div class="collection" title="收藏" @click="toCollection(index)">
              <img :src="isCollection" class="collection" @click="toCollection(index)">
              <div>{{post.commentCount}}</div>
            </div>
            <div class="forward" title="转发">
              <img :src="forwardIcon" class="forward" @click="toForward(item)">
              <div>{{post.forwardCount}}</div>
            </div>
          </div>
          <div class="comments">
            <div class="title">评论 ( {{post.commentCount}} )</div>
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
            v-for="comment in post.comments"
            title="回复TA"
            @click="openMessageBox('张凤云')">
              <span class="obj">
                <span>{{comment.nickname}}&nbsp;</span>
                回复
                <span v-if="comment.objectNickname != comment.nickname">{{comment.objectNickname}}</span>
                :&nbsp;
              </span>
              <span>
                {{comment.content}}
              </span>
            </li>
          </div>
        </li>
      </div>
      <div class="return" @click="returnLastPage">
        <el-button 
        icon="el-icon-arrow-left" 
        circle
        title="返回上一页">
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/community/postList'
import YouLike from '@/components/community/youLike'
import HotRecommend from '@/components/community/hotRecommend'

import LikeIcon from '@/assets/icons/like.png'
import LikeActiveIcon from '@/assets/icons/like-active.png'
import CollectionIcon from '@/assets/icons/collection.png'
import CollectionActiveIcon from '@/assets/icons/collection-active.png'
import ForwardIcon from '@/assets/icons/forward.png'

import { getTime } from '@/assets/js/pubFunctions'

import { getPostById } from '@/api/post'

export default {
  name: 'postDetail',
  data(){
    return {
      pramas: {
        post_ID: "",
        user_ID: "1122"
      },
      post: {},
      textarea: "",
      images: [
        "@/assets/images/1.jpg",
        "@/assets/images/2.jpg",
        "@/assets/images/3.jpg"
      ],
      forwardIcon: ForwardIcon
    }
  },
  computed: {
    isAttent(){
      return this.post.isAttent ? "取消关注" : "关注TA"
    },
    isLike(){
      return this.post.isLike ? LikeIcon : LikeActiveIcon
    },
    isCollection(){
      return this.post.isCollect ? CollectionIcon : CollectionActiveIcon
    },
    transTime(t){
      return getTime(t)
    }
  },
  methods: {
    // 跳转到社区页
    returnLastPage(){
      this.$router.go(-1);
    },
    // 回复评论
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
             
      });
    },
    // 转发
    toForward(i){
      this.$confirm('确定转发该帖子吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '转发成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消转发'
        });          
      });
    },
    getPost(){
      this.pramas.post_ID = this.$route.query.id
      getPostById(this.pramas)
      .then(data => {
        this.post = data
      })
    }
  },
  components:{
    PostList,
    YouLike,
    HotRecommend
  },
  created(){
    this.getPost()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postDetails.scss";
</style>