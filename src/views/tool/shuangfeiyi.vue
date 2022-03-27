<template>
  <div class="shuangfeiyi">
      <div class="header"></div>
      <div class="container">
        <div class="center">
          <div class="content">center</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
      </div>
      <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'shuangfeiyi'
}
</script>

<style scoped>
    .shuangfeiyi{
      border: 1px solid red;
      width: 100%;
      height: 100%;
      min-width: 500px;
    }
    .center,.left,.right{
      float: left;
      min-height: 400px;
    }
    .footer,.header{
      height: 40px;
      background-color: blue;
    }
    .footer{
      clear: both;
    }
    .left{
      width: 150px;
      margin-left: -100%;
      background-color: #42b983;
    }
    .center{
      width: 100%;
    }
    .right{
      width: 200px;
      margin-left: -200px;
      background-color: #e66465;
    }
    .content{
      margin: 0 200px 0 150px;
    }
</style>
