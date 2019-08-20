<template>
  <div id="myPosts">
    <div class="time-line">
      <el-timeline>
        <el-timeline-item 
        timestamp="2018/4/12" 
        placement="top">
          <post-list/>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/community/postList"

export default {
  name: 'myPosts',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{
    PostList
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/myPosts/index.scss";
</style>