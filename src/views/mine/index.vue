<template>
  <div id="mine">
    <div class="mine-back">
      <div class="avatar">
        <img :src="userInfo.avatar">
      </div>
      <div class="nickname">{{userInfo.nickname}}</div>
      <div class="signature-edit">
        <div class="signature">{{userInfo.profile}}</div>
        <el-button 
        v-if="userInfo.id == $store.state.userInfo.id"
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
          <el-button 
          v-if="userInfo.id == $store.state.userInfo.id"
          type="primary" 
          size="mini" 
          plain><i class="el-icon-upload el-icon--right">上传封面图</i></el-button>
        </el-upload>
      </div>
    </div>
    <div class="main">
      <div class="nav-bar">
        <ul>
          <router-link :to="{name:'MyPosts',query:{id: userInfo.uid}}">
            <li>帖子 ( {{userInfo.posts_count}} )</li>
          </router-link>
          <router-link :to="{name:'MyCollections',query:{id: userInfo.uid}}">
            <li>收藏 ( {{userInfo.cfavorites_count}} )</li>
          </router-link>
          <router-link :to="{name:'MyFocus',query:{id: userInfo.uid}}">
            <li>关注 ( {{userInfo.follows_count}} )</li>
          </router-link>
          <router-link :to="{name:'MyFanses',query:{id: userInfo.uid}}">
            <li>粉丝 ( {{userInfo.fans_count}} )</li>
          </router-link>
          <router-link :to="{name:'MyProfile',query:{id: userInfo.uid}}">
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
import { getUserInfo } from '@/api/user'

export default {
  name: 'mine',
  data(){
    return {
      avatarUrl: "",
      avatarUrlList: [
        ""
      ],
      fileList: "",
      userInfo: {}
    }
  },
  created(){
    getUserInfo({user_ID: this.$store.state.viewUserId})
    .then(res => {
      this.userInfo = res.data.detailMsg.data[0]
      console.log(this.userInfo)
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/mine/index.scss";
</style>