<template>
  <div id="styleMigration">
    <div class="container">
      <div class="sectionA">
        <div class="example">
          <div class="title">眼妆迁移示例</div>
          <div class="pic1">
            <img src="@/assets/images/10.jpg">
          </div>
          <div class="add">
            <svg t="1569489148358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4683" width="64" height="64"><path d="M512 70.283c-244.514 0-442.732 197.763-442.732 441.717s198.218 441.717 442.732 441.717 442.732-197.763 442.732-441.717-198.218-441.717-442.732-441.717M735.045 558.604h-176.442v176.442c0 25.738-20.866 46.604-46.604 46.604s-46.604-20.866-46.604-46.604v-176.442h-176.442c-25.738 0-46.604-20.866-46.604-46.604s20.866-46.604 46.604-46.604h176.442v-176.442c0-25.738 20.866-46.604 46.604-46.604s46.604 20.866 46.604 46.604v176.442h176.442c25.738 0 46.604 20.866 46.604 46.604s-20.866 46.604-46.604 46.604z" fill="#ff6f6f" p-id="4684"></path></svg>
          </div>
          <div class="pic2">
            <img src="@/assets/images/4.png">
          </div>
          <div class="arrow">
            <svg t="1569489267620" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9086" width="64" height="64"><path d="M514 114.3c-219.9 0-398.8 178.9-398.8 398.8 0 220 178.9 398.9 398.8 398.9s398.8-178.9 398.8-398.9c0-219.8-178.9-398.8-398.8-398.8z m232.1 440.4L582 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.5-17.2-26.5-17.2-41.5s5.7-30.1 17.2-41.5l63.8-63.8H334c-32.5 0-58.8-26.3-58.8-58.8s26.3-58.8 58.8-58.8h228.7l-63.8-63.8c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 23 22.9 60.2 0 83.1z" p-id="9087" fill="#ff6f6f"></path></svg>
          </div>
          <div class="pic3">
            <img src="@/assets/images/a.jpg">
          </div>
        </div>
        <!-- 原图 -->
        <div class="myPicture">
          <div class="title">选择您的照片</div>
          <div class="select">
            <div class="image">
              <img :src="imageUrl" alt="">
            </div>
            <div class="dragUpload">
              <el-upload
                class="upload-demo"
                drag
                :action="upload_qiniu_url"
                :data="qiniuData"
                :limit="1"
                :before-upload="beforeUpload1"
                :on-success="handleSuccess1"
                :on-error="handleError1"
                on-remove="removeImage">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
          </div>
        </div>
        <!-- 融合图 -->
        <div class="tempPicture">
          <div class="title">选择模板照片</div>
          <div class="select">
            <div class="image">
              <img src="@/assets/images/4.png">
            </div>
            <div class="tempSelect">
              <div class="head">选择您想要融合的眼妆</div>
              <ul class="images">
                <li v-for="item in imageList">
                  <img :src="item.id">
                </li>
              </ul>
              <div class="pagenation">
                <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="50">
                </el-pagination>
              </div>
              <div class="selectPictrue">
                <div class="tip">没有喜欢的？选择图片上传</div>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <!-- 生成眼妆按钮 -->
        <div class="submit">
          <el-button type="primary" size="small">生成眼妆</el-button>
        </div>
      </div>
    </div>
    <div class="return" @click="returnLastPage">
      <el-button 
      icon="el-icon-arrow-left" 
      circle
      title="返回上一页">
      </el-button>
    </div>
  </div>
</template>

<script>
import { getMyImages } from '@/api/slide'
import { getQiniuToken } from '@/api/post.js'
import { uuid } from '@/assets/js/pubFunctions'

export default {
  name: 'styleMigration',
  data(){
    return {
      imageList: [],
      qiniuData: {
        key: "",
        token: ""
      },
      upload_qiniu_url: "http://upload-z2.qiniup.com",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://pymhh35l8.bkt.clouddn.com/",
      imageUrl: "",
      dialogImageUrl: '',
    }
  },
  methods: {
    returnLastPage(){
      this.$router.go(-1);
    },
    // 获取所有素材
    getImageList(){
      getMyImages().then(data => {
        this.imageList = data
      })
    },
    /*------------------------图片上传事件-----------------------*/
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
      this.imageUrl = this.upload_qiniu_addr + res.key
      console.log(this.imageUrl)
    },
    handleError1(res) {
      this.$message({
        message: "上传失败",
        duration: 2000,
        type: "warning"
      });
    },
    removeImage(){
      this.imageUrl = ""
    }
  },
  components:{

  },
  created(){
    this.getImageList()
    getQiniuToken()
    .then(res => {
      this.qiniuData.token = res.data
      console.log(this.qiniuData.token)
    })
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/index/styleMigration.scss";
</style>