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
                  {{lastday-preDay+item}}
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
import {mapState} from 'vuex'
export default {
  name: 'calendar',
  data(){
      return{
      }
  },
  methods:{
    getInit(){
      this.$store.commit('getInit');
    },
    getLastDay(){
      this.$store.commit('getLastDay');
    },
    getNextday() {
      this.$store.commit('getNextday');
    },
    //为当天增加样式
    doToday(){
        this.$store.commit('doToday');
    },
    //跳转到上一个月
    showLastMonth(){
      this.$store.commit('showLastMonth');
    },
    showNextMonth(){
      this.$store.commit('showNextMonth');
    }
  },
  created () {
    this.getInit();
    this.getLastDay();
    this.getNextday();
  },
  updated () {

  },
  computed:{
    ...mapState(['preDay','nextDay','monthSize','year','month','day','weekday','dayList','lastday'])
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
