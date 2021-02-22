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
    popupDevTool(v-if="$root.process_env.NODE_ENV === 'development'")
    popupWindow
</template>

<script>
import { popupDevTool } from '@/modules'
import { mapComponents } from '@/components'

export default {
  name: 'app',
  components: {
    popupDevTool,
    ...mapComponents([ 'popupWindow' ])
  }
}
</script>
