<template>

    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
                <el-breadcrumb-item>添加项目</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                添加项目
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加用户">

                    <el-form-item label="编号" prop="code">
                        <el-input v-model="ruleForm.code" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 615px"></el-input>
                    </el-form-item>

                    <el-form-item label="项目类别">
                        <el-select v-model="ruleForm.category_id" placeholder="请选择项目类别">
                            <el-option v-for="cate in cateList" :key="cate.id" :label="cate.categoryname" :value="cate.id"></el-option>
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
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddProject",
    data(){
        return{
            cateList: [],
            ruleForm:{
              code:'',
              name:'',
              category_id:'',
              public_date:'',
              report_area:'',
              protect_area:'',
            },

            rules: {
              code: [
                {required: true, message: '请输入项目编号', trigger: 'blur'}
              ],
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
    this.$http.get("http://localhost:8083/project/findAllCate")
        .then(res=>{
          //把区域列表赋值给 data中定义的 regionList,便于在页面上展示
          this.cateList= res.data
        }).catch(res=>{
      console.log(res);
      this.$message.error("获取类型列表失败")
    })
  },
  methods:{
    submitForm(formName){
      console.log(this.ruleForm)
      this.$http.post(
          "http://localhost:8083/project/addProject",
          this.ruleForm
      ).then(res=>{
        this.$message.success("添加成功!");
        this.$router.push("/homeView/project")
        this.$router.go(0)
      })
          .catch(res => {
            console.log(error)
            this.$message.success("添加失败!");
          })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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