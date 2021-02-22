export default ({source, namespace, mapStructure, structureType, runIt = true}) => {
  let map, res
  map = mapStructure
  if (namespace && !source[ namespace ]) {
    console.error(`[getMapper]can not found ${namespace}!`)
  } else {
    res = namespace ? source[ namespace ] : source
  }
  let modules = structureType && structureType === 'array' ? [] : {}
  getModules(res, map)

  function getModules (res, map) {
    map.forEach((key) => {
      if (typeof key === 'string') {
        if (res.hasOwnProperty(key)) {
          structureType && structureType === 'array'
            ? modules.push(runIt ? res[ key ]() : res[ key ])
            : modules[ key ] = runIt ? res[ key ]() : res[ key ]
        }
      } else if (typeof key === 'object') {
        Object.keys(key).forEach((k) => {
          getModules(res[ k ], key[ k ])
        })
      }
    })
  }

  return modules
}
