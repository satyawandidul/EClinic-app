import userActions from './actions'
import userGetters from './getters'
import userMutations from './mutations'

export default {
  state() {
    return {
      users: [],
    }
  },
  mutations: userMutations,
  getters: userGetters,
  actions: userActions
}