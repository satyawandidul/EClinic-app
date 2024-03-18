import { endPoint } from '@/api/api';
export default {
  async getCharges({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.get('/charges', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })

      if (response.statusText === "OK") {
        commit('setCharges', response.data)
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

  async updateCharges({ commit, getters }, payload) {
    try {
      const key = getters.getAuthToken
      // console.log(payload);
      commit('setIsLoading', true)
      const response = await endPoint.patch('/charges/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('setCharges', payload)
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