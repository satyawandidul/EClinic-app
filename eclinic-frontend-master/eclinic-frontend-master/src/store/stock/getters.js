export default {
  getLocationStock: (state) => (locationId) => {
     console.log(locationId);
    return state.stock[locationId]
  }
}
// }






