<template>
  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">清单</span>
      </div >
      <div class="content .my-div">
<!--          <img src="@/assets/17.png" alt="">-->
          <div class="item">
              <div class="item-2" style="">
                  <span>清单</span>
<!--                  <span style="display: inline-block; line-height: 50px; vertical-align: middle;">清单</span>-->
              </div>
              <div class="item-1" style="" @click="toProject">
                  <span>非遗项目</span>
<!--                  <span style="display: inline-block; line-height: 50px; vertical-align: middle;">清单</span>-->
              </div>
              <div class="item-1" style="" @click="toPeople">
                  <span>非遗项目负责人</span>
<!--                  <span style="display: inline-block; line-height: 50px; vertical-align: middle;">清单</span>-->
              </div>

          </div>

      </div>
      <div style="margin-top: 30px">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
    name: "ListProject",
    data(){
        return{

        }
    },
    methods:{
        toProject(){
            this.$router.push('/userHome2/listProject/projects');
        },
        toPeople(){
            this.$router.push('/userHome2/listProject/projectManager');
        }
    }
}
</script>

<style scoped>

.body{
    margin-top: 75px;
    /*margin: auto;*/
}
.content{
    /*position: relative;*/
    width: 80%;
    height: 400px;
    display: flex;
    margin-left: 150px;
    background-image: url("@/assets/17(1).png");
}
.item{
    display: flex;
    /*margin-left: 860px;*/
    width: 30%;
    height: 100%;
    /*border: solid 1px red;*/
    background-color: rgba(128,128,128,0.5);
    font-family: KaiTi;
}
img{
    width: 70%;
    height: 100%;
}
.item-1{
    margin: auto;
    cursor: pointer;
    height: 90%;
    writing-mode: tb-rl;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-left: 70px;
    background-color: rgba(128,112,128,0.5);
}
.item-2{
    cursor: pointer;
    margin: auto;
    height: 20%;
    writing-mode: tb-rl;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-left: 70px;
    background-color: rgb(255, 128, 128,0.5);
}
.item-1:hover{
    background-color: rgba(128,112,128,0.8);
}
.item-2:hover{
    background-color: rgb(255, 128, 128,0.8);
}
.my-div {
    width: 50vw;
    height: 50vh;
}
</style>