<template>
  <div class="body">

      <div class="carousel">
          <div class="image-container" >
              <div class="text-container" >
                  <img v-for="(image, index) in items" :key="index" :src="require(`@/assets/${image.imgUrl}.png`)" :class="{ active: activeIndex === index }">
              </div>
              <div class="text-container">
                  <div class="item" v-for="(image, index) in items" :key="index" @click="activeIndex = index">
                      <span >{{ image.text }}</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px;margin-left: 50px">
              <div style="margin-top: 15px;" class="col-sm-12 col-md-12 col-lg-6" v-for="(image, index) in items" :key="index" >
                  <el-card :body-style="{ padding: '0px' }" style="width: 80%">
                      <img :src="require(`@/assets/${image.imgUrl}.png`)" :class="{ active: activeIndex === index }">
                      <div style="padding: 14px;">
                          <span>{{ image.text }}</span>
                      </div>
                  </el-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Exhibition",
    data() {
        return {
            items: [
                { imgUrl: '18',text:'2021年文化和自然遗产日'},
                { imgUrl: '19',text:'太极拳'},
                { imgUrl: '20',text:'2020全国非遗曲艺周'},
                { imgUrl: '21',text:'中国非物质文化遗产保护成果展'},
            ],
            carouselHeight: '400px',
            activeIndex: 0
        }
    },
    methods: {
        changeIndex(index) {
            this.activeIndex = index;
        }
    }
}
</script>

<style scoped>
.body{
    margin-top: 100px;
}
.carousel .image-container img {
    display: none;
}

.carousel .image-container img.active {
    display: block;
}
.image-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.text-container{
    width: 30%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(128,128,128,0.5);
}
img{
    width: 100%;
    height: 100%;
}
.item{
    margin-top: 10px;
    background-color: rgba(123, 141, 255, 0.1);
    width: 80%;
    height: 30px;
    cursor: pointer;
    /*pointer-events: all;*/
}

</style>