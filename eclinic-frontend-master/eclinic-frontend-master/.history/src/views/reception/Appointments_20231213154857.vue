<template>
    <v-card class="mx-auto" max-width="344" shaped>
        <!-- Your card content goes here -->
        <!-- For example, displaying patient name and reference -->
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">{{ patientName }}</v-list-item-title>
                <v-list-item-subtitle>{{ reference }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-btn small outlined rounded text @click="sendDataToParent">Send Data</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            patientName: 'Mahesh Mukund Deshpande',
            reference: 'Reference - Sameer Patankar',
        };
    },
    methods: {
        sendDataToParent() {
            // Emit an event with the data to be sent to the parent
            this.$emit('patientData', { patientName: this.patientName, reference: this.reference });
        },
    },
};
</script>

<style>
/* Your component styles go here */
</style>
