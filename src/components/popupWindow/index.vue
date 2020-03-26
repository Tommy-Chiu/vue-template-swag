<template lang="pug">
  popup(:eventName="eventName")
    window(
        :title="title"
        :lead="lead"
        :canClose="canClose"
        :canBlur="canBlur"
        :cancelLabel="cancelLabel"
        :confirmLabel="confirmLabel"
      )
</template>

<script>
import popup from '../popup'
import window from './window'

export default {
  props: {
    eventName: {
      type: String,
      default: 'popupWindow'
    },
    title: {
      type: String
    },
    lead: {
      type: String
    },
    canClose: {
      type: Boolean
    },
    canBlur: {
      type: Boolean
    },
    cancelLabel: {
      type: String
    },
    confirmLabel: {
      type: String
    }
  },
  components: {
    popup,
    window
  }
}
</script>
