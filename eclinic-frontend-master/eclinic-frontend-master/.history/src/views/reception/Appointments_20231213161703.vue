<template>
    <v-row>
        <v-col v-for="card in cards" :key="card.id" cols="12" sm="8" md="4">
            <Todayappoitment :cardData="card" />

        </v-col>
    </v-row>
</template>

<script>

import axios from 'axios';

export default {
    components: {
        Todayappoitment
    },
    data() {
        return {
            cards: [],
        };
    },
    mounted() {
        // Make a GET request to fetch data from the server
        axios.get('http://127.0.0.1:27017/eClinic/patients')
            .then(response => {
                this.cards = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
};
</script>

<style scoped>
/* Your component-specific styles here */
</style>
