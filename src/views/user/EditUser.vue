<template>
    <div class="body">
        <div>
            <!-- 面包屑导航区域 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
                <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
                <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
            </el-breadcrumb>

            <div  class="template_title">
                编辑用户
            </div>
            <div style="text-align: left; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加用户">

                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phonenumber">
                        <el-input v-model="ruleForm.phonenumber" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" required>
                        <el-col :span="12">
                            <el-form-item prop="birthday">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="用户角色">
                        <el-select v-model="ruleForm.roleId" placeholder="用户角色">
                            <el-option v-for="role in roleList" :key="role.id" :label="role.rolename" :value="role.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="禁用">
                        <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"></el-switch>
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
    name: "EditUser",
    data(){
        return{
            roleList:[],
            ruleForm: {
                username:"",
                sex:"",
                email:'',
                birthday:'',
                status:'',
                roleId:'',
                phonenumber:'',
                id:''
            }
        };
    },
    created() {
      this.getUser();
      this.getRole()
    },
    methods:{
        getUser(){
            this.$http.get("http://localhost:8083/user/editUser?userId=" + this.$route.query.userId)
                .then(res=>{
                    this.ruleForm.username = res.data.username
                    this.ruleForm.birthday = new Date(res.data.birthday)
                    this.ruleForm.status = res.data.status
                    this.ruleForm.sex = res.data.sex
                    this.ruleForm.email = res.data.email
                    this.ruleForm.roleId = parseInt(res.data.roleId)
                    this.ruleForm.pic = res.data.pic
                    this.ruleForm.id = res.data.id
                    this.ruleForm.phonenumber = res.data.phonenumber
                })
        },
        getRole(){
            this.$http.get('http://localhost:8083/user/getRole')
                .then(res=>{
                    this.roleList = res.data
                    console.log(res.data)
                })
        },
        submitForm(formName) {
            let self = this
            this.$http.post('http://localhost:8083/user/updateUser',this.ruleForm)
                .then(res=>{
                    this.$message.success('保存成功')
                    this.$router.push('/homeView/userManage')
                })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
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