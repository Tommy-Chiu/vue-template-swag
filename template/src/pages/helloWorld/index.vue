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
  }
</style>

<template lang="pug">
  div.hello-world-wrap
    logo
    h1 Welcome to Your Vue.js App
    h2 Essential Links
    ul
      li(v-for="(item, index) in essentialLinks" :key="index")
        a(:href="item.url" target="_blank") \{{item.name}}
    h2 Ecosystem
    ul
      li(v-for="(item, index) in ecosystem" :key="index")
        a(:href="item.url" target="_blank") \{{item.name}}
</template>

<script>
import { logo } from '@/modules'
// import { pageRequestsHelloWorld } from '@/requestor'
// import {
//   // pageUtilHelloWorld,
//   // mapComponents,
//   // mapDirectives,
//   // mapFilters,
//   // mapMixins,
//   // mapGetters,
//   // mapActions
// } from '@/utils'
// let { } = pageRequestsHelloWorld
// let { } = pageUtilHelloWorld

export default {
  components: {
    logo
  },
  directives: {},
  filters: {},
  mixins: [],
  data () {
    return {
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
  computed: {},
  methods: {}
}
</script>
