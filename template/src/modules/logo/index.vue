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
// import { moduleComponentLogo } from '@/components'
// import { moduleDirectiveLogo } from '@/directives'
// import { moduleFilterLogo } from '@/filters'
// import { moduleMixinLogo } from '@/mixins'
// import { moduleUtilLogo } from '@/utils'
// import { moduleHttpLogo } from '@/http'
import { mapGetters, mapActions } from 'vuex'
// let { } = moduleComponentLogo
// let { } = moduleDirectiveLogo
// let { } = moduleFilterLogo
// let { } = moduleMixinLogo
// let { } = moduleUtilLogo

export default {
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  data () {
    return {}
  },
  computed: {
    ...mapGetters('logo', {})
  },
  destroyed () {
    this.vx_reset()
  },
  methods: {
    ...mapActions('logo', {
      vx_reset: 'reset'
    })
  }
}
</script>
