<template>

    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
                <el-breadcrumb-item>编辑项目负责人</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                编辑项目负责人
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="编辑负责人">

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
    name: "EditManager",
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
    // 在组件对象刚创建出来时就调用这个钩子函数
    // 调用后台接口得到所有的电影类型
    this.$http.get("http://localhost:8083/declarer/editDeclarer?declarerId=" + this.$route.query.declarerId)
        .then(res=>{
          // 把类型列表赋值给在data中定义的cateList
          /*
          {
              movie: {...},
              allCateList:[{..}, {....}, ...]
          }

           */
          // 把后台接口传递过来的类型列表赋值给data中定义的cateList
          this.nationList = res.data.nationList;
          // 得到数据
          this.ruleForm.id=res.data.declarer.id
          // this.ruleForm.category_id=res.data.declater.category_id
          // this.ruleForm.project_code=res.data.declater.project_code
          this.ruleForm.person_code=res.data.declarer.person_code
          this.ruleForm.name=res.data.declarer.name
          this.ruleForm.sex=res.data.declarer.sex
          this.ruleForm.nation_id=res.data.declarer.nation_id
          this.ruleForm.report_area=res.data.declarer.report_area
        })
  },
  methods:{
    submitForm(formName){
      console.log(this.ruleForm)
      this.$http.post(
          "http://localhost:8083/declarer/updateDeclarer",
          this.ruleForm
      ).then(res=>{
        this.$message.success("修改成功!");
        this.$router.push("/homeView/manager")
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