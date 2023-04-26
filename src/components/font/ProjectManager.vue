<template>
  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">非遗项目负责人</span>
      </div >
    <div style="margin-top: 30px; ">
      <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%; background-color: #c6ffdd"
          :data="tableDataFiltered"      >
        <el-table-column
            sortable
            prop="person_code"
            label="编号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.person_code}}</span>
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="name"
            label="姓名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="nation"
            label="民族">
          <template slot-scope="scope">
                <span  v-for="(nation, index)   in scope.row.nationsList" >
                  {{nation.name}}
                  <span v-if="index === scope.row.nationsList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="categoryname"
            label="项目类别">
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
            prop="project_name"
            label="负责的项目">
          <template slot-scope="scope">
                <span  v-for="(project, index)   in scope.row.projectsList" >
                  {{project.name}}
                  <span v-if="index === scope.row.projectsList.length-1 "></span>
                  <span  v-else>/</span>
                </span>
          </template>
        </el-table-column>
        <el-table-column
            :formatter="formatter"
            prop="report_area"
            label="地区">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.report_area}}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                v-model="search"
                size="mini"
                placeholder="输入姓名搜索"/>
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
    name: "ProjectManager",
    data() {
    return{
      search: '',
      tableData:[],
      total: 0, // 数据总条数
      currentPage: 1, // 当前页码
    }
    },
  computed: {
    // 根据当前页码和每页显示的行数，计算出本页要显示的数据
    tableDataFiltered() {
      const startIndex = (this.currentPage - 1) * 5
      const endIndex = this.currentPage * 5
      return this.tableData.filter(data => !this.search ||data.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
    }
  },
  mounted() {
    this.getAllData()
  },
  methods:{
    getAllData() {
      console.log("create func");
      this.$http.get("http://localhost:8083/declarer/findAll").then(res=>{
        this.tableData = res.data
        this.total=res.data.length
        console.log(res.data);
      })
    },
    // 处理页码改变事件，重新计算分页数据
    handlePageChange(page) {
      this.currentPage = page
    },
    formatter(row, column) {
      return row.report_area;
    },
  }
}
</script>

<style scoped>
  .body{

  }
</style>