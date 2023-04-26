<template>

    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
                <el-breadcrumb-item>编辑项目</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                编辑项目
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="编辑项目">

                    <el-form-item label="编号" prop="code" >
                      <el-input v-model="ruleForm.code" style="width: 615px"  :readonly=true ></el-input>
                      <span style="color:#c2e59c">编号不可修改</span>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="name">
                      <el-input v-model="ruleForm.name" style="width: 615px"></el-input>
                    </el-form-item>

                    <el-form-item label="项目类别">
                      <el-select v-model="ruleForm.category_id" placeholder="请选择类别" disabled >
                        <el-option v-for="cat in categoryList" :key="cat.id" :label="cat.categoryname" :value="cat.id">{{cat.categoryname}}</el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="申报日期" required>
                      <el-col :span="12">
                        <el-form-item prop="public_date">
                          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.public_date"
                                          style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="申报地区" prop="report_area">
                      <el-input v-model="ruleForm.report_area" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="保护地区" prop="project_area">
                      <el-input v-model="ruleForm.protect_area" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 600px; text-align: center">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      <el-button
                          @click="addForm('codes','iid')">添加负责人</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditProject",
    data(){
    return{
      categoryList:[],
      iid:'',
      codes:'',
      ruleForm:{
        id:'0',
        code:'',
        name:'',
        category_id:'',
        public_date:'',
        report_area:'',
        protect_area:'',
      },

      rules: {
        // code: [
        //   {required: true, message: '请输入项目编号', trigger: 'blur'}
        // ],
        name: [
          {required: true, message: '请填写项目名称', trigger: 'blur'}
        ],
        category_id: [
          {required: true, message: '请选择项目类别', trigger: 'change'}
        ],
        public_date: [
          {required: true, message: '请填写申报日期', trigger: 'blur'}
        ],
        report_area: [
          {required: true, message: '请填写申报地区', trigger: 'blur'}
        ],
        protect_area: [
          {required: true, message: '请填写保护单位', trigger: 'blur'}
        ],
      }
    }
  },
  created(){
    // 在组件对象刚创建出来时就调用这个钩子函数
    // 调用后台接口得到所有的电影类型
    this.$http.get("http://localhost:8083/project/editProject?projectId=" + this.$route.query.projectId)
        .then(res=>{
          // 把类型列表赋值给在data中定义的cateList
          /*
          {
              movie: {...},
              allCateList:[{..}, {....}, ...]
          }

           */
          // 把后台接口传递过来的类型列表赋值给data中定义的cateList
          this.categoryList = res.data.categoryList;
          // 得到数据
          this.ruleForm.id=res.data.projects.id
          this.ruleForm.code=res.data.projects.code
          this.ruleForm.name=res.data.projects.name
          this.ruleForm.category_id=res.data.projects.category_id-1+1
          this.ruleForm.public_date=res.data.projects.public_date
          this.ruleForm.report_area=res.data.projects.report_area
          this.ruleForm.protect_area=res.data.projects.protect_area
          this.iid=res.data.projects.category_id
          this.codes=res.data.projects.code
        })
  },
  methods:{
    submitForm(formName){
      console.log(this.ruleForm)
      this.$http.post(
          "http://localhost:8083/project/updateProject",
          this.ruleForm
      ).then(res=>{
        this.$message.success("修改成功!");
        this.$router.push("/homeView/project")
        this.$router.go(0)
      })
          .catch(res => {
            console.log(error)
            this.$message.success("修改失败!");
          })
    },
    resetForm(formName) {
      this.$router.go(0)
    },
    addForm(codes,iid) {
      this.$router.push({path:"/addManager", query: {projectcode:this.codes,categoryid:this.iid}});
    },
  }
}
</script>

<style scoped>

.body{
    margin-top: 30px;
    margin-left: 30px;
}
.template_title{
    font-size: 30px;
    font-family: KaiTi;
    font-weight: bold;
}
</style>