<template>

    <div class="body">
        <el-card style="margin-top: 20px" shadow="always" v-for="video in videoList">
            <img @click="toDetail(video.id)" src="@/assets/22.webp"  />
            <div style="display: flex;flex-direction: column">
                <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">标题:{{video.title}}</span>
                <span style="color: gray;font-size: 15px">创建时间:{{video.created_date}}</span>
                <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">描述:</span>
                <p style="text-indent: 2em">{{video.description}}</p>
            </div>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "VideoDetail2",
    data(){
        return{
            videoList:[]
        }
    },
    created() {
        this.getImageByTitle()
    },
    methods:{
        getImageByTitle(){
            this.$http.get('http://localhost:8083/videos/findByTitle?title='+this.$route.query.title)
                .then(res=>{
                    this.videoList = res.data;
                    console.log(this.videoList)
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
img{
    cursor: pointer;
    border-radius: 50%;
    width: 200px;
    float: left;
    height: 200px;
}
span{
    margin-top: 10px;
}
</style>