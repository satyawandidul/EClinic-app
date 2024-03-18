import stockActions from './actions'
import stockGetters from './getters'
import stockMutations from './mutations'

export default {
  state() {
    return {
      stock: [],
      locations: []
    }
  },

  mutations: stockMutations,
  getters: stockGetters,
  actions: stockActions
}