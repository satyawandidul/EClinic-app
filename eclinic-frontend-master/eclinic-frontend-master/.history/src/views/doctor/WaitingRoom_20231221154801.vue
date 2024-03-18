<template>
  <v-row>
    <v-col v-for="card in cards" :key="card.id" cols="12" sm="8" md="4">
      <Appointment :cardData="card" />

    </v-col>

  </v-row>
</template>

<script>
import Appointment from '@/components/reception/Appointment'
import axios from 'axios';

export default {
  components: {
    Appointment
  },
  data() {
    return {
      cards: [],
    };
  },
  mounted() {
    // Make a GET request to fetch data from the server
    axios.get('http://127.0.0.1:3000/users')
      .then(response => {
        this.cards = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },


  created() {
    console.log('Card Data:', this.cardData);
    console.log('Base64 Value:', this.cardData.base64);
  }
};
</script>

<style scoped>
/* Your component-specific styles here */
</style>
