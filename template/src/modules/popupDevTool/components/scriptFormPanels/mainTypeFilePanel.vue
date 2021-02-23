<style scoped>
  .panel{
    margin: 15px 25px 0;
  }
  input[type="file"] {
    border: 1px solid #858585;
  }
</style>

<template lang="pug">
  input.panel(type="file" @change="$emit('sync', $event.target.files[0])")
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  model: {
    name: 'value',
    event: 'sync'
  }
}
</script>
