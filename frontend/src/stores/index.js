import { defineStore } from 'pinia'
import { createPinia } from 'pinia'
import api from '../api'

export default function (/* { ssrContext } */) {
  const pinia = createPinia()
  return pinia
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('authUser') || 'null'),
    token: localStorage.getItem('authToken') || null
  }),

  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
  },

  actions: {
    async login(email, password) {
      const response = await api.post('/login', { email, password })
      this.token = response.data.token
      this.user = response.data.user
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('authUser', JSON.stringify(response.data.user))
      return response.data
    },

    async logout() {
      await api.post('/logout')
      this.token = null
      this.user = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    }
  }
})

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    loading: false
  }),

  actions: {
    async fetchPatients() {
      this.loading = true
      try {
        const response = await api.get('/patients')
        this.patients = response.data.data
      } finally {
        this.loading = false
      }
    },

    async createPatient(data) {
      const response = await api.post('/patients', data)
      this.patients.unshift(response.data.data)
      return response.data
    }
  }
})

export const useVisitStore = defineStore('visit', {
  state: () => ({
    visits: [],
    loading: false
  }),

  actions: {
    async fetchVisits() {
      this.loading = true
      try {
        const response = await api.get('/visits')
        this.visits = response.data.data
      } finally {
        this.loading = false
      }
    },

    async createVisit(data) {
      const response = await api.post('/visits', data)
      this.visits.unshift(response.data.data)
      return response.data
    }
  }
})
