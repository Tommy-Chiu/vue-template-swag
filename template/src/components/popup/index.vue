<style scoped>
  .popup-wrap {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    & .content {
      position: absolute;
      z-index: 99;
      transition: all 0.5s ease;
    }
  }
</style>

<template lang="pug">
  div.popup-wrap(
      :style="{visibility: popupSwitch ? 'visible' : 'hidden', opacity: popupSwitch ? 1 : 0}"
      v-onElementResize="onResize"
      @click.self="onBlur()"
    )
    div.content(
        :style="{left: `${positionX}px`,top: `${positionY}px`}"
      )
      slot
</template>

<script>
import { mapDirectives } from '@/directives'
import { mapUtils } from '@/utils'

export default {
  directives: {
    ...mapDirectives([ 'onElementResize' ])
  },
  props: {
    eventName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      popupSwitch: false,
      blurSwitch: false,
      positionX: null,
      positionY: null,
      timeOutFlag: null,
      ...mapUtils([ 'bus' ])
    }
  },
  provide () {
    return {
      eventName: this.eventName,

      handleAction: this.handleAction,
      bindAction: this.bindAction,
      removeAction: this.removeAction,
      handleResult: this.handleResult,

      handleResize: this.handleResize,
      bindResize: this.bindResize,
      removeResize: this.removeResize,

      handleBlur: this.handleBlur,
      bindBlur: this.bindBlur,
      removeBlur: this.removeBlur
    }
  },
  methods: {
    handleAction (positionX, positionY) {
      return new Promise((resolve, reject) => {
        this.positionX = positionX
        this.positionY = positionY
        this.popupSwitch = true
        resolve()
      })
    },
    bindAction (fun) {
      this.bus.bindEvent(this.eventName, fun)
    },
    removeAction (fun) {
      this.bus.removeEvent(this.eventName, fun)
    },
    handleResult (res) {
      return new Promise((resolve, reject) => {
        this.popupSwitch = false
        this.positionX = null
        this.positionY = null
        clearTimeout(this.timeOutFlag)
        this.timeOutFlag = setTimeout(() => {
          this.bus.resultEvent(this.eventName, res)
          clearTimeout(this.timeOutFlag)
          resolve()
        }, 500)
      })
    },

    handleResize (positionX, positionY) {
      return new Promise((resolve, reject) => {
        this.positionX = positionX
        this.positionY = positionY
        resolve()
      })
    },
    onResize () {
      if (this.popupSwitch) {
        clearTimeout(this.timeOutFlag)
        this.timeOutFlag = setTimeout(() => {
          this.bus.$emit(`${this.eventName}.resize`)
          clearTimeout(this.timeOutFlag)
        }, 1)
      }
    },
    bindResize (fun) {
      this.bus.$on(`${this.eventName}.resize`, fun)
    },
    removeResize (fun) {
      this.bus.$off(`${this.eventName}.resize`, fun)
    },

    handleBlur (switchVal) {
      return new Promise((resolve, reject) => {
        this.blurSwitch = switchVal
        resolve()
      })
    },
    onBlur () {
      if (this.blurSwitch) {
        this.bus.$emit(`${this.eventName}.blur`)
      }
    },
    bindBlur (fun) {
      this.blurSwitch = true
      this.bus.$on(`${this.eventName}.blur`, fun)
    },
    removeBlur (fun) {
      this.blurSwitch = false
      this.bus.$off(`${this.eventName}.blur`, fun)
    }
  }
}
</script>
