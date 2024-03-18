export default {
    setTreatments(state, payload) {
        state.treatments = payload
    },

    addTreatment(state, payload) {
        state.treatments.push(payload)
    },

    updateTreatment(state, payload) {
        const index = state.treatments.findIndex((item) => {
            return item.id === payload.id
        })

        if (index >= 0) {
            state.treatments[index] = payload
        } else {
            this.state.isError = true
            this.state.errorMessage = "Failed to update treatment. Treatment id: " + payload.id + " not found"
        }
    }
}