<template>
  <div class="child">
      <h3>我是儿子</h3>
      <div>{{mes}}</div>
      <div>{{data}}</div>
      <button v-on:click='btnClick("Yes")'>点我让父亲说好</button>&nbsp;
      <button v-on:click='btnClick("No")'>点我让父亲说不好</button>
      <div><button @click="parentMethod">点我调用$parent</button></div>
  </div>
</template>

<script>
export default {
  name: 'child',
  props:[
    "mes",
    "data"
  ],
  methods:{
    btnClick(param) {
      this.$emit('say', param);
      console.log('1')
    },
    parentMethod(){
      this.$parent.Say("第二种子传父");
    }
  }
}
</script>

<style scoped>
    .child{
      width: 300px;
      height: 300px;
      border: 1px solid blue;
      margin: auto;
    }
</style>
