# Feature Demo
## Vuex Demo
<template lang="pug">
  div
    p count：\{{vx_count}}
    p
      button(@click="vx_incrementCount(incrementPayload)") increment(\{{incrementPayload}})
      button(@click="vx_decrementCount(decrementPayload)") decrement(\{{decrementPayload}})
</template>

## Axios & Mock Demo
<template lang="pug">
  div
    p response：\{{response}}
    p
      button(@click="testHttpGet") get
      button(@click="testHttpPost") post
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { moduleHttpPopupDevTool } from '@/http'

  export default {
    data () {
      return {
        incrementPayload: 1,
        decrementPayload: 2,
        response: null
      }
    },
    computed: {
      ...mapGetters('popupDevTool', {
        vx_count: 'getCount'
      })
    },
    destroyed () {
      this.vx_reset()
    },
    methods: {
      ...mapActions('popupDevTool', {
        vx_incrementCount: 'increment_count',
        vx_decrementCount: 'decrement_count',
        vx_reset: 'reset'
      }),
      async testHttpGet () {
        this.response = await moduleHttpPopupDevTool.testHttpGet('testHttpGetData')
          .then((res) => { return res })
          .catch((err) => { return err })
      },
      async testHttpPost () {
        this.response = await moduleHttpPopupDevTool.testHttpPost('testHttpPostData')
          .then((res) => { return res })
          .catch((err) => { return err })
      }
    }
  }
</script>
