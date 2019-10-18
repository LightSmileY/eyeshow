<template>
  <ul id="postList">
    <!--*********************** 帖子 ********************-->
    <li 
    class="postList-li-1" 
    v-for="(item,index) in arrayList">
      <div class="user">
        <div class="userInfo">
          <div class="avatar" @click="toMinePage(item.uid)">
            <img :src="item.avatarUrl" alt="" title="查看用户主页">
          </div>
          <div class="name-time">
            <div class="name" @click="toMinePage(item.uid)" title="查看用户主页">{{item.nickname}}</div>
            <div class="time">{{item.postTime}}</div>
          </div>
        </div>
        <div class="attent" v-if="!isMyPost(item.uid)">
          <el-button size="mini" type="primary" @click="toAttent(item.pid)">{{isAttent(index)}}</el-button>
        </div>
        <div class="deletePost" v-if="isMyPost(item.uid)">
          <div @click="deletePost(index)">删除</div>
        </div>
      </div>
      <div @click="toDetailPage(item.pid)" title="查看帖子详情" class="body">
        <p class="ptitle">
          <span v-if='item.fpid != "-1"' class="forwardWord">
            <i class="el-icon-s-promotion"></i>转发
          </span>
          #{{item.title}}#
        </p>
        <p>{{item.body}}</p>
      </div>
      <div class="images">
        <el-image 
          :src="image"
          :preview-src-list="item.images"
          v-for="image in item.images"
          v-if="item.images.length"
          fit="cover">
        </el-image>
      </div>
      <div class="video">
        <video 
        :src="item.video[0]" 
        width="100%" 
        controls="controls"
        v-if="item.video.length">
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <!-- *****************************转发*************************** -->
      <div 
      @click="toDetailPage(item.forward.pid)" 
      title="查看原帖" 
      class="pforward"
      v-if="item.forward">
        <div class="user">
          <div class="userInfo">
            <div class="avatar">
              <img :src="item.forward.avatarUrl">
            </div>
            <div class="name-time">
              <div class="name">{{item.forward.nickname}}</div>
              <div class="time">{{item.forward.postTime}}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <p class="ptitle">#{{item.forward.postTitle}}#</p>
          <p>{{item.forward.body}}</p>
        </div>
      </div>
      <!-- 操作 -->
      <div class="operate">
        <div class="like" title="点赞">
          <img :src="isLike(index)" class="like" @click="toLike(index)">
          <div>{{item.likeCount}}</div>
        </div>
        <span>|</span>
        <div class="collection" title="收藏">
          <img :src="isCollection(index)" class="collection" @click="toCollect(index)">
          <div>{{item.collectionCount}}</div>
        </div>
        <span>|</span>
        <div class="forward" title="转发">
          <img :src="forwardIcon" class="forward" @click="openForwardBox(index)">
          <div>{{item.forwardCount}}</div>
        </div>
      </div>
      <div class="comments">
        <el-collapse accordion>
          <el-collapse-item 
          :title='"展开评论 (" + item.commentCount + ")"'>
            <div class="tocomment">
              <el-input
                type="textarea"
                autosize
                placeholder="我也要评论..."
                v-model="commentInfo.content">
              </el-input>
              <el-button 
              type="primary"
              size="mini"
              @click="toComment(index)">
                评论
              </el-button>
            </div>
            <li 
            class="commentList" 
            v-for="(comment,cindex) in item.comments"
            >
              <span class="obj"
              @click="replyComment(index,cindex,comment.nickname)">
                <span>
                  <span>{{comment.nickname}}&nbsp;</span>
                  <span v-if="comment.objectNickname !== item.nickname">
                    <span class="reply">回复</span>
                    {{comment.objectNickname}}
                  </span>
                </span>
                :&nbsp;
                <span 
                class="content" 
                title="回复TA" >
                {{comment.content}}
                </span>
              </span>
              <span 
              class="delete" 
              title="删除评论" 
              v-if="canDelete(comment.userId)"
              @click="deleteCommentById(index,cindex)">删除</span>
            </li>
          </el-collapse-item>
        </el-collapse>
      </div>
    </li>
    <!-- ***********************转发帖子*********************** -->
    <el-dialog 
    title="转发该帖子" 
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="600px"
    top="25vh">
      <el-form :model="forwardInfo">
        <el-form-item label="添加标题" :label-width="formLabelWidth">
          <el-input v-model="forwardInfo.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="想说的话" :label-width="formLabelWidth">
          <el-input 
          type="textarea"
          v-model="forwardInfo.content" 
          autocomplete="off"
          :autosize="{ minRows: 3}"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="toForward">提交</el-button>
      </div>
    </el-dialog>
  </ul>
</template>

<script>
import LikeIcon from '@/assets/icons/like.png'
import LikeActiveIcon from '@/assets/icons/like-active.png'
import CollectionIcon from '@/assets/icons/collection.png'
import CollectionActiveIcon from '@/assets/icons/collection-active.png'
import ForwardIcon from '@/assets/icons/forward.png'

import { uuid, getTime } from '@/assets/js/pubFunctions'
import { attentUser, unAttentUser } from '@/api/user'
import { 
  addPost,
  likePost, 
  unLikePost, 
  collectPost, 
  unCollectPost, 
  commentPost, 
  deleteComment,
  deletePostById
} from '@/api/post'


export default {
  name: 'postList',
  data(){
    return {
      drawer: false,
      textarea: '',
      forwardIcon: ForwardIcon,
      likeInfo: {   //点赞接口参数
        id: "",
        time: "",
        pid: "",
        uid: ""
      },
      // 评论帖子表单
      commentInfo: {
        id: "",
        time: "",
        pid: "",
        auid: "",
        buid: "",
        content: ""
      },
      dialogFormVisible: false,    //转发弹框控制
      // 转发帖子表单
      forwardInfo: {
        title: "",
        content: ""
      },
      forwardIndex: 0,  //打开转发框时记录帖子索引
      formLabelWidth: '100px',
      fit: "cover"
    }
  },
  props: {
    arrayList: Array
  },
  computed: {
    isMyPost(){
      return i => i == this.$store.state.userInfo.id
    },
    isAttent(){
      return i => this.arrayList[i].isAttent ? "已关注" : "关注TA"
    },
    isLike(){
      return i => this.arrayList[i].isLike ? LikeActiveIcon : LikeIcon
    },
    isCollection(){
      return i => this.arrayList[i].isCollect ? CollectionActiveIcon : CollectionIcon
    },
    canDelete(){
      return i => i == this.$store.state.userInfo.id
    }
  },
  methods: {
    // 删除我的帖子
    deletePost(i){
      this.$confirm('确定删除该帖子吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePostById({post_ID: this.arrayList[i].pid})
        .then(res => {
          console.log(res)
          this.arrayList.splice(i, 1)
          console.log(this.arrayList)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    // 关注&&取消关注用户
    toAttent(i){
      if(this.arrayList[i].isAttent){
        this.unAttent(i)
      }else{
        this.attent(i)
      }
    },
    // 点赞&&取消点赞
    toLike(i){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      if(this.arrayList[i].isLike){
        this.unLike(i)
      }else{
        this.like(i)
      }
    },
    // 收藏&&取消收藏
    toCollect(i){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      if(this.arrayList[i].isCollect){
        this.unCollect(i)
      }else{
        this.collect(i)
      }
    },
    // 关注
    attent(i){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      let _this = this
      let attentInfo = {
        id: uuid(),
        fans: this.arrayList[i].uid,
        follows: this.$store.state.userInfo.id
      }
      attentUser(attentInfo)
      .then(res => {
        _this.arrayList[i].isAttent = true
        console.log(res)
      })
    },
    // 取消关注
    unAttent(i){
      let _this = this
      let unAttentInfo = {
        fans_ID: this.arrayList[i].uid,
        follows_ID: this.$store.state.userInfo.id
      }
      unAttentUser(unAttentInfo)
      .then(res => {
        _this.arrayList[i].isAttent = false
        console.log(res)
      })
    },
    // 点赞
    like(i){
      let _this = this
      let likeInfo = {
        id: uuid(),
        time: getTime(),
        pid: this.arrayList[i].pid,
        uid: this.$store.state.userInfo.id
      }
      likePost(likeInfo)
      .then(res => {
        _this.arrayList[i].isLike = true
        _this.arrayList[i].likeCount ++
        console.log(res)
      })
    },
    // 取消点赞
    unLike(i){
      let _this = this
      let unlikeInfo = {
        post_ID: this.arrayList[i].pid,
        user_ID: this.$store.state.userInfo.id
      }
      console.log(unlikeInfo)
      unLikePost(unlikeInfo)
      .then(res => {
        _this.arrayList[i].isLike = false
        _this.arrayList[i].likeCount --
        console.log(res)
      })
    },
    // 收藏
    collect(i){
      let _this = this
      let collectInfo = {
        id: uuid(),
        time: getTime(),
        pid: this.arrayList[i].pid,
        uid: this.$store.state.userInfo.id
      }
      collectPost(collectInfo)
      .then(res => {
        _this.arrayList[i].isCollect = true
        _this.arrayList[i].collectionCount ++
        console.log(res)
      })
    },
    // 取消收藏
    unCollect(i){
      let _this = this
      let unCollectInfo = {
        post_ID: this.arrayList[i].pid,
        user_ID: this.$store.state.userInfo.id
      }
      unCollectPost(unCollectInfo)
      .then(res => {
        _this.arrayList[i].isCollect = false
        _this.arrayList[i].collectionCount --
        console.log(res)
      })
    },
    // 转发
    openForwardBox(i){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      this.dialogFormVisible = true
      this.forwardIndex = i
    },
    toForward(){
      let i = this.forwardIndex
      let forwardInfo = {
        title: this.forwardInfo.title,
        content: this.forwardInfo.content,
        type: this.arrayList[i].type,
        style: this.arrayList[i].style,
        uid: this.$store.state.userInfo.id,
        id: uuid(),
        time: getTime(),
        fpid: this.arrayList[i].pid
      }
      console.log(forwardInfo)
      addPost(forwardInfo)
      .then(res => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '转发成功!'
        })
        this.$emit('fuc', "1")
      })
    },
    // 评论
    toComment(i){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      let _this = this
      let commentInfo = {
        id: uuid(),
        time: getTime(),
        pid: this.arrayList[i].pid,
        auid: this.$store.state.userInfo.id,
        buid: this.arrayList[i].uid,
        content: this.commentInfo.content
      }
      commentPost(commentInfo)
      .then(res => {
        _this.arrayList[i].comments.push({
          id: uuid(),
          time: getTime(),
          pid: this.arrayList[i].pid,
          userId: this.$store.state.userInfo.id,
          nickname: this.$store.state.userInfo.nickname,
          objectNickname: this.arrayList[i].nickname,
          content: this.commentInfo.content
        })
        _this.arrayList[i].commentCount ++
        console.log(res)
      })
    },
    // 回复评论
    replyComment(i,j,k){
      this.$prompt('回复  '+ k, {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        // beforeClose: 
      })
      .then(({ value }) => {
        if (this.$store.state.userInfo.id == "" || this.$store.state.userInfo.id == "-1"){
          this.$message.warning("请先登录哦！")
          return
        }
        let _this = this
        let commentInfo = {
          id: uuid(),
          time: getTime(),
          pid: this.arrayList[i].pid,
          auid: this.$store.state.userInfo.id,
          buid: this.arrayList[i].comments[j].userId,
          content: value
        }
        commentPost(commentInfo)
        .then(res => {
          _this.arrayList[i].comments.push({
            id: uuid(),
            time: getTime(),
            pid: this.arrayList[i].pid,
            nickname: this.$store.state.userInfo.nickname,
            objectNickname: this.arrayList[i].comments[j].nickname,
            content: value
          })
          _this.arrayList[i].commentCount ++
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '回复成功'
        });
      })
    },
    // 删除评论
    deleteCommentById(i,j){
      let _this = this
      this.$confirm('确定删除评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        deleteComment({id: this.arrayList[i].comments[j].id})
        .then(res => {
          console.log(res)
          _this.arrayList[i].comments[j].splice(j, 1)
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        
      })
    },
    // 去帖子详情页
    toDetailPage(i){
      this.$router.push({
        name:'PostDetails',
        query: { id: i }
      })
    },
    toMinePage(i){
      this.$router.push({
        name:'Mine'
      })
      this.$store.dispatch('getViewUserId', i)
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postList.scss";
</style>