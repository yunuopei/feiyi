<template>
    <div class="body scrollable-parent" >
        <div class="container scrollable-content" @wheel="handleScroll" v-bind:style="{ scrollTop: scrollPosition + 'px' }">
<!--        <div class="container scrollable" :style="scrollableStyle" @touchmove.prevent>-->

            <div class=" row" style="display: flex">
                <div class=" col-md-6 col-lg-4">
                        <el-card class="overflow-auto box-card" v-scroll="scrollPosition">
                            <div>
                                <i style="width: 50px;" class="el-icon-document"></i>
                                <span style="font-size: 25px; font-weight: bold;">新闻动态</span>
                            </div>
                            <div class="icon" >
                                <span @click="toPappers" style="float: right;cursor: pointer"><i class="el-icon-arrow-left"></i>更多<i class="el-icon-arrow-right"></i></span>
                            </div>
                            <div style="margin-top: 25px">
                                <el-carousel :interval="4000" type="card" height="150px">
                                    <el-carousel-item v-for="(item,index) in imageList" :key="index">
                                        <img :src="require(`@/assets/${item}.png`)">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div v-for="pad in papperData.slice(0, 3)" :key="pad.id" style="margin-top: 25px">
                                <div style="text-indent: 2em" class="ellipsis-text">
                                  <span ><a :href= pad.url target="_blank">{{ pad.title}}</a></span>
                                </div>
                                <div>
                                    <span style="float: right; font-size: 10px; color: #99a9bf" >{{ pad.pub_date}}</span>
                                </div>
                                <hr style="margin-top: 20px">
                            </div>
<!--                            <div style="margin-top: 25px">-->
<!--                                <div style="text-indent: 2em">-->
<!--                                    <span>xxxxxxxxxxxxxxxx</span>-->
<!--                                </div>-->
<!--                                <div>-->
<!--                                    <span style="float: right; font-size: 10px; color: #99a9bf" >时间</span>-->
<!--                                </div>-->
<!--                                <hr style="margin-top: 20px">-->
<!--                            </div>-->
<!--                            <div style="margin-top: 25px">-->
<!--                                <div style="text-indent: 2em">-->
<!--                                    <span>xxxxxxxxxxxxxxxx</span>-->
<!--                                </div>-->
<!--                                <div>-->
<!--                                    <span style="float: right; font-size: 10px; color: #99a9bf" >时间</span>-->
<!--                                </div>-->
<!--                                <hr style="margin-top: 20px">-->
<!--                            </div>-->
                        </el-card>
                </div>
                <div class=" col-md-6 col-lg-4">
                    <el-card class="box-card">
                        <div>
                            <i style="width: 50px;" class="el-icon-s-check"></i>
                            <span style="font-size: 25px; font-weight: bold;">资讯</span>
                        </div>
                        <div class="icon">
                            <span @click="toPappers" style="float: right;cursor: pointer"><i class="el-icon-arrow-left"></i>更多<i class="el-icon-arrow-right"></i></span>
                        </div>
                      <div v-for="pad in papperData.slice(3, 6)" :key="pad.id" style="margin-top: 25px">
                        <div style="text-indent: 2em" class="ellipsis-text1">
                          <span ><a :href= pad.url target="_blank">{{ pad.author}}<br>{{ pad.description}}</a></span>
                        </div>
                        <div>
                          <span style="float: right; font-size: 10px; color: #99a9bf" >{{ pad.pub_date}}</span>
                        </div>
                        <hr style="margin-top: 25px">
                      </div>
<!--                        <div style="margin-top: 25px;">-->
<!--                            <div style="text-indent: 2em">-->
<!--                                <span>林继富 王祺：非物质文化遗产保护领域的“两创...我国非物质文化遗产领域贯彻落实习近平总书记提出的中华优秀传统文化“创造性转化、创新性发展”战</span>-->
<!--                            </div>-->
<!--                            <div style="margin-top: 20px">-->
<!--                                <span style="float: left; font-size: 10px; color: #99a9bf" >时间</span>-->
<!--                            </div>-->
<!--                            <hr style="margin-top: 40px">-->
<!--                        </div>-->
                    </el-card>
                </div>
                <div class=" col-md-6 col-lg-4">
                    <el-card class="box-card">
                        <div>
                            <i style="width: 50px;" class="el-icon-document"></i>
                            <span style="font-size: 25px; font-weight: bold;">专题报道</span>
                        </div>
                        <div class="icon">
                            <span @click="toPappers" style="float: right;cursor: pointer"><i class="el-icon-arrow-left"></i>更多<i class="el-icon-arrow-right"></i></span>
                        </div>
                      <div v-for="pad in papperData.slice(6, 9)" :key="pad.id" style="margin-top: 25px">
                        <div style="text-indent: 2em" class="ellipsis-text">
                          <span ><a :href= pad.url target="_blank">{{ pad.title}}</a></span>
                        </div>
                        <div>
                          <span style="float: right; font-size: 10px; color: #99a9bf" >{{ pad.pub_date}}</span>
                        </div>
                        <hr style="margin-top: 20px">
                      </div>

<!--                        <div style="margin-top: 25px">-->
<!--                            <div style="text-indent: 2em">-->
<!--                                <span>xxxxxxxxxxxxxxxx</span>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <span style="float: right; font-size: 10px; color: #99a9bf" >时间</span>-->
<!--                            </div>-->
<!--                            <hr style="margin-top: 20px">-->
<!--                        </div>-->
                        <div style="margin-top: 25px">
                            <el-carousel height="200px" direction="vertical" :autoplay="false">
                                <el-carousel-item v-for="(item,index) in imageList2" :key="index">
                                    <img :src="require(`@/assets/${item}.png`)">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import UserHome from "@/components/font/UserHome.vue";
import HomeView from "@/views/HomeView.vue";
/*import 'swiper/swiper-bundle.css';*/

export default {
    name: 'page2',
    data(){
        return{
            scrollableStyle: {
                overflow: 'auto',
                '-webkit-overflow-scrolling': 'touch',
                touchAction: 'pan-y'
            },
            scrollPosition: 0, // 初始化滚动位置为0
            imageList:[12,13,11],
            imageList2:[14,15,16],
          papperData:[],
        }
    },
    created() {
      console.log("create func");
      this.$http.get("http://localhost:8083/papper/findAll").then(res=>{
        this.papperData = res.data
        console.log(res.data);
      })
    },
    methods:{
        handleScroll(event) {
            const target = event.target;
            const specifiedElement = target.closest('.specified-element');
            if (specifiedElement) {
                this.scrollPosition += event.deltaY;
            } else {
                event.preventDefault();
            }
        },
        toPappers(){
          this.$router.push('/userHome2/pappers')
        }
    }
}
</script>

<style scoped>
.el-card{
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
}
img{
    height: 100%;
    width: 100%;
}
.body{
    height: 100vh;
    background-image: url("@/assets/background（2）.jpg");
}
.box-card{
    margin-top: 50px;
}
.scrollable-parent {
    height: 100%; /* 可见高度 */
    overflow: auto; /* 滚动条样式 */
    overflow-y: auto;
}
.scrollable-content {
    height: 100%; /* 实际高度 */
}
.ellipsis-text {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ellipsis-text1 {
  width: 300px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
a{
  color: black;
  text-decoration: none;
}
</style>