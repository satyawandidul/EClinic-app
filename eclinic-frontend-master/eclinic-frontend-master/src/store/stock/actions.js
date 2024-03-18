import { endPoint } from '@/api/api'
export default {
  async getLocationStock({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.get('/stocks/' + payload.locationId, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('setLocationStock', response.data)
      } else {
        throw 'End point returned - ' + response.message
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

  async createStock({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.post('/stocks', payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
      if (response.statusText === "OK") {
        commit('setLocationStock', payload)
      } else {
        throw 'End point returned - ' + response.message
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
