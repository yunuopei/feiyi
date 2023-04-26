<template>

  <div class="body">
      <div >
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">标题</span>
      </div >
      <div style="display: flex; justify-content: center; align-items: center">
          <div >
              <span style="color: #99a9bf">创建时间：</span>
              <span style="color: #99a9bf">{{ videoList.created_date }}</span>
          </div>
          <div style="margin-left: 30px">
              <span style="color: #99a9bf">作者：</span>
              <span style="color: #99a9bf">{{ videoList.username }}</span>
          </div>

      </div>
      <div style="margin-top: 30px">
          <img src="@/assets/22.webp" alt="">
      </div>
      <div style="margin-top: 30px">
          <audio controls v-bind:src="'data:audio/mp4;base64,' + videoList.url" style='width: 250px; height: 50px; padding: 0px 0px; z-index: 9999' ></audio>

      </div>

      <div style="margin-top: 30px">
          <span style="font-weight: bold; font-family: KaiTi; font-size: 20px; ">简介</span>
          <p style="text-indent: 2em">{{ videoList.description }}</p>
      </div>
<!--      <el-card shadow="always">
          <div class="img">
              <img src="@/assets/22.webp" alt="">

          </div>

&lt;!&ndash;          <audio controls v-bind:src="'data:audio/mp4;base64,' + videoList.url" style='width: 250px; height: 50px; padding: 0px 0px; z-index: 9999' ></audio>&ndash;&gt;
      </el-card>-->
  </div>
</template>

<script>
export default {
    name: "VideoDetail",
    data(){
        return{
            videoList:[]
        }
    },
    created() {
        this.$http.get('http://localhost:8083/videos/findById?videoId='+this.$route.query.videoId)
            .then(res=>{
                this.videoList = res.data;
                console.log(this.videoList)
            })
    }
}
</script>

<style scoped>
.body{
    margin-top: 100px;
}
.img{
    /*float: left;*/
    display: flex;
}
img{
    width: 300px;
    height: 300px;
    border-radius: 50%;
    /*float: left;*/
}
</style>