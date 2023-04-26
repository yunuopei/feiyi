<template>
    <div class="login_container">
        <h1 style="font-family: 'KaiTi'">非遗文化传承体验平台</h1>
        <el-card class="box-card">
            <div class="avatar_box">
                <img class="logo_img" src="@/assets/logo(1).png" alt="">
            </div>
            <el-form :model="ruleForm" style="margin-right: 30px;margin-top: 100px" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name" style="font-weight: bold">
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item style="font-weight: bold" label="密码" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="font-weight: bold" label="验证码" prop="code">
                    <div style="position: absolute; width: 150px">
                        <el-input placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
                    </div>
                    <!--          <router-view></router-view>-->
                    <!--          验证码-->
                    <div class="s-canvas" style="cursor: pointer; position: absolute;left:100px;margin-left: 60px" @click="refreshCode">
                        <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
                    </div>

                </el-form-item>

                <el-form-item>
                    <el-button style="margin-right: 30px" type="primary" @click="login('ruleForm')">登录</el-button>
                    <el-button style="margin-right: 30px" type="success" @click="registerUser">注册</el-button>
                    <el-button style="margin-right: 30px" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>

//导出组件组件名称为Login
export default {
    name: "Login",
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
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
        return {
            ruleForm: {
                username:'',
                password:'',
                code:''
            },
            identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
            identifyCode: '',
            rules: {
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
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
        registerUser(){
            this.$router.push("/register")
        },
        login(){
            if (this.ruleForm.name === '' && this.ruleForm.password === '' && this.ruleForm.code === '')
                this.$message.error("请填写登录信息")
            else if (this.ruleForm.name === '')
                this.$message.error("用户名不能为空")
            else if (this.ruleForm.password === '')
                this.$message.error("密码不能为空")
            else if (this.ruleForm.code === '')
                this.$message.error("验证码不能为空")
            else if (this.ruleForm.code != this.identifyCode)
                this.$message.error("验证码错误")
            else {
                let vm = this
                this.$http.post("http://localhost:8083/user/login", this.ruleForm)
                    .then(res => {
                        console.log(res.data.code);
                        if(res.data.code == 200){
                            console.log(res.data.msg)
                            //将token和user保存到localStorage中
                            vm.$store.commit('setToken',res.data.token)
                            vm.$store.commit('setUser',res.data.user)
                            console.log('token:',JSON.parse(localStorage.getItem('user')))
                            //跳转到登录成功后的页面
                            if(res.data.role == 1)
                                this.$router.push("/homeView/welcome")
                            else
                                this.$router.push('/page1')
                        }
                        else{
                            this.$message.error(res.data.msg)
                            // alert(res.data.msg)
                        }
                    })/*.catch(res => {
                    this.$message.error("登录失败,请重试")
                })*/
            }
            console.log(this.ruleForm);
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
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
    height: 100vh;
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
    border-radius: 10%;
    margin: auto;
    margin-top: 200px;
}
/*.el-form-item label {
    color: greenyellow;
    font-family: KaiTi;
    font-weight: bold;
}*/
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
.vertical-line {
    border-left: 2px solid black;
    height: 200px;
    margin-top: 10px;
    /*margin: auto;*/
}
</style>