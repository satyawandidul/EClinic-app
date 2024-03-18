import medicineActions from './actions'
import medicineGetters from './getters'
import medicineMutations from './mutations'

export default {
  state() {
    return {
      medicines: [],
      tolerances: [],
    }
  },
  mutations: medicineMutations,
  getters: medicineGetters,
  actions: medicineActions,
}