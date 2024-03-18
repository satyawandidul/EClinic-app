export default {
  async getUsers({ commit, getters }) {
    try {
      commit('setIsLoading', true);
      const key = getters.getAuthToken;
      const response = await endPoint.get('/users', {
        headers: {
          Authorization: 'Bearer ' + key,
        },
      });
      if (response.status === 200) {
        commit('setUsers', response.data);
      } else {
        throw new Error("End point returned - " + JSON.stringify(response.data));
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error.message,
      });
    } finally {
      commit('setIsLoading', false);
    }
  },

  async addUser({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true);
      const key = getters.getAuthToken;
      const response = await endPoint.post('/users', payload, {
        headers: {
          Authorization: 'Bearer ' + key,
        },
      });
      if (response.status === 201) {
        commit('addUser', payload);
      } else {
        throw new Error("End point returned - " + JSON.stringify(response.data));
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error.message,
      });
    } finally {
      commit('setIsLoading', false);
    }
  },

  async updateUser({ commit, getters }, payload) {
    try {
      commit('setIsLoading', true);
      const key = getters.getAuthToken;
      const response = await endPoint.patch('/users/' + payload.id, payload, {
        headers: {
          Authorization: 'Bearer ' + key,
        },
      });
      if (response.status === 200) {
        commit('updateUser', payload);
      } else {
        throw new Error("End point returned - " + JSON.stringify(response.data));
      }
    } catch (error) {
      commit('setError', {
        isError: true,
        errorMessage: error.message,
      });
    } finally {
      commit('setIsLoading', false);
    }
  },
};
