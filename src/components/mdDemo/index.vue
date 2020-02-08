<style scoped>
  .md-demo-wrap {
    &.view {
      padding: 20px 24px;
      border: 1px solid #ebedf0;
      border-bottom: none;
      border-radius: 2px 2px 0 0;
    }
    &.description {
      padding: 20px 24px;
      border: 1px solid #ebedf0;
      margin-top: -1px;
      margin-bottom: -1px;
      font-size: 14px;
      color: #444;
      & code {
        color: #444;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 3px 7px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
        font-family: Menlo, Monaco, Consolas, Courier, monospace;
        font-size: 14px;
      }
    }
    &.code {
      padding: 20px 24px;
      border: 1px solid #ebedf0;
      border-top: none;
      border-radius: 0 0 2px 2px;
      background-color: #f7f7f7;
      font-size: 0;
      & code {
        font-family: Consolas, Menlo, Courier, monospace;
        font-size: 14px;
      }
    }
  }
</style>

<template lang="pug">
  div.md-demo-wrap(:class="contentType")
    slot
</template>

<script>
export default {
  props: {
    contentType: {
      type: String,
      required: true
    }
  }
}
</script>
