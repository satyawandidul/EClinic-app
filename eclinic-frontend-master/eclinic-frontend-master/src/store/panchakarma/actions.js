import { endPoint } from '@/api/api';
export default {
  async getPanchakarma({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.get('/panchakarmas', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
      if (response.statusText === "OK") {
        commit('setPanchakarma', response.data)
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

  async addPanchakarma({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.post('/panchakarmas', payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText == "Created") {
        commit('addPanchakarma', payload)
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

  async updatePanchakarma({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      // console.log(payload);
      const response = await endPoint.patch('/panchakarmas/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('updatePanchakarma', payload)
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