export default {
  getLocationStock: (state) => (locationId) => {
    // console.log(state.stock);
    return state.stock[locationId]

  }
};


