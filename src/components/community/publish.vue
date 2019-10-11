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
        <el-form-item 
        label="图片" 
        :label-width="formLabelWidth"
        v-if="postData.post.style == '1'">
          <el-upload
            :action="uploadQiniuUrl"
            ref="upload"
            list-type="picture-card"
            :auto-upload=false
            :data="qiniuData"
            :before-upload="beforeUploadGetKey"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :multiple="true"
            :limit="9">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-form-item>
        <!-- <el-form-item 
        label="视频" 
        prop="Video"
        :label-width="formLabelWidth"
        v-if="postData.post.style == '2'">
          action必选参数, 上传的地址
          <el-upload 
          class="avatar-uploader el-upload--text" 
          :action="uploadUrl" 
          :show-file-list="false" 
          :on-success="handleVideoSuccess" 
          :before-upload="beforeUploadVideo" 
          :on-progress="uploadVideoProcess">
            <video 
            v-if="videoForm.Video !='' && videoFlag == false" 
            :src="videoForm.Video" 
            class="avatar" 
            controls="controls">您的浏览器不支持视频播放</video>
            <i 
            v-else-if="videoForm.Video =='' && videoFlag == false" 
            class="el-icon-plus avatar-uploader-icon"></i>
            <el-progress 
            v-if="videoFlag == true" 
            type="circle" 
            :percentage="videoUploadPercent" 
            style="margin-top:30px;"></el-progress>
          </el-upload>
          <P class="text">请保证视频格式正确，且不超过50M</P>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-form-item> -->
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
import { addPostAndImages, addPost, addPostImages } from '@/api/post.js'
import { uuid } from '@/assets/js/pubFunctions'

export default {
  name: 'publishPage',
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      uploadQiniuUrl: "",
      qiniuData:{             //上传图片携带的参数
        token : "",
        key : "",
      },
      postData: {       //帖子内容
        post: {
          id: "a111",
          type: "1",
          style: "1",
          title: "",
          content: "",
          uid: "1122",
          time: "",
          fpid: "-1",
        },
        images: [
          {
            pid: "a111",
            id: "http://fengblog.xyz/images/2/a1.jpg"
          },
          {
            pid: "112233",
            id: "http://fengblog.xyz/images/2/a2.jpg"
          },
          {
            pid: "112233",
            id: "http://fengblog.xyz/images/2/a3.jpg"
          }
        ]
      },
      /*"post": {
        "id": "112233",
        "type": "1",
        "style": "1",
        "title": "999",
        "content": "23333333333333333333",
        "uid": "1122",
        "time": "2019",
        "fpid": "-1"
      },
      "images": {[
        {
          "pid": "112233",
          "id": "http://fengblog.xyz/images/2/1.jpg"
        },
        {
          "pid": "112233",
          "id": "http://fengblog.xyz/images/2/2.jpg"
        },
        {
          "pid": "112233",
          "id": "http://fengblog.xyz/images/2/3.jpg"
        }
      ]}*/
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
      addPost(this.postData.post)
      .then(data => {
        if(data.message == "程序员开小差了，请您稍后再试。"){
          _this.$message.error('程序员开小差了，请您稍后再试~')
          return
        }else {
          if(this.postData.images.length){
            for(let i in this.postData.images){
              i.pid = this.postData.post.id
            }
            addPostImages(this.postData.images)
            .then(data => {
              if(data.message == "程序员开小差了，请您稍后再试。"){
                throw new Error("图片添加失败")
              }
              _this.$message({
                message: '发表成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            })
            .catch(() => {
              // 请求删除帖子
            })
          }
        }
      })
    },
    getToken(){  //上传之前获取 token
      var url1 = this.$store.state.frontUrl + "/getQiniuToken?bucket=xdx97-album";
      this.$ajax.get(url1)
      .then( response => {
          //获取 token
          this.qiniuData.token = response.data.token;  
      })
    },
    submitUpload() {   //提交上传
      this.$refs.upload.submit();
    },
    beforeUploadGetKey() {   //每个文件上传之前 给它一个 名字
         this.qiniuData.key = this.guid();      
    },
    handlePictureCardPreview(file) {   //查看某张图片的原图
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024  < 10;
      if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
      }
      if (!isLt50M) {
          this.$message.error('上传视频大小不能超过50MB哦!');
          return false;
      }
    }
  },
  components:{

  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/publish.scss";
</style>