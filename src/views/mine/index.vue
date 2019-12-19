<template>
  <div id="mine">
    <div class="mine-back">
      <div class="avatar">
        <img 
        :src="userInfo.avatar" 
        title="更换头像" 
        @click="showChangeAvatarBox = true"
        alt="">
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
        style="margin-top: 0;"
        @click="updateSigniture"></el-button>
      </div>
      <div class="upload">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          <el-button 
          v-if="userInfo.id == $store.state.userInfo.id"
          type="primary" 
          size="mini" 
          plain><i class="el-icon-upload el-icon--right">上传封面图</i></el-button>
        </el-upload>
      </div>
      <el-dialog 
      title="更换头像" 
      :visible.sync="showChangeAvatarBox"
      width="400px">
        <div class="dragUpload">
          <el-upload
            class="upload-demo"
            drag
            :action="upload_qiniu_url"
            :data="qiniuData"
            :limit="1"
            :before-upload="beforeUpload1"
            :on-success="handleSuccess1"
            :on-error="handleError1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </div>
      </el-dialog>
    </div>
    <div class="main">
      <div class="nav-bar">
        <ul>
          <router-link :to="{'name':'MyPosts','query':{'id': this.$route.query.id}}">
            <li>帖子 ( {{userInfo.posts_count}} )</li>
          </router-link>
          <router-link :to="{'name':'MyCollections','query':{'id': this.$route.query.id}}">
            <li>收藏 ( {{userInfo.pfavorites_count}} )</li>
          </router-link>
          <router-link :to="{'name':'MyFocus','query':{'id': this.$route.query.id}}">
            <li>关注 ( {{userInfo.follows_count}} )</li>
          </router-link>
          <router-link :to="{'name':'MyFanses','query':{'id': this.$route.query.id}}">
            <li>粉丝 ( {{userInfo.fans_count}} )</li>
          </router-link>
          <router-link :to="{'name':'MyProfile','query':{'id': this.$route.query.id}}">
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
import { getUserInfo, updateUserInfo } from '@/api/user'
import { getQiniuToken } from '@/api/post.js'
import { uuid } from '@/assets/js/pubFunctions'

export default {
  name: 'mine',
  data(){
    return {
      avatarUrl: "",
      showChangeAvatarBox: false,
      fileList: "",
      userInfo: {},  //修改资料表单
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "http://upload-z2.qiniup.com",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://cdn.fengblog.xyz/"
    }
  },
  methods: {
    /*------------------------头像上传事件-----------------------*/
    beforeUpload1(file) {
      this.qiniuData.key = uuid() + file.name
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!")
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 5MB!")
        return false
      }
    },
    handleSuccess1(res, file) {
      let imageUrl = this.upload_qiniu_addr + res.key
      this.userInfo.avatar = imageUrl
      updateUserInfo(this.userInfo)
      .then(res => {
        console.log(res)
        this.$message.success('修改成功')
        this.$store.dispatch('getUserInfo', res.data.detailMsg.data)
        this.showChangeAvatarBox = false
      })
    },
    handleError1(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    },
    // 个性签名修改事件
    updateSigniture() {
      this.$prompt('请输入个性签名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.userInfo.profile = value
        updateUserInfo(this.userInfo).then(res => {
          this.$message.success("修改成功")
          this.$store.dispatch('getUserInfo', JSON.parse(this.userInfo))
        })
      })
    }
  },
  created(){
    getUserInfo({user_ID: this.$route.query.id})
    .then(res => {
      this.userInfo = res.data.detailMsg.data[0]
      console.log(this.userInfo)
    })
    getQiniuToken()
    .then(res => {
      this.qiniuData.token = res.data
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