import { clone } from '@/utils'

const stateTemplate = {
  // count: 0
}
export default {
  state: clone.deep(stateTemplate),
  getters: {
    // getCount (state, getters, rootState, rootGetters) {
    //   return state.count
    // }
  },
  mutations: {
    UPDATE_STATE (state, { type, data }) {
      state[type] = null
      state[type] = data
    }
  },
  actions: {
    // increment_count ({ state, getters, commit, dispatch, rootState, rootGetters }, payload) {
    //   let newCount = getters.getCount + payload
    //   commit('UPDATE_STATE', { type: 'count', data: newCount })
    // },
    // decrement_count ({ state, getters, commit, dispatch, rootState, rootGetters }, payload) {
    //   let newCount = getters.getCount - payload
    //   commit('UPDATE_STATE', { type: 'count', data: newCount })
    // },
    reset ({ commit }) {
      for (let k in stateTemplate) {
        commit('UPDATE_STATE', { type: k, data: stateTemplate[k] })
      }
    }
  }
}
