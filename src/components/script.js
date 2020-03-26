const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let componentName = req.body.name
  let componentTemp = `<style scoped>
  .${componentName}-wrap {
    width: 100%;
    height: 100%;
  }
</style>

<template lang="pug">
  div.${componentName}-wrap
</template>

<script>
export default {
  mixins: [],
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  methods: {},
  watch: {}
}
</script>
`
  let basePath = path.resolve(__dirname)
  fs.mkdirSync(`${basePath}/${componentName}`) // mkdir
  process.chdir(`${basePath}/${componentName}`) // cd dir
  fs.writeFileSync(`index.vue`, componentTemp) // componentTemp
  next()
}
