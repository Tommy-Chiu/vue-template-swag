::: demo :::
该组件基于 collapsePanel 公共组件开发：
+ 支持 textKey 设置 文本 字段名；
+ 支持 childrenKey 设置 子级 字段名；
+ 支持 defaultDepth 设置 默认展开深度；
+ 支持 activeNodePath 路径(数组) 设置 指定节点激活状态，并智能展开路径中的节点折叠面板开关；
+ 支持 bindClass 自定义绑定样式class；
+ 支持 foldSwitchSite 设置 箭头位置（left / right）；
+ 支持 槽口形式拓展内容（描述前槽口(extendDescriptionBefore)、描述后槽口（extendDescriptionBehind）、操作区槽口（extendControl）），参考 collapsePanel 公共组件；
```
<style scoped></style>

<template lang="pug">
  infiniteTree(:data="menuList")
</template>

<script>
import { mapComponents } from '@/components'

export default {
  components: {
    ...mapComponents([ 'infiniteTree' ])
  },
  data () {
    return {
      menuList: [
        {
          text: '一级菜单', children: [
            { text: '二级菜单', children: [] },
            {
              text: '二级菜单', children: [
                { text: '三级菜单', children: [] },
                {
                  text: '三级菜单', children: [
                    { text: '四级菜单', children: [] },
                    { text: '四级菜单', children: [] },
                    {
                      text: '四级菜单', children: [
                        {
                          text: '五级菜单', children: [
                            { text: '六级菜单', children: [] }
                          ]
                        }
                      ]
                    },
                    { text: '四级菜单', children: [] }
                  ]
                },
                { text: '三级菜单', children: [] }
              ]
            },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] }
          ]
        },
        {
          text: '一级菜单', children: [
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] }
          ]
        },
        {
          text: '一级菜单', children: [
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] },
            { text: '二级菜单', children: [] }
          ]
        },
        { text: '一级菜单', children: [] },
        { text: '一级菜单', children: [] },
        { text: '一级菜单', children: [] },
        { text: '一级菜单', children: [] }
      ]
    }
  }
}
</script>
```
::: demo :::
