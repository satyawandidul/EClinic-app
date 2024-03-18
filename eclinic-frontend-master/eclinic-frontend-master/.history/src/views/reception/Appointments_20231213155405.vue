<template>
    <v-card class="mx-auto" max-width="344" shaped>
        <!-- Your card content goes here -->
        <!-- For example, displaying patient name and reference -->
        <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">{{ patient.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ patient.reference }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
    props: {
        patient: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
