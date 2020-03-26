<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dev-tool-wrap {
    position: relative;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, .6);
    width: 90vw;
    height: 90vh;
    border-radius: 10px;
    background-color: white;
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
  popup(:eventName="'popupDevTool'" :ref="'popup'")
    div.dev-tool-wrap
      a.close(@click="handleClose") x
</template>

<script>
import { popup } from '@/components'
import { bus } from '@/utils'

export default {
  components: {
    popup
  },
  data () {
    return {}
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
    handleClose () {
      bus.actionEvent('popupDevTool.hide')
    }
  }
}
</script>
