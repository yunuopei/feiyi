<template>
  <div class="body">
      <el-input
          style="width: 450px"
          placeholder="请输入要查找的作品标题"
          v-model="input"
          ref="input"
          >
          <i  slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button style="margin-left: 100px" type="primary" icon="el-icon-plus" @click="toadd">上传作品</el-button>
      <div class="container">
          <div class="row" style="display: flex;flex-direction: row; margin-top: 25px"  >
              <div style="margin-top: 15px" class="col-sm-12 col-md-6 col-lg-4" v-for="(image,index) in imageList" >
                  <el-card :body-style="{ padding: '0px' }">
                      <img v-bind:src="'data:image/png;base64,' + image.url" class="image" />
<!--                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                      <div style="padding: 14px;">
                          <span>{{ image.title }}</span>
                          <div class="bottom clearfix">
                              <time class="time">{{ image.created_date }}</time>
                              <br>
                              <el-button @click="toDetail(image.id)" type="text" class="button">查看</el-button>
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
    name: "TuXiang",
    data(){
      return {
          imageList:[],
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
        console.log(this.input.toString())
        this.getImages()
    },
    methods:{
        handleEnter(event){
            if (event.keyCode === 13) {
                console.log(this.input)
                this.$router.push({path:'/userHome2/imageDetail2',query:{title:this.input}})
            }
        },
        toadd(){
            this.$router.push('/userHome2/addImages')
        },
        getImages(){
            // console.log("create func");
            this.$http.get("http://localhost:8083/images/findAllByStatus").then(res=>{
                this.imageList = res.data
                console.log(this.imageList);
            })
        },
        toDetail(id){
            console.log(id)
            this.$router.push({path:"/userHome2/imageDetail", query: {imageId: id}});
            // this.$router.push('/userHome2/imageDetail')
        }
    }
}
</script>

<style scoped>
    .body{
        margin-top: 100px;
    }
    .item{
        width: 30%;
        height: auto;
        /*border: solid 1px red;*/
        margin-left: 33px;
    }
    img{
        width: 100%;
        height: 200px;
    }

</style>