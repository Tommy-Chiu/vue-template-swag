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
import { mapComponents } from '@/components'
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
    ...mapComponents([ 'popup' ]),
    window
  }
}
</script>
