import { endPoint } from '@/api/api';
export default {
  async getMedicines({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      console.log("key:", key)
      const response = await endPoint.get('/medicines', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
   console.log(response);
      if (response.statusText === "OK") {
        commit('setMedicines', response.data)
      } else {
        throw "End point returned - ", + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  },

  async getTolerances({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.get('/tolerance', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
      if (response.statusText === "OK") {
        commit('setTolerances', response.data)
      } else {
        throw "End point returned - ", + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  },

  async addMedicine({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.post('/medicines', payload,
        {
          headers: {
            Authorization: 'Bearer ' + key
          }
        }
      ) 
      if (response.statusText == "Created") {
        commit('addMedicine', payload)
      } else {
        throw "End point returned - " + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  },

  async updateMedicine({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
       console.log(payload);
      const response = await endPoint.patch('/medicines/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('updateMedicine', payload)
      } else {
        throw "End point returned - " + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  },

  async addTolerance({ commit, getters, state }, payload) {
    try {
      commit('setIsLoading', true)

      // Check if the entry for same location and same medicine id exists.
      const tol = state.tolerances;
      const filter = obj => obj.locationName === payload.locationName && obj.medicineName === payload.medicineName
      const alreadyExists = tol.some(filter)

      console.log('already exists?');
      if (alreadyExists) {
        console.log('yes');
        throw "Tolerance already set"
      }
      console.log('no');

      const key = getters.getAuthToken
      const response = await endPoint.post('/tolerance', payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      console.log(response);
      if (response.statusText === "Created") {
        commit('addTolerance', payload)
      } else {
        throw "End point returned - " + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  },

  async updateTolerance({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      // console.log(payload);
      const response = await endPoint.patch('/tolerance/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('updateTolerance', payload)
      } else {
        throw "End point returned - " + response.message
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error
      })
    } finally {
      commit('setIsLoading', false)
    }
  }
}