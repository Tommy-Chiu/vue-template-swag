<style scoped>
  .md-demo-wrap {
    padding: 0.8em;
    & p {
      margin: 0;
    }
    &.view {
      border: 1px solid #ebedf0;
      border-bottom: none;
      border-radius: 2px 2px 0 0;
      background-color: #EFF2F7;
      background-position: 0 0, 10px 10px;
      background-size: 20px 20px;
      background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),
      linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      & p {
        margin: 0;
      }
    }
    &.description {
      border: 1px solid #ebedf0;
      margin-top: -1px;
      margin-bottom: -1px;
    }
    &.code {
      border: 1px solid #ebedf0;
      border-top: none;
      border-radius: 0 0 2px 2px;
      background-color: #f7f7f7;
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
