<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collapse-panel-wrap {
    transition: all 0.3s;
    & .collapse-head {
      height: 1.5em;
      & .collapse-head-wrap {
        height: 100%;
        position: relative;
      }
      & .fold-switch {
        position: absolute;

        width: 1em;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: all 200ms linear;
      }
      & .collapse-head-description {
        height: 100%;
        float: left;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      & .collapse-head-control {
        height: 100%;
        float: right;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
    & .collapse-body {
      height: auto;
      overflow: hidden;
    }
  }
</style>

<template lang="pug">
  div.collapse-panel-wrap(:class="[ bindClass ]" :style="{ fontSize: size, color }")
    div.collapse-head(:class="{ isActive, isAutoActive: autoFoldSwitchState }" @click="$emit('click')")
      div.collapse-head-wrap
        button.fold-switch(
            v-if="foldSwitchSite && $slots.default"
            :style="{ left: foldSwitchSite === 'left' ? 0 : 'none',right: foldSwitchSite === 'right' ? 0 : 'none',marginLeft: foldSwitchSite === 'left' ? `${indent/2}em` : 'none',transform: foldSwitch ?'rotate(0deg)' :autoFoldSwitchState ?'rotate(45deg)' :'rotate(180deg)' }"
            @click.stop="foldSwitch = !foldSwitch"
          )
          icon(name="arrow-down-line" :size="size" :color="color")
        div.collapse-head-description(:style="{ paddingLeft: `${(foldSwitchSite === 'left' ? 1.2 : 0) + indent / 2}em` }")
          slot(name="extendDescriptionBefore")
          span.title \{{title}}
          slot(name="extendDescriptionBehind")
        div.collapse-head-control(:style="{ paddingRight: `${(foldSwitchSite === 'right' ? 1.2 : 0)}em` }")
          slot(name="extendControl")
    div.collapse-body(v-if="foldSwitch || autoFoldSwitchState")
      slot
</template>

<script>
import { mapComponents } from '@/components'
export default {
  components: {
    ...mapComponents([ 'icon' ])
  },
  props: {
    title: {
      type: String,
      required: true
    },

    indent: {
      type: Number,
      default: 0
    },
    bindClass: {
      type: String
    },
    foldSwitchSite: {
      type: String,
      default: 'right'
    },
    size: {
      type: String,
      default: '18px'
    },
    color: {
      type: String,
      default: '#2c3e50'
    },

    autoFoldSwitchState: {
      type: Boolean,
      default: false
    },
    defaultFoldSwitchState: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean
    }
  },
  data () {
    return {
      foldSwitch: this.defaultFoldSwitchState
    }
  }
}
</script>
