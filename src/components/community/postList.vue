<template>
  <ul id="postList">
    <!--************************************** 商品帖子 **************************************-->
    <li 
    class="postList-li-1" 
    v-for="(item,index) in 5">
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
        <div class="attent">
          <el-button size="mini" type="primary">关注TA</el-button>
        </div>
      </div>
      <div class="body">
        <p @click="toDetailPage" title="查看帖子详情">东风夜放花千树，更吹落，星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。</p>
      </div>
      <div class="images">
        <el-image 
          :src="imageUrl"
          :preview-src-list="images"
          :fit="cover"
          v-for="item in images">
        </el-image>
      </div>
      <!-- <div class="video">
        <video src="http://fengblog.xyz/videos/test.mp4" width="100%" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div> -->
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
      <div class="comments">
        <el-collapse accordion>
          <el-collapse-item 
          :title='"展开评论 ("+commentCount+")"'>
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
                  <span v-if="true">
                    <span class="reply">回复</span>
                    胡健龙
                  </span>
                </span>
                :&nbsp;
              </span>
              <span>
                哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或
              </span>
            </li>
          </el-collapse-item>
        </el-collapse>
      </div>
    </li>
  </ul>
</template>

<script>
import Img from '@/assets/images/8.jpg'

export default {
  name: 'postList',
  data(){
    return {
      drawer: false,
      images: [
        "@/assets/images/1.jpg",
        "@/assets/images/2.jpg",
        "@/assets/images/3.jpg",
        "@/assets/images/4.jpg",
        "@/assets/images/5.jpg",
        "@/assets/images/6.jpg",
        "@/assets/images/7.jpg",
        "@/assets/images/8.jpg",
        "@/assets/images/9.jpg"
      ],
      textarea: '',
      commentCount: 37,
      imageUrl: Img
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
             
      });
    },
    toDetailPage(){
      this.$router.push({name:'PostDetails'});
    }
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/postList.scss";
</style>