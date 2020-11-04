<style scoped>
  .md-plugin-wrap {
    & .md-plugin-data {
      display: none;
    }
    &.info, &.warning, &.success, &.error {
      margin: 10px 0;
      position: relative;
      & .md-plugin-result {
        &:before {
          content: '';
          display: block;
          width: 8px;
          height: 100%;

          position: absolute;
          left: 0;
        }
      }
      &.info {
        & .md-plugin-result {
          background-color: rgb(230, 247, 255);
          &:before {
            background-color: #1890FF;
          }
        }
      }
      &.warning {
        & .md-plugin-result {
          background-color: rgba(255,229,100,.3);
          &:before {
            background-color: #e7c000;
          }
        }
      }
      &.success {
        & .md-plugin-result {
          background-color: rgb(246, 255, 237);
          &:before {
            background-color: #46B586;
          }
        }
      }
      &.error {
        & .md-plugin-result {
          background-color: rgb(253, 231, 229);
          &:before {
            background-color: #920505;
          }
        }
      }
    }
  }
</style>

<template lang="pug">
  div.md-plugin-wrap(:class="pluginType")
    div.md-plugin-data(ref="mdPluginData")
      slot
    div.md-plugin-result(ref="mdPluginResult")
</template>

<script>
import echarts from 'echarts'
import mermaid from 'mermaid'
import flowchart from 'flowchart.js'

let mdPluginData, mdPluginResult

export default {
  props: {
    pluginType: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.switchRender()
  },
  updated () {
    this.switchRender()
  },
  methods: {
    switchRender () {
      mdPluginData = this.$refs.mdPluginData
      mdPluginResult = this.$refs.mdPluginResult
      try {
        switch (this.pluginType) {
          case 'info':
          case 'warning':
          case 'success':
          case 'error':
            this.renderNotice()
            break
          case 'echarts':
            this.renderEcharts()
            break
          case 'mermaid':
            this.renderMermaid()
            break
          case 'flowchart':
            this.renderFlowchart()
            break
        }
      } catch (e) {
        this.onError(e)
      }
    },
    renderNotice () {
      mdPluginResult.innerHTML = `<div class="md-notice-title"
                                       style="width: 100%;padding: 5px 0 2.5px 0;text-indent: 15px;font-weight: bolder;">
                                    ${this.pluginType}
                                  </div>
                                  <div class="md-notice-content"
                                       style="width: 100%;padding: 2.5px 0 5px 0;text-indent: 15px;">
                                    ${mdPluginData.childNodes[ 0 ].childNodes[ 0 ].innerText}
                                  </div>`
    },
    renderEcharts () {
      let echartsOption = JSON.parse(mdPluginData.childNodes[ 0 ].childNodes[ 0 ].innerText)
      mdPluginResult.style.width = `${echartsOption.width}px` || 500
      mdPluginResult.style.height = `${echartsOption.height}px` || 400
      echarts.init(mdPluginResult).setOption(echartsOption)
    },
    renderMermaid () {
      let mermaidOption = mdPluginData.childNodes[ 0 ].childNodes[ 0 ].innerText
      mdPluginResult.innerHTML = `${mermaid.mermaidAPI.render('existingSvgId', mermaidOption)}`
    },
    renderFlowchart () {
      let flowchartOption = mdPluginData.childNodes[ 0 ].childNodes[ 0 ].innerText
      mdPluginResult.innerHTML = ''
      flowchart.parse(flowchartOption).drawSVG(mdPluginResult)
    },
    onError (e) {
      mdPluginResult.innerHTML = `<pre>${this.pluginType} complains: ${e}</pre>`
    }
  }
}
</script>
