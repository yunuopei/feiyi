<template>
    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑作品</el-breadcrumb-item>
                <el-breadcrumb-item>编辑文献</el-breadcrumb-item>
                <el-breadcrumb-item>添加文献</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                添加文献
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加文献">

                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="ruleForm.description" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input type="textarea" v-model="ruleForm.author" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="视频链接地址">
                        <el-input type="textarea" v-model="ruleForm.url" style="width: 615px"></el-input>
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
    name: "AddPapper",
    data(){
        return{
            ruleForm: {
              title:'',
              description:'',
              author:'',
              url:'',
              pub_date:''
            },
          rules: {
            title: [
              {required: true, message: '请输入标题', trigger: 'blur'},
              {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
            ],
            description: [
              {required: true, message: '请填写描述', trigger: 'blur'}
            ],
            author: [
              {required: true, message: '请填写作者', trigger: 'blur'}
            ],
            url: [
              {required: true, message: '请填写链接', trigger: 'blur'}
            ]
          }
        }
    },
  methods:{
    submitForm(formName){
      this.ruleForm.pub_date=new Date()
      console.log(this.ruleForm)
      this.$http.post(
          "http://localhost:8083/papper/addPapper",
          this.ruleForm
      ).then(res=>{
        this.$message.success("添加成功!");
        this.$router.push("/homeView/papper")
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
    margin-left: 10px;
}
.template_title{
    font-size: 30px;
    font-family: KaiTi;
    font-weight: bold;
}
</style>