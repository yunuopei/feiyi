<template>
    <div class="body">
        <div>
            <span style="font-weight: bold; font-family: KaiTi; font-size: 30px; ">申报指南</span>
        </div >
        <div class="container" style="margin: auto">
            <div class="row" style="margin-top: 40px;margin: auto">
                <div class="col-md-6 item" @click="guojia" >
                    <span>国家级项目</span>
                </div>
                <div class="col-md-6 item" @click="people">
                    <span>国家级负责人</span>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
export default {
    name:'Report',
    data() {
        return {
            showMenu: false
        };
    },
    methods:{
        guojia(){
            this.$router.push('/userHome2/report/guojia')
        },
        people(){
            this.$router.push('/userHome2/report/people')
        }
    }
};
</script>

<style scoped>

.body{
    margin-top: 30px;

}
.item{
    width: 45%;
    height: 50px;
    /*border: solid red 1px;*/
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: KaiTi;
    background-color: rgba(128,128,128,0.1);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    /*margin-top: 20px;*/
}
.item:hover{
    background-color: rgba(128,128,128,0.5);
    color: white;
    cursor: pointer;
}
.content{
    margin-top: 30px;
}
</style>
