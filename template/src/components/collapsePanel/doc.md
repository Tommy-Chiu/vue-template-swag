::: demo :::
+ 将内容放置插槽即可；
+ 支持 foldSwitchSite 设置箭头位置（left / right）；
+ 支持 描述前槽口(extendDescriptionBefore)、描述后槽口（extendDescriptionBehind）、操作区槽口（extendControl）自定义拓展；
+ 支持 bindClass 自定义绑定样式class；
+ 支持 indent 设置左侧缩进值；
+ 支持 autoFoldSwitchState 设置智能折起展开，优先级高于组件内置开关状态；
+ 支持 defaultFoldSwitchState 设置默认折起（true）/展开（false）；
+ 支持 isActive 设置激活状态类（结合bindClass可设置高亮等）；
```
<style scoped>
  .list {
    width: 400px;
    margin: 0 auto;
    background-color: white;
    & .item {
      border: 1px dashed #69767c;
      padding: 5px;
    }
    & .slot {
      border: 1px dashed #69767c;
      background-color: #d8d8d8;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .description-before-slot, & .description-behind-slot, & .control-slot {
      height: 100%;
      margin: 0 5px;
      padding: 0 5px;
    }
    & .content-slot {
      height: 50px;
    }
  }
</style>

<template lang="pug">
  div.demo.list
    collapsePanel.item(v-for="item in 8" :key="item" :title="'标题'" bindClass="demo-collapse-panel" :foldSwitchSite="'left'" :size="'12px'" :color="'#5d5f71'")
      div.description-before-slot.slot(slot="extendDescriptionBefore") 描述前槽口
      div.description-behind-slot.slot(slot="extendDescriptionBehind") 描述后槽口
      div.control-slot.slot(slot="extendControl") 操作区槽口
      div.content-slot.slot 内容槽口
</template>

<script>
import { mapComponents } from '@/components'
export default {
  components: {
    ...mapComponents([ 'collapsePanel' ])
  }
}
</script>
```
::: demo :::
