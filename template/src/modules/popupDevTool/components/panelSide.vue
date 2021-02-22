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
        :class="path === '/src' ? 'is-active' : 'is-normal'"
        @click="$emit('selectModule', 'index')"
      )
      span.text \{{'Dev-Tool'}}
    ul.first-tab-list
      li.first-tab-item(v-for="(firstTabItem, index) in moduleList" :key="index")
        a.go-path(
            :class="firstTabItem.path === path ? 'is-active' : 'is-normal'"
            @click="$emit('selectModule', firstTabItem)"
          )
          span.text \{{firstTabItem.name}}
          button.btn(
              v-if="firstTabItem.scriptType"
              @click.stop="addModule(firstTabItem.name, firstTabItem.path)"
            )
            icon(:name="'add-box-line'" :size="'16px'" color="#fff")
        ul.second-tab-list
          li.second-tab-item(v-for="(secondTabItem, i) in firstTabItem.children" :key="i")
            a.go-path(
                :class="secondTabItem.path === path ? 'is-active' : 'is-normal'"
                @click="$emit('selectModule', secondTabItem)"
              )
              span.text \{{secondTabItem.name}}\{{`${secondTabItem.isHomePage ? ' 🏠' : ''}`}}
              button.btn(
                  v-if="secondTabItem.scriptType"
                  @click.stop="addChildModule(firstTabItem.name, secondTabItem.path)"
                )
                icon(:name="'add-box-line'" :size="'16px'" color="#fff")
</template>

<script>
import { mapComponents } from '@/components'
import { mapUtils } from '@/utils'
import { mapRequests } from '@/requestor'

export default {
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
      ...mapUtils([ 'bus' ])
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
