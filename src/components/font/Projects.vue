<template>
    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">非遗项目</span>
        </div >
      <div style="margin-top: 30px; ">
        <el-table
            style="width: 100%; background-color: #c6ffdd"
            :default-sort = "{prop: 'date', order: 'descending'}"
            :data="tableDataFiltered"        >
          <el-table-column
              sortable
              prop="code"
              label="项目编号">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="name"
              label="项目名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="categoryname"
              label="类别">
            <template slot-scope="scope">
                <span  v-for="(category, index)   in scope.row.categoryList" >
                  {{category.categoryname}}
                  <span v-if="index === scope.row.categoryList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="public_date"
              label="申报日期">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.public_date}}</span>
            </template>
          </el-table-column>
          <el-table-column
              :formatter="formatter"
              prop="report_area"
              label="申报地址">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.report_area}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="protect_area"
              label="保护地址">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.protect_area}}</span>
            </template>
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入名称或日期"/>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 20px"
            layout="total, prev, pager, next"
            :total="total"
            :page-size="5"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
</template>

<script>
export default {
    name: "Projects",
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
        const startIndex = (this.currentPage - 1) * 5
        const endIndex = this.currentPage * 5
        return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())||  data.public_date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
      }
    },
    mounted() {
      this.getAllData()
    },
    methods:{
      getAllData() {
        console.log("create func");
        this.$http.get("http://localhost:8083/project/findAll").then(res=>{
          this.tableData = res.data
          this.total=res.data.length
          console.log(res.data);
        })
      },
      // 处理页码改变事件，重新计算分页数据
      handlePageChange(page) {
        this.currentPage = page
      },
    }
}
</script>

<style scoped>
.body{

}
</style>