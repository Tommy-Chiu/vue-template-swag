'use strict'
/* eslint-disable */
const TEST_CONFIG = {
  TITLE: 'vue-template-swag',
  BASE_URL: ''
}
try {
  if (process && process.env && process.env.NODE_ENV === 'development') {
    exports['CONFIG'] = TEST_CONFIG
  }
} catch (e) {
  if (window.COMMON_CONFIG) {
    window.CONFIG = Object.assign(TEST_CONFIG, COMMON_CONFIG)
  }
  window.CONFIG = TEST_CONFIG
  console.log('【TEST_CONFIG】：', window.CONFIG)
}
