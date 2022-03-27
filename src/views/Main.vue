<template>
  <el-container class="main_container">
    <!--头部布局-->
    <el-header>
      <!--logo和项目名称-->
      <div class="left_box">
        <img src="../assets/img/wench.png">
        <span>个人信息管理系统</span>
      </div>
      <!--用户登录展示的头像-->
      <div class="right_box">
        <el-dropdown>
          <img src="../assets/img/wench.png">

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-house">系统首页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-ship">交流讨论</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse?'64px':'200px'">
        <!--展开/收起-->
        <div class="toggle_box" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="darkcyan"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :default-active="activePath"
          :collapse-transition="false"
          :unique-opened="true"
          :router="true">
          <MenuTree :menuList="MenuList"></MenuTree>
        </el-menu>
      </el-aside>
      <el-main>
        <!--路由视图-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import MenuTree from '../components/MenuTree'
  export default {
    name: 'Main',
    data () {
      return {
        isCollapse: false,
        activePath: '',
        MenuList: [
          {
            "id": 1,
            "parentId": 0,
            "menuName": "信息管理",
            "url": "",
            "icon": "el-icon-s-order",
            "orderNum": 1,
            "open": 1,
            "disabled": false,
            "perms": null,
            "type": 0,
            "children": [
              {
                "id": 11,
                "parentId": 1,
                "menuName": "通讯录信息管理",
                "url": "/users",
                "icon": "el-icon-user",
                "orderNum": 2,
                "open": 0,
                "disabled": false,
                "perms": "users",
                "type": 0,
                "children": []
              },
              {
                "id": 12,
                "parentId": 1,
                "menuName": "备忘录信息管理",
                "url": "/beiwanglu",
                "icon": "el-icon-document",
                "orderNum": 1,
                "open": 0,
                "disabled": false,
                "perms": "welcome:view",
                "type": 0,
                "children": []
              },
              {
                "id": 13,
                "parentId": 1,
                "menuName": "个人财务管理",
                "url": "/caiwu",
                "icon": "el-icon-picture-outline",
                "orderNum": 2,
                "open": 1,
                "disabled": false,
                "perms": "",
                "type": 0,
                "children": []
              }

            ]
          },
          {
            "id": 2,
            "parentId": 0,
            "menuName": "杂项",
            "url": null,
            "icon": "el-icon-menu",
            "orderNum": 2,
            "open": 0,
            "disabled": false,
            "perms": null,
            "type": 0,
            "children": [
              {
                "id": 21,
                "parentId": 2,
                "menuName": "工具",
                "url": "",
                "icon": "el-icon-s-tools",
                "orderNum": 1,
                "open": 1,
                "disabled": false,
                "perms": "el-icon-date",
                "type": 0,
                "children": [
                  {
                    "id": 211,
                    "parentId": 21,
                    "menuName": "计算器",
                    "url": "/counter",
                    "icon": "el-icon-edit-outline",
                    "orderNum": 1,
                    "open": 1,
                    "disabled": false,
                    "perms": "el-icon-date",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 212,
                    "parentId": 21,
                    "menuName": "时钟",
                    "url": "/clock",
                    "icon": "el-icon-time",
                    "orderNum": 2,
                    "open": 0,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 213,
                    "parentId": 21,
                    "menuName": "日历",
                    "url": "/calendar",
                    "icon": "el-icon-date",
                    "orderNum": 2,
                    "open": 0,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 214,
                    "parentId": 21,
                    "menuName": "待办事项",
                    "url": "/todo",
                    "icon": "el-icon-tickets",
                    "orderNum": 2,
                    "open": 1,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 215,
                    "parentId": 21,
                    "menuName": "父子组件传值",
                    "url": "/childtofather",
                    "icon": "el-icon-tickets",
                    "orderNum": 5,
                    "open": 1,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 216,
                    "parentId": 21,
                    "menuName": "双向绑定",
                    "url": "/vuedoublebind",
                    "icon": "el-icon-tickets",
                    "orderNum": 5,
                    "open": 1,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 217,
                    "parentId": 21,
                    "menuName": "圣杯布局",
                    "url": "/shengbei",
                    "icon": "el-icon-tickets",
                    "orderNum": 5,
                    "open": 1,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                  {
                    "id": 218,
                    "parentId": 21,
                    "menuName": "双飞翼布局",
                    "url": "/shuangfeiyi",
                    "icon": "el-icon-tickets",
                    "orderNum": 5,
                    "open": 1,
                    "disabled": false,
                    "perms": "",
                    "type": 0,
                    "children": []
                  },
                ]
              }


            ]
          }
        ]
      }
    },
    components: {
      MenuTree
    },
    methods: {
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      loginOut(){
        this.$store.dispatch('loginOut')
      },
      loginOut1(){
        console.log('点击了退出')
      }
    },

  }
</script>

<style lang="less" scoped>
  /*设置整个容器的高度*/
  .main_container {
    height: 100%;
  }

  /*头部布局*/
  .el-header {
    background-color:darkcyan;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #FFFFFF;
    align-items: center;
    font-size: 20px;

    /*左边logo和标题*/

    .left_box {
      display: flex;
      align-items: center;

      /*logo*/

      img {
        width: 60px;
        height: 60px;
        margin: 0px 0px 10px 15px;
      }

      /*标题*/

      span {
        margin-left: 15px;
      }
    }

    /*右边的登录头像*/

    .right_box {
      .el-dropdown > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #FFFFFF;
        margin: 0px 15px 0px 0px;
        background-size: contain;
      }
    }
  }

  /*侧边栏*/
  .el-aside {
    background-color:darkgray;

    .el-menu {
      border-right: none;
    }

    /*展开/收起*/

    .toggle_box {
      background-color: darkcyan;
      font-size: 15px;
      font-weight: bold;
      line-height: 24px;
      color: #FFFFFF;
      letter-spacing: 0.2em;
      text-align: center;
      cursor: pointer;

    }
  }

  /*内容主体*/
  .el-main {
    background-color: #E9EEF3;
  }

  /*下拉菜单的样式*/
  .el-dropdown-link {
    cursor: pointer;
    color: rgb(224, 236, 255);
  }
</style>
