<template>
  <div id="postItem">
    <li 
    class="hotPostsList-item" 
    v-for="(item,index) in arrayList">
      <div class="user">
        <div class="userInfo">
          <div class="avatar">
            <img :src="item.avatarUrl">
          </div>
          <div class="name-time">
            <div class="name">{{item.nickname}}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
        <div class="delete" @click.stop="deletePost" v-if="oper == '1' && $store.state.viewUserId == $store.state.userInfo.id">删除</div>
        <div class="delete" @click.stop="unCollect" v-if="oper == '2' && $store.state.viewUserId == $store.state.userInfo.id">取消收藏</div>
      </div>
      <div class="postItem-main">
        <div class="image" @click="toDetailPage(item.pid)">
          <el-image
          :src="item.images[0]"
          lazy
          fit="cover"
          v-if="item.images[0]"></el-image>
          <el-image
          :src="defaultImage"
          lazy
          fit="cover"
          v-else></el-image>
        </div>
        <div class="desc" @click="toDetailPage(item.pid)">
          <div class="ptitle">#{{item.title}}#</div>
          <div>{{item.content}}</div>
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
      defaultImage: "http://pymhh35l8.bkt.clouddn.com/default/13.jpg"
    }
  },
  props: {
    oper: Number,
    arrayList: Array,
    userObj: Object
  },
  methods: {
    toDetailPage(i){
      this.$router.push({
        name:'PostDetails',
        query: { id: i }
      })
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