export default {
  setPatients(state, payload) {
    state.patients = payload
  },

  updatePatient(state, payload) {
    const index = state.patients.findIndex((item) => {
      return item.id === payload.id
    })
    if (index >= 0) {
      state.patients[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update patient. Patient Id: " + payload.id + " not found"
    }
  },

  addPatient(state, payload) {
    state.patients.push(payload)
  }
}