// src/stores/user.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('name', {
  state: () => ({
    profile: null,
    loading: false
  }),
  actions: {
    async fetchUser() {
      this.loading = true
      try {
        const res = await axios.get('https://api.sampleapis.com/countries/countries/1')
        this.profile = res.data
      } catch (error) {
        console.error('Failed to fetch user', error)
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})