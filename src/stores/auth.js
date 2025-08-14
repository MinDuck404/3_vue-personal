// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(userData) {
      this.user = userData.name
      this.token = userData.name
    },
    logout() {
      this.user = null
      this.token = null
    }
  },
  persist: true
})