<template>

  <div class="body">
      <div>
          <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">资源</span>
      </div >
      <div class="container" style="margin: auto; margin-top: 20px">
          <div class="row" style="margin-top: 40px;margin: auto">
              <div class="col-md-6 item" @click="toTuxiang" >
                  <span>图像</span>
              </div>
              <div class="col-md-6 item" @click="toAudioAndVideo">
                  <span>影音</span>
              </div>
              <div class="col-md-6 item" @click="toExhibition ">
                  <span>展览</span>
              </div>
          </div>

      </div>
      <div>
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
    name: "Resource",
    data(){
        return{
            input:''
        }
    },
    methods:{
        toTuxiang(){
            this.$router.push('/userHome2/resource/tuxiang');
        },
        toAudioAndVideo(){
            this.$router.push('/userHome2/resource/audioAndVideo')
        },
        toExhibition(){
            this.$router.push('/userHome2/resource/exhibition')
        }

    }
}
</script>

<style scoped>

.body{
    margin-top: 110px;
}
.item{
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-left: 30px;
    font-family: KaiTi;
    background-color: rgba(128,128,128,0.1);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}
.item:hover{
    background-color: rgba(128,128,128,0.5);
    color: white;
    cursor: pointer;
}
</style>