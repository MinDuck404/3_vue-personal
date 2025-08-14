<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

import { useAuthStores } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const auth = useAuthStores()
auth.login({ user: { name: 'Thanh' }, token: 'abc123' })
const { user, token } = storeToRefs(auth)

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
  // console.log('User in store:', auth.user)
})
</script>

<template>
  <div v-if="userStore.loading">Loading...</div>
  <div v-else>
    <p>Welcome, {{ userStore.profile?.name }}</p>
    <p>Welcome, {{ user?.name }}</p>
  </div>
</template>