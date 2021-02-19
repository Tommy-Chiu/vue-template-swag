<style scoped></style>

<template lang="pug">
  input(type="text" @change="$emit('sync', $event.target.value)")
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
