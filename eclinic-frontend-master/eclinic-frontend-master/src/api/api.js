import axios from 'axios'
import { API_URL } from '../shared/constants'

export const endPoint = axios.create({
  // baseURL: 'http://localhost/eClinicSanctumApi/public/api/',
  // baseURL: 'http://192.168.1.32/eClinciSanctumApi/public/api',
  // baseURL: 'http://bitwisetechnologies.in/public/api/',
  // baseURL: 'http://localhost/eclinic/public/api/',
  baseURL: API_URL,
  Headers: [{
    'Accept': 'application/*',
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'withCredentials': false
  }]
})