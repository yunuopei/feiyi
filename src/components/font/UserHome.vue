<template>
<div class="home">
<!--    头部-->
    <el-container>
        <el-header>
            <div>
                <img @click="index" src="@/assets/logo(1).png" style="width: 80px; cursor: pointer" alt="">
                <span :style="{fontSize: fontSize}">非遗文化传承体验平台</span>
            </div>
<!--            <div>
                &lt;!&ndash; <el-button type="info" icon="el-icon-s-custom" circle @click="login"></el-button>{{showUserName}} &ndash;&gt;
&lt;!&ndash;                <span id="date" :style="{fontSize: fontSize}">{{this.currentTime}}</span>&ndash;&gt;
                <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                    >

                </el-input>
                <el-button @click="toDetail" icon="el-icon-search" circle></el-button>

            </div>-->
            <div style="margin-left: 40px">
                <el-button type="info" icon="el-icon-chat-dot-round" circle @click="contect" title="联系方式"></el-button>
                <el-button type="info" icon="el-icon-s-custom" circle @click="login" title="登录"></el-button>
<!--                <img src="@/assets/R-C.jpg" alt="头像">username-->
                <!-- <el-button type="info" icon="el-icon-s-custom" circle @click="login"></el-button> -->
            </div>
        </el-header>
        <el-main>
            <!-- 菜单按钮 -->
            <div class="navbar-menu-button" @click="show">
                <i class="el-icon-more"></i>
            </div>
            <div class="nav" :class="{ 'is-active': showMenu }">
                <div @click="toIndex">
                    <a >
                        首页
                    </a>
                </div>
                <div @click="toListProject">
                    <a >清单</a>
                </div>
                <el-dropdown >
                    <a @click="toReport" style="text-decoration: none">申报指南</a>
                    <el-dropdown-menu slot="dropdown" style="background-color: rgba(128,128,128,0.3);color: white; font-weight: bold">
                        <el-dropdown-item ><span  @click="toGuojia">国家级项目</span></el-dropdown-item>
                        <el-dropdown-item ><span @click="toPeople">国家级传承人</span></el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>
                <el-dropdown >
                    <a @click="toResource" style="text-decoration: none">资源</a>
                    <!--                        <el-button type="primary">
                                                更多菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                            </el-button>-->
                    <el-dropdown-menu class="menu" slot="dropdown" style="background-color: rgba(128,128,128,0.5); color: white; font-weight: bold">
                        <el-dropdown-item><span   @click="toTuxiang">图像</span></el-dropdown-item>
                        <el-dropdown-item><span  @click="toAudio">音乐欣赏</span></el-dropdown-item>
                        <el-dropdown-item><span @click="toExhibition">展览馆</span></el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>
            </div>
        </el-main>
    </el-container>
    <el-container>
        <router-view></router-view>
    </el-container>
<!--    导航菜单-->
</div>
</template>

<script>
export default {
    name: "UserHome",
    data: function() {
        return {
            showMenu: false,
            currentTime: "",
            fontSize: "",
            input:''
            // movelist: []
        }
    },
    methods:{
        contect(){
            this.$router.push('/userHome2/page4')
        },
        setRootFontSize() {
            this.fontSize = window.innerWidth / 1000 + "vw";
        },
        show(){
            this.showMenu = !this.showMenu;
        },
        toTuxiang(){
            this.$router.push('/userHome2/resource/tuxiang')
        },
        toGuojia(){
            this.$router.push('/userHome2/report/guojia')
        },
        toReport(){
            this.$router.push('/userHome2/report/guojia')
        },
        toPeople(){
            this.$router.push('/userHome2/report/people')
        },
        toListProject(){
            this.$router.push('/userHome2/listProject/projects')
        },
        toIndex(){
            this.$router.push('/page1')
        },
        toResource(){
            this.$router.push('/userHome2/resource/tuxiang')
        },
        toAudio(){
            this.$router.push('/userHome2/resource/audioAndVideo')
        },
        toExhibition(){
            this.$router.push('/userHome2/resource/exhibition')
        },
        login(){
            this.$router.push('/login')
        },
        index(){
            this.$router.push('/page1')
        }

    },
    created() {
        setInterval(() => {
            const date = new Date();
            this.currentTime = date.toLocaleTimeString();
        }, 1000);
        window.addEventListener("resize", this.setRootFontSize);
        this.setRootFontSize();
    },
}
</script>

<style scoped>
    .navbar-menu-button {
        display: none;
        font-size: 20px;
        cursor: pointer;
    }
    .el-header {

        z-index: 1; /* 让侧边栏在内容区域之上 */
        position: fixed;
        top: 0;
        width: 100%;
        /*position: sticky;*/
        background-color: rgba(128,128,128,0.2);
        justify-content: space-between;
        padding-left: 0;
        /* height: 100px; */
        align-items: center;
        color: black;
        font-size: 20px;
        display: flex;
        text-align: center;
        line-height: 60px;
    }
    /*.home{
        background-image: linear-gradient(to left,#FAD7A1,#E96D71);
        height: 100vw;
    }*/
    .el-header div {
        display: flex;
        align-items: center;
    }
    .el-header div img {
        width: 60px;
        height: 60px;
        margin-left: 20px;
    }

    .el-header div span {
        margin-left: 80px;
        font-size: 18px;
        color:white;
        font-weight: bold;
        font-family: KaiTi;
    }
    .el-main{
        margin-top: 50px;
        text-align: center;
        line-height: 50px;
    }
    .nav{
        background-color: rgba(128,128,128,0.1);
        /*background-image: url("@/assets/background.webp");*/
        width: 90%;
        /*border: solid black 1px;*/
        margin: auto;
    }
    .nav div{
        width: 10%;
        /*border: solid red 1px;*/
        margin-left: 160px;
    }
    .nav div:hover{
        background-color: rgba(128,128,128,0.5);
        color: white;
        box-shadow: 2px 2px 10px gray;
        cursor: pointer;
    }
    .nav div a{
        color: white;
        font-weight: bold;
    }
    .nav div ul{
        display: none;
    }
    .nav div:hover ul{
        display: block;
    }
    .nav div ul li a{
        text-decoration: none;
    }
    .nav div ul li a:hover{
        border-bottom: 2px solid lightgreen;
    }
    /*响应式菜单*/
    @media (max-width: 768px) {
        .nav {
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: rgba(128,128,128,0.1);
            flex-direction: column;
            text-align: center;
            display: none;
        }

        .nav.is-active {
            display: flex;
        }

        .nax div {
            margin: 10px 0;
        }

        .navbar-menu-button {
            display: block;
            cursor: pointer;
        }
    }
</style>
