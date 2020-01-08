// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable import/first */
import Vue from 'vue'
Vue.config.productionTip = false

import app from '@/app'
import router from '@/router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
