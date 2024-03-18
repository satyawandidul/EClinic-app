export default {
  setMedicines(state, payload) {
    state.medicines = payload
  },

  updateMedicine(state, payload) {
    const index = state.medicines.findIndex((item) => {
      return item.id === payload.id
    })

    if (index >= 0) {
      state.medicines[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update medicine. Medicine Id: " + payload.id + " not found"
    }
  },

  addMedicine(state, payload) {
    state.medicines.push(payload)
  },

  setTolerances(state, payload) {
    state.tolerances = payload
  },

  updateTolerance(state, payload) {
    const index = state.tolerances.findIndex((item) => {
      return item.id === payload.id
    })

    if (index >= 0) {
      state.tolerances[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update tolerance. Id: " + payload.id + " not found"
    }
  },

  addTolerance(state, payload) {
    state.tolerances.push(payload)
  }
}