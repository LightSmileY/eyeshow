<template>
  <div id="mine">
    <div class="mine-back">
      <div class="avatar">
        <img src="@/assets/images/avatar.jpg">
        <!-- <el-image 
          :src="avatarUrl" 
          :preview-src-list="avatarUrlList">
        </el-image> -->
      </div>
      <div class="signature-edit">
        <div class="signature">
          人生若只如初见，何事秋风悲画扇。
        </div>
        <el-button 
        type="primary" 
        icon="el-icon-edit" 
        circle
        size="mini"
        title="修改个性签名"
        style="margin-top: 0;"></el-button>
      </div>
    </div>
    <div class="nav-bar">
      <ul class="nav-bar-ul">
        <router-link to="/mine/myPosts"><li>我的帖子</li></router-link>
        <router-link to="/mine/myLikes"><li>我的喜欢</li></router-link>
        <router-link to="/mine/myCollections"><li>我的收藏</li></router-link>
        <router-link to="/mine/myFanses"><li>我的粉丝</li></router-link>
        <router-link to="/mine/myFocus"><li>我的关注</li></router-link>
        <router-link to="/mine/myProfile"><li>我的资料</li></router-link>
      </ul>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data(){
    return {
      avatarUrl: "",
      avatarUrlList: [
        ""
      ]
    }
  },
  methods: {

  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mine/index.scss";
</style>