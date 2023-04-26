<!--模板代码-->
<template>
	<div class="home">
		<el-container>
			<!--      头部区域-->
			<el-header>
				<div>
					<img src="../assets/logo(1).png" style="width: 80px" alt="">
					<span :style="{fontSize: fontSize}">非遗文化传承体验平台</span>
				</div>
				<div>
					<!-- <el-button type="info" icon="el-icon-s-custom" circle @click="login"></el-button>{{showUserName}} -->
					<span id="date" :style="{fontSize: fontSize}">{{this.currentTime}}</span>
				</div>
				<div>
					<el-button type="info" icon="el-icon-s-custom" circle @click="login"></el-button>
					<!-- <el-button type="info" icon="el-icon-s-custom" circle @click="login"></el-button> -->
					<el-button @click="logout" class="el-button--search"></el-button>
				</div>

			</el-header>

			<!--      左侧菜单区域，和右侧的功能区域-->
			<el-container>
				<el-aside width="200px">
					<el-row class="tac">
						<el-col :span="24" align="left">
							<el-menu background-color="#BB8C44" text-color="black" @open="handleOpen"
											 @close="handleClose" active-text-color="#409EFF">
								<el-menu-item index="/homeView/welcome" @click="getData">
									<template slot="title"><i class="el-icon-message"></i>统计数据</template>
								</el-menu-item>
								<el-menu-item index="/homeView/userManage" @click="getData">
									<template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
								</el-menu-item>
								<el-menu-item index="/homeView/project" @click="getData">
									<template slot="title"><i class="el-icon-s-order"></i>非遗项目管理</template>
								</el-menu-item>
								<el-menu-item index="/homeView/papper" @click="getData">
									<template slot="title"><i class="el-icon-s-order"></i>文献管理</template>
								</el-menu-item>
								<el-menu-item index="/homeView/manager" @click="getData">
									<template slot="title"><i class="el-icon-s-custom"></i>非遗负责人</template>
								</el-menu-item>
								<el-submenu index="2">
									<template slot="title" ><i class="el-icon-menu"></i><span style="font-size: 23px; font-family: KaiTi">作品管理</span></template>
									<el-menu-item-group>
										<el-menu-item index="/homeView/vedio" @click="getData"><i class="el-icon-film"></i>音频管理</el-menu-item>
										<el-menu-item index="/homeView/imageManage" @click="getData"><i class="el-icon-money"></i>图片管理</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-menu-item index="4" @click="logout">
									<i class="el-icon-user"></i>
									<span slot="title">注销</span>
								</el-menu-item>
							</el-menu>

						</el-col>
					</el-row>

				</el-aside>
				<el-main>
					<!--          功能区域需要显示的数据是由其他组件提供的-->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<!--行为/脚本-->
<script>
// @ is an alias to /src


export default {
	name: 'HomeView',
	data: function() {
		return {
			currentTime: "",
			fontSize: ""
			// movelist: []
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		getData(e) {
			//console.log(e.index);
			this.$router.push(e.index);
		},
		logout() {
			// this.$store.commit('setToken','')
			// localStorage.clear()
			this.$store.commit('logout')
			this.$router.push("/login");
		},
		login() {
			this.$router.push("/login");
		},
		setRootFontSize() {
			this.fontSize = window.innerWidth / 1000 + "vw";
		},
	},
	created() {
		setInterval(() => {
			const date = new Date();
			this.currentTime = date.toLocaleTimeString();
		}, 1000);
		window.addEventListener("resize", this.setRootFontSize);
		this.setRootFontSize();
	},
	computed: {
		showUserName() {
			return JSON.parse(localStorage.getItem('user'));
		}
	}
}
</script>


<!--样式-->
<style scoped>
.el-container {
	height: 100%;
}
.el-button--search {
	background: url('@/assets/下一个.png') no-repeat center;
	background-color: aliceblue;
	background-size: contain;
	padding-left: 20px; /* 根据图片宽度调整 */
}
.el-header {

	z-index: 1; /* 让侧边栏在内容区域之上 */
	position: fixed;
	top: 0;
	width: 100%;
	/*position: sticky;*/
	background-color: #BB8C44;
	justify-content: space-between;
	padding-left: 0;
	/* height: 100px; */
	align-items: center;
	color: black;
	font-size: 20px;
	display: flex;
}

.el-header div {
	display: flex;
	align-items: center;
}

.el-main{
	margin-left: 185px;
	margin-top: 30px;
}
.el-header div img {
	width: 60px;
	height: 60px;
	margin-left: 20px;
}

.el-header div span {
	margin-left: 100px;
	font-size: 18px;
}
.el-menu-item{
	font-size: 23px;
	font-family: KaiTi, "SimKai", sans-serif;
}


.el-aside {
	z-index: 1; /* 让侧边栏在内容区域之上 */
	position: fixed;
	margin-top:60px;
	background-color: #BB8C44;
	color: #333;
	text-align: center;
	line-height: 200px;
	height: 100%;
}
</style>
