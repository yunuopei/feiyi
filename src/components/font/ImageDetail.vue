<template>

  <div class="body">
      <div >
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">{{ imageList.title }}</span>
      </div >
      <div style="display: flex; justify-content: center; align-items: center">
          <div >
              <span style="color: #99a9bf">创建时间：</span>
              <span style="color: #99a9bf">{{imageList.created_date}}</span>
          </div>
          <div style="margin-left: 30px">
              <span style="color: #99a9bf">作者：</span>
              <span style="color: #99a9bf">{{ imageList.username }}</span>
          </div>

      </div>
      <div style="margin-top: 30px">
          <img v-bind:src="'data:image/png;base64,' + imageList.url"  />
      </div>
      <div style="margin-top: 30px">
          <span style="font-weight: bold; font-family: KaiTi; font-size: 20px; ">简介</span>
          <p style="text-indent: 2em">{{ imageList.description }}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: "ImageDetail",
    data(){
        return{
            imageList:[]
        }
    },
    created() {
        this.getImages()
    },
    methods:{
        getImages() {
            this.$http.get('http://localhost:8083/images/findImageById?imageId='+this.$route.query.imageId)
                .then(res=>{
                    this.imageList = res.data;
                    console.log(this.imageList)
                })
        },
        getImageByTitle(){
            this.$http.get('http://localhost:8083/images/findByTitle?imageTitle='+this.$route.query.imageTitle)
                .then(res=>{
                    this.imageList = res.data;
                    console.log(this.imageList)
                })
        }
    }
}
</script>

<style scoped>

.body{
    margin-top: 100px;
}
img{
    width: 80%;
    height: 600px;
}
</style>