import Vue from 'vue';
import Vuex from 'vuex';
import { endPoint } from '@/api/api';
import router from '../router'

import locationModule from './location/index'
import medicineModule from './medicines/index'
import userModule from './users/index'
import patientModule from './patients/index'
import chargesModule from './charges/index'
import batchesModule from './batches/index'
import panchakarmaModule from './panchakarma/index'
import stockModule from './stock/index'
import treatmentModule from './treatments/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    locationModule,
    medicineModule,
    userModule,
    patientModule,
    chargesModule,
    batchesModule,
    panchakarmaModule,
    stockModule,
    treatmentModule
  },
  state: {

    // Handle page loading through store, if required.
    isLoading: false,

    // Handle error messages from here.
    isError: false,
    errorMessage: "",


    // Navigation drawer handler
    drawer: null,

    // Current User Object
    // user: null,
    user: {
      //role: 'Super-Admin'
      // role: 'Receptionist'
      // role: 'Stockist'
      role: 'Doctor'
    },

    // Current Location Object
    location: null,

    // Authentication Token to be used for all the api calls
    token: "",

    // List of locations
    locationsList: null,   // Not sure how we should use this

    // Consultation Charges
    charges: null,

    // Routes based on logged in user
    adminRoutes: [
      { icon: 'mdi-view-dashboard', title: 'Admin Dashboard', to: '/admin/dashboard' },
      { icon: 'mdi-view-dashboard', title: 'Admin Dashboard', to: '/admin/dashboard' },
      { icon: 'mdi-view-dashboard', title: 'Admin Dashboard', to: '/admin/dashboard' },
      { icon: 'mdi-view-dashboard', title: 'Admin Dashboard', to: '/admin/dashboard' },
    ],

    doctorRoutes: [
      { icon: 'mdi-view-dashboard-outline', title: 'ConsultationView', to: '/doctor/Consultation' },
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/doctor/Dashboard' },
      { icon: 'mdi-sofa', title: 'WaitingRoom', to: '/admin/WatingRoom' },

    ],

    storeRoutes: [
      { icon: 'mdi-store', title: 'Sale', to: '/store/sale' },
      { icon: 'mdi-store', title: 'Sale Return', to: '/store/return' },
      { icon: 'mdi-cart', title: 'Stock Overview', to: '/store/stock' },
    ],

    receptionRoutes: [
      { icon: 'mdi-view-dashboard', title: 'Reception Dashboard', to: '/reception/dashboard' },
      { icon: 'mdi-calendar', title: 'Today\'s Appointments', to: '/reception/appointments' },
      { icon: 'mdi-calendar', title: 'Search Appointments', to: '/reception/search' },
      { icon: 'mdi-account-multiple', title: 'Patients', to: '/reception/patientList' },
    ],

    superAdminRoutes: [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/super/dashboard' },
      { icon: 'mdi-bank', title: 'Locations', to: '/super/locations' },
      { icon: 'mdi-pill', title: 'Medicines', to: '/super/medicines' },
      { icon: 'mdi-database', title: 'Batches', to: '/super/batches' },
      { icon: 'mdi-account-multiple', title: 'Users', to: '/super/users' },
      { icon: 'mdi-cart', title: 'Stock Overview', to: '/super/stock' },
      { icon: 'mdi-account', title: 'Patients', to: '/super/patients' },
      // { icon: 'mdi-cog', title: 'Settings', to: '/super/settings' },
      { icon: 'mdi-bed', title: 'Panchakarma', to: '/super/panchakarma' },
      { icon: 'mdi-currency-inr', title: 'Consulation Charges', to: '/super/charges' },
      { icon: 'mdi-plus-minus-box', title: 'Update Tolerance', to: '/super/tolerances' },
      { icon: 'mdi-chemical-weapon', title: 'Treatments', to: '/super/treatments' }

    ]
  },

  mutations: {
    setDrawer(state, payload) {
      state.drawer = payload
    },

    setIsLoading(state, payload) {
      state.isLoading = payload
    },

    setError(state, payload) {
      state.isError = payload.isError
      state.errorMessage = payload.errorMessage
    },

    // setCurrentUser(state, payload) {
    //   state.user = payload
    // },

    // setCurrentLocation(state, payload) {
    //   state.location = payload
    // },

    login(state, payload) {
      state.user = payload.user
      state.location = payload.location
      state.token = payload.authToken
      state.isError = false
      state.errorMessage = ""
    },

    logout(state) {
      state.user = null
      state.location = null
      state.token = ""
      state.isError = false
      state.errorMessage = "User logged out successfully"
    },

    setConsultationCharges(state, payload) {
      state.charges = payload
    },

    setAuthKey(state, payload) {
      state.token = payload
    }
  },

  getters: {
    getAuthToken(state) {
      return state.token
    },

    getDrawerLinks(state) {
      if (state.user) {
        switch (state.user.role) {
          case "Super-Admin": return state.superAdminRoutes
          case "Admin": return state.adminRoutes
          case "Stockist": return state.storeRoutes
          case "Doctor": return state.doctorRoutes
          case "Receptionist": return state.receptionRoutes
        }
      }
    },

    getCurrentUser(state) {
      return state.user
    },

    getIsAdmin(state) {
      return state.user.role === 'Super-Admin'
    },

    getCurrentLocation(state) {
      return state.location
    },

    getCurrentCharges(state) {
      return state.charges
    },

    getIsLoading(state) {
      return state.isLoading
    },

    getError(state) {
      return {
        isError: state.isError,
        errorMessage: state.errorMessage
      }
    }

  },

  actions: {
    async login(context, payload) {
      try {
        const response = await endPoint.post('/login', { username: payload.username, password: payload.password })
        console.log(response);
        if (response.data.status == true) {
          context.commit('login', response.data)
        } else {
          throw "End point returned - " + response.message
        }
      } catch (error) {
        context.commit('setError', {
          isError: true,
          errorMessage: error
        })
      }
    },

    async logout(context) {
      try {
        const response = await endPoint.get('/logout', {
          headers: {
            'Authorization': 'Bearer ' + this.state.token
          }
        });

        if (response.statusText === "OK") {
          context.commit('logout', {})
          router.replace({ name: 'Login' })
        } else {
          throw "End point returned - ", + response.message
        }
      } catch (error) {
        context.commit('setError', {
          isError: true,
          errorMessage: error
        })
      }
    },

    setDrawer({ commit }, payload) {
      commit('setDrawer', payload)
    }
  }
})
