<template>
  <div class="left-nav">
    <ul>
        <li>
            <i class="icon iconfont icon-zhubaoshipin"></i>
            <div>收银</div>
        </li>

        <li>
            <i class="icon iconfont icon-hanbao"></i>
            <div>店铺</div>
        </li>

        <li>
            <i class="icon iconfont icon-liebiao"></i>
            <div>商品</div>
        </li>

         <li>
            <i class="icon iconfont icon-kefuyouxian"></i>
            <div>会员</div>
        </li>


        <li>
            <i class="icon iconfont icon-jisutuikuan"></i>
            <div>统计</div>
        </li>
</ul>
  </div>
</template>

<script>
export default {
  name: 'leftNav',
  data () {
    return {
    }
  }
}
</script>
<style scoped="">
.left-nav{
  width: 5%;
  float: left;
  font-size:10px;
  color:#fff;
  background-color: #1D8ce0;
}
.iconfont{
  font-size:24px;
}
.left-nav li{
   text-align: center;
   border-bottom:1px solid #20a0ff;
   padding:10px;
}
</style>
