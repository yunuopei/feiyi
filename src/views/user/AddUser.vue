<template>
<div class="body">
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
            <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>

        <div  class="template_title">
            添加用户
        </div>
        <div style="text-align: left; margin-top: 20px">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加用户">

                <el-form-item label="用户名" prop="name">
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
                <el-form-item label="用户角色" prop="roles">
                    <el-select v-model="ruleForm.roleId" placeholder="用户角色">
                        <el-option v-for="role in roleList" :key="role.id" :label="role.rolename" :value="role.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="禁用">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>

                <el-form-item label="用户头像" prop="pic">
                    <el-upload
                        :multiple="false"
                        :limit="1"
                        accept="image/*"
                        list-type="picture-card"
                        :auto-upload="false"
                        action="http://localhost:8083/user/addUser"
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-change="fileChange"
                        ref="upload"
                        :data="ruleForm"
                        name="file">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail"
                                 :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                  <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>

                  <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                  </span>
              </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
    name: "AddUser",
    data(){
        return{
            // forbid:true,
            roleList:[],
            ruleForm: {
                username:"",
                sex:"",
                email:'',
                birthday:'',
                pic:'',
                status:'',
                roleId:'',
                phonenumber:''
            },
            disabled:false,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
        };
    },
    created() {
      this.getRole()
    },
    methods:{
        handleRemove: function (file, fileList) {
            this.fileList = fileList;
        },
        fileChange: function (file, fileList) {
            this.fileList = fileList;
        },
        handlePictureCardPreview: function (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        submitForm(formName) {
            let self = this

            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.ruleForm.created_date = new Date();
                    this.ruleForm.file = this.fileList[0].raw;
                    self.$refs.upload.submit();
                    self.dialogVisible = false;
                    this.$message("保存成功!!");
                    this.$router.push("/homeView/userManage")
                    this.$router.go(0)//刷新页面
                } else {
                    this.$message("保存失败!!");
                    console.log('保存失败!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getRole(){
            this.$http.get('http://localhost:8083/user/getRole')
                .then(res=>{
                    this.roleList = res.data
                })
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