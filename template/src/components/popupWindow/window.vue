<style scoped>
  .window-wrap {
    min-width: 450px;
    min-height: 300px;
    position: relative;
    & .close {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 30px;
      height: 30px;
      padding: 0;
      border-radius: 100%;
      border: none;
      outline: none;
      background-color: #42b983;
      color: #2c3e50;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      box-shadow: 0 5px 12px rgba(0, 0, 0, .3);
      z-index: 1;
    }
    & div {
      overflow: hidden;
      &:first-of-type {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      &:last-of-type {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    & .header {
      padding: 15px 25px 0;
      background-color: #fafafa;
      & .title {
        margin: 0;
        line-height: 32px;
        text-align: center;
        font-size: 24px;
      }
      & .lead {
        padding: 8px 0 15px 0;
        margin: 0;
        text-align: center;
      }
    }
    & .content {
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .footer {
      padding: 15px 25px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      & button {
        padding: 10px 15px;
        margin: 0 8px;
        border: none;
        border-radius: 4px;
        overflow: hidden;
        outline: none;
        user-select: none;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        &.cancel {
          background-color: #ffffff;
          color: #3C3C43;
          &:hover {
            background-color: #f2f2f2;
            color: #2c3e50;
          }
          &:active {
            background-color: #e5e5ea;
            color: #2c3e50;
          }
        }
        &.confirm {
          background-color: #42b983;
          color: #3C3C43;
          &:hover {
            background-color: #46ca90;
            color: #2c3e50;
          }
          &:active {
            background-color: #46d298;
            color: #2c3e50;
          }
        }
      }
    }
  }
</style>

<template lang="pug">
  div.window-wrap
    button.close(v-if="parmsCanClose" @click="onClose") x
    div.header(v-if="parmsTitle")
      p.title \{{ parmsTitle }}
      p.lead(v-if="parmsLead") \{{ parmsLead }}
    div.content
      jsonSchemaComp(v-if="jsonSchema" v-model="data" :jsonSchema="jsonSchema")
    div.footer(v-if="parmsCancelLabel || parmsConfirmLabel")
      button.cancel(v-if="parmsCancelLabel" @click="onCancel") \{{parmsCancelLabel}}
      button.confirm(v-if="parmsConfirmLabel" @click="onConfirm") \{{parmsConfirmLabel}}
</template>

<script>
import { mapComponents } from '@/components'
import { mapUtils } from '@/utils'

export default {
  name: 'window',
  props: {
    title: {
      type: String
    },
    lead: {
      type: String
    },
    canClose: {
      type: Boolean
    },
    canBlur: {
      type: Boolean
    },
    cancelLabel: {
      type: String
    },
    confirmLabel: {
      type: String
    }
  },
  components: {
    ...mapComponents([ 'jsonSchemaComp' ])
  },
  inject: [
    'handleAction', 'handleResult',
    'bindAction', 'removeAction',
    'bindBlur', 'removeBlur'
  ],
  data () {
    return {
      parmsTitle: null,
      parmsLead: null,
      parmsCanClose: null,
      parmsCanBlur: null,
      parmsCancelLabel: null,
      parmsConfirmLabel: null,
      jsonSchema: null,
      data: null,
      ...mapUtils([ 'getTypeOfData' ])
    }
  },
  created () {
    this.bindAction(this.onOpen)
    this.bindBlur(this.onBlur)
  },
  beforeDestroy () {
    this.removeAction(this.onOpen)
    this.removeBlur(this.onBlur)
  },
  methods: {
    onReset () {
      this.parmsTitle = null
      this.parmsLead = null
      this.parmsCanClose = null
      this.parmsCanBlur = null
      this.parmsCancelLabel = null
      this.parmsConfirmLabel = null
      this.jsonSchema = null
      this.data = null
    },
    onInit (parms) {
      this.onReset()
      let { title, lead, canClose, canBlur, cancelLabel, confirmLabel, jsonSchema, data } = parms
      this.parmsTitle = this.getTypeOfData(title) === 'string' ? title : this.title
      this.parmsLead = this.getTypeOfData(lead) === 'string' ? lead : this.lead
      this.parmsCanClose = this.getTypeOfData(canClose) === 'boolean' ? canClose : this.canClose
      this.parmsCanBlur = this.getTypeOfData(canBlur) === 'boolean' ? canBlur : this.canBlur
      this.parmsCancelLabel = this.getTypeOfData(cancelLabel) === 'string' ? cancelLabel : this.cancelLabel
      this.parmsConfirmLabel = this.getTypeOfData(confirmLabel) === 'string' ? confirmLabel : this.confirmLabel
      this.jsonSchema = jsonSchema || null
      this.data = data || null
    },
    onOpen (parms) {
      this.onInit(parms)
      this.handleAction({outsideColor: 'rgba(0, 0, 0, .6)'})
    },
    onBlur () {
      if (this.parmsCanBlur) {
        this.handleResult({status: 'blur', data: null}).then(() => {
          this.onReset()
        })
      }
    },
    onClose () {
      this.handleResult({status: 'close', data: null}).then(() => {
        this.onReset()
      })
    },
    onCancel () {
      this.handleResult({status: 'cancel', data: null}).then(() => {
        this.onReset()
      })
    },
    onConfirm () {
      this.handleResult({status: 'confirm', data: this.data}).then(() => {
        this.onReset()
      })
    }
  }
}
</script>
