<template>
   <v-row>
        <!-- Select the patient details along with prescription id and doctor id. -->
        <v-col md="3" cols="12">
            <!-- Select Patient with name or ID -->
        </v-col>
        <v-col md="3" cols="12">
            <!-- Select prescription No -->
        </v-col>
        <v-col md="3" cols="12">
            <!--  -->
        </v-col>
        <v-col md="3" cols="12">
            <!-- col4 -->
        </v-col>
   </v-row>
</template>

<script>
export default {
    data: () => ({
        items: {
            barcode: "",
            price: 0.0,

        }
    })
}
</script>

<style>

</style>