import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //待办事项
    list:[],
    inputValue:'aaa',
    nextId:4 ,
    //计算器
    numberList:[
      0,1,2,3,4,5,6,7,8,9
    ],
    sum:20,
    number_1:0,
    number_2:'',
    temp:'',
    sign:'',
    //日历
    preDay:'',
    lastday:'',
    nextDay:'',
    monthSize:'',
    year:'',
    month:'',
    day:'',
    weekday:['日','一','二','三','四','五','六'],
    dayList:[31,28,31,30,31,30,31,31,30,31,30,31]
  },
  mutations: {
    //待办事项
    initlist(state,list){
        state.list = list;
    },
    setInputValue(state,value){
        state.inputValue = value;
    },
    addThing(state){
      const obj = {
        id:state.nextId,
        thing:state.inputValue.trim(),
      }
      state.list.push(obj);
      state.nextId++;
      state.inputValue='';
    },
    removeThing(state,id){
     const tmp = state.list.findIndex(x=>x.id===id);
     //不等于负一说明有东西
     if(tmp!==-1){
       //从i开始删除1项
        state.list.splice(tmp,1);
     }
    },
    changeRadio(state,obj){
      const tmp = state.list.findIndex(x=>x.id===obj.id);
      if(tmp!==-1){
        state.list[tmp].info = obj.info;
      }
    },
    clearAlldone(state){
      state.list = state.list.filter(x=>x.info===false)
    },
    //计算器
    handleInputFunc(state,index){
      if(state.sign===''){
        state.temp+=index;
        state.number_1 = Number(state.temp) ;
      }else{
        state.temp+=index;
        state.number_2 = Number(state.temp);
      }
    },
    handleDoFunc(state,sig){
      state.sign = sig;
      state.temp = '';
    },
    showResult(state){
      state.temp='';
      if(state.sign==='+'){
        state.number_1+=state.number_2;
        state.number_2 = '';
        state.sign='';
      }
      if(state.sign==='-'){
        state.number_1-=state.number_2;
        state.number_2 = '';
        state.sign='';
      }
      if(state.sign==='*'){
        state.number_1*=state.number_2;
        state.number_2 = '';
        state.sign='';
      }
      if(state.sign==='/'){
        state.number_1/=state.number_2;
        state.number_2 = '';
        state.sign='';
      }
    },
    clear(state){
      state.number_1=0;
      state.number_2='';
      state.sign='';
      state.temp = '';
    },
    //日历
    getInit(state){
      let time = new Date();
      state.year = time.getFullYear();
      state.month = time.getMonth()+1;
      state.day  = time.getDate();
    },
    getLastDay(state){
      //本月大小
      state.monthSize = state.dayList[state.month-1];
      console.log(state.monthSize)
      //本月第一天是周几
      const firstDay = new Date(`${state.year}/${state.month}/1`).getDay();
      console.log(firstDay)
      //第一天前有几天
      state.preDay = firstDay===7?0:firstDay;
      console.log(state.preDay)
      state.lastday = state.month-1===0?31:state.dayList[state.month-2];
    },
    getNextday(state){
      state.monthSize = state.dayList[state.month-1];
      //最后一天是周几
      const lastDay = new Date(`${state.year}/${state.month}/${state.monthSize}`).getDay();
      state.nextDay = lastDay===7?6:6-lastDay;
    },
    doToday(){
      this.getElementById()
    },
    showLastMonth(state){
      state.month =(state.month-1)%13;
      if(state.month==0)state.month=1;
    },
    showNextMonth(state){
      state.month =(state.month+1)%13;
      if(state.month==0)state.month=1;
    },
    //时钟
    myTime(){
      let time = new Date();
      let hh = time.getHours();
      let mm = time.getMinutes();
      let ss = time.getSeconds();
      document.getElementById('1').innerText=Math.floor(hh/10);
      document.getElementById('2').innerText=hh%10;
      document.getElementById('4').innerText=Math.floor(mm/10);
      document.getElementById('5').innerText=mm%10;
      document.getElementById('7').innerText=Math.floor(ss/10);
      document.getElementById('8').innerText=ss%10;
    }
  },
  actions: {
    getList(context){
      axios.get('/list.json').then(({data})=>{
          console.log(data);
          context.commit('initlist',data)
      })
    }
  },
  modules: {
  },
  getters:{
    //未完成的任务数量
    unDonelength(state){
      return state.list.filter(x=>x.info===false).length
    }
  }
})
