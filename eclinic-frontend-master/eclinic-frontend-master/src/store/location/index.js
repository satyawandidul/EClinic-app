import locationActions from './actions'
import locationGetters from './getters'
import locationMutations from './mutations'

export default {
  state() {

    return {
      locations: [],
    }
  },
  mutations: locationMutations,
  getters: locationGetters,
  actions: locationActions
}