// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStores = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(userData) {
      this.user = userData.user
      this.token = userData.token
    },
    logout() {
      this.user = null
      this.token = null
    }
  },
  persist: true
})