import { endPoint } from '@/api/api';
export default {
  async getUsers({ commit, getters }) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.get('/users', {
        headers: {
          Authorization: 'Bearer ' + key
        }
      })
      if (response.statusText === "OK") {
        commit('setUsers', response.data)
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

  async addUser({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      // console.log(payload);
      const response = await endPoint.post('/users', payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText == "Created") {
        commit('addUser', payload)
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

  async updateUser({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true)
      const key = getters.getAuthToken
      const response = await endPoint.patch('/users/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key
        }
      }
      )
      if (response.statusText === "OK") {
        commit('updateUser', payload)
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
}