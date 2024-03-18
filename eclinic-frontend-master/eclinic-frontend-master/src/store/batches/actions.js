import { endPoint } from '@/api/api';
export default {
  async getBatches({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const authToken = getters.getAuthToken
      const response = await endPoint.get('/batches', {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      if (response.statusText === "OK") {
        commit('setBatches', response.data)
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

  async addBatch({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      // console.log(payload);
      const authToken = getters.getAuthToken
      const response = await endPoint.post('/batches', payload, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
      )
      if (response.statusText === "Created") {
        commit('addBatch', payload)
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

  async updateBatch({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      // console.log(payload);
      const response = await endPoint.patch('/batches/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('updateBatch', payload)
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