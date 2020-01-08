<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  button {
    margin: 0 5px;
  }
</style>

<template>
  <div class="hello-world-wrap">
    <img src="../../assets/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-for="(item, index) in essentialLinks" :key="index">
        <a :href="item.url" target="_blank">{{item.name}}</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li v-for="(item, index) in ecosystem" :key="index">
        <a :href="item.url" target="_blank">{{item.name}}</a>
      </li>
    </ul>
    <h2>vuex demo</h2>
    <p>
      <button @click="vx_incrementCount(incrementPayload)">increment({{incrementPayload}})</button>
      <span>{{vx_count}}</span>
      <button @click="vx_decrementCount(decrementPayload)">decrement({{decrementPayload}})</button>
    </p>
    <h2>axios demo</h2>
    <p>{{response}}</p>
    <p>
      <button @click="testHttpGet">get</button>
      <button @click="testHttpPost">post</button>
    </p>
  </div>
</template>

<script>
import { pageHttpHelloWorld } from '@/http'
import { mapGetters, mapActions } from 'vuex'
export default {
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
    }
  }
}
</script>
