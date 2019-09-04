<template>
  <div id="styleMigration">
    <div class="container">
      <div class="select">
        <!-- 照片上传区 -->
        <div class="myPhoto">
          <div class="title">
            上传照片:
          </div>
          <div class="upload">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将照片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color: #fff;">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <!-- 融合图选择区 -->
        <div class="fusionPhoto">
          <div class="title">
            选择融合图:
          </div>
          <ul class="styleList">
            <li v-for="item in 8">柔和</li>
          </ul>
          <ul class="images">
            <li v-for="item in 5">
              <el-image
                :src="imageUrl"
                :fit="fill"></el-image>
            </li>
          </ul>
          <div class="pagenation">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
        <div class="submit">
          <el-button type="primary" size="small">生成眼妆</el-button>
        </div>
      </div>
      <div class="result">
        
      </div>
    </div>
  </div>
</template>

<script>
import Img from '@/assets/images/yz.jpeg'

export default {
  name: 'styleMigration',
  data(){
    return {
      imageUrl: Img
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
  @import "../../assets/scss/index/styleMigration.scss";
</style>