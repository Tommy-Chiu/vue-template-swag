<style scoped>
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .infinite-tree-wrap {
    width: 100%;
    height: 100%;
  }
</style>

<template lang="pug">
  ul.infinite-tree-wrap.list(
      :class="[ bindClass, `level-${nodeDepth}` ]"
    )
    li.item(v-for="(item, index) in data" :key="index")
      collapsePanel(
          :title="item[textKey]"
          :indent="nodeDepth"
          :bindClass="bindClass"
          :foldSwitchSite="foldSwitchSite"

          :autoFoldSwitchState="(activeNodePath.length > nodeDepth + 1) && (activeNodePath.slice(0, nodeDepth + 1).join('') === [...nodePath, index].join(''))"
          :defaultFoldSwitchState="nodeDepth < defaultDepth"

          :isActive="activeNodePath.join('') === [...nodePath, index].join('')"
          @click="handleClick(item, [...nodePath, index])"
        )
        template(slot="extendDescriptionBefore" v-if="$scopedSlots.extendDescriptionBefore")
          slot(name="extendDescriptionBefore" :nodeData="item")
        template(slot="extendDescriptionBehind" v-if="$scopedSlots.extendDescriptionBehind")
          slot(name="extendDescriptionBehind" :nodeData="item")
        template(slot="extendControl" v-if="$scopedSlots.extendControl")
          slot(name="extendControl" :nodeData="item")
        infiniteTree(
            v-if="item[childrenKey] && item[childrenKey].length"
            :data="item[childrenKey]"
            :textKey="textKey"
            :childrenKey="childrenKey"
            :defaultDepth="defaultDepth"
            :nodeDepth="nodeDepth + 1"
            :nodePath="[...nodePath, index]"
            :activeNodePath="activeNodePath"
            :bindClass="bindClass"
            :foldSwitchSite="foldSwitchSite"
            @click="handleClick"
          )
          template(slot="extendDescriptionBefore" v-if="$scopedSlots.extendDescriptionBefore" slot-scope="{nodeData}")
            slot(name="extendDescriptionBefore" :nodeData="nodeData")
          template(slot="extendDescriptionBehind" v-if="$scopedSlots.extendDescriptionBehind" slot-scope="{nodeData}")
            slot(name="extendDescriptionBehind" :nodeData="nodeData")
          template(slot="extendControl" v-if="$scopedSlots.extendControl" slot-scope="{nodeData}")
            slot(name="extendControl" :nodeData="nodeData")
</template>

<script>
import { collapsePanel } from '@/components'
export default {
  components: {
    collapsePanel
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    textKey: {
      type: String,
      default: 'text'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    defaultDepth: {
      type: Number,
      default: 2
    },
    nodeDepth: {
      type: Number,
      default: 0
    },
    nodePath: {
      type: Array,
      default: () => []
    },
    activeNodePath: {
      type: Array,
      default: () => []
    },
    bindClass: {
      type: String
    },
    foldSwitchSite: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      foldSwitch: this.nodeDepth < this.defaultDepth
    }
  },
  methods: {
    handleClick (value, targetNodePath) {
      this.$emit('click', value, targetNodePath)
    }
  }
}
</script>
