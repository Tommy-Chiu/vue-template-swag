## Icons Document
<style scoped>
  .icons-wrap.icon-list {
    width: 100%;
    min-height: 100%;
    padding: 10px 0;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: row;
    flex-wrap: wrap;
    & .icon-item {
      background-color: white;
      border: 1px dashed #9f9f9f;
      border-radius: 5px;
      margin: 5px;
      position: relative;
      transition: all 300ms;
      display: flex;
      justify-content: center;
      align-items: center;
      & .view {
        width: 100px;
        height: 70px;
        padding: 5px;
        background-color: #EFF2F7;
        background-position: 0 0, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        background-clip: content-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & .ctrl {
        position: absolute;
        z-index: 1;
        width: 100px;
        height: 70px;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.4);
        display: none;
        opacity: 0;
        justify-content: center;
        align-items: flex-end;
        & .copy {
          width: 80px;
          height: 20px;
          margin: 0 10px;
          background-color: #42b983;
          color: #2c3e50;
          border-radius: 5px;
          user-select: none;
          cursor: pointer;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &:hover {
        transform: scale(1.2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
        z-index: 1;
        & .ctrl {
          display: flex;
          opacity: 1;
        }
      }
    }
  }
</style>

<template lang="pug">
  div.icons-wrap.icon-list
    div.icon-item(v-for="iconName in icons" :key="iconName")
      div.view
        icon(:name="iconName" :size="'30px'")
      div.ctrl
        a.copy(@click="clipboard(iconName)") copy
</template>

<script>
import { mapUtils } from '@/utils'
import icons from './'

export default {
  data () {
    return {
      ...mapUtils([ 'clipboard' ]),
      icons
    }
  }
}
</script>
