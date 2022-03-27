<template>
  <div class="doublebind">
    <h3>名字:{{name}}</h3>
    <h2>年龄:{{age}}</h2>
    <div>
      <h3>info.a:{{info.a}}</h3>
    </div>
    <div>name的值:<input type="text" v-model="name"/></div>
    <div>info.a的值:<input type="text" v-model="info.a"/></div>
  </div>
</template>

<script>
export default {
  name: 'VuedoubleBind',
  data(){
    return{
      name:'张三',
      age:20,
      info:{
        a:'a1',
        b:'b2'
      }
    }
  }
}
</script>

<style scoped>

</style>
