<template>
    <div style="margin-top: 30px; ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>音频管理</el-breadcrumb-item>
            <el-breadcrumb-item>已审核音频管理</el-breadcrumb-item>
            <div style="margin-top: 20px">
                <el-radio v-model="radio" label="1" border size="medium" @change="handleCheck(1)">已审核</el-radio>
                <el-radio v-model="radio" label="2" border size="medium" @change="handleCheck(2)">未审核</el-radio>
                <el-button style="float: right" round @click="addVedio"><i style="margin-right: 5px" class="el-icon-circle-plus-outline"></i>添加音频</el-button>
            </div>
        </el-breadcrumb>
        <el-table
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%; background-color: #c6ffdd"
                :data="tableDataFiltered"
        >
            <el-table-column
                    sortable
                    prop="title"
                    label="音频标题">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="left">
                        <div align="center">
                            <audio controls v-bind:src="'data:audio/mp4;base64,' + scope.row.url" style='width: 250px; height: 50px; padding: 0px 0px; align-content: center; z-index: 9999' ></audio>
                        </div>
                        <p>{{scope.row.title}}</p>
                        <p>作者:
                            <span  v-for="(user, index)   in scope.row.users" >
                  {{user.username}}
                  <span v-if="index === scope.row.users.length-1 "></span>
                  <span  v-else>/</span>
                  </span>
                        </p>
                        <p class="vedio_detail">
                            {{scope.row.description}}
                        </p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.title }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    :formatter="formatter"
                    prop="description"
                    label="音频描述">
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
                <span  v-for="(user, index)   in scope.row.users" >
            {{user.username}}
             <span v-if="index === scope.row.users.length-1 "></span>
             <span  v-else>/</span>
           </span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="created_date"
                    label="上传时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.created_date}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="status"
                    label="审核状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" @change="saveSelector(scope.$index, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入标题或时间"/>
                </template>
                <template slot-scope="scope">
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
</template>

<script>
import AudioAndVideo from "@/components/font/resources/AudioAndVideo";
export default {
    name: "Vedio",
    components: {AudioAndVideo},
    data() {
        return{
            isRouterAlive:true,
            search: '',
            tableData:[],
            radio:'1',
            total: 0, // 数据总条数
            currentPage: 1, // 当前页码
        }
    },
    computed: {
        // 根据当前页码和每页显示的行数，计算出本页要显示的数据
        tableDataFiltered() {
            const startIndex = (this.currentPage - 1) * 7
            const endIndex = this.currentPage * 7
            return this.tableData.filter(data => !this.search || data.title.toLowerCase().includes(this.search.toLowerCase())||data.created_date.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).slice(startIndex, endIndex)
        }
    },
    mounted() {
        this.getAllData()
    },
    methods:{
        // handleEdit(index, row) {
        //     console.log(index, row);
        // },
        getAllData() {
            console.log("create func");
            this.$http.get("http://localhost:8083/videos/findAll").then(res=>{
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
        saveSelector(index, row){
            console.log(index,row.status);
            this.$http.post(
                "http://localhost:8083/videos/updateVideo",
                row
            ).then(res=>{
                this.$message.success("修改成功!");
            })
                .catch(res => {
                    console.log(error)
                    this.$message.success("修改失败!");
                })
        },
        handleCheck(option) {
            if (option === 1) {
                this.$router.push('/homeView/vedio');
            } else if (option === 2) {
                this.$router.push('/homeView/vedio0');
            }
        },
        handleDelete(index, id) {
            console.log(index, id);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).
            then(() => {
                this.$http.post(
                    "http://localhost:8083/videos/delete",
                    {id: id}
                ).then(res=>{
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 删除成功返回电影刷新列表页面
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
        addVedio(){
            this.$router.push('/addVedio')
        },
    }
}
</script>

<style scoped>
.text-ellipsis {
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 溢出部分隐藏 */
    text-overflow: ellipsis; /* 超出部分用省略号显示 */
}
.vedio_detail{
    font-size: 12px;
    width: 250px;
}
</style>