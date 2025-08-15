<!-- pages/Login.vue -->
<template>
  <body :class="{ 'dark': isDark }"></body>
  <form @submit="handleSubmit(onSubmit)">
    <FormInput
      label="Email"
      v-model="email"
      :error="errors.email"
      type="email"
      placeholder="you@example.com"
    />

    <FormInput
      label="Password"
      v-model="password"
      :error="errors.password"
      :type="showPassword ? 'text' : 'password'"
    />

    <div class="flex items-center justify-between mb-4">
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="rememberMe" class="accent-blue-500" />
        Remember me
      </label>

      <button type="button" class="text-blue-600 text-sm" @click="togglePassword">
        {{ showPassword ? 'Hide' : 'Show' }} Password
      </button>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
    >
      {{ isSubmitting ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = async (values) => {
  console.log('🟢 Submit:', values)
  await new Promise(r => setTimeout(r, 1500)) // Giả lập login
  alert('✅ Logged in!')
}

// remember me and show password functionality
import { ref } from 'vue'
const rememberMe = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>