<template>
    <div >
        <img style="width: 400px" src="@/assets/error.jpg">
        <h1 style="color: white">您还未登录，请先登录</h1>
        <p align=center>
            <font
                    style="font-size: 25pt; filter: shadow(color=black); width: 71.27%; color: #000000; line-height: 150%; font-family: 华文彩云; height: 60px">
                <b>去登录</b>
            </font>
            <el-button style="margin-left: 10px" type="primary" icon="el-icon-right" @click="login" circle></el-button>
        </p>
    </div>
</template>

<script>
export default {
    name: "ErrorMessage",
    methods:{
        login(){
            this.$router.push("/login")
        }
    }
}
</script>

<style scoped>
div{
    width: 100%;
    height: 700px;
    background-color: #a0cfff;
}
</style>