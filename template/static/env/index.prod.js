'use strict'
/* eslint-disable */
const PROD_CONFIG = {
  TITLE: 'vue-template-swag',
  BASE_URL: ''
}
try {
  if (process && process.env && process.env.NODE_ENV === 'development') {
    exports['CONFIG'] = PROD_CONFIG
  }
} catch (e) {
  if (window.COMMON_CONFIG) {
    window.CONFIG = Object.assign(PROD_CONFIG, COMMON_CONFIG)
  }
  window.CONFIG = PROD_CONFIG
  console.log('【PROD_CONFIG】：', window.CONFIG)
}
