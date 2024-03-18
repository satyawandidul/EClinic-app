export default {
  setLocations(state, payload) {
    state.locations = payload
  },

  updateLocation(state, payload) {
    const index = state.locations.findIndex((item) => {
      return item.id === payload.id
    })
    if (index >= 0) {
      state.locations[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update location. Location Id: " + payload.id + " not found"
    }
  },

  addLocation(state, payload) {
    state.locations.push(payload)
  }
}