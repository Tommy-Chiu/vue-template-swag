## Icons Document
<style scoped>
  .icons-wrap.icon-list {
    width: 100%;
    min-height: 100%;
    padding: 10px 0;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    & .icon-item {
      background-color: white;
      border: 1px dashed #9f9f9f;
      border-radius: 5px;
      margin: 5px;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;

      position: relative;
      & .view {
        box-sizing: border-box;
        width: 100px;
        height: 70px;
        padding: 5px;
        background-color: #EFF2F7;
        background-position: 0 0, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
        background-clip: content-box;
        z-index: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      & .ctrl {
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0;
        z-index: 2;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        & .copy {
          box-sizing: border-box;
          position: absolute;
          width: 80px;
          height: 20px;
          padding: 2px 10px;
          background-color: #42b983;
          color: #2c3e50;
          border-radius: 5px;
          user-select: none;
          display: none;
          opacity: 0;
          z-index: 2;

          justify-content: center;
          align-items: center;
        }
      }
      &:hover {
        z-index: 2;
        transform: scale(1.2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
        transition: all 300ms;
        & .ctrl {
          & .copy {
            display: flex;
            opacity: 1;
            margin-top: -10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
            transition: all 300ms;
          }
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
