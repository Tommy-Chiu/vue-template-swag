<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello-world-wrap {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    & .header {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, .3);

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      & h1 {
        font-size: 14px;
      }
      & .memu {
        margin-left: 25px;
        position: relative;

        font-size: 12px;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        & .memu-item {
          margin: 0 10px;
          position: relative;
          & .sub-menu {
            position: absolute;
            z-index: 1;
            padding: 10px;
            border-radius: 5px;
            background-color: white;
            box-shadow: 0 2px 12px rgba(0, 0, 0, .3);

            display: none;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: flex-start;
            & .sub-menu-item {
              padding: 5px;
              white-space: nowrap;
              &:hover {
                background-color: aliceblue;
              }
            }
          }
          &:hover {
            & .sub-menu {
              display: flex;
            }
          }
        }
      }
      & ul {
        padding: 0;
        list-style-type: none;
      }
      & a {
        color: #42b983;
      }
    }
    & .main {
      box-sizing: border-box;
      flex: 1;
      width: 100%;
      height: 0;
      background-color: transparent;
    }
  }
</style>

<template lang="pug">
  div.hello-world-wrap
    div.header
      logo(:itCanGoHome="true")
      h1 Welcome to Your Vue.js App
      ul.memu
        li.memu-item
          span Essential Links
          ul.sub-menu
            li.sub-menu-item(v-for="(item, index) in essentialLinks" :key="index")
              a(:href="item.url" target="_blank") \{{item.name}}
        li.memu-item
          span Ecosystem
          ul.sub-menu
            li.sub-menu-item(v-for="(item, index) in ecosystem" :key="index")
              a(:href="item.url" target="_blank") \{{item.name}}
    router-view.main
</template>

<script>
import { logo } from '@/modules'
// import { mapComponents } from '@/components'
// import { mapDirectives } from '@/directives'
// import { mapFilters } from '@/filters'
// import { mapMixins } from '@/mixins'
// import { mapUtils } from '@/utils'
// import { mapRequests } from '@/requestor'
// import { mapGetters, mapActions } from 'vuex'

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
