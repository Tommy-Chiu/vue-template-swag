<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dev-tool-wrap {
    box-sizing: border-box;
    width: 100% !important;
    height: 100% !important;
  }
</style>

<template lang="pug">
  devTool.dev-tool-wrap
</template>

<script>
import { devTool } from '@/modules'

export default {
  components: {
    devTool
  }
}
</script>
