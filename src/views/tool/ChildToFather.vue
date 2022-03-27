<template>
    <div class="father">
        <h1>我是父亲</h1>
        <child mes="我是父亲传过来的" :data="tc" v-on:say="Say"></child>
        <div>val:{{val}}</div>
    </div>
</template>

<script>
import Child from './child'
export default {
  name: 'ChildToFather',
  components: { Child },
  data(){
    return{
      tc:"我是父亲传来的数据",
      val:"default",
    }
  },
  methods:{
    Say(val){
      this.val=val;
    }
  }

}
</script>

<style scoped>
  .father{
    border: 1px solid red;
    width: 400px;
    height: 400px;
    margin: 100px auto;
    text-align: center;
  }
</style>
