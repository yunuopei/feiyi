<template>

    <div class="body">
        <el-card style="margin-top: 20px" shadow="always" v-for="image in imageList">
            <img @click="toDetail(image.id)" v-bind:src="'data:image/png;base64,' + image.url"  />
            <div style="display: flex;flex-direction: column">
                <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">标题:{{image.title}}</span>
                <span style="color: gray;font-size: 15px">创建时间:{{image.created_date}}</span>
                <span style="font-size: 20px;font-family: KaiTi;font-weight: bold">描述:</span>
                <p style="text-indent: 2em">{{image.description}}</p>
            </div>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "ImageDetail2",
    data(){
        return{
            imageList:[]
        }
    },
    created() {
        this.getImageByTitle()
    },
    methods:{
        getImageByTitle(){
            this.$http.get('http://localhost:8083/images/findByTitle?title='+this.$route.query.title)
                .then(res=>{
                    this.imageList = res.data;
                    console.log(this.imageList)
                })
        },
        toDetail(id){
            this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
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
    width: 200px;
    float: left;
    height: 200px;
}
span{
    margin-top: 10px;
}
</style>