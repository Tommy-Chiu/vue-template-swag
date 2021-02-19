<style scoped>
  .panel {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    & label {
      margin: 5px 5px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      & input[type="radio"] {
        margin-right: 5px;
      }
    }
  }
</style>

<template lang="pug">
  div.panel
    input(type="text" @change="editValue.name = $event.target.value")
    div
      label(
          v-for="(item, i) in [ 'components' , 'directives', 'filters', 'mixins', 'utils' ]" :key="i"
          :for="item"
        )
        input.radio(
          type="radio"
          :value="item"
          :name="item"
          :id="item"
          :checked="item === value.type"
          @change="editValue.type = $event.target.value"
        )
        span \{{item}}
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
  },
  computed: {
    editValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('sync', val)
      }
    }
  }
}
</script>
