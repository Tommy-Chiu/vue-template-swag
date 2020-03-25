import { clone }
  from '@/utils'

const stateTemplate = {}
export default {
  state: clone.deep(stateTemplate),
  getters: {},
  mutations: {
    UPDATE_STATE (state, { type, data }) {
      state[type] = null
      state[type] = data
    }
  },
  actions: {
    reset ({ commit }) {
      for (let k in stateTemplate) {
        commit('UPDATE_STATE', { type: k, data: stateTemplate[k] })
      }
    }
  }
}
