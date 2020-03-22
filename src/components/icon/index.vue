<style scoped>
  .icon-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
    }
    & svg {
      width: 1em;
      height: 1em;
      line-height: 1;
      vertical-align: -0.15em;
      font-size: Inherit;
      overflow: hidden;
      fill: currentColor;
    }
  }
</style>

<template lang="pug">
  i.icon-wrap(:class="`icon-${name}`" :style="{width: size, height: size, fontSize: size, color}")
    svg(aria-hidden="true")
      use(:xlink:href="`#icon-${name}`")
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#000'
    }
  }
}
</script>
