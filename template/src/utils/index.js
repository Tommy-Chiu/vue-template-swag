import { mapGetters, mapActions } from 'vuex'

const files = require.context('./', true, /index\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let util = files(key).default
  let utilName = key.split('/')[1]
  exports[utilName] = util
})

const pageUtilFiles = require.context('../pages', true, /utils\/index\.js$/)
pageUtilFiles.keys().forEach(key => {
  exports[`pages/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = pageUtilFiles(key).default
})

const moduleUtilFiles = require.context('../modules', true, /utils\/index\.js$/)
moduleUtilFiles.keys().forEach(key => {
  exports[`modules/${key.replace(/(\.\/|\.js)/g, '').split('/')[0]}`] = moduleUtilFiles(key).default
})

export const getMapper = function (source, structureType) {
  return function () {
    let namespace, map, res
    if (arguments.length > 1) {
      namespace = arguments[ 0 ]
      map = arguments[ 1 ]
      if (!source[ namespace ]) {
        console.error(`[getMapper]can not found ${namespace}!`)
        return
      }
      res = source[ namespace ]
    } else {
      namespace = ''
      map = arguments[ 0 ]
      res = source
    }
    let components = structureType && structureType === 'array' ? [] : {}
    getComponents(res, map)
    function getComponents (res, map) {
      map.forEach((key) => {
        if (typeof key === 'string') {
          if (res.hasOwnProperty(key)) {
            structureType && structureType === 'array'
              ? components.push(res[ key ])
              : components[ key ] = res[ key ]
          }
        } else if (typeof key === 'object') {
          Object.keys(key).forEach((k) => {
            getComponents(res[ k ], key[ k ])
          })
        }
      })
    }
    return components
  }
}

exports.mapComponents = require('@/components').mapper
exports.mapDirectives = require('@/directives').mapper
exports.mapFilters = require('@/filters').mapper
exports.mapMixins = require('@/mixins').mapper
exports.mapGetters = mapGetters
exports.mapActions = mapActions
