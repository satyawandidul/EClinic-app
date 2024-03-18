<template>
    <div>
        <!-- PatientCard component is used here -->
        <patient-card @patientData="receiveDataFromChild"></patient-card>

        <!-- Display received data in the parent -->
        <div>
            <h2>Received Data in Parent:</h2>
            <p>Patient Name: {{ receivedData.patientName }}</p>
            <p>Reference: {{ receivedData.reference }}</p>
        </div>
    </div>
</template>

<script>
import PatientCard from '@/components/PatientCard.vue'; // Adjust the path based on your project structure

export default {
    data() {
        return {
            receivedData: {},
        };
    },
    methods: {
        receiveDataFromChild(data) {
            // Handle the received data in the parent
            this.receivedData = data;
        },
    },
    components: {
        PatientCard,
    },
};
</script>

<style>
/* Your view styles go here */
</style>
