

<!-- script cho auth -->
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

  // script cho counter
  import { useCounter } from '@/composables/useCounter'
  const { count, increment, decrement } = useCounter()

  // script cho component
  import { ref } from 'vue'
  import A from '@/components/About.vue'
  import B from '@/components/Contact.vue'
  const currentComponent = ref(A)
</script>

<template>
  <component :is="currentComponent">

  </component>
  <button @click="currentComponent = A">About</button>
  <button @click="currentComponent = B">Contact</button>

  
  <div v-if="userStore.loading">Loading...</div>
  <div v-else>
    <p>Welcome, {{ userStore.profile?.name }}</p>
    <p>Welcome, {{ user?.name }}</p>
  </div>
    <div>
      <p>{{ count }}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
</template>

