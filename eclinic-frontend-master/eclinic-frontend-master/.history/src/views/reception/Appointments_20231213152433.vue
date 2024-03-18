<template>
    <v-container fluid id="searchAppts" tag="section">
        <v-card>
            <v-card-title class="display-2">Search Future Appointments</v-card-title>
            <v-card-text>
                <v-form ref="searchForm" v-model="valid" lazy-validation>
                    <v-row no-gutters>
                        <v-col cols="12" sm="4" md="4">
                            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Select Date" readonly v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-btn fab color="primary" @click="search"><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-data-table></v-data-table>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data: () => ({
        menu: false,
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        valid: false,
        items: [],
        headers: [
            { text: "First Name", align: "start", value: "firstname" },
            { text: "Last Name", value: "lastname" },
            { text: "Email Address", value: "email" },
            { text: "Contact No", value: "phone" },
            { text: "Location Code", value: "shortcode" },
            { text: "User Type", value: "role" },
            { text: "Actions", value: "actions", sortable: false },
        ],
    }),

    methods: {
        ...mapGetters({
            setError: "setError",
        }),

        async search() {
            // Search the appointments here.

        },
    },
};
</script>

<template>
    <v-card class="mx-auto" max-width="344" shaped>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                    New Patient
                </div>
                <v-list-item-title class="text-h5 mb-1">
                    Mahesh Mukund Deshpande
                </v-list-item-title>
                <v-list-item-subtitle>
                    Reference - Sameer Patankar
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80" color="grey">
            </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
            <v-btn small outlined rounded text>Consult</v-btn>
            <v-btn small outlined rounded text>Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>
  <script>
  export default {

  }
  </script>

<style></style>