import chargeActions from './actions'
import chargeGetters from './getters'
import chargeMutations from './mutations'

export default {
  state() {

    return {
      charges: [],
    }
  },
  mutations: chargeMutations,
  getters: chargeGetters,
  actions: chargeActions
}