<template>
    <div>
        <div class="card-container">
            <!-- Use v-for to loop through a list of 10 items (cards) -->
            <patient-card v-for="(patient, index) in patients" :key="index" :patient="patient"></patient-card>
        </div>
    </div>
</template>

<script>
import PatientCard from '@/components/PatientCard.vue'; // Adjust the path based on your project structure

export default {
    data() {
        return {
            patients: Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                name: `Patient ${index + 1}`,
                reference: `Reference ${index + 1}`,
            })),
        };
    },
    components: {
        PatientCard,
    },
};
</script>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-around;
}
</style>
