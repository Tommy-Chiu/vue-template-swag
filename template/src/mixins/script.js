const fs = require('fs')
const path = require('path')

module.exports = (req, res, next) => {
  let mixinName = req.body.name
  let mixinTemp = `<style scoped>
  .${mixinName}-wrap {
    width: 100%;
    height: 100%;
  }
</style>

<template lang="pug">
  div.${mixinName}-wrap
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
  fs.mkdirSync(`${basePath}/${mixinName}`) // mkdir
  process.chdir(`${basePath}/${mixinName}`) // cd dir
  fs.writeFileSync(`index.vue`, mixinTemp) // mixinTemp
  next()
}
