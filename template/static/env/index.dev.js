'use strict'
/* eslint-disable */
const DEV_CONFIG = {
  BASE_URL: ''
}
try {
  if (process && process.env && process.env.NODE_ENV === 'development') {
    exports['CONFIG'] = DEV_CONFIG
  }
} catch (e) {
  if (window.COMMON_CONFIG) {
    window.CONFIG = Object.assign(DEV_CONFIG, COMMON_CONFIG)
  }
  window.CONFIG = DEV_CONFIG
  console.log('【DEV_CONFIG】：', window.CONFIG)
}
