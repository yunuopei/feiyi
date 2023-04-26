<template>

    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
                <el-breadcrumb-item>添加项目负责人</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                添加项目负责人
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加负责人">

                  <el-form-item label="负责人编号" prop="person_code">
                    <el-input v-model="ruleForm.person_code" style="width: 615px"></el-input>
                  </el-form-item>
                  <el-form-item label="负责人姓名" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 615px"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="民族">
                    <el-select v-model="ruleForm.nation_id" placeholder="请选择民族">
                      <el-option v-for="nat in nationList" :key="nat.id" :label="nat.name" :value="nat.id">{{nat.name}}</el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="负责人地区" prop="report_area">
                    <el-input v-model="ruleForm.report_area" style="width: 615px"></el-input>
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
    name: "AddManager",
    data(){
        return{
            nationList:[],
            ruleForm:{
              id:'0',
              name:'',
              person_code:'',
              category_id:'',
              sex:'',
              nation_id:'',
              project_code:'',
              report_area:'',
            },
          rules: {
            person_code: [
              {required: true, message: '请输入项目负责人编号', trigger: 'blur'}
            ],
            name: [
              {required: true, message: '请填写项目负责人名称', trigger: 'blur'}
            ],
            nation_id: [
              {required: true, message: '请选择民族', trigger: 'change'}
            ],
            // public_code: [
            //   {required: true, message: '请填写编号', trigger: 'blur'}
            // ],
            report_area: [
              {required: true, message: '请填写申报地区', trigger: 'blur'}
            ],
            // protect_area: [
            //   {required: true, message: '请填写保护单位', trigger: 'blur'}
            // ],
          }
        }
    },
    created(){
      this.$http.get("http://localhost:8083/declarer/findAllNation")
          .then(res=>{
            this.nationList= res.data
          }).catch(res=>{
        console.log(res);
        this.$message.error("获取民族列表失败")
      })

    },
    methods:{
      submitForm(formName){
        console.log(this.ruleForm)
        this.ruleForm.category_id=this.$route.query.categoryid
        this.ruleForm.project_code=this.$route.query.projectcode
        this.$http.post(
            "http://localhost:8083/declarer/addDeclarer",
            this.ruleForm
        ).then(res=>{
          this.$message.success("添加成功!");
          this.$router.push("/homeView/manager")
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