<template>
  <div id="guessYouLike">
    <div class="title">
      猜你喜欢
    </div>
    <div class="items">
      <dl class="cos">
        <dt class="cosImage">
          <img src="http://pymhh35l8.bkt.clouddn.com/216dd8a5-4e29-4d16-8a49-edac094db477TB2E90jy4SYBuNjSsphXXbGvVXa_!!595061016.jpg">
        </dt>
        <dd class="cosName">
          卡拉泡泡少女系眼影盘日落盘
        </dd>
      </dl>
      <dl class="cos">
        <dt class="cosImage">
          <img src="http://pymhh35l8.bkt.clouddn.com/0c6ccb89-51fa-4234-9bcb-deccde01bde9图片7.png">
        </dt>
        <dd class="cosName">
          完美日记光影星河九色眼影
        </dd>
      </dl>
      <dl class="cos">
        <dt class="cosImage">
          <img src="http://pymhh35l8.bkt.clouddn.com/4c874e42-9126-4037-aa0a-7245fcfe5188TB2BQ_urRjTBKNjSZFDXXbVgVXa_!!2253486272.jpg">
        </dt>
        <dd class="cosName">
          单色眼影盘鼻影哑光大地
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
  border: 1px solid #E5E5E5;
  border-bottom: 0;

  .title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #E5E5E5;
    font-weight: bold;
    background-color: #FFDEDE;
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
        font-size: 14px;
        border-bottom: 1px solid #D1D1D1;
        color: #426DC6;
        cursor: pointer;
      }
    }
  }
}
</style>