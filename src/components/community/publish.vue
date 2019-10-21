<template>
  <div id="publishPage">
    <el-button 
    @click="openPublishBox" 
    type="primary" 
    icon="el-icon-edit" 
    title="发表帖子" 
    circle
    style="margin:0;"></el-button>
    <el-dialog 
    title="发表帖子"
    top="8vh"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false">
      <el-form :model="postData">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="postData.post.type" label="1">妆容分享</el-radio>
          <el-radio v-model="postData.post.type" label="2">眼妆教程</el-radio>
          <el-radio v-model="postData.post.type" label="3">妆品推荐</el-radio>
          <el-radio v-model="postData.post.type" label="4">心情随笔</el-radio>
        </el-form-item>
        <el-form-item label="风格" :label-width="formLabelWidth">
          <el-radio v-model="postData.post.style" label="1">图片</el-radio>
          <el-radio v-model="postData.post.style" label="2">视频</el-radio>
        </el-form-item>
        <el-form-item label="话题" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="帖子话题..."
            v-model="postData.post.title">
          </el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3}"
            placeholder="帖子内容..."
            v-model="postData.post.content">
          </el-input>
        </el-form-item>
        <!-- ****************************上传图片********************** -->
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="postData.post.style == '1'">
          <el-upload
            :action="upload_qiniu_url"
            ref="upload"
            list-type="picture-card"
            multiple
            :data="qiniuData"
            :limit="9"
            :before-upload="beforeUpload1"
            :on-success="handleSuccess1"
            :on-error="handleError1"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" 
          v-if="postData.post.style == '1'"
          :append-to-body="true" 
          :modal-append-to-body="false">
            <el-image
              width="100%"
              :src="dialogImageUrl"
              fit="contain"></el-image>
          </el-dialog>
        </el-form-item>
        <!-- ****************************上传视频********************** -->
        <el-form-item label="视频" :label-width="formLabelWidth" v-if="postData.post.style == '2'">
          <el-upload
            :action="upload_qiniu_url"
            ref="upload"
            :data="qiniuData"
            :limit="1"
            :before-upload="beforeUpload2"
            :on-success="handleSuccess2"
            :on-error="handleError2"
            :auto-upload="false"
            list-type="picture"
            >
            <el-button size="small" type="primary">选择视频</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" 
          :append-to-body="true" 
          :modal-append-to-body="false">
            <!-- <img width="100%" :src="dialogImageUrl" alt=""> -->
            <el-image
              width="100%"
              :src="dialogImageUrl"
              fit="contain"></el-image>
          </el-dialog>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button 
        @click="dialogFormVisible = false" 
        size="mini">取 消</el-button>
        <el-button 
        type="primary" 
        @click="toAddPost" 
        size="mini">发表</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { addPostAndImages, addPost, addPostImage, addPostVideo, getQiniuToken } from '@/api/post.js'
import { uuid, getTime } from '@/assets/js/pubFunctions'

export default {
  name: 'publishPage',
  data() {
    return {
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "http://upload-z2.qiniup.com",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://pymhh35l8.bkt.clouddn.com/",
      imageUrl: "",
      imagesLength: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      
      dialogTableVisible: false,
      dialogFormVisible: false,
      postData: {       //帖子内容
        post: {
          id: "",
          type: "1",
          style: "1",
          title: "",
          content: "",
          uid: "",
          time: "",
          fpid: "-1",
        },
        images: []
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    openPublishBox(){
      if (this.$store.state.userInfo.id == undefined || this.$store.state.userInfo.id == "-1"){
        this.$message.warning("请先登录哦！")
        return
      }
      this.dialogFormVisible = true
    },
    /*发表帖子*/
    toAddPost() {
      let _this = this
      this.postData.post.id = uuid()
      this.postData.post.time = getTime()
      this.postData.post.uid = this.$store.state.userInfo.id
      if(this.postData.post.title == '' || this.postData.post.content == ''){
        this.$message.error('标题和内容不能为空！')
        return
      }
      addPost(this.postData.post)
      .then(res => {
        console.log(res.data)
        if(res.data.message == "程序员开小差了，请您稍后再试。"){
          _this.$message.error('程序员开小差了，请您稍后再试~')
          console.log("嚯嚯嚯嚯嚯嚯嚯嚯嚯")
          return
        }else {
          // 上传图片或视频
          _this.$refs.upload.submit()
          _this.$message.success('发表成功！')
          _this.$emit('fuc', "1")
        }
      })
    },
    submitUpload() {   //提交上传
      this.$refs.upload.submit()
    },
    /*------------------------图片事件-----------------------*/
    beforeUpload1(file) {
      this.qiniuData.key = uuid() + file.name
      const isJPG = file.type === "image/jpeg"
      const isPNG = file.type === "image/png"
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!")
        return false;
      }
      if (!isLt5M) {
        this.$message.error("图片大小不能超过 5MB!")
        return false
      }
    },
    handleSuccess1(res, file) {
      let imageInfo = {
        id: "",
        pid: ""
      }
      imageInfo.id = this.upload_qiniu_addr + res.key
      imageInfo.pid = this.postData.post.id
      console.log(imageInfo)
      addPostImage(imageInfo) //发表图片
      this.dialogFormVisible = false
    },
    handleError1(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // fileDjuge(files, fileList){
    //   this.imagesLength = files.length
    //   console.log(this.imagesLength)
    // },
    /*------------------------视频事件-----------------------*/
    beforeUpload2(file) {
      this.qiniuData.key = uuid() + file.name
      const fileType = file.type
      const isLt50M = file.size / 1024 / 1024 < 50 // 算出文件大小
      if (!isLt50M) { // 这里我们限制文件大小为20M
         this.$message.error('最大只能上传50M!')
         this.$ref.upload.abort()
         return isLt50M
      }
      if (fileType !== 'video/mp4') { // 限制文件类型
         this.$ref.upload.abort()
         this.$message.error('只能上传MP4格式视频!')
         return false
      }
    },
    handleSuccess2(res, file) {
      let videoInfo = {
        id: "",
        pid: ""
      }
      videoInfo.id = this.upload_qiniu_addr + res.key
      videoInfo.pid = this.postData.post.id
      console.log(videoInfo)
      addPostVideo(videoInfo) //发表视频
      this.dialogFormVisible = false
      this.$message.success('发表成功！')
    },
    handleError2(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  created(){
    getQiniuToken()
    .then(res => {
      this.qiniuData.token = res.data
      console.log(this.qiniuData.token)
    })
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/publish.scss";
</style>