<template>
    <div class="clock">
      <div class="center">
        <p id="1"></p>
        <p id="2"></p>
        <p id="3">:</p>
        <p id="4"></p>
        <p id="5"></p>
        <p id="6">:</p>
        <p id="7"></p>
        <p id="8"></p>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Colock',
  methods:{
    myTime() {
      this.$store.commit('myTime');
    }
  },
  mounted () {
    setInterval(this.myTime,1000);
  }
}
</script>

<style scoped>
    .clock{
      width: 100%;
      height: 100%;
      background-color: black;
      color: white;


    }
    .center{
     position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-35%,-45%);
      background: linear-gradient(to top, #000, #262626);
    }

    .clock p{
      width: 70px;
      float: left;
      font-size: 100px;
      text-align: center;
    }
</style>
