<template>
  <ul id="postList">
    <!--************************************** 帖子 **************************************-->
    <li 
    class="postList-li" 
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
      <div class="message">点赞了我的帖子</div>
      <!-- <div class="message">收藏了我的帖子</div>
      <div class="message">转发了我的帖子</div>
      <div class="message">评论：哇！好美啊~</div> -->
      <div @click="toDetailPage" title="查看原帖" class="pforward">
        <div class="body">
          <p class="ptitle">#蓦然回首，那人却在，灯火阑珊处#</p>
          <p>东风夜放花千树，更吹落，星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。</p>
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
      
    }
  },
  methods: {
    // 去帖子详情页
    toDetailPage(){
      this.$router.push({name:'PostDetails'});
    }
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/messageList.scss";
</style>