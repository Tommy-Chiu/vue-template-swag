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
          :firstType="firstType"
          :secondType="secondType"
          :moduleList="getModuleList()"
          @switchType="switchType"
        )
        panelMain.panel-main(
          :firstType="firstType"
          :secondType="secondType"
          :moduleList="getModuleList()"
        )
        a.close(@click.stop="handleClose") x
</template>

<script>
import { popup, moduleComponentPopupDevTool } from '@/components'
import { bus, compareArr } from '@/utils'
let { panelSide, panelMain } = moduleComponentPopupDevTool
let docFiles = require.context('@', true, /\.md$/)
let indexFiles = require.context('@', true, /index/)
let scriptFiles = require.context('@', true, /script\.js$/)

export default {
  components: {
    popup,
    panelSide,
    panelMain
  },
  data () {
    return {
      firstType: 'doc',
      secondType: 'index'
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
    getModuleList () {
      let list = []
      docFiles.keys().forEach(function (docFileKey) {
        let firstTypeArr = docFileKey.split('/')
        if (firstTypeArr.length === 2) return
        if (firstTypeArr.length > 3) return
        let firstType = firstTypeArr[1].split('_')[0]
        let firstTypeItem = {
          name: firstType,
          seq: parseInt(firstTypeArr[2].split('.')[0].split('_')[1]) || Infinity,
          path: `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}`,
          doc: docFiles(docFileKey).default,
          hasScript: null,
          child: []
        }
        scriptFiles.keys().forEach(function (scriptFileKey) {
          let scriptArr = scriptFileKey.split('/')
          if (scriptArr[1] !== firstType || scriptArr.length > 3) return
          firstTypeItem.hasScript = !!scriptFiles(scriptFileKey)
        })
        list.push(firstTypeItem)
        indexFiles.keys().forEach(function (indexFileKey) {
          let secondTypeArr = indexFileKey.split('/')
          if (secondTypeArr[1] !== firstType || secondTypeArr.length !== 4 || (secondTypeArr[secondTypeArr.length - 1] === 'index')) return
          let secondType = secondTypeArr[2]
          let result = list.findIndex((item) => {
            return item.name === firstType
          })
          if (result === -1) return
          let secondTypeItem = {
            name: secondType,
            path: '',
            doc: ''
          }
          docFiles.keys().forEach(function (docFileKey) {
            let secondTypeDocArr = docFileKey.split('/')
            if (secondTypeDocArr[1] !== firstType || secondTypeDocArr[2] !== secondType || secondTypeArr.length !== 4) return
            secondTypeItem.path = `/${docFiles(docFileKey).default.__file.split('/').slice(0, -1).join('/')}`
            secondTypeItem.doc = docFiles(docFileKey).default
          })
          list[result].child.push(secondTypeItem)
        })
      })
      list = compareArr(list, 'seq')
      return list
    },
    switchType (firstType, secondType) {
      this.firstType = firstType
      this.secondType = secondType
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
