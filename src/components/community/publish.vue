<template>
  <div id="publishPage">
    <el-button 
    @click="dialogFormVisible = true" 
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
          <el-radio v-model="postData.post.type" label="1">眼妆教程</el-radio>
          <el-radio v-model="postData.post.type" label="2">妆容分享</el-radio>
        </el-form-item>
        <el-form-item label="风格" :label-width="formLabelWidth">
          <el-radio v-model="postData.post.style" label="1">图片</el-radio>
          <el-radio v-model="postData.post.style" label="2">视频</el-radio>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="帖子标题..."
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
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
              :action="upload_qiniu_url"
              ref="upload"
              list-type="picture-card"
              multiple
              :data="qiniuData"
              :limit="9"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
              >
              <i class="el-icon-plus"></i>
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
        <!-- ****************************上传视频********************** -->
        
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
import { addPostAndImages, addPost, addPostImage, getQiniuToken } from '@/api/post.js'
import { uuid } from '@/assets/js/pubFunctions'

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
        images: [
          // {
          //   pid: "",
          //   id: "http://fengblog.xyz/images/2/1.jpg"
          // },
          // {
          //   pid: "",
          //   id: "http://fengblog.xyz/images/2/2.jpg"
          // },
          // {
          //   pid: "",
          //   id: "http://fengblog.xyz/images/2/3.jpg"
          // }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    
    /*一起发表帖子*/
    // toAddPost() {
    //   this.postData.post.time = new Date()
    //   addPostAndImages(this.postData)
    //   .then(data => {
    //     if(data.message == "程序员开小差了，请您稍后再试。"){
    //       this.$message.error('程序员开小差了，请您稍后再试~')
    //       return
    //     }else {
    //       this.$message({
    //         message: '发表成功',
    //         type: 'success'
    //       })
    //       this.dialogFormVisible = false
    //     }
    //   })
    // },
    /*发表帖子*/
    toAddPost() {
      let _this = this
      this.postData.post.id = uuid()
      this.postData.post.time = new Date()
      this.postData.post.uid = this.$store.state.userInfo.id
      addPost(this.postData.post)
      .then(res => {
        console.log(res.data)
        if(res.data.message == "程序员开小差了，请您稍后再试。"){
          _this.$message.error('程序员开小差了，请您稍后再试~')
          return
        }else {
          // 上传图片
          _this.$refs.upload.submit()
        }
      })
    },
    submitUpload() {   //提交上传
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      this.qiniuData.key = uuid() + file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
    },
    handleSuccess(res, file) {
      let imageInfo = {
        id: "",
        pid: ""
      }
      imageInfo.id = this.upload_qiniu_addr + res.key
      imageInfo.pid = this.postData.post.id
      console.log(imageInfo)
      addPostImage(imageInfo) //发表图片
    },
    handleError(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
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