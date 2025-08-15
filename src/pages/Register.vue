<!-- pages/Register.vue -->
<template>
  <form @submit="handleSubmit(onSubmit)">
    <FormInput label="Full Name" v-model="name" :error="errors.name" />
    <FormInput label="Email" v-model="email" :error="errors.email" type="email" />
    <FormInput label="Password" v-model="password" :error="errors.password" type="password" />
    <FormInput label="Confirm Password" v-model="confirmPassword" :error="errors.confirmPassword" type="password" />

    <button :disabled="isSubmitting" class="w-full py-2 bg-green-600 text-black rounded hover:bg-green-700">
      {{ isSubmitting ? 'Registering...' : 'Register' }}
    </button>
  </form>
</template>

<script setup>
import FormInput from '@/components/FormInput.vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useApi } from '@/composables/useApi'
import { toast} from 'vue3-toastify';


const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
})

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: schema })

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const { post } = useApi()
const Mytoast = toast() 

const onSubmit = async (values) => {
  try {
    const res = await post('/api/register', values)
    Mytoast.success('Đăng ký thành công!')
  } catch (err) {
    Mytoast.error(err.message)
  }
}
</script>