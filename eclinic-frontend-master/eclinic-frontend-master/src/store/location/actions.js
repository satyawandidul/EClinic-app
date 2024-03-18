import { endPoint } from '@/api/api';
export default {
  async getLocations({ commit }) {
    try {
      commit('setIsLoading', true)
      const response = await endPoint.get('/locations')
    
      if (response.statusText === "OK") {
        commit('setLocations', response.data)
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

  async addLocation({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      
      const response = await endPoint.post('/locations', payload,
        {
          headers: {
            Authorization: 'Bearer ' + key
          }
        }
      )
      if (response.statusText == "Created") {
        commit('addLocation', payload)
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

  async updateLocation({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      
      
      const response = await endPoint.patch('/locations/' + payload.id, payload,
        {
          headers: {
            Authorization: 'Bearer ' + key
          }
        }
      )
      if (response.statusText === "OK") {
        commit('updateLocation', payload)
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