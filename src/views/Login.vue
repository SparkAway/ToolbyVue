<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avator_box">
                <img src="../assets/img/wench.png">
            </div>
            <!--表单-->
          <el-form ref="loginform" :model="loginform" :rules="loginRules" label-width="0px" class="login_Form">
            <el-form-item  prop="user">
              <el-input v-model="loginform.user" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item  prop="pwd">
              <el-input v-model="loginform.pwd" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item class="login_btn">
              <el-button @click="submitForm('loginform')" >立即登录</el-button>
              <el-button @click="resetForm('loginform')" >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginform: {
        username:'',
        password:''
      },
      loginRules:{
        user:[
          {required:true ,message:'请输入用户名',trigger:'blur'},
          {min:5,max:13,message: '长度在5到13个字符之间',trigger: 'blur'}
        ],
        pwd:[
          {required:true ,message:'请输入登录密码',trigger:'blur'},
          {min:6,max:11,message: '长度在7到11个字符之间',trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.user=this.loginform.user
      this.pwd=this.loginform.pwd
      this.$refs.loginform.validate(valid => {
        if (valid) {
          this.$store.dispatch('getLogin')
        } else {
          console.log("用户名或密码错误");
        }
      });
    },
    resetForm(forName){
      this.$refs[forName].resetFields();
    },
  },
  computed:{
    user: {
      get() {
        return this.$store.state.loginform.user;
      },
      set(newVal) {
        this.$store.commit('setUser', newVal);
      }
    },
    pwd: {
      get() {
        return this.$store.state.loginform.pwd;
      },
      set(newVal) {
        this.$store.commit("setPwd", newVal);
      }
    },
  }

}
</script>

<style lang="less" scoped>
  .login_container{
    height: 100%;
  }
  .login_box{
    width:450px;
    height: 300px;
    background-color:rgba(248,248,255,0.5);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avator_box{
    color: yellow;
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    margin: -65px auto;
    background-color: #FFFFFF;
  }
  img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .login_Form{
    position: absolute;
    bottom: 15px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
    .login_btn{
      display: flex;
      justify-content: center;
    }
  }
</style>
