import patientActions from './actions'
import patientGetters from './getters'
import patientMutations from './mutations'

export default {
  state() {
    return {
      patients: [],
    }
  },
  mutations: patientMutations,
  getters: patientGetters,
  actions: patientActions
}