<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dev-tool-wrap {
    position: relative;
    width: 90vw;
    height: 90vh;
    padding: 20px;
    background-color: white;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    & .panel-side {
      width: auto;
    }
    & .panel-main {
      flex: 1;
      width: 1px;
    }
  }
</style>

<template lang="pug">
  div.dev-tool-wrap
    panelSide.panel-side(
    :path="modulePath"
    :moduleList="moduleList"
    @selectModule="selectModule")
    panelMain.panel-main(
    :path="modulePath"
    :doc="doc")
</template>

<script>
import { mapComponents } from '@/components'
import { mapUtils } from '@/utils'
import doc from '@/doc.md'

let docFiles = require.context('@', true, /\.md$/)
let indexFiles = require.context('@', true, /index/)
let scriptFiles = require.context('@', true, /script\.js$/)
let routeFiles = require.context('@/pages', true, /route\/index\.js$/)

function getMainTypeModule (pathArr, docFileKey) {
  let type = pathArr[1].split('_')[0]
  let module = {
    name: type,
    seq: parseInt(pathArr[2].split('.')[0].split('_')[1]) || Infinity,
    path: process.env.NODE_ENV === 'development'
      ? `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}`
      : null,
    docPath: docFileKey,
    scriptType: null,
    children: []
  }
  scriptFiles.keys().forEach(function (scriptFileKey) {
    let scriptArr = scriptFileKey.split('/')
    if (scriptArr[1] !== type || scriptArr.length > 3) return
    module.scriptType = 'main'
  })
  return module
}
function getChildTypeModule (mainType, pathArr) {
  let module = {
    name: pathArr[ 2 ],
    path: '',
    docPath: '',
    scriptType: null,
    mainType
  }
  docFiles.keys().forEach(function (docFileKey) {
    let docFilePathArr = docFileKey.split('/')
    if (docFilePathArr[ 1 ] !== mainType || docFilePathArr[ 2 ] !== pathArr[ 2 ]) return
    module.path = process.env.NODE_ENV === 'development'
      ? `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}`
      : null
    module.docPath = docFileKey
  })
  if (mainType === 'modules') {
    module.scriptType = 'child'
  }
  if (mainType === 'pages') {
    module.scriptType = 'child'
    routeFiles.keys().forEach(function (routeFileKey) {
      let routerFilePathArr = routeFileKey.split('/')
      if (
        routerFilePathArr.slice(1, routerFilePathArr.length - 2).length === 1 &&
        routerFilePathArr[1] === module.name
      ) {
        module.isHomePage = routeFiles(routeFileKey).default.isHomePage
      }
    })
    indexFiles.keys().forEach(function (indexFileKey) {
      let childPathArr = indexFileKey.split('/')
      if (
        childPathArr[ 1 ] === mainType &&
        childPathArr[ 2 ] === module.name &&
        childPathArr[ childPathArr.length - 1 ] !== 'index' &&
        childPathArr.findIndex(item => item === 'route') !== -1 &&
        childPathArr.findIndex(item => item === 'children') !== -1
      ) {
        let target = module
        childPathArr.slice(3, childPathArr.length - 2).forEach(item => {
          if (item === 'children') {
            if (!target.children) {
              target.children = []
            }
            target = target.children
          } else {
            let res = target.findIndex(targetChildrenItem => targetChildrenItem.name === item)
            if (res === -1) {
              let child = {
                name: item,
                scriptType: 'child',
                mainType
              }
              target.push(child)
              target = child
            } else {
              target = target[res]
            }
          }
        })
        docFiles.keys().forEach(function (docFileKey) {
          let docFilePathArr = docFileKey.split('/')
          if (
            docFilePathArr[ 1 ] === mainType &&
            docFilePathArr[ 2 ] === pathArr[ 2 ] &&
            childPathArr.slice(1, childPathArr.length - 2).join('/') === docFilePathArr.slice(1, docFilePathArr.length - 1).join('/')
          ) {
            target.path = process.env.NODE_ENV === 'development'
              ? `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}`
              : null
            target.docPath = docFileKey
          }
        })
      }
    })
  }
  return module
}

export default {
  components: {
    ...mapComponents('modules/devTool', [
      'panelMain',
      'panelSide'
    ])
  },
  data () {
    return {
      modulePath: '/src',
      docPath: './doc.md',
      ...mapUtils(['compareArr'])
    }
  },
  computed: {
    moduleList () {
      let moduleList = []
      docFiles.keys().forEach(function (docFileKey) {
        let mainTypePathArr = docFileKey.split('/')
        if (
          mainTypePathArr.length === 2 ||
          mainTypePathArr.length > 3
        ) return
        let mainTypeModule = getMainTypeModule(mainTypePathArr, docFileKey)
        moduleList.push(mainTypeModule)
        indexFiles.keys().forEach(function (indexFileKey) {
          let childTypePathArr = indexFileKey.split('/')
          if (
            childTypePathArr[ 1 ] !== mainTypeModule.name ||
            childTypePathArr.length !== 4 ||
            childTypePathArr[ childTypePathArr.length - 1 ] === 'index'
          ) return
          mainTypeModule.children.push(getChildTypeModule(mainTypeModule.name, childTypePathArr))
        })
      })
      moduleList = this.compareArr(moduleList, 'seq')
      return moduleList
    },
    doc () {
      if (this.docPath === './doc.md') {
        return doc
      }
      return docFiles(this.docPath).default
    }
  },
  methods: {
    selectModule (data) {
      if (data === 'index') {
        this.modulePath = '/src'
        this.docPath = './doc.md'
      } else {
        this.modulePath = data.path
        this.docPath = data.docPath
      }
    }
  }
}
</script>
