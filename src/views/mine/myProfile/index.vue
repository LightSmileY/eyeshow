<template>
  <div id="detail">
    <div class="title">我的资料</div>
    <div class="myProfile-box">
      <div class="myProfile-main">
        <ul class="myProfile-main-ul">
          <li>
            <div class="item-name">用户名</div>
            <div class="item-body">
              <div>
                {{userInfo.login_name}}
                <el-button plain size="mini"
                 v-if="isMe">修改密码</el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="item-name">昵称</div>
            <div 
            class="item-body"
            v-if="isMe">
              <el-input 
              v-model="userInfo.nickname" 
              size="small"></el-input>
            </div>
            <div 
            class="item-body"
            v-else>
              {{userInfo.nickname}}
            </div>
          </li>
          <li>
            <div class="item-name">性别</div>
            <div class="item-body" v-if="isMe">
              <el-radio v-model="userInfo.sex" label="1">男</el-radio>
              <el-radio v-model="userInfo.sex" label="2">女</el-radio>
            </div>
            <div class="item-body" v-else>
              {{userInfo.sex == 1 ? "男" : "女"}}
            </div>
          </li>
          <li>
            <div class="item-name">邮箱</div>
            <div class="item-body" v-if="isMe">
              <el-input v-model="userInfo.mailbox" size="small"></el-input>
            </div>
            <div class="item-body" v-else>
              {{userInfo.mailbox}}
            </div>
          </li>
          <li>
            <div class="item-name">生日</div>
            <div class="item-body" v-if="isMe">
              <el-date-picker
                v-model="userInfo.birthday"
                type="date"
                :placeholder="userInfo.birthday">
              </el-date-picker>
            </div>
            <div class="item-body" v-else>
              {{userInfo.birthday}}
            </div>
          </li>
          <li>
            <div class="item-name">个性签名</div>
            <div class="item-body" v-if="isMe">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="userInfo.profile">
              </el-input>
            </div>
            <div class="item-body" v-else>
              {{userInfo.profile}}
            </div>
          </li>
        </ul>
      </div>
      <div class="submit" v-if="isMe">
        <el-button type="primary" size="small" @click="updateInfo">修改资料</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'

export default {
  name: 'myProfile',
  data(){
    return {
      userInfo: {}
    }
  },
  computed: {
    isMe(){
      return this.$route.query.id == this.$store.state.userInfo.id
    }
  },
  methods: {
    getInfo(){
      getUserInfo({ user_ID: this.$route.query.id})
      .then(res => {
        this.userInfo = res.data.detailMsg.data[0]
      })
    },
    updateInfo(){
      updateUserInfo(this.userInfo)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        this.$store.dispatch('getUserInfo', JSON.parse(this.userInfo))
      })
    }
  },
  created(){
    this.getInfo()
  },
  beforeMount(){
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss">
  @import "../../../assets/scss/mine/detail.scss";
</style>