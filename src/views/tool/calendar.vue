<template>
    <div class="calendar">
        <div class="head">
          <div class="previous-month"><span @click="showLastMonth()"><</span></div>
          <div class="center">{{year}}年{{month}}月{{day}}日</div>
          <div class="next-month"><span @click="showNextMonth()">></span></div>
        </div>
        <div class="content">
          <div class="week-header">
            <div v-for="item in weekday">{{item}}</div>
          </div>
          <div class="week-day">

              <div v-for="item in preDay" class="last-day">
                  {{getLastDay()-preDay+item}}
              </div>
              <div class="this-day" v-for="item in monthSize" :key="item+'this-day'">
                  {{item}}
              </div>
              <div class="next-day" v-for="item in nextDay">
                  {{item}}
              </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'calendar',
  data(){
      return{
        preDay:'',
        nextDay:'',
        monthSize:'',
        year:'',
        month:'',
        day:'',
        weekday:['日','一','二','三','四','五','六'],
        dayList:[31,28,31,30,31,30,31,31,30,31,30,31]
      }
  },
  methods:{
    getInit(){
      let time = new Date();
      this.year = time.getFullYear();
      this.month = time.getMonth()+1;
      this.day  = time.getDate();
    },
    getLastDay(){
      //本月大小
      this.monthSize = this.dayList[this.month-1];
      //本月第一天是周几
      const firstDay = new Date(`${this.year}/${this.month}/1`).getDay();
      //第一天前有几天
      this.preDay = firstDay===7?0:firstDay;
      return this.month-1===0?31:this.dayList[this.month-2];
    },
    getNextday(){
      this.monthSize = this.dayList[this.month-1];
      //最后一天是周几
      const lastDay = new Date(`${this.year}/${this.month}/${this.monthSize}`).getDay();
      this.nextDay = lastDay===7?6:6-lastDay;
    },
    //为当天增加样式
    doToday(){
        this.getElementById()
    },
    //跳转到上一个月
    showLastMonth(){
      this.month =(this.month-1)%13;
      if(this.month==0)this.month=1;
    },
    showNextMonth(){
      this.month =(this.month+1)%13;
      if(this.month==0)this.month=1;
    }
  },
  created () {
    this.getInit();
    this.getLastDay();
    this.getNextday();
  },
  updated () {

  }
}
</script>

<style scoped>
    .calendar{
      position: relative;
      width: 900px;
      height: 800px;

      margin: 0 auto;
      text-align: center;
    }
    .head{
      height: 100px;
    }
    .center{
      font-size: 30px;
      line-height: 100px;
      display: inline-block;
    }
    .previous-month{
      cursor: pointer;
      position: absolute;
      left: 20px;
      font-size: 60px;
      line-height: 100px;
      display: inline-block;
    }
    .next-month{
      cursor: pointer;
      position: absolute;
      right: 20px;
      font-size: 60px;
      line-height: 100px;
      display: inline-block;
    }
    .week-header{
      height: 120px;

    }
    .week-header div{
        font-size: 40px;
        margin: 40px;
        display: inline-block;
        text-align: center;
    }
    .week-day{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .week-day div{
      font-size: 25px;
      height: 60px;
      width: 60px;
      margin: 30px;
      text-align: center;
      line-height: 60px;
    }
    .last-day,.next-day{
      color: gray;
    }
</style>
