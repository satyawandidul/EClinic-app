
export default {
  setLocationStock(state, payload) {
    state.stock[payload.locationShortCode] = payload
  }
}