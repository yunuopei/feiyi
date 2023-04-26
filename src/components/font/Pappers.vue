<template>
    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px;">相关文章</span>
        </div >
      <div style="margin-top: 30px; ">
        <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%; background-color: #c6ffdd"
            :data="tableDataFiltered"
        >
          <el-table-column
              sortable
              prop="title"
              label="文献标题">
            <template slot-scope="scope">
              <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.title">
                <div   class="text-ellipsis">{{ scope.row.title }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
              label="文献描述"
              :formatter="formatter"
              prop="description">
            <template slot-scope="scope">
              <el-tooltip style="margin-left: 10px" effect="dark" :content="scope.row.description">
                <div class="text-ellipsis">{{ scope.row.description }}</div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="author"
              label="作者">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="pub_date"
              label="上传时间">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.pub_date}}</span>
            </template>
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入标题或作者或时间"/>
            </template>
            <template slot-scope="scope">
              <el-button
                  type=""
                  size="mini"
                  @click="handleShow(scope.$index, scope.row)">查看</el-button>
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
    name: "Pappers",
    data() {
    return{
      search: '',
      tableData:[
      ],
      total:0,
      currentPage:1
    }
    },
    computed: {
      // 根据当前页码和每页显示的行数，计算出本页要显示的数据
      tableDataFiltered() {
        const startIndex = (this.currentPage - 1) * 7
        const endIndex = this.currentPage * 7
        return this.tableData.filter(data => !this.search || data.author.toLowerCase().includes(this.search.toLowerCase())|| data.title.toLowerCase().includes(this.search.toLowerCase())|| data.pub_date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
      }
    },

    mounted() {
      this.getAllData()
    },
    methods:{
      getAllData() {
        console.log("create func");
        this.$http.get("http://localhost:8083/papper/findAll").then(res=>{
          // this.tableData = res.data
          this.tableData = res.data
          this.total = res.data.length
          console.log(res.data);
        })
      },
      // 处理当前页码改变事件
      handlePageChange(page) {
        this.currentPage = page
      },
      formatter(row, column) {
        return row.description;
      },
    handleShow(index, row) {
      console.log(index, row);
      window.open(row.url,'_blank')
    },
  }
}
</script>

<style scoped>
.body{
  margin-top: 30px;
}
.text-ellipsis {
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 溢出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分用省略号显示 */
}
/* 鼠标悬浮时显示全部内容 */
.text-ellipsis:hover + .tooltip {
  display: block;
}

/* 提示框样式 */
.tooltip {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  white-space: normal;
  word-wrap: break-word;
  max-width: 200px;
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
}
</style>