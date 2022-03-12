<template>
  <div>
    <el-dialog v-bind="$attrs" :visible.sync="showDialog" v-on="$listeners" @open="onOpen" @close="onClose" title="添加联系人">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="tbUser" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="tbUser.name" placeholder="请输入姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="tbUser.sex" size="mini">
                <el-radio-button v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                  :disabled="item.disabled" border>{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工作地点" prop="workplace">
              <el-input v-model="tbUser.workplace" placeholder="请输入工作地点工作地点" clearable
                :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="tbUser.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="tbUser.phone" placeholder="请输入电话" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="city">
              <el-input v-model="tbUser.city" placeholder="请输入城市" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="noteid">
              <el-select v-model="tbUser.noteid" placeholder="请选择备注" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in notenameOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {saveTbUser} from '@/api/TbUsers'
export default {
  inheritAttrs: false,
  components: {},
  props:{
    addOrUpdateVisible:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tbUser: {
        name: '',
        sex: '',
        workplace: '',
        email: '',
        phone: '',
        city: '',
        noteid:'',
        value: '',
      },
      // 控制弹出框显示隐藏
      showDialog:false,
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        sex: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        workplace: [{
          required: true,
          message: '请输入工作地点工作地点',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入电话',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: '请输入城市',
          trigger: 'blur'
        }],
        notename: [{
          required: true,
          message: '请选择备注',
          trigger: 'change'
        }],
      },
      sexOptions: [{
        "label": "男",
        "value": 0
      }, {
        "label": "女",
        "value": 1
      }],
      notenameOptions: [{
        "label": "老家的",
        "value": 1
      }, {
        "label": "大学",
        "value": 2
      }, {
        "label": "中学",
        "value": 3
      }, {
        "label": "工作",
        "value": 4
      }, {
        "label": "小学",
        "value": 5
      }],
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch:{
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible(oldVal,newVal){
      this.showDialog = this.addOrUpdateVisible
    },
  },
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields();
      this.$emit('changeShow', 'false');
    },
    close() {
      this.$emit('update:visible', false);
      this.$emit('changeShow', 'false');
    },
    handelConfirm() {
      console.log("提交");
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        console.log(this.tbUser);
        this.addTbUser();
      })
    },
    //添加用户
    async addTbUser(){
      const { data: res }=await saveTbUser(this.tbUser);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'用户添加成功',
        })
        //关闭
        this.$emit('changeShow','false')
        this.tbUser = {}
        this.$emit('getUserlist');
        this.$emit('getNoteCount');
      }else{
        return tihs.$message.error('用户添加失败'+res.message);
      }
    },
    handleClose(){
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow','false')
    }
  }
}

</script>
<style>
</style>
