export default {
  getUsers(state) {
    return state.users
  },

  getDoctors(state) {
    let doctors = []
    state.users.forEach(element => {
      if (element.role === 'Doctor')
        doctors.push(element)
    });
    return doctors;
  }
}