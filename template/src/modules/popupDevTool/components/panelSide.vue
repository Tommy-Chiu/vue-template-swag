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
    & .go-path {
      display: block;
      text-align: left;
      & .text {
        padding: 0;
        line-height: 20px;
        user-select: none;
      }
      & .btn {
        padding: 2px 0;
        border: none;
        outline: none;
        background-color: transparent;
        float: right;
        display: none;
        color: inherit;
      }
      &.is-normal {
        color: #2C3E50;
      }
      &.is-active {
        color: #fff;
      }
      &:hover {
        color: #fff;
        & .btn {
          display: block;
        }
      }
    }
    & .first-tab-list {
      flex: 1;
      margin: 0;
      padding: 0 20px 20px 20px;
      overflow-y: auto;
      list-style: none;
      & .first-tab-item {
        list-style: none;
        & .go-path {
          padding: 5px 0;
          font-size: 20px;
          font-weight: 700;
          text-indent: 10px;
        }
        & .second-tab-list {
          padding-left: 5px;
          list-style: none;
          & .second-tab-item {
            height: auto;
            list-style: none;
            & .go-path {
              padding: 5px 0 5px 15px;
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>

<template lang="pug">
  div.panel-side-wrap
    a.go-doc(
        :class="firstType === 'doc' && secondType === 'index' ? 'is-active' : 'is-normal'"
        @click="$emit('switchType', 'doc', 'index')"
      )
      span.text \{{'Dev-Tool'}}
    ul.first-tab-list
      li.first-tab-item(v-for="(firstTabItem, index) in moduleList" :key="index")
        a.go-path(
            :class="firstTabItem.name === firstType && secondType === 'index' ? 'is-active' : 'is-normal'"
            @click="$emit('switchType', firstTabItem.name, 'index')"
          )
          span.text \{{firstTabItem.name}}
          button.btn(v-if="firstTabItem.hasScript" @click.stop="handleScript(firstTabItem.name, firstTabItem.path)")
            icon(:name="'add-box-line'" :size="'16px'" color="#fff")
        ul.second-tab-list
          li.second-tab-item(v-for="(secondTabItem, i) in firstTabItem.child" :key="i")
            a.go-path(
                :class="firstTabItem.name === firstType && secondTabItem.name === secondType ? 'is-active' : 'is-normal'"
                @click="$emit('switchType', firstTabItem.name, secondTabItem.name)"
              )
              span.text \{{secondTabItem.name}}\{{`${secondTabItem.isHomePage ? ' 🏠' : ''}`}}
              button.btn(
                  v-if="firstTabItem.name === 'pages' || firstTabItem.name === 'modules'"
                  @click.stop="addSubModule(firstTabItem.name, secondTabItem.path)"
                )
                icon(:name="'add-box-line'" :size="'16px'" color="#fff")
</template>

<script>
import { moduleRequestsPopupDevTool } from '@/requestor'
import { bus,
  // moduleUtilPopupDevTool,
  mapComponents
  // mapDirectives,
  // mapFilters,
  // mapMixins,
  // mapGetters,
  // mapActions
} from '@/utils'
let { runScript } = moduleRequestsPopupDevTool
// let { } = moduleUtilPopupDevTool

export default {
  props: {
    firstType: {
      type: String,
      required: true
    },
    secondType: {
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
      ])
    }
  },
  methods: {
    handleScript (type, path) {
      switch (type) {
        case 'pages':
        case 'modules':
        case 'components':
        case 'directives':
        case 'filters':
        case 'mixins':
        case 'utils':
          bus.actionEvent('popupWindow', {
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
              runScript({type, path, name: data})
            }
          })
          break
        case 'icons':
          bus.actionEvent('popupWindow', {
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
              runScript({type, path, files: data})
            }
          })
          break
      }
    },
    addSubModule (type, path) {
      bus.actionEvent('popupWindow', {
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
          name: '',
          type: 'components'
        }
      }, ({ status, data }) => {
        if (status === 'confirm') {
          runScript({ type, path, name: data.name, subType: data.type })
        }
      })
    }
  }
}
</script>
