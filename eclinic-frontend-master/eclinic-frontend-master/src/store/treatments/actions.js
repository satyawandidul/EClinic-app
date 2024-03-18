import { endPoint } from '@/api/api'
export default {
    async getTreatments({ commit, getters }) {
        try {
            commit('setIsLoading', true)
            const key = getters.getAuthToken
            const response = await endPoint.get('/treatments', {
                headers: {
                    Authorization: 'Bearer ' + key
                }
            })
            if (response.statusText === "OK") {
                commit('setTreatments', response.data)
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

    async addTreatment({ commit, getters }, payload) {
        try {
            commit('setIsLoading', true)
            const key = getters.getAuthToken
            const response = await endPoint.post('/treatments', payload,
                {
                    headers: {
                        Authorization: 'Bearer ' + key
                    }
                }
            )
            if (response.statusText === "Created") {
                commit('addTreatment', payload)
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

    async updateTreatment({ commit, getters }, payload) {
        try {
            commit('setIsLoading', true)
            const key = getters.getAuthToken
            // console.log(payload);
            const response = await endPoint.patch('/treatments/' + payload.id, payload, {
                headers: {
                    Authorization: 'Bearer ' + key
                }
            }
            )
            if (response.statusText === "OK") {
                commit('updateTreatment', payload)
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