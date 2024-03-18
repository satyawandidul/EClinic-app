import batchActions from './actions'
import batchGetters from './getters'
import batchMutations from './mutations'

export default {
  state() {
    return {
      batches: [],
    }
  },
  mutations: batchMutations,
  getters: batchGetters,
  actions: batchActions
}