<style scoped>
  .panel {
    margin: 15px 25px 0;
  }
</style>

<template lang="pug">
  input.panel(type="text" @change="$emit('sync', $event.target.value)")
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  model: {
    name: 'value',
    event: 'sync'
  }
}
</script>
