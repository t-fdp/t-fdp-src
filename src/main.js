// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vSelect from 'vue-select'
import axios from 'axios'
import { Button, Table , Input} from 'view-design';
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import App from 'components/app.vue';
// import Routers from './router.js';
import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
      arrow: 'md-arrow-dropdown',
      arrowSize: 20
  }
});

Vue.config.productionTip = false
Vue.component('v-select', vSelect)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
