<template>
    <div class="body">
        <el-input
            style="width: 450px"
            placeholder="请输入内容"
            v-model="input"
            ref="input"
            >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button style="margin-left: 100px" type="primary" icon="el-icon-plus" @click="toadd">上传作品</el-button>
        <div class="container">
            <div class="row" style="display: flex;flex-direction: row; margin-top: 25px">
                <div v-for="video in videoList" style="margin-top: 15px" class="col-sm-12 col-md-6 col-lg-4">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="content" style="width: 100%;height: 200px;display: flex;justify-content: center;align-items: flex-end">
                            <audio controls v-bind:src="'data:audio/mp4;base64,' + video.url" style='width: 250px; height: 50px; padding: 0px 0px; z-index: 9999' ></audio>
                        </div>
                        <div style="padding: 14px;">
                            <span>{{ video.title }}</span>
                            <div class="bottom clearfix" style="display: flex;flex-direction: column">
                                <time class="time" style="color: #99a9bf">{{ video.created_date }}</time>
                                <el-button @click="toDetail(video.id)" type="text" class="button">查看</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AudioAndVideo",
    data(){
        return{
            videoList:[],
            input:''
        }
    },
    mounted() {
        this.$refs.input.$refs.input.addEventListener('keyup', this.handleEnter);
    },
    beforeDestroy() {
        this.$refs.input.$refs.input.removeEventListener('keyup', this.handleEnter);
    },
    created() {
        this.getVideo()
    },
    methods:{
        handleEnter(event){
            if (event.keyCode === 13) {
                console.log(this.input)
                this.$router.push({path:'/userHome2/videoDetail2',query:{title:this.input}})
            }
        },
        toadd(){
            this.$router.push('/userHome2/addVideos')
        },
        getVideo(){
            this.$http.get("http://localhost:8083/videos/findByStatus").then(res=>{
                this.videoList = res.data
                console.log(res.data);
            })
        },
        toDetail(id){
            this.$router.push({path:"/userHome2/videoDetail", query: {videoId: id}});
        }
    }

}
</script>

<style scoped>
.body{
    margin-top: 100px;
}
.content{
    background-image: url("@/assets/20.jpg");
}
</style>