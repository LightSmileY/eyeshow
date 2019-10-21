<template>
  <div id="g-footer">
    <el-row> 
      <el-col :span="24">
        <div class="footer">
          <p class="copyright">Copyright © 2019 fengblog.xyz/eyetouch. All rights reserved.</p>
          <a href="http://beian.miit.gov.cn"><p class="filing">滇ICP备19007510号</p></a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'g-footer',
  data(){
    return {

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
  @import "../../assets/scss/footer/footer.scss";
</style>