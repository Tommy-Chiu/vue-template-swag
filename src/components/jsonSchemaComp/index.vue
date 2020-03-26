<script>
export default {
  functional: true,
  props: {
    value: {},
    jsonSchema: {
      type: Object,
      required: true
    }
  },
  render: (createElement, context) => {
    let { widget, ...widgetConfig } = context.props.jsonSchema
    if (Object.keys(context.props).findIndex((item) => {
      return item === 'value'
    }) !== -1 && context.props.value !== undefined) {
      if (!widgetConfig.props) {
        widgetConfig[ 'props' ] = {}
      }
      if (!widgetConfig.attrs) {
        widgetConfig[ 'attrs' ] = {}
      }
      widgetConfig[ 'props' ][ 'value' ] = widgetConfig[ 'attrs' ][ 'value' ] = context.props.value
    }
    if (widgetConfig.model) {
      if (!widgetConfig.on) {
        widgetConfig[ 'on' ] = {}
      }
      widgetConfig[ 'on' ][widgetConfig.model.name] = (payload) => {
        widgetConfig.model.listener(context, payload)
      }
    }
    return createElement(widget, widgetConfig)
  }
}
</script>
