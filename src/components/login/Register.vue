<template>
    <div class="login_container">

        <el-card class="box-card">
            <div class="avatar_box">
                <img class="logo_img" src="@/assets/logo(1).png" alt="">
            </div>
            <el-form :model="ruleForm" style="margin-right: 30px;margin-top: 100px" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phonenumber">
                    <el-input placeholder="请输入电话号码" v-model="ruleForm.phonenumber"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday" required>
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                                    style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="againpassword">
                    <el-input placeholder="请确认密码" type="password" v-model="againpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <div style="position: absolute; width: 150px">
                        <el-input placeholder="请输入验证码" v-model="code"></el-input>
                    </div>
                    <!--          <router-view></router-view>-->
                    <!--          验证码-->
                    <div class="s-canvas" style="cursor: pointer; position: absolute;left:100px;margin-left: 60px" @click="refreshCode">
                        <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
                    </div>

                </el-form-item>
                <el-form-item label="上传头像" >
                    <el-upload
                        style="background-color: white"
                        class="avatar-uploader"
                        action="http://localhost:8083/user/register"
                        :show-file-list="true"
                        :data="ruleForm"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img :src="ruleForm.pic" class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-right: 30px" type="primary" @click="register('ruleForm')">注册</el-button>
                    <el-button style="margin-right: 30px" type="success" @click="resetForm">重置</el-button>
                    <el-button style="margin-right: 30px" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>

//导出组件组件名称为Login
export default {
    name: "Register",
    data() {
        const checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
        };
        const validateAgainPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请确认密码'));
            }else if(value != this.ruleForm.password){
                callback(new Error('两次密码不一致'))
            }else {
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            console.log(this.identifyCode);
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else if (value !== this.identifyCode) {
                callback(new Error('验证码错误'));
            } else {
                callback();
            }
        };
        const validateEmail = (rule, value, callback) => {
            let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (!emailReg.test(value)) {
                callback(new Error('邮箱格式错误'));
            } else {
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            let phoneReg = /^1[34578]\d{9}$/;
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!phoneReg.test(value)) {
                callback(new Error('手机号码格式错误'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username:'',
                password:'',
                email:'',
                phonenumber:'',
                sex:'',
                birthday:'',

                pic: '', // 显示的图片地址

            },
            againpassword:'',
            code:'',
            token: '', // 用户 token
            identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
            identifyCode: '',
            rules: {
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                phonenumber: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                birthday: [
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                againpassword:[
                    {validator: validateAgainPassword, trigger: 'blur'}
                ],
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        identifyCode: { // 默认注册码
            type: String,
            default: '1234'
        },
        fontSizeMin: { // 字体最小值
            type: Number,
            default: 25
        },
        fontSizeMax: { // 字体最大值
            type: Number,
            default: 35
        },
        backgroundColorMin: { // 验证码图片背景色最小值
            type: Number,
            default: 200
        },
        backgroundColorMax: { // 验证码图片背景色最大值
            type: Number,
            default: 220
        },
        dotColorMin: { // 背景干扰点最小值
            type: Number,
            default: 60
        },
        dotColorMax: { // 背景干扰点最大值
            type: Number,
            default: 120
        },
        contentWidth: { // 容器宽度
            type: Number,
            default: 90
        },
        contentHeight: { // 容器高度
            type: Number,
            default: 38
        }
    },
    methods: {
        //
        // 重置验证码
        refreshCode () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode (o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
            }
        },

        // 生成一个随机数
        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },

        // 生成一个随机的颜色
        randomColor (min, max) {
            let r = this.randomNum(min, max)
            let g = this.randomNum(min, max)
            let b = this.randomNum(min, max)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        },

        drawPic () {
            let canvas = document.getElementById('s-canvas')
            let ctx = canvas.getContext('2d')
            ctx.textBaseline = 'bottom'
            // 绘制背景
            ctx.fillStyle = '#e6ecfd'
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
            // 绘制文字
            for (let i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i)
            }
            this.drawLine(ctx)
            this.drawDot(ctx)
        },

        drawText (ctx, txt, i) {
            ctx.fillStyle = this.randomColor(50, 160) // 随机生成字体颜色
            ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei' // 随机生成字体大小
            let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
            let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
            var deg = this.randomNum(-30, 30)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        },

        drawLine (ctx) {
            // 绘制干扰线
            for (let i = 0; i < 4; i++) {
                ctx.strokeStyle = this.randomColor(100, 200)
                ctx.beginPath()
                ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
                ctx.stroke()
            }
        },

        drawDot (ctx) {
            // 绘制干扰点
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = this.randomColor(0, 255)
                ctx.beginPath()
                ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
                ctx.fill()
            }
        },


        //
        register() {
            console.log(this.ruleForm.pic);
            if (this.ruleForm.username === '' && this.ruleForm.password === '' && this.ruleForm.againpassword === '' && this.ruleForm.sex === '' && this.ruleForm.birthday === '' && this.ruleForm.phonenumber === '' && this.ruleForm.email === '' && this.ruleForm.code === ''/* && this.ruleForm.checkPass === ''*/)
                this.$message.error("请填写注册信息")
            else if(this.ruleForm.name === '')
                this.$message.error("用户名不能为空")
            else if (this.ruleForm.password === '')
                this.$message.error("密码不能为空")
            else if (this.ruleForm.againpassword === '')
                this.$message.error("确认密码不能为空")
            else if(this.ruleForm.email === '')
                this.$message.error('邮箱不能为空')
            else if(this.ruleForm.phonenumber === '')
                this.$message.error('电话号码不能为空')
            else if(this.ruleForm.birthday === '')
                this.$message.error('出生日期不能为空')
            else if(this.ruleForm.code === '')
                this.$message.error('验证码不能为空')
            else {
                this.$router.push('/login')
            }
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
        beforeAvatarUpload(file) {
            // 限制上传文件类型和大小
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJPG) {
                this.$message.error('只能上传 JPG 或 PNG 格式图片');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB');
                return false;
            }
            return true;
        },

    },
    watch: {
        identifyCode () {
            this.drawPic()
        }
    },
    mounted () {
        this.drawPic()
    }
}
</script>

<style scoped>

.login_container{
    width: 100%;
    height: 120vh;
    background-image: linear-gradient(to left,#FAD7A1,#E96D71);
    /*background-color: #F0E68C;*/
    display: flex;
    justify-content: center;
    align-items: center;
    /*height: 100%;*/
}

.box-card {
    width: 500px;
    background-image: url("@/assets/background.webp");
    /*background-color: #5daf34;*/
    font-weight: bold;
    border-radius: 10%;
    margin: auto;
    margin-top: 50px;
}
.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}
.logo_img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b4b6b;
}

.login-code{
    cursor: pointer;
}
</style>