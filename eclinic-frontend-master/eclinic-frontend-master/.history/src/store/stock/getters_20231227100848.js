export default {
  getLocationStock: (state) => (locationId) => {
    // console.log(state.stock);
    return state.stock[locationId]
  }
}


Certainly! You can create a similar getter for retrieving medicine details based on the medicine ID.Here's an example:

javascript
Copy code
export default {
  getMedicineDetails: (state) => (medicineId) => {
    return state.medicineDetails[medicineId];
  }
}