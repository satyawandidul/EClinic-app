<!-- <template>
  <h1>This is going to show the patient details on the page</h1>
</template>

<script>
export default {

}
</script>

<style>

</style> -->



<template>
  <v-col>
    <v-card max-width="300" shaped border-radius :class="getCardClass">
      <v-list-item three-line>
        <v-list-item-avatar size="80" color="grey">
          <v-img :src="cardData.base64" alt="Avatar Image"></v-img>

        </v-list-item-avatar>
        <v-list-item-content>
          <div class="text-overline mb-6">
            New Patient
          </div>
          <v-list-item-title class="text-h5 mb-0">Name:{{ cardata.firstname }}</v-list-item-title>
          <v-list-item-subtitle class="text-h5 mb-0">lastname:{{ cardata.lastname }}</v-list-item-subtitle>
          <v-list-item-subtitle>phone - {{ cardData.phone }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small outlined rounded text>Check-in</v-btn>
        <v-btn small outlined rounded text>Cancel</v-btn>
      </v-card-actions> -->

    </v-card>
  </v-col>
</template>

<script>


export default {
  components: {

  },
  props: {
    cardata: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getCardClass() {
      // Conditionally set card color based on cardData.title
      return {
        'blue-card': this.cardData.title === 'Card 2',
        'green-card': this.cardData.title !== 'Card 2',
      };
    },
  },


}
</script>

<style scoped>
.my-card {
  margin-bottom: 5px;
  /* Adjust the margin as needed to reduce space between cards */
}

.blue-card {
  border: 2px solid #814d4f;
}

.green-card {
  border: 2px solid #487049;
}
</style>