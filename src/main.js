import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueResource from 'vue-resource'
import ELementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ELementUi)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true // 更改请求方式为表单 application/x-www-form-urlencoded
Vue.http.options.root = 'http://127.0.0.1:3000' // 配置请求路径根目录
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
