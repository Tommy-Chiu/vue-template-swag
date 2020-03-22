<style scoped>
  .panel-main-wrap {
    height: 100%;
    padding: 0 0 0 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    & .ctrl {
      height: 50px;
      padding: 0 20px;
      background: #ffffff;
      box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
    }
    & .content {
      flex: 1;
      margin-top: 20px;
      border-radius: 6px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
      position: relative;
      overflow-y: auto;
    }
  }
</style>

<template lang="pug">
  div.panel-main-wrap
    div.ctrl
      strong Path：
      span {{curModule.path}}
    div.content
      component(:is="curModule.doc")
</template>

<script>
import doc from '@/doc.md'

export default {
  props: {
    firstType: {
      type: String,
      required: true
    },
    secondType: {
      type: String,
      required: true
    },
    moduleList: {
      type: Array,
      required: true
    }
  },
  computed: {
    curModule () {
      let module
      if (this.firstType === 'doc' && this.secondType === 'index') {
        module = {
          doc,
          path: `/${doc.__file.split('/').slice(0, -1).join('/')}`
        }
      } else {
        if (this.secondType === 'index') {
          module = this.moduleList.find((item) => {
            return item.name === this.firstType
          })
        } else {
          module = this.moduleList.find((item) => {
            return item.name === this.firstType
          }).child.find((item) => {
            return item.name === this.secondType
          })
        }
      }
      return module
    }
  }
}
</script>
