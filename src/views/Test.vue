<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

auth.login({ user: { name: 'Thanh' }, token: 'abc123' })
</script>

<template>
  <div v-if="auth.user">
    Welcome, {{ auth.user.name }}
  </div>
</template>