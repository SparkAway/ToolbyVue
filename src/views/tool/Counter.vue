<template>
    <div class="counter">
        <div class="showPlace" style="text-align: center">{{number_1}}&nbsp;{{sign}}&nbsp;{{number_2}}</div>
        <ul class="doBox">
          <li><button @click="handleDoFunc('+')">+</button></li>
          <li><button @click="handleDoFunc('-')">-</button></li>
          <li><button @click="handleDoFunc('*')">*</button></li>
          <li><button @click="handleDoFunc('/')">/</button></li>
          <li><button @click="showResult">=</button></li>
          <li><button @click="clear">C</button></li>
        </ul>
        <ul class="numberBox">
          <li v-for="(item,i) in numberList" @click="handleInputFunc(i)"><button>{{item}}</button></li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {

  name: 'Counter',
  data(){
    return {
    }
  },
  methods:{
    handleInputFunc(index){
      this.$store.commit('handleInputFunc',index);
    },
    handleDoFunc(sig){
      this.$store.commit('handleDoFunc',sig);
    },
    showResult(){
     this.$store.commit('showResult');
    },
    clear(){
      this.$store.commit('clear');
    }
  },
  computed:{
    ...mapState(['numberList','number_1','number_2','sign'])
  }
}
</script>

<style scoped>
.counter{
  border: 3px solid black ;
  background-image: linear-gradient(#e66465, #9198e5,#EE82EE);
  font-family: Fantasy;
  margin: 100px auto;
  height: 400px;
  width: 400px;
  background-color: gray;
  padding: 20px;
}
.showPlace{
  overflow: hidden;
  font-size: 30px;
  line-height: 60px;
  background-color: rgb(222, 225, 230);
  height: 60px;
  width: 340px;
  margin: auto;
}
 ul{
   display: flex;
   flex-wrap: wrap;
   list-style: none;
 }
 .numberBox button{
   border-radius: 10px;
   height: 40px;
   width: 40px;
   margin: 20px;
 }
 .numberBox button:hover{
   background-color: turquoise;
 }
 .doBox button{
    height: 35px;
   width: 35px;
   margin:10px;
   border-radius: 50%;
   border: 1px solid black;
   font-size: 30px;
   line-height: 30px;
 }
 .doBox button:hover{
   background-color: turquoise;
 }
</style>
