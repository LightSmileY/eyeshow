<template>
  <ul id="postList">
    <li 
    class="postList-li" 
    v-for="(item,index) in arrayList">
      <div class="user">
        <div class="userInfo">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="name-time">
            <div class="name">{{item.nickname}}</div>
            <div class="time">{{item.time}}</div>
          </div>
        </div>
        <div class="attent">
          <el-button size="mini" type="primary">{{isAttent(item.attent)}}</el-button>
        </div>
      </div>
      <div class="message" v-if="item.code == '1'">点赞了我的帖子</div>
      <div class="message" v-else-if="item.code == '2'">收藏了我的帖子</div>
      <div class="message" v-else-if="item.code == '3'">转发了我的帖子</div>
      <div class="message" v-else-if="item.code == '4'">评论：{{item.comment}}</div>
      <div class="message" v-else>回复：{{item.comment}}</div>
      <div @click="toDetailPage(item.pid)" title="查看原帖" class="pforward">
        <div class="body">
          <p class="ptitle">#{{item.title}}#</p>
          <!-- <a @click.stop :href="item.content" target="_blank" title="查看商品详情">
            商品链接
          </a> -->
          <p>{{item.content}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'postList',
  data(){
    return {
      
    }
  },
  props: {
    arrayList: Array
  },
  computed: {
    isAttent(i){
      return i => i ? "已关注" : "关注TA"
    }
  },
  methods: {
    // 去帖子详情页
    toDetailPage(i){
      this.$router.push({
        name:'PostDetails',
        query: { id: i }
      })
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/community/messageList.scss";
</style>