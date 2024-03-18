import { endPoint } from '@/api/api';
export default {
  async getPatients({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      console.log("key:", key)
      const response = await endPoint.get('/patients', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
     
      if (response.statusText === "OK") {
        commit('setPatients', response.data)
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

  async addPatient({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.post('/patients', payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "Created") {
        commit('addPatient', payload)
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


  // Changing the method from put to post as formdata does not work with put.
  async updatePatient({ commit, getters }, payload) {
    try {
      console.log(payload);
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.patch('/patients/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      },
 
      )
      if (response.statusText === "OK") {
        commit('updatePatient', payload)
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