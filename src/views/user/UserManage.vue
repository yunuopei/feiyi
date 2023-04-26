<template>
  <div >
      <div style="margin-top: 30px; ">
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-button style="float: right" round @click="addUser"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加用户</el-button>
          </el-breadcrumb>
          <el-table
              style="width: 100%; background-color: #c6ffdd"
              :data="tableDataFiltered"
              >
              <el-table-column
                  label="用户名"
                  prop="username">
              </el-table-column>
              <el-table-column
                  label="年龄"
                  prop="age">
              </el-table-column>
              <el-table-column
                  label="性别"
                  prop="sex">
              </el-table-column>
              <el-table-column
                  label="邮箱"
                  prop="email">
              </el-table-column>
              <el-table-column
                  label="电话"
                  prop="phonenumber">
              </el-table-column>
              <el-table-column
                  label="角色"
                  prop="rolename">
              </el-table-column>
              <el-table-column
                  label="状态"
                  prop="status_after">
              </el-table-column>
              <el-table-column
                  align="right">
                  <template slot="header" slot-scope="scope">
                      <el-input
                          v-model="search"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                  </template>
                  <template slot-scope="scope">
                      <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
                      <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination
              style="margin-top: 20px"
              layout="total, prev, pager, next"
              :total="total"
              :page-size="7"
              @current-change="handlePageChange"
          ></el-pagination>
      </div>

  </div>
</template>

<script>
export default {
    name: "UserManage",
    data() {
        return{
          search: '',
          tableData:[],
          total:0,
          currentPage:1
        }
    },
    computed: {
      // 根据当前页码和每页显示的行数，计算出本页要显示的数据
      tableDataFiltered() {
        const startIndex = (this.currentPage - 1) * 7
        const endIndex = this.currentPage * 7
        return this.tableData.filter(data => !this.search || data.username.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
      }
    },

    mounted() {
      this.getAllData()
    },
    methods:{
        getAllData() {
          console.log("create func");
          this.$http.get('http://localhost:8083/user/findAll')
              .then(res=>{
            this.tableData = res.data
            this.total = res.data.length
            console.log(this.total);
          })
        },
        // 处理当前页码改变事件
        handlePageChange(page) {
          this.currentPage = page
        },
        handleEdit(index, id) {
            //跳转到编辑页面，同时把用户的id传递过去
            this.$router.push({path:"/editUser", query: {userId: id}});
        },
        handleDelete(index, id) {
            console.log(index, id);
            this.$confirm('是否删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).
            then(() => {
                this.$http.post(
                    "http://localhost:8083/user/delete",
                    {id: id}
                ).then(res=>{
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 删除成功返回
                    this.$router.go(0)
                }).catch(res=>{
                    console.log(res);
                    // 删除失败
                    this.$message.error("删除失败!")
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addUser(){
            this.$router.push('/addUser')
        },

        // 文件

    }
}
</script>

<style scoped>

.el-table{
    margin-top: 30px;
    margin-left: 10px;
}
</style>