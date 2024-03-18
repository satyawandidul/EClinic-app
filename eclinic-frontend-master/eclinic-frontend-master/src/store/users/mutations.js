export default {
  setUsers(state, payload) {
    state.users = payload
  },

  updateUser(state, payload) {
    const index = state.users.findIndex((item) => {
      return item.id === payload.id
    })
    if (index >= 0) {
      state.users[index] = payload
    } else {
      this.state.isError = true
      this.state.errorMessage = "Failed to update user. User Id: " + payload.id + " not found"
    }
  },

  addUser(state, payload) {
    state.users.push(payload)
  }
}