<template>

  <div>
      <div  class="body">
          <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <span>相关推荐</span>
              </div>
              <div style="margin-top: 20px" v-for="o in recommendList" :key="o" class="text item">
                  <a :href="o.url">{{o.text }}</a>
              </div>
          </el-card>
          <el-card style="margin-left: 100px;" class="box-card">
              <div  slot="header" class="clearfix">
                  <span>其他非遗网站</span>
              </div>
              <div style="margin-top: 20px" v-for="o in webList" :key="o" class="text item">
                  <a :href="o.url">{{o.text }}</a>
              </div>
          </el-card>
      </div>
      <hr>
    <div style="margin-top: 0px;" class="item2">
        <div style="color: #99a9bf; ">
            <span style="cursor:pointer;font-size: 20px" @click="toIndex">关于我们</span>
            <el-divider direction="vertical"></el-divider>
            <span style="font-size: 20px">联系我们</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="toShenbao" style="font-size: 20px; cursor: pointer">项目申报</span>
        </div>
        <div style="margin-top: 30px">
            <img src="@/assets/contect.png" alt="">
            <p>请用QQ/百度浏览器扫描</p>
        </div>
        <div style="margin-top: 50px">
            <p>建议使用IE浏览器，火狐浏览器，谷歌浏览器以及Microsoft Edge浏览器访问</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Page4",
    data(){
        return{
            recommendList:[
                {
                    url:'https://www.mct.gov.cn/',
                    text:'中华人民共和国文化和旅游部'
                },{
                    url:'http://www.ncha.gov.cn/',
                    text:'国家文物局'
                },{
                    url:'https://www.unesco.org/en',
                    text:'联合国教育、科学与文化组织'
                },{
                    url:'https://www.crihap.cn/',
                    text:'联合国教科文组织亚太地区非物质文化遗产国际培训中心'
                },
            ],
            webList:[
                {
                    url:'http://whlyj.beijing.gov.cn/',
                    text:'北京'
                },{
                    url:'https://hebculture.cn/',
                    text:'河北'
                },{
                    url:'http://wlt.shanxi.gov.cn/',
                    text:'山西'
                },{
                    url:'http://www.ichshanghai.cn/',
                    text:'上海'
                },
            ]
        }
    },
    methods:{
        toIndex(){
            this.$router.push('/userHome2/resource')
        },
        toShenbao(){
            this.$router.push('/userHome2/report')
        }
    }

}
</script>

<style scoped>
.body{

    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box-card{
    width: 50%;
    background-image: url('@/assets/background（2）.jpg')
}
span{
    font-size: 30px;
    font-weight: bold;
    font-family: KaiTi;
}
a{
    text-decoration: none;
    color: black;
}
a:hover{
    color: blue;
}
img{
    width: 200px;
    height: 200px;
}
.item2{
    background-image: url('@/assets/background（2）.jpg')
}
p{
    color: gray;
    font-weight: bold;
}
</style>