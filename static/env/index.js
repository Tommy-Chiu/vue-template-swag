'use strict'
/* eslint-disable */
const ENV_CONFIG = require('./index.dev').CONFIG
// const ENV_CONFIG = require('./index.test').CONFIG
// const ENV_CONFIG = require('./index.prod').CONFIG

const COMMON_CONFIG = {}

const COVER_CONFIG = {}

switch (process.env.NODE_ENV) {
  case 'development':
    window.CONFIG = Object.assign(ENV_CONFIG, COMMON_CONFIG, COVER_CONFIG)
    console.log('【ENV-development | INDEX_CONFIG】：', window.CONFIG)
    break
  case 'production':
    if (window.CONFIG) {
      window.CONFIG = Object.assign(window.CONFIG, COMMON_CONFIG)
      console.log('【INDEX-production | INDEX_CONFIG】window.CONFIG', {'window.CONFIG': window.CONFIG})
    } else {
      window.COMMON_CONFIG = COMMON_CONFIG
      console.log('【INDEX-production | INDEX_CONFIG】!window.CONFIG', {'window.COMMON_CONFIG': window.COMMON_CONFIG})
    }
    break
}
