<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello-world-wrap {
    text-align: center;
    padding-top: 60px;
    & h1, & h2 {
      font-weight: normal;
    }

    & ul {
      list-style-type: none;
      padding: 0;
      & li {
        display: inline-block;
        margin: 0 10px;
        & a {
          color: #42b983;
        }
      }
    }

    & button {
      margin: 0 5px;
    }
  }
</style>

<template lang="pug">
  div.hello-world-wrap
    logo
    h1 Welcome to Your Vue.js App
    h2 Essential Links
    ul
      li(v-for="(item, index) in essentialLinks" :key="index")
        a(:href="item.url" target="_blank") {{item.name}}
    h2 Ecosystem
    ul
      li(v-for="(item, index) in ecosystem" :key="index")
        a(:href="item.url" target="_blank") {{item.name}}
    h2 vuex demo
    p
      button(@click="vx_incrementCount(incrementPayload)") increment({{incrementPayload}})
      span {{vx_count}}
      button(@click="vx_decrementCount(decrementPayload)") decrement({{decrementPayload}})
    h2 axios demo
    p {{response}}
    p
      button(@click="testHttpGet") get
      button(@click="testHttpPost") post
    h2 markdown demo
    doc
    h2 devTool
    p
      button(@click="handleDevTool") popupDevTool
</template>

<script>
import { logo } from '@/modules'
// import { pageComponentHelloWorld } from '@/components'
// import { pageDirectiveHelloWorld } from '@/directives'
// import { pageFilterHelloWorld } from '@/filters'
// import { pageMixinHelloWorld } from '@/mixins'
// import { pageUtilHelloWorld } from '@/utils'
import { bus } from '@/utils'
import { pageHttpHelloWorld } from '@/http'
import { mapGetters, mapActions } from 'vuex'
// let { } = pageComponentHelloWorld
// let { } = pageDirectiveHelloWorld
// let { } = pageFilterHelloWorld
// let { } = pageMixinHelloWorld
// let { } = pageUtilHelloWorld
import doc from '@/doc.md'

export default {
  components: {
    logo,
    doc
  },
  directives: {},
  filters: {},
  mixins: [],
  data () {
    return {
      incrementPayload: 1,
      decrementPayload: 2,
      response: null,
      essentialLinks: [
        {
          name: 'Core Docs',
          url: 'https://vuejs.org'
        },
        {
          name: 'Forum',
          url: 'https://forum.vuejs.org'
        },
        {
          name: 'Community Chat',
          url: 'https://chat.vuejs.org'
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/vuejs'
        },
        {
          name: 'Docs for This Template',
          url: 'http://vuejs-templates.github.io/webpack/'
        }
      ],
      ecosystem: [
        {
          name: 'vue-router',
          url: 'http://router.vuejs.org/'
        },
        {
          name: 'vuex',
          url: 'http://vuex.vuejs.org/'
        },
        {
          name: 'vue-loader',
          url: 'http://vue-loader.vuejs.org/'
        },
        {
          name: 'awesome-vue',
          url: 'https://github.com/vuejs/awesome-vue'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('helloWorld', {
      vx_count: 'getCount'
    })
  },
  destroyed () {
    this.vx_reset()
  },
  methods: {
    ...mapActions('helloWorld', {
      vx_incrementCount: 'increment_count',
      vx_decrementCount: 'decrement_count',
      vx_reset: 'reset'
    }),
    async testHttpGet () {
      this.response = await pageHttpHelloWorld.testHttpGet('testHttpGetData')
        .then((res) => { return res })
        .catch((err) => { return err })
    },
    async testHttpPost () {
      this.response = await pageHttpHelloWorld.testHttpPost('testHttpPostData')
        .then((res) => { return res })
        .catch((err) => { return err })
    },
    handleDevTool () {
      bus.actionEvent('popupDevTool.show')
    }
  }
}
</script>
