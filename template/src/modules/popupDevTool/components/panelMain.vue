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
      padding: 50px;
      margin-top: 20px;
      border-radius: 6px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
      position: relative;
      overflow-y: auto;
    }
  }
</style>

<style>
  @import 'highlight.js/styles/atom-one-dark.css';
  .mdStyle {
    font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif !important;
    font-size: 14px;
    color: #34495e;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6em;
    letter-spacing: 0;
    margin: 0;
    overflow-x: hidden;
    /* paragraph */
    & p {
      margin: 0.8em 0;
    }
    /* header */
    & h1, & h2, & h3, & h4, & h5, & h6 {
      margin-top: 1em;
      margin-bottom: 1em;
      font-weight: bold;
      line-height: 1.4;
      cursor: text;
    }
    & h1 {
      padding-bottom: .4em;
      font-size: 2.2em;
      line-height: 1.3;
    }
    & h2 {
      font-size: 1.75em;
      line-height: 1.225;
      margin: 35px 0 15px;
      padding-bottom: 0.5em;
      border-bottom: 1px solid #ddd;
    }
    & h3 {
      font-size: 1.4em;
      line-height: 1.43;
      margin: 20px 0 7px;
    }
    & h4 {
      font-size: 1.2em;
    }
    & h5 {
      font-size: 1em;
    }
    & h6 {
      font-size: 1em;
      color: #777;
    }
    /* horizontal rule */
    & hr {
      height: 2px;
      padding: 0;
      margin: 16px 0;
      background-color: #e7e7e7;
      border: 0 none;
      overflow: hidden;
      box-sizing: content-box;
    }
    /* blockquote */
    & blockquote {
      padding: 10px 15px;
      border-left: 4px solid #42b983;
      margin: 0.8em 0;
      background-color: rgba(66, 185, 131, .1);
      color: #777;
    }
    /* list */
    & ul, & ol {
      padding-left: 30px;
      margin: 0.8em 0;
      & ul, & ol {
        margin: 0 0;
      }
    }
    /* table */
    & table {
      padding: 0;
      margin: 0.8em 0;
      word-break: initial;
      & tr {
        margin: 0;
        padding: 0;
        &:nth-child(2n) {
          background-color: #fafafa;
        }
        & th:first-child, & td:first-child {
          margin-top: 0;
        }
        & th:last-child, & td:last-child {
          margin-bottom: 0;
        }
      }
      & thead {
        background-color: rgb(242, 242, 242);
        & th {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
          margin: 0;

          font-weight: bold;
          text-align: left;
        }
      }
      & tbody {
        background-color: #ffffff;
        & td {
          padding: 6px 13px;
          border: 1px solid #dfe2e5;
          margin: 0;

          text-align: left;
        }
      }
    }
    /* link */
    & a {
      color: #42b983;
      font-weight: 600;
      padding: 0 2px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    /* code */
    & pre {
      margin: 0 2px;
      padding: 12px;
      border-radius: 2px;
      background-color: #F8F8F8
    }
    /* image */
    & img {
      max-width: 100%;
      border-radius: 3px;
      font-family: Consolas, "Liberation Mono", Courier, monospace;
      padding: 2px 0 0 4px;
      font-size: 0.9em;
    }
    /* definition list */
    & dl {
      margin: 0.8em 0;
    }
    /* mark */
    & mark {
      background-color: #EBFFEB;
      border-radius: 2px;
      padding: 2px 4px;
      margin: 0 2px;
      color: #222;
      font-weight: 500;
    }
  }
</style>

<template lang="pug">
  div.panel-main-wrap
    div.ctrl
      strong Path：
      span {{path}}
    div.content
      component.mdStyle(:is="doc")
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    doc: {
      type: Object,
      required: true
    }
  }
}
</script>
