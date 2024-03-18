export default {
  setBatches(state, payload) {
    state.batches = payload
  },

  updateBatch(state, payload) {
    const index = state.batches.findIndex((item) => {
      return item.id === payload.id
    })
    if (index >= 0) {
      state.batches[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update batch. Batch Id: " + payload.id + " not found"
    }
  },

  addBatch(state, payload) {
    state.batches.push(payload)
  }
}