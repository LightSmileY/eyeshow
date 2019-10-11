<template>
  <div id="postItem">
    <li 
    class="hotPostsList-item" 
    v-for="item in 12">
      <div class="user">
        <div class="userInfo">
          <div class="avatar">
            <img src="@/assets/images/avatar.jpg">
          </div>
          <div class="name-time">
            <div class="name">浅笑半离兮</div>
            <div class="time">2019-8-12 11:48:56</div>
          </div>
        </div>
        <div class="delete" @click.stop="deletePost" v-if="oper === 1">删除</div>
        <div class="delete" @click.stop="unCollect" v-if="oper === 2">取消收藏</div>
      </div>
      <div class="postItem-main">
        <div class="image" @click="toDetailPage">
          <img src="http://tva1.sinaimg.cn/large/0060lm7Tly1g64ut8pyppj30ty0kze59.jpg" alt="">
        </div>
        <div class="desc" @click="toDetailPage">
          人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。
        </div>
      </div>
    </li>
  </div>
</template>

<script>

export default {
  name: 'index',
  data(){
    return {
      
    }
  },
  props: {
    oper: Number
  },
  methods: {
    toDetailPage(){
      this.$router.push({name:'PostDetails'});
    },
    deletePost(){
      this.$confirm('确定删除该帖子吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });          
      });
    },
    unCollect(){
      this.$confirm('确定取消收藏该帖子吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '放弃操作'
        });          
      });
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/pubComponents/postItem.scss";
</style>