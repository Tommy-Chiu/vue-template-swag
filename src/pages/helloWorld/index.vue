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
  </div>
</template>

<script>
export default {
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
  }
}
</script>
