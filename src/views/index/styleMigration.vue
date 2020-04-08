<template>
  <div id="styleMigration">
    <div class="container">
      <div class="sectionA">
        <div class="example">
          <div class="title"></div>
          <div class="pic1">
            <img src="http://cdn.fengblog.xyz/static/10.jpg">
          </div>
          <div class="pic2">
            <img src="http://cdn.fengblog.xyz/111mmmm.jpg">
          </div>
          <div class="pic3">
            <img src="http://cdn.fengblog.xyz/static/a.png">
          </div>
        </div>
        <!-- 人脸融合 -->
        <div class="myPicture">
          <div class="title">
           
          </div>
          <div class="temp">
            <div class="temp-left">
              <div class="tempSelect">
                <div class="head">选择您想要融合的眼妆</div>
                <ul class="images">
                  <li v-for="(item,index) in myImages" :class="{'li_active': item == imageUrl1}">
                    <img :src="item.id" fit="cover" @click="selectImage(index)">
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
                    :action="upload_qiniu_url"
                    :data="qiniuData"
                    :limit="1"
                    :before-upload="beforeUpload1"
                    :on-success="handleSuccess2"
                    :on-error="handleError1">
                    <el-button size="mini" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="temp-image">
              <div class="my-image">
                <img :src="imageUrl1" fit="cover" alt="">
              </div>
              <div class="obj-image">
                <img :src="imageUrl2" fit="cover" alt="">
              </div>
              <!-- 生成眼妆按钮 -->
              <div class="submit">
                <el-button 
                type="primary" 
                size="small" 
                @click="getMergeImage"
                element-loading-text="玩命生成中···"
                v-loading.fullscreen.lock="fullscreenLoading">生成眼妆</el-button>
              </div>
            </div>
            <div class="temp-right">
              <div class="head">上传您的美照</div>
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
                  :on-remove="removeImage">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将图片拖到此处,或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
        <!-- ***************结果**************** -->
        <div class="result" v-if="isShowResult">
          <div class="result-left">
            <div class="result-title">妆容迁移结果</div>
            <div class="result-image">
              <el-image
              :src="'data:image/png;base64,'+resultImage"
              lazy
              :fit="cover"></el-image>
            </div>
            <div class="cosrecommend">
              <div class="tip">
                为您推荐对应妆品:
              </div>
              <ul>
                <li 
                v-for="item in recommendList"
                @click="toUrl(item.link)">
                  <div class="image">
                    <el-image
                    :src="item.image"
                    lazy
                    fit="cover"></el-image>
                  </div> 
                  <div class="title">{{item.name}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="result-right">
            <div class="title">妆容教程</div>
            <div class="teaching" v-html="course">
              
            </div>
          </div>
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
import { getMyImages, mergePace } from '@/api/slide'
import { getQiniuToken } from '@/api/post.js'
import { uuid } from '@/assets/js/pubFunctions'
import { recommendList, myImages } from '@/assets/js/staticData'

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
      upload_qiniu_addr: "http://cdn.fengblog.xyz/",
      cosImageList: [
        "http://cdn.fengblog.xyz/XMY-014.png",
        "http://cdn.fengblog.xyz/XMY-136.png",
        "http://cdn.fengblog.xyz/vFG137.png",
        "http://cdn.fengblog.xyz/111%E5%9B%BE%E7%89%871.png",
        "http://cdn.fengblog.xyz/1.jpg",
        "http://cdn.fengblog.xyz/11134.jpg"
      ],
      course: `
        <h4>妆前：</h4>
        <p>妆前敷了片新入的面膜, 面膜纸比较薄, 敷完了脸上水润润滴, 精华液也挺多哒, 比较保湿, 上妆也更服帖一点啦, 不会卡粉啥的。</p>

        <h4>眼影：</h4>
        <p>这次画的偏冷色系的眼妆</p>
        <p>1. 先打底</p>
        <p>2. 棕色铺眼皮晕染</p>
        <p>3. 沾少量灰色涂在双眼皮褶内晕染</p>
        <p>4. 还是刚刚的灰色, 只涂下眼尾的小三角</p>
        <image fit="cover" src="http://cdn.fengblog.xyz/makeupcourse/%E5%9B%BE%E7%89%878.png"/>
        <image fit="cover" src="http://cdn.fengblog.xyz/makeupcourse/%E5%9B%BE%E7%89%874.png"/>
        
        <h4>眼线：</h4>
        <p>还是从眼尾拖出一条</p></p>
        <p>不一样的是,要再沾取深棕色眼影在下眼皮的眼头画眼线</p>
        <image fit="cover" src="http://cdn.fengblog.xyz/makeupcourse/%E5%9B%BE%E7%89%875.png">
        </image>

        <h4>卧蚕：</h4>
        <p>记得用眉笔在卧蚕下方 描一下下</p>
        <image fit="cover" src="http://cdn.fengblog.xyz/makeupcourse/%E5%9B%BE%E7%89%877.png">
        </image>

        <h4>腮红：</h4>
        <p>今天画的是眼下腮红喔</p></p>
        <p>着重涂在眼周围一圈 画在图上啦</p>

        <h4>口红：</h4>
        <p>涂跟我们紫色腮红相配一点的</p>
        <p>果汁感满满的火龙果M503络红绣 玫红色的夏天涂玫红真的敲显白的 哇介个质地涂了hen润</p>
        <p>薄涂咬唇又hen少女~ 白皮涂了更好看~</p>
        <image fit="cover" src="http://cdn.fengblog.xyz/makeupcourse/%E5%9B%BE%E7%89%876.png">
        </image>
        
        `,
      imageUrl1: "",
      imageUrl2: "",
      tempImage: "",
      resultImage: "",
      isShowResult: false,  //控制结果组件
      fullscreenLoading: false,
      dialogImageUrl: '',
      recommendList,
      myImages
    }
  },
  computed: {
    showResultImage(){
      return this.resultImage
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
    selectImage(i){
      this.imageUrl1 = myImages[i].id
      this.course = myImages[i].course
    },
    getMergeImage(){
      this.fullscreenLoading = true
      // mergePace({
      //   api_key: "v5vCY2FcYL5hk4oucP8_7u2pgVnPYjJB",
      //   api_secret: "zHPtWAcDzd3MFObqI4ml8aevnwJ95wsV",
      //   template_url: this.imageUrl2,
      //   merge_url: this.imageUrl1
      // })
      // .then(res => {
      //   this.tempImage = res.data.result
      //   setTimeout(() => {
      //     this.resultImage = this.tempImage
      //     this.isShowResult = true
      //     this.fullscreenLoading = false
      //     this.$message.success("生成成功!")
      //     console.log(this.resultImage)
      //   },5000)
      // })
      mergePace({
        a: this.imageUrl2,
        b: this.imageUrl1
      })
      .then(res => {
        console.log(res)
        this.resultImage = res.data
        this.isShowResult = true
        this.fullscreenLoading = false
        this.$message.success("生成成功!")
        console.log(this.resultImage)
      })
    },
    /*------------------------图片上传事件-----------------------*/
    beforeUpload1(file) {
      this.qiniuData.key = uuid()
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
      this.imageUrl2 = this.upload_qiniu_addr + res.key
    },
    handleSuccess2(res, file) {
      this.imageUrl1 = this.upload_qiniu_addr + res.key
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
    },
    toUrl(href){
      window.open(href, '_blank')
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