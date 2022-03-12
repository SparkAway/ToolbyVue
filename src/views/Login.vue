<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像-->
            <div class="avator_box">
                <img src="../assets/img/wench.png">
            </div>
            <!--表单-->
          <el-form ref="loginform" :model="loginform" :rules="loginRules" label-width="0px" class="login_Form">
            <el-form-item  prop="username">
              <el-input v-model="loginform.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input v-model="loginform.password" prefix-icon="el-icon-lock"></el-input>
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
        username:[
          {required:true ,message:'请输入用户名',trigger:'blur'},
          {min:3,max:5,message: '长度在3到5个字符之间',trigger: 'blur'}
        ],
        password:[
          {required:true ,message:'请输入登录密码',trigger:'blur'},
          {min:3,max:5,message: '长度在3到5个字符之间',trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid)=>{
        if(valid){
          console.log(valid);
          this.$router.push("/Main");
        }else{
          console.log('login failed');
          return false
        }
      })
    },
    resetForm(forName){
      this.$refs[forName].resetFields();
    }

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
