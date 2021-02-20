<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .handle-dev-tool {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90;
    top: 0;
    left: 50%;
    right: 50%;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #ffffff;
    box-shadow: 0 5px 12px rgba(0, 0, 0, .3);
    margin: -15px;
    padding: 0;
    border: none;
    outline: none;
    transition: margin 0.3s ease;
    &:hover {
      margin: 0 -15px;
    }
  }
  .dev-tool-wrap {
    position: relative;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, .6);
    width: 90vw;
    height: 90vh;
    padding: 20px;
    border-radius: 10px;
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
    & .close {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background-color: #42b983;
      color: #2c3e50;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      box-shadow: 0 5px 12px rgba(0, 0, 0, .3);
    }
  }
</style>

<template lang="pug">
  a.handle-dev-tool(@click="handleDevTool")
    icon.lightning(:name="'lightning'" :size="'20px'")
    popup(:eventName="'popupDevTool'" :ref="'popup'")
      div.dev-tool-wrap
        panelSide.panel-side(
          :path="modulePath"
          :moduleList="moduleList"
          @selectModule="selectModule"
        )
        panelMain.panel-main(
          :path="modulePath"
          :doc="doc"
        )
        a.close(@click.stop="handleClose") x
</template>

<script>
// import { moduleRequestsPopupDevTool } from '@/requestor'
import { bus, compareArr,
  // moduleUtilPopupDevTool,
  mapComponents
  // mapDirectives,
  // mapFilters,
  // mapMixins,
  // mapGetters,
  // mapActions
} from '@/utils'
// let { } = moduleRequestsPopupDevTool
// let { } = moduleUtilPopupDevTool
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
    path: process.env.NODE_ENV === 'development' ? `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}` : null,
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
        module.isHomePage = routeFiles(routeFileKey).default.isHomePage || false
      }
    })
  }
  return module
}

export default {
  components: {
    ...mapComponents([
      'popup'
    ]),
    ...mapComponents('modules/popupDevTool', [
      'panelMain',
      'panelSide'
    ])
  },
  data () {
    return {
      modulePath: '/src',
      docPath: './doc.md'
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
      moduleList = compareArr(moduleList, 'seq')
      return moduleList
    },
    doc () {
      if (this.docPath === './doc.md') {
        return doc
      }
      return docFiles(this.docPath).default
    }
  },
  mounted () {
    bus.bindEvent('popupDevTool.show', this.$refs.popup.handleAction)
    bus.bindEvent('popupDevTool.hide', this.$refs.popup.handleResult)
  },
  destroy () {
    bus.removeEvent('popupDevTool.show', this.$refs.popup.handleAction)
    bus.removeEvent('popupDevTool.hide', this.$refs.popup.handleResult)
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
    },
    handleClose () {
      bus.actionEvent('popupDevTool.hide')
    },
    handleDevTool () {
      bus.actionEvent('popupDevTool.show')
    }
  }
}
</script>
