<style scoped>
  .panel-side-wrap {
    height: 100%;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    background-color: #42b983;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .3);
    & .go-doc {
      display: block;
      margin: 50px 0;
      & .text {
        font-size: 40px;
        font-weight: bolder;
        user-select: none;
      }
      &.is-normal {
        color: #2C3E50;
      }
      &.is-active {
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
    }
    & .go-path {
      display: block;
      text-align: left;
      & .text {
        padding: 0;
        line-height: 20px;
        user-select: none;
      }
      &.is-normal {
        color: #2C3E50;
      }
      &.is-active {
        color: #fff;
      }
      &:hover {
        color: #fff;
      }
    }
    & .first-tab-list {
      flex: 1;
      margin: 0;
      padding: 0 20px 20px 20px;
      overflow-y: auto;
      list-style: none;
      & .first-tab-item {
        list-style: none;
        & .go-path {
          padding: 5px 0;
          font-size: 20px;
          font-weight: 700;
          text-indent: 10px;
        }
        & .second-tab-list {
          padding-left: 5px;
          list-style: none;
          & .second-tab-item {
            height: auto;
            list-style: none;
            & .go-path {
              padding: 5px 0 5px 15px;
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>

<template lang="pug">
  div.panel-side-wrap
    a.go-doc(
        :class="firstType === 'doc' && secondType === 'index' ? 'is-active' : 'is-normal'"
        @click="$emit('switchType', 'doc', 'index')"
      )
      span.text {{'Dev-Tool'}}
    ul.first-tab-list
      li.first-tab-item(v-for="(firstTabItem, index) in moduleList" :key="index")
        a.go-path(
            :class="firstTabItem.name === firstType && secondType === 'index' ? 'is-active' : 'is-normal'"
            @click="$emit('switchType', firstTabItem.name, 'index')"
          )
          span.text {{firstTabItem.name}}
        ul.second-tab-list
          li.second-tab-item(v-for="(secondTabItem, i) in firstTabItem.child" :key="i")
            a.go-path(
                :class="firstTabItem.name === firstType && secondTabItem.name === secondType ? 'is-active' : 'is-normal'"
                @click="$emit('switchType', firstTabItem.name, secondTabItem.name)"
              )
              span.text {{secondTabItem.name}}
</template>

<script>
export default {
  props: {
    firstType: {
      type: String,
      required: true
    },
    secondType: {
      type: String,
      required: true
    },
    moduleList: {
      type: Array,
      required: true
    }
  }
}
</script>
