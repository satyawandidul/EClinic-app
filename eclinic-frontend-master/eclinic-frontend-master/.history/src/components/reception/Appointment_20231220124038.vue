<template>
    <v-col>
        <v-card max-width="300" shaped border-radius :class="getCardClass">
            <v-list-item three-line>
                <v-list-item-avatar size="80" color="grey">
                    <v-img src=cardData.base64 alt="Avatar Image">
                    </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <div class="text-overline mb-6">
                        New Patient
                    </div>
                    <v-list-item-title class="text-h5 mb-0">Name:{{ cardData.firstname }}</v-list-item-title>
                    <v-list-item-subtitle class="text-h5 mb-0">City:{{ cardData.city }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Reference - {{ cardData.lastname }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small outlined rounded text>Check-in</v-btn>
                <v-btn small outlined rounded text>Cancel</v-btn>
            </v-card-actions>

        </v-card>
    </v-col>
</template>

<script>


export default {
    components: {

    },
    props: {
        cardData: {
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
    border: 2px solid #2196F3;
}

.green-card {
    border: 2px solid #4CAF50;
}
</style>