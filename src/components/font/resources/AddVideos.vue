<template>
    <div class="body">
        <div>

            <div  class="template_title">
                添加音频
            </div>
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" title="添加音频" >

                    <el-form-item label="标题" prop="title">
                        <el-input v-model="ruleForm.title" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="音频描述">
                        <el-input type="textarea" v-model="ruleForm.description" style="width: 615px"></el-input>
                    </el-form-item>
                    <el-form-item label="音频上传" prop="url">
                      <el-upload
                          :multiple="false"
                          accept="audio/*"
                          :limit="1"
                          :auto-upload="false"
                          action="http://localhost:8083/videos/addVideo"
                          :file-list="fileList"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-change="fileChange"
                          ref="upload"
                          :data="ruleForm"
                          name="file">
                        <div >
                          <el-button slot="trigger" size="small" type="primary">选择音频
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
                          </el-button>
                          <!--              </span>-->
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
let id;
if(JSON.parse(localStorage.getItem("user")) === null)
  id = -1;
else
  id = JSON.parse(localStorage.getItem("user")).id
console.log('id = ',id)
export default {

    name: "AddVedios",
    data(){
        return{
            disabled:false,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            ruleForm: {
                title: '',
                description: '',
                url: '',
                createdby_id:id,
                created_date:'',
                status:'0',
                'file': ''
            },
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    {min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请填写描述', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
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
                    // const dateString = created_date.toISOString();
                    // 更新成功后,跳转到影音列表页面
                    this.$message("保存成功!!");
                    this.$router.push("/userHome2/resource/audioAndVideo")
                    this.$router.go(0)
                } else {
                    this.$message("保存失败!!");
                    console.log('保存失败!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

.body{
    margin-top: 100px;
    margin-left: 10px;
}
.template_title{
    font-size: 30px;
    font-family: KaiTi;
    font-weight: bold;
}
</style>