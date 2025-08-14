<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})
</script>

<template>
  <div v-if="userStore.loading">Loading...</div>
  <div v-else>
    <p>Welcome, {{ userStore.profile?.name }}</p>
  </div>
</template>