<template>
  <div id="myCollection">
    <post-item/>
  </div>
</template>

<script>
import PostItem from '@/components/pubComponents/postItem'

export default {
  name: 'myCollection',
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
  @import "../../../assets/scss/mine/myCollections/index.scss";
</style>