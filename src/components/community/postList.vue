<template>
  <ul id="postList">
    <!--*********************** 帖子 ********************-->
    <li 
    class="postList-li-1" 
    v-for="(item,index) in arrayList">
      <div class="user">
        <div class="userInfo">
          <div class="avatar">
            <img :src="item.avatarUrl" alt="">
          </div>
          <div class="name-time">
            <div class="name">{{item.nickname}}</div>
            <div class="time">{{item.postTime}}</div>
          </div>
        </div>
        <div class="attent">
          <el-button size="mini" type="primary">{{isAttent(index)}}</el-button>
        </div>
      </div>
      <div @click="toDetailPage(item.pid)" title="查看帖子详情" class="body">
        <p class="ptitle">#{{item.title}}#</p>
        <p>{{item.body}}</p>
      </div>
      <div class="images">
        <el-image 
          :src="image"
          :preview-src-list="item.images"
          v-for="image in item.images"
          v-if="item.images.length">
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
      <!-- 转发 -->
      <!-- <div @click="toDetailPage" title="查看原帖" class="pforward">
        <div class="user">
          <div class="userInfo">
            <div class="avatar">
              <img src="@/assets/images/avatar.jpg">
            </div>
            <div class="name-time">
              <div class="name">浅笑半离兮</div>
              <div class="time">2019-8-12 11:48:56</div>
            </div>
          </div>
        </div>
        <div class="body">
          <p class="ptitle">#蓦然回首，那人却在，灯火阑珊处#</p>
          <p>东风夜放花千树，更吹落，星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。</p>
        </div>
      </div> -->
      <!-- 操作 -->
      <div class="operate">
        <div class="like" title="点赞" @click="toLike(index)">
          <img :src="isLike(index)" class="like" @click="toLike(index)">
          <div @click.stop="viewLikes(index)">{{item.likeCount}}</div>
        </div>
        <span>|</span>
        <div class="collection" title="收藏" @click="toCollection(index)">
          <img :src="isCollection(index)" class="collection" @click="toCollection(index)">
          <div @click.stop="viewCollections(index)">{{item.commentCount}}</div>
        </div>
        <span>|</span>
        <div class="forward" title="转发" @click="toForward(item)">
          <img :src="forwardIcon" class="forward">
          <div @click.stop="viewForwards(index)">{{item.forwardCount}}</div>
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
            v-for="comment in item.comments"
            title="回复TA"
            @click="openMessageBox(comment.userId)">
              <span class="obj">
                <span>
                  <span>{{comment.nickname}}&nbsp;</span>
                  <span v-if="comment.objectNickname != item.nickname">
                    <span class="reply">回复</span>
                    {{comment.objectNickname}}
                  </span>
                </span>
                :&nbsp;
              </span>
              <span>
                {{comment.content}}
              </span>
            </li>
          </el-collapse-item>
        </el-collapse>
      </div>
    </li>
  </ul>
</template>

<script>
import LikeIcon from '@/assets/icons/like.png'
import LikeActiveIcon from '@/assets/icons/like-active.png'
import CollectionIcon from '@/assets/icons/collection.png'
import CollectionActiveIcon from '@/assets/icons/collection-active.png'
import ForwardIcon from '@/assets/icons/forward.png'

import { getTime } from '@/assets/js/pubFunctions'

export default {
  name: 'postList',
  data(){
    return {
      drawer: false,
      textarea: '',
      forwardIcon: ForwardIcon
    }
  },
  props: {
    arrayList: Array
  },
  computed: {
    isAttent(){
      return i => this.arrayList[i].isAttent ? "取消关注" : "关注TA"
    },
    isLike(){
      return i => this.arrayList[i].isLike ? LikeIcon : LikeActiveIcon
    },
    isCollection(){
      return i => this.arrayList[i].isCollect ? CollectionIcon : CollectionActiveIcon
    },
    transTime(t){
      return getTime(t)
    }
  },
  methods: {
    // 点赞
    toLike(i){

    },
    // 查看点赞的人
    viewLikes(i){

    },
    // 收藏
    toCollection(i){

    },
    // 查看收藏的人
    viewCollections(i){

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
    // 查看转发的人
    viewLikes(i){

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
    // 去帖子详情页
    toDetailPage(i){
      let _this = this
      this.$router.push({
        name:'PostDetails',
        query: { id: i }
      });
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postList.scss";
</style>