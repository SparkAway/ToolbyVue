<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom:10px;font-size: 12px">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人财务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>总收入:{{sumIncome}} 元</h1>
    <h1>总支出:{{sumOutcome}} 元</h1>
    <h1>剩余资金:{{sumIncome-sumOutcome}}元</h1>
    <el-card class="box-card">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item style="margin-left:0px">
          <el-button type="success" icon="el-icon-plus" @click="show1">添加</el-button>
        </el-form-item>
      </el-form>
      <!--      表格内容显示区域-->
      <el-table width="100%"
                :data="incomelist"
                max-height="390px"
                style="width: 100%">
        <!--        <el-table-column-->
        <!--          prop="id"-->
        <!--          label="#"-->
        <!--          width="50">-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="intime"
          label="收入时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="inname"
          label="收入名称"
          width="110">
        </el-table-column>
        <el-table-column
          prop="innumber"
          label="收入金额"
          width="110">
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
      <el-dialog title="添加用户" :visible.sync="editDialogVisible1" width="50%" @close="editDialogClosed">
        <!--内容主体区域-->
        <el-form :model="editForm"  ref="editFormRef" label-width="70px">
          <el-col :span="12">
            <el-form-item label="收入时间" prop="intime">
              <el-input v-model="editForm.intime" placeholder="请输入收入时间" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收入名称" prop="inname">
              <el-input v-model="editForm.inname" placeholder="请输入收入名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收入金额" prop="innumber">
              <el-input v-model="editForm.innumber" placeholder="请输入收入金额" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editIncomeInfo">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
    <el-card class="box-card2">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item style="margin-left:0px">
          <el-button type="success" icon="el-icon-plus" @click="show2">添加</el-button>
        </el-form-item>
      </el-form>
      <!--      表格内容显示区域-->
      <el-table width="100%"
                :data="outcomelist"
                max-height="390px"
                style="width: 100%">
        <!--        <el-table-column-->
        <!--          prop="id"-->
        <!--          label="#"-->
        <!--          width="50">-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="outtime"
          label="支出时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="outname"
          label="支出名字"
          width="110">
        </el-table-column>
        <el-table-column
          prop="outnumber"
          label="支出金额"
          width="110">
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
      <el-dialog title="添加用户" :visible.sync="editDialogVisible2" width="50%" @close="editDialogClosed">
        <!--内容主体区域-->
        <el-form :model="editForm2"  ref="editFormRef" label-width="70px">
          <el-col :span="12">
            <el-form-item label="支出时间" prop="outtime">
              <el-input v-model="editForm2.outtime" placeholder="请输入支出时间" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支出名字" prop="outname">
              <el-input v-model="editForm2.outname" placeholder="请输入支出名字" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="支出金额" prop="outnumber">
              <el-input v-model="editForm2.outnumber" placeholder="请输入支出金额" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"@click="editOutcomeInfo">确定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { delTbUser, findUserList, saveTbUser, updateTbUser } from '@/api/TbUsers'
import UserAdd from '@/views/user/UserAdd'
import { delBeiwang, findbeiwang, saveBeiwang } from '@/api/TbBeiwang'
import { findIncomeCount, getIncome, saveIncome } from '@/api/Income'
import { findOutcomeCount, getOutcome, saveOutcome } from '@/api/Outcome'
import { findNoteCount } from '@/api/TbNote'

export default {
  name: 'caiwu',
  components: { UserAdd },
  data() {
    return {
      // 修改用户信息的表单数据
      editForm: {
        intime:'',
        inname:'',
        innumber:''
      },
      editForm2:{
        outtime:'',
        outname:'',
        outnumber:''
      },
      editDialogVisible1: false ,// 控制修改用户信息对话框是否显示
      editDialogVisible2: false ,
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
      //当前页码
      current:1,
      //每页显示条数
      pageSize:6,
      //总条数
      total:100,
      //总收入
      sumIncome:'',
      sumOutcome:'',
      incomelist:[],
      outcomelist:[],
      addOrUpdateVisible: false
    }
  },
  created () {
    this.getIncomelist();
    this.getOutcomelist();
    this.getIncomeCount();
    this.getOutcomeCount();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    // 监听 修改用户信息对话框的关闭事件
    editDialogClosed() {
      // 表单内容重置为空
      this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
    },
    // 点击按钮添加用户信息
    //添加用户
    async editIncomeInfo(){
      const { data: res }=await saveIncome(this.editForm);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'用户添加成功',
        })
        //关闭
        this.editDialogVisible1 = false;
        await this.getIncomeCount();
        await this.getOutcomeCount();
        await this.getIncomelist();
      }else{
        return this.$message.error('用户添加失败'+res.message);
      }
    },
    async editOutcomeInfo(){
      const { data: res }=await saveOutcome(this.editForm2);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'支出添加成功',
        })
        //关闭
        this.editDialogVisible2 = false;
        await this.getIncomeCount();
        await this.getOutcomeCount();
        await this.getOutcomelist();
      }else{
        return this.$message.error('支出添加失败'+res.message);
      }
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      this.getIncomelist();
    },
    //当前页码改变的时候
    handleCurrentChange(val) {
      this.current = val;
      this.getIncomelist();
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    show1(){
      this.editDialogVisible1 = true
    },
    show2(){
      this.editDialogVisible2=true;
    },
    async getIncomelist(){
      const {data} = await getIncome(this.current,this.size);
      this.incomelist = data.data.record;
      console.log(this.incomelist);
      console.log(data);
    },
    async getOutcomelist(){
      const {data} = await getOutcome(this.current,this.size);
      this.outcomelist = data.data.record;
      console.log(this.outcomelist);
      console.log(data);
    },
    async getIncomeCount(){
      const {data} = await findIncomeCount();
       this.sumIncome = data.data.incomes[0].incomeCount;
       console.log(data);
      console.log(this.sumIncome);
    },
    async getOutcomeCount(){
      const {data} = await findOutcomeCount();
      this.sumOutcome = data.data.outcomes[0].outcomeCount;
      console.log(data);
      console.log(this.sumOutcome);
    }
  }

}
</script>

<style scoped>

</style>
