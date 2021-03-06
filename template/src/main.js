// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable import/first */
import '../static/env'
import Vue from 'vue'
Vue.config.productionTip = false

import app from '@/app'
import router from '@/router'
import store from '@/store'

import 'normalize.css'
import '@/icons'
import {
  icon,
  mdPlugin,
  mdDemo
} from '@/components'
Vue.use(icon)
Vue.use(mdPlugin)
Vue.use(mdDemo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      process_env: process.env
    }
  },
  render: h => h(app)
})
