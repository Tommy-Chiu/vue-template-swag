<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template lang="pug">
  div.logo-wrap
    icon(:name="'logo'" :size="'150px'")
</template>

<script>
export default {
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
