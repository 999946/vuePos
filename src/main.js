// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://127.0.0.1:8000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
})
