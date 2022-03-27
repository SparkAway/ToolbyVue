<template>
  <div class="shengbei">
    <div class="header">头部</div>
    <div class="content">
        <div class="center">中间</div>
        <div class="left">左边</div>
        <div class="right">右边</div>
    </div>
    <div class="footer">尾部</div>
  </div>
</template>

<script>
export default {
  name: 'shengbeibuju'
}
</script>

<style scoped>
  .shengbei{
    min-width: 500px;
    border: 1px solid red;
    width: 100%;
    height: 100%;
  }
  .content{
    padding-left: 150px;
    padding-right: 200px;
  }
  .footer,.header{
    height: 70px;
    background-color: blue;
  }
  .footer{
    clear: both;
  }
  .left,.right,.center{
    float: left;
    min-height: 400px;
  }
  .left{
    width: 150px;
    background-color: burlywood;
    position: relative;
    margin-left: -100%;
    right: 150px;
  }
  .center{
    width: 100%;
  }
  .right{
    width: 200px;
    background-color: aqua;
    margin-right: -200px;
  }
</style>
