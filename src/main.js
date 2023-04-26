import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import * as echarts from 'echarts'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'fullpage.js/vendors/scrolloverflow';
import VueFullPage from 'vue-fullpage.js';
import 'element-ui/lib/theme-chalk/index.css';
// import 'jquery-slimscroll';

Vue.prototype.$http = axios
//导入安装的axios模块
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
/*import Vuetify from 'vuetify'

Vue.use(Vuetify)*/
Vue.use(VueFullPage);
Vue.use(ElementUI);
/*axios.defaults.baseURL = '/api'*/
//引入echarts
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//将token添加到axios请求头部
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
