<template>
  <div class="todo">
    <div id="header">
      <input placeholder="请输入任务" class="task" :value="inputValue" @change="handleInputChange"/>
      <button id="submit" @click="submitThing">提交</button>
    </div>
    <div id="content">
      <div id="content-list">
        <ul>
          <li v-for="item in list">
            <el-checkbox v-model="item.info" class="check" @change="(e)=>{radioChange(e,item.id)}"></el-checkbox>
            {{item.thing}} <button class="delete" @click="deleteThing(item.id)">删除</button>
          </li>
        </ul>
      </div>
    </div>
    <div id="footer">
      <span>&nbsp;&nbsp;{{unDonelength}}条任务未完成</span>
      &nbsp;&nbsp;&nbsp;<span><button @click="removeAlldone()">清除已完成</button></span>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';
export default {
  name: 'todo',
  data(){
    return{
      checked:true
    }
  },
  computed:{
    ...mapState(['list','inputValue']),
    ...mapGetters(['unDonelength']),
  },
  created () {
    this.$store.dispatch('getList');
  },
  methods:{
    handleInputChange(event){
      this.$store.commit('setInputValue',event.target.value)
    },
    submitThing(){
      //trim()用来去除两端空格
      if(this.inputValue.trim().length<=0){
        return this.$message.warning('文本框内容为空!!!!');
      }
      this.$store.commit('addThing');
    },
    deleteThing(id){
      this.$store.commit('removeThing',id);
    },
    radioChange(e,id){
        const temp = {
          id: id,
          info:e
        }
        this.$store.commit('changeRadio',temp);
    },
    removeAlldone(){
      this.$store.commit('clearAlldone')
    }
  }
}
</script>

<style scoped>
  button:hover{
    border: 1px solid aqua;
    color: brown;
  }
  .todo{
    width: 400px;
    background-color: rgb(222, 225, 230);
    margin:100px auto;
  }
  #header{
    text-align: center;
    height: 76px;
    line-height: 76px;
  }
  #header input{
    margin-top: 20px;
    margin-bottom: 20px;
    height: 30px;
    width: 320px;
    outline: none;
  }
  #header input:hover{
    border:2px solid aqua;
  }
  #header button{
    height:44px;
    width: 44px;
    margin-left: 10px;
    border-radius:5px;
  }
  #content{

  }
  #footer{
    margin-top: 20px;
  }
  #content-list ul{
    list-style: none;
    padding-inline-start: 20px;
  }
  #content-list ul li{
    position: relative;
    margin-top: 14px;
    font-size: 18px;
    line-height: 38px;
  }
  .delete{
    height: 30px;
    width: 50px;
    position: absolute;
    right: 20px;
  }
  .check{
    height: 15px;
    width: 15px;
  }
</style>
