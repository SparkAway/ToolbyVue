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
export default {
  name: 'Counter',
  data(){
    return {
      sum:20,
      number_1:0,
      number_2:'',
      temp:'',
      sign:'',
      numberList:[
        0,1,2,3,4,5,6,7,8,9
      ]
    }
  },
  methods:{
    handleInputFunc(index){
      if(this.sign===''){
        this.temp+=index;
        this.number_1 = Number(this.temp) ;
      }else{
        this.temp+=index;
        this.number_2 = Number(this.temp);
      }
    },
    handleDoFunc(sig){
      this.sign = sig;
      this.temp = '';
    },
    showResult(){
      this.temp='';
      if(this.sign==='+'){
        this.number_1+=this.number_2;
        this.number_2 = '';
        this.sign='';
      }
      if(this.sign==='-'){
        this.number_1-=this.number_2;
        this.number_2 = '';
        this.sign='';
      }
      if(this.sign==='*'){
        this.number_1*=this.number_2;
        this.number_2 = '';
        this.sign='';
      }
      if(this.sign==='/'){
        this.number_1/=this.number_2;
        this.number_2 = '';
        this.sign='';
      }
    },
    clear(){
      this.number_1=0;
      this.number_2='';
      this.sign='';
      this.temp = '';
    }
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
