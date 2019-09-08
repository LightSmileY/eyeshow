<template>
  <div id="guessYouLike">
    <div class="title">
      猜你喜欢
    </div>
    <div class="items">
      <dl class="cos" v-for="item in 3">
        <dt class="cosImage">
          <img src="@/assets/images/bg1.jpg">
        </dt>
        <dd class="cosName">
          精致的眼线笔
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar2',
  data(){
    return {

    }
  },
  methods: {

  }
};
</script>

<style lang="scss">
#guessYouLike{
  background-color: #fff;
  border-radius: 2px;

  .title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #8E8E8E;
    font-weight: bold;
  }

  .items{
    
    .cos{
      
      .cosImage{
        box-sizing: border-box;
        padding: 5px;
        img{
          width: 100%;
          height: 125px;
        }
      }

      .cosName{
        height: 30px;
        line-height: 25px;
        text-align: center;
        font-size: 17px;
        border-bottom: 1px solid #B7B7B7;
      }
    }
  }
}
</style>