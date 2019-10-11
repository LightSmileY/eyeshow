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
          东风夜放花千树，更吹落，星如雨。
        </div>
        <el-button 
        type="primary" 
        icon="el-icon-edit" 
        circle
        size="mini"
        title="修改个性签名"
        style="margin-top: 0;"></el-button>
      </div>
      <div class="upload">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          <!-- :on-preview="handlePreview" -->
          <!-- :on-remove="handleRemove" -->
          <!-- :before-remove="beforeRemove" -->
          <!-- :on-exceed="handleExceed" -->
          <!-- :file-list="fileList"> -->
          <el-button type="primary" size="mini" plain><i class="el-icon-upload el-icon--right">上传封面图</i></el-button>
        </el-upload>
      </div>
    </div>
    <div class="main">
      <div class="nav-bar">
        <ul>
          <router-link to="/mine/myPosts">
            <li>帖子 (56)</li>
          </router-link>
          <router-link to="/mine/myCollections">
            <li>收藏 (243)</li>
          </router-link>
          <router-link to="/mine/myFocus">
            <li>关注 (58)</li>
          </router-link>
          <router-link to="/mine/myFanses">
            <li>粉丝 (11.5w)</li>
          </router-link>
          <router-link to="/mine/myProfile">
            <li>资料</li>
          </router-link>
        </ul>
      </div>
      <div class="mine-body">
        <router-view/>
      </div>
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
      ],
      fileList: ""
    }
  },
  methods: {

  },
  components:{

  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mine/index.scss";
</style>