<template>
  <div id="myLikes">
    <post-item/>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'

export default {
  name: 'myLikes',
  data(){
    return {

    }
  },
  methods: {

  },
  components:{
    PostItem
  },
  beforeMount(){

  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/myLikes/index.scss";
</style>