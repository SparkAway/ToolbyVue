<template>
  <div>
<!--    面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom:10px;font-size: 12px">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>通讯录信息管理</el-breadcrumb-item>
    </el-breadcrumb>
<!--    用户列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="tbUserVO" class="demo-form-inline">
        <el-form-item label="备注" label-width="70px">
        <el-select v-model="tbUserVO.noteid" placeholder="请选择">
          <el-option
            v-for="item in notes"
            :key="item.id"
            :label="item.notename"
            :value="item.id">
            <span style="float: left">{{ item.notename }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
             <span class="el-tag el-tag--success el-tag--mini el-tag--plain">{{ item.noteCount }}</span></span>
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="姓名" label-width="70px">
          <el-input clearable v-model="tbUserVO.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px">
          <el-input clearable v-model="tbUserVO.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label-width="70px">
          <el-radio v-model="tbUserVO.sex" label="0">男</el-radio>
          <el-radio v-model="tbUserVO.sex" label="1">女</el-radio>
          <el-radio v-model="tbUserVO.sex">无</el-radio>
        </el-form-item>
        <el-form-item label="电话" label-width="70px">
          <el-input clearable v-model="tbUserVO.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="工作地点" label-width="70px">
          <el-input clearable v-model="tbUserVO.workplace" placeholder="请输入工作地点"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="70px">
          <el-input clearable v-model="tbUserVO.city" placeholder="请输入城市"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 837px">

          <el-button type="primary" icon="el-icon-search"  @click="getUserlist">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="show">添加</el-button>
          <el-button type="primary" icon="el-icon-refresh"@click="resetTbUserVO">重置</el-button>
        </el-form-item>
      </el-form>
<!--      表格内容显示区域-->
      <el-table width="100%"
        :data="userList"
        max-height="390px"
        style="width: 100%">
<!--        <el-table-column-->
<!--          prop="id"-->
<!--          label="#"-->
<!--          width="50">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="name"
          label="联系人"
          width="110">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="70">
          <template slot-scope="scope">
            {{scope.row.sex==0?'男':(scope.row.sex==1?'女':'保密')}}
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="workplace"
          label="工作地点"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="100">
        </el-table-column>
        <el-table-column
          prop="notename"
          label="备注"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"@click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"@click="delman(scope.row.id)"></el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[6, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!--内容主体区域-->
        <el-form :model="editForm"  ref="editFormRef" label-width="70px">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" placeholder="请输入姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="editForm.sex" size="mini">
                <el-radio-button v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                                 :disabled="item.disabled" border>{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工作地点" prop="workplace">
              <el-input v-model="editForm.workplace" placeholder="请输入工作地点工作地点" clearable
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="editForm.phone" placeholder="请输入电话" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="city">
              <el-input v-model="editForm.city" placeholder="请输入城市" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="noteid">
              <el-select v-model="editForm.noteid" placeholder="请选择备注" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in notenameOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
      </el-dialog>
      <UserAdd :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></UserAdd>
    </el-card>
  </div>
</template>

<script>
import { delTbUser, findUserList, saveTbUser, updateTbUser } from '@/api/TbUsers'
import {findNoteCount } from '@/api/TbNote'
import UserAdd from '@/views/user/UserAdd'

export default {
  name: 'Users',
  components: { UserAdd },
  data() {
    return {
      // 修改用户信息的表单数据
      editForm: {
        name: '',
        sex: '',
        workplace: '',
        email: '',
        phone: '',
        city: '',
        noteid:''
      },
      editDialogVisible: false ,// 控制修改用户信息对话框是否显示
      tbUserVO: {
        id:'',
        name:'',
        sex:'',
        birth:'',
        noteid:'',
        email:'',
        phone:'',
        workplace:'',
        city:''
      },
      rules:{ name: [{
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
        }],},
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
      //当前页码
      current:1,
      //每页显示条数
      pageSize:6,
      //总条数
      total:100,
      //用户集合
      userList:[],
      //备注集合
      notes:[],
      addOrUpdateVisible: false
    }
  },
  created () {
    this.getUserlist();
    this.getNoteCount();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    async delman(id){
      const confirmResult = await this.$confirm('此操作将永远删除此条通讯录，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).catch(err=>err)
      if(confirmResult!='confirm') return this.$message.info('取消了删除');
      const { data: res }=await delTbUser(id);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'删除生成',
        })
        //关闭
        this.$emit('changeShow','false')
        this.tbUser = {}
        await this.getUserlist();
        await this.getNoteCount();
      }else{
        return this.$message.error('用户添加失败'+res.message);
      }
    },
    // 监听 修改用户信息对话框的关闭事件
    editDialogClosed() {
      // 表单内容重置为空
      this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
    },
    // 点击按钮 修改用户信息
    async editUserInfo() {
      const { data: res } = await updateTbUser(this.editForm);
      console.log("1");
      console.log(res);
      if (res.code == 2000) {
        this.$notify.success({
          title: '操作成功',
          message: '修改成功',
        })
        //关闭
        this.editDialogVisible = false;
        await this.getUserlist();
        await this.getNoteCount();

      }else{
        return this.$message.error('用户修改失败'+res.message);
      }
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
     this.size = val;
     this.getUserlist();
    },
    //当前页码改变的时候
    handleCurrentChange(val) {
      this.current = val;
      this.getUserlist();
    },
    //重置
    resetTbUserVO(){
      this.tbUserVO.name ='';
      this.tbUserVO.email='';
      this.tbUserVO.phone='';
      this.tbUserVO.sex='';
      this.tbUserVO.noteid='';
      this.workplace='';
      this.city='';
      this.getUserlist();
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    show(){
      this.addOrUpdateVisible = true
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data){
      if(data === 'false') {
        this.addOrUpdateVisible = false
      }else{
        this.addOrUpdateVisible = true
      }
    },
    //显示修改
    showEditDialog(userinfo) {
      this.editDialogVisible = true
      console.log(userinfo);
      this.editForm = userinfo;
    },
    async getUserlist(){
      console.log(this.tbUserVO.id);
      const {data} = await findUserList(this.current,this.size,this.tbUserVO);
      this.userList = data.data.record;
      console.log(data);
    },
    async getNoteCount(){
      const {data} = await findNoteCount();
      this.notes = data.data.notes;
      console.log(data);
    }
  }

}
</script>

<style scoped>

</style>
