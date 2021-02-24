<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template lang="pug">
  a.logo-wrap(
    :class="itCanGoHome ? 'cr-pointer' : 'cr-auto'"
    :title="itCanGoHome ? '点击将跳转至首页' : ''"
    @click="itCanGoHome && goHome()")
    icon(:name="'logo'" :size="size")
</template>

<script>
export default {
  props: {
    itCanGoHome: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '35px'
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        path: this.$router.options.routes.find(item => item.path === '/').redirect
      })
    }
  }
}
</script>
