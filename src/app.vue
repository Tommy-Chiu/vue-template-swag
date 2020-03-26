<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    width: 100vw;
    height: 100vh;
  }
</style>

<template lang="pug">
  div#app
    routerView
    popupDevTool
    popupWindow
</template>

<script>
import { popupDevTool } from '@/modules'
import { popupWindow } from '@/components'

export default {
  name: 'app',
  components: {
    popupDevTool,
    popupWindow
  }
}
</script>
