<template>
  <ul id="postList">
    <!--************************************** 商品帖子 **************************************-->
    <li 
    class="postList-li-2">
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
      <div class="postList-main">
        <div class="cosImage">
          <img src="@/assets/images/avatar.jpg" alt="商品图片">
        </div>
        <div class="desc-operate">
          <div class="prductTitle">精致的眼妆品精致的眼妆品精致的眼妆品</div>
          <div class="produtcPrice">￥198~298</div>
          <div class="productUrl">商品链接</div>
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
      </div>
      <!-- 描述、评论区 -->
      <div class="desc-comment">
        <div class="changeBar">
          <div class="changeBar-desc">描述</div>
          <div class="changeBar-comment">评论</div>
        </div>
        <!-- 商品描述 -->
        <div class="desc" v-if="true">
          这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述
        </div>
        <!-- 商品评论 -->
        <div class="comments" v-if="false">
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
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

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
      commentCount: 37
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