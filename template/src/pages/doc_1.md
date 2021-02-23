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
      button(@click="handleTestHttpGet") get
      button(@click="handleTestHttpPost") post
</template>

<script>
import { mapRequests } from '@/requestor'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      incrementPayload: 1,
      decrementPayload: 2,
      response: null
    }
  },
  computed: {
    ...mapGetters('modules/devTool', {
      vx_count: 'getCount'
    })
  },
  destroyed () {
    this.vx_reset()
  },
  methods: {
    ...mapRequests('modules/devTool', [ 'testHttpGet', 'testHttpPost' ]),
    ...mapActions('modules/devTool', {
      vx_incrementCount: 'increment_count',
      vx_decrementCount: 'decrement_count',
      vx_reset: 'reset'
    }),
    async handleTestHttpGet () {
      this.response = await this.testHttpGet('testHttpGetData')
        .then((res) => { return res })
        .catch((err) => { return err })
    },
    async handleTestHttpPost () {
      this.response = await this.testHttpPost('testHttpPostData')
        .then((res) => { return res })
        .catch((err) => { return err })
    }
  }
}
</script>
