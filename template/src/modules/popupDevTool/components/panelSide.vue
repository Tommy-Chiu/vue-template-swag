<style scoped>
  .panel-side-wrap {
    height: 100%;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    background-color: #42b983;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .3);
    & .go-doc {
      display: block;
      margin: 50px 0;
      & .text {
        font-size: 40px;
        font-weight: bolder;
        user-select: none;
      }
      &.is-normal {
        color: #2C3E50;
      }
      &.is-active {
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
    }
    & .menu {
      box-sizing: border-box;
      flex: 1;
      overflow-y: auto;
      padding: 0 20px 20px 20px;
    }
    & .btn {
      padding: 2px 0;
      margin-left: 5px;
      border: none;
      outline: none;
      background-color: transparent;
      color: inherit;
    }
  }
</style>
<style>
  .dev-tool-panel-side-menu {
    & .collapse-head {
      & .collapse-head-control {
        display: none !important;
      }
    }
    & .collapse-head:hover, & .collapse-head.isActive {
      color: #ffffff;
      & .fold-switch {
        & svg {
          fill: #ffffff;
        }
      }
    }
    & .collapse-head:hover {
      & .collapse-head-control {
        display: flex !important;
      }
    }
    & .title {
      font-size: 20px;
      font-weight: bold;
    }
    &.level-1 {
      & .collapse-head-description {
        & .title {
          font-weight: normal;
        }
      }
    }
  }
</style>

<template lang="pug">
  div.panel-side-wrap
    a.go-doc(
        :class="path === '/src' ? 'is-active' : 'is-normal'"
        @click="() => {this.$emit('selectModule', 'index'); this.activeNodePath = []}"
      )
      span.text \{{'Dev-Tool'}}
    infiniteTree.menu(
        bindClass="dev-tool-panel-side-menu"
        :data="moduleList"
        :textKey="'name'"
        :activeNodePath="activeNodePath"

        @click="(nodeData, targetNodePath) => {this.$emit('selectModule', nodeData); this.activeNodePath = targetNodePath}"
      )
      template(slot="extendDescriptionBehind" slot-scope="{nodeData}")
        span \{{`${nodeData.isHomePage ? ' 🏠' : ''}`}}
      template(slot="extendControl" slot-scope="{nodeData}")
        button.btn(
            v-if="nodeData.scriptType"
            @click.stop="nodeData.scriptType === 'main' ? addModule(nodeData.name, nodeData.path) : addChildModule(nodeData.mainType, nodeData.path)"
          )
          icon(:name="'add-box-line'" :size="'16px'" color="#fff")
</template>

<script>
import { mapComponents } from '@/components'
import { mapUtils } from '@/utils'
import { mapRequests } from '@/requestor'

export default {
  components: {
    ...mapComponents([ 'infiniteTree' ])
  },
  props: {
    path: {
      type: String,
      required: true
    },
    moduleList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      ...mapComponents('modules/popupDevTool', [
        {'scriptFormPanels': ['mainTypeTextPanel', 'mainTypeFilePanel', 'subTypePanel']}
      ]),
      ...mapUtils([ 'bus' ]),
      activeNodePath: []
    }
  },
  methods: {
    ...mapRequests('modules/popupDevTool', [ 'runScript' ]),
    addModule (type, path) {
      switch (type) {
        case 'pages':
        case 'modules':
        case 'components':
        case 'directives':
        case 'filters':
        case 'mixins':
        case 'utils':
          this.bus.actionEvent('popupWindow', {
            title: 'title',
            lead: 'lead',
            canClose: true,
            canBlur: true,
            cancelLabel: 'cancel',
            confirmLabel: 'confirm',
            jsonSchema: {
              widget: this.mainTypeTextPanel,
              model: {
                name: 'sync',
                listener: (context, payload) => {
                  context.listeners[ 'input' ](payload)
                }
              }
            },
            data: ''
          }, ({ status, data }) => {
            if (status === 'confirm') {
              this.runScript({type, targetPath: path, name: data})
            }
          })
          break
        case 'icons':
          this.bus.actionEvent('popupWindow', {
            title: 'title',
            lead: 'lead',
            canClose: true,
            canBlur: true,
            cancelLabel: 'cancel',
            confirmLabel: 'confirm',
            jsonSchema: {
              widget: this.mainTypeFilePanel,
              model: {
                name: 'sync',
                listener: (context, payload) => {
                  context.listeners[ 'input' ](payload)
                }
              }
            },
            data: null
          }, ({ status, data }) => {
            if (status === 'confirm') {
              this.runScript({type, targetPath: path, files: data})
            }
          })
          break
      }
    },
    addChildModule (type, path) {
      this.bus.actionEvent('popupWindow', {
        title: 'title',
        lead: 'lead',
        canClose: true,
        canBlur: true,
        cancelLabel: 'cancel',
        confirmLabel: 'confirm',
        jsonSchema: {
          widget: this.subTypePanel,
          model: {
            name: 'sync',
            listener: (context, payload) => {
              context.listeners[ 'input' ](payload)
            }
          }
        },
        data: {
          mainType: type,
          name: '',
          type: 'components'
        }
      }, ({ status, data }) => {
        if (status === 'confirm') {
          this.runScript({ type, targetPath: path, name: data.name, childType: data.type })
        }
      })
    }
  }
}
</script>
