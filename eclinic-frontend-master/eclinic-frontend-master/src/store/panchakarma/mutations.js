export default {
  setPanchakarma(state, payload)  {
    state.panchakarma = payload
  },

  updatePanchakarma(state, payload) {
    const index = state.panchakarma.findIndex((item) => {
      return item.id === payload.id
    })
    if (index >= 0) {
      state.panchakarma[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update panchakarma. Panchakarma Id: " + payload.id + " not found"
    }
  },

  addPanchakarma(state, payload) {
    state.panchakarma.push(payload)
  }
}