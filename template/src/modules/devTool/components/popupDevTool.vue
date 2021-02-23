<style scoped>
  .popup-dev-tool {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90;
    top: 0;
    left: 50%;
    right: 50%;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: #ffffff;
    box-shadow: 0 5px 12px rgba(0, 0, 0, .3);
    margin: -15px;
    padding: 0;
    border: none;
    outline: none;
    transition: margin 0.3s ease;
    &:hover {
      margin: 0 -15px;
    }
  }
</style>

<template lang="pug">
  a.popup-dev-tool(
      :href="$router.resolve({ name: 'devTool' }).href"
      @click.prevent="handlePopupDevTool"
    )
    icon.lightning(:name="'lightning'" :size="'20px'")
</template>

<script>
import devTool from '../'
import { mapUtils } from '@/utils'

export default {
  name: 'popupDevTool',
  data () {
    return {
      ...mapUtils([ 'bus' ])
    }
  },
  methods: {
    handlePopupDevTool () {
      this.bus.actionEvent('popupWindow', {
        canClose: true,
        canBlur: true,
        jsonSchema: {
          widget: devTool
        }
      })
    }
  }
}
</script>
