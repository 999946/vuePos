<template>
  <div id="app">
    <!-- 左侧导航 -->
    <LeftNav></LeftNav>
    <!-- 操作区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/common/leftNav'
export default {
  name: 'app',
  components: {
    LeftNav
  }
}
</script>

<style>
#app {
  height:100%;
  padding: 0;
  margin:0;
  /*background-color: #f3ff22;*/
  overflow: auto
}
.main{
  height: 100%;
  float: right;
  background-color: #EFF2F7;
  width: 95%
}
</style>
