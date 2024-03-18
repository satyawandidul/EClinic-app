export default {
  getLocationStock: (state) => (locationId) => {
    // console.log(state.stock);
    return state.stock[locationId]

  },
  getMedicineDetails: (state) => (medicineId) => {
    return state.medicineDetails[medicineId];
  }
};


