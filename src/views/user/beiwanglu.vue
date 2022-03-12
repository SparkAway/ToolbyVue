<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom:10px;font-size: 12px">
      <el-breadcrumb-item :to="{ path: '/Main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>备忘录信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    用户列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="tbUserVO" class="demo-form-inline">
        <el-form-item style="margin-left:0px">
          <el-button type="success" icon="el-icon-plus" @click="show">添加</el-button>
        </el-form-item>
      </el-form>
      <!--      表格内容显示区域-->
      <el-table width="100%"
                :data="beiwanglist"
                max-height="390px"
                style="width: 100%">
        <!--        <el-table-column-->
        <!--          prop="id"-->
        <!--          label="#"-->
        <!--          width="50">-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="time"
          label="时间"
          width="110">
        </el-table-column>
        <el-table-column
          prop="place"
          label="地点"
          width="110">
        </el-table-column>
        <el-table-column
          prop="item"
          label="事件"
          width="110">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete"@click="delwang(scope.row.id)"></el-button>
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
      <el-dialog title="添加用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!--内容主体区域-->
        <el-form :model="editForm"  ref="editFormRef" label-width="70px">
          <el-col :span="12">
            <el-form-item label="时间" prop="time">
              <el-input v-model="editForm.time" placeholder="请输入时间" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地点" prop="place">
              <el-input v-model="editForm.place" placeholder="请输入地点" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事件" prop="item">
              <el-input v-model="editForm.item" placeholder="请输入事件" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBeiwangInfo">确 定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { delTbUser, findUserList, saveTbUser, updateTbUser } from '@/api/TbUsers'
import UserAdd from '@/views/user/UserAdd'
import { delBeiwang, findbeiwang, saveBeiwang } from '@/api/TbBeiwang'

export default {
  name: 'beiwanglu',
  components: { UserAdd },
  data() {
    return {
      // 修改用户信息的表单数据
      editForm: {
        time:'',
        item:'',
        place:''
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
      //当前页码
      current:1,
      //每页显示条数
      pageSize:6,
      //总条数
      total:100,
      beiwanglist:[],
      addOrUpdateVisible: false
    }
  },
  created () {
    this.getBeiwanglist();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    async delwang(id){
      const confirmResult = await this.$confirm('此操作将永远删除此条备忘录，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).catch(err=>err)
      if(confirmResult!='confirm') return this.$message.info('取消了删除');
      const { data: res }=await delBeiwang(id);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'删除生成',
        })
        //关闭
        this.$emit('changeShow','false')
        await this.getBeiwanglist();
      }else{
        return this.$message.error('用户添加失败'+res.message);
      }
    },
    // 监听 修改用户信息对话框的关闭事件
    editDialogClosed() {
      // 表单内容重置为空
      this.$refs.editFormRef.resetFields() // 通过ref引用调用resetFields方法
    },
    // 点击按钮添加用户信息
    //添加用户
    async editBeiwangInfo(){
      const { data: res }=await saveBeiwang(this.editForm);
      if(res.code == 2000){
        this.$notify.success({
          title:'操作成功',
          message:'用户添加成功',
        })
        //关闭
        this.editDialogVisible = false;
        await this.getBeiwanglist();
      }else{
        return this.$message.error('用户添加失败'+res.message);
      }
    },
    //当每页条数改变的时候
    handleSizeChange(val) {
      this.size = val;
      this.getBeiwanglist();
    },
    //当前页码改变的时候
    handleCurrentChange(val) {
      this.current = val;
      this.getBeiwanglist();
    },
    // 按钮点击事件 显示新增编辑弹窗组件
    show(){
      this.editDialogVisible = true
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data){
      if(data === 'false'){
        this.addOrUpdateVisible = false
        this.addOrUpdateVisible = true
      }
    },
    async getBeiwanglist(){
      const {data} = await findbeiwang(this.current,this.size);
      this.beiwanglist = data.data.record;
      console.log(this.beiwanglist);
      console.log(data);
    },
  }

}
</script>

<style scoped>

</style>
