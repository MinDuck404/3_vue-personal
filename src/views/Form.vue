<template>
  <form @submit.prevent="submit">
    <input v-model="form.firstName" placeholder="firstName" />
    <input v-model="form.lastName" placeholder="lastName" />
    <input v-model="form.email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>

  <form @submit="submit">
    <input v-model="email2" />
    <span>{{ emailError }}</span>

    <input v-model="password" />
    <span>{{ passwordError }}</span>
  </form>
</template>

<!-- <script setup>
    import { ref } from 'vue'
    import { computed } from 'vue'
    const fullName = computed(() => `${form.value.firstName} ${form.value.lastName}`)
    const form = ref({
    name: '',
    email: ''
    })

    const submit = () => {
        console.log(form.value)
        console.log(fullName.value)
    }
</script> -->

<script setup>
    import useVuelidate from '@vuelidate/core'
    import { required, email } from '@vuelidate/validators'
    import { reactive } from 'vue'
    import { computed } from 'vue'

    const fullName = computed(() => `${form.value.firstName} ${form.value.lastName}`)
    const form = reactive({ firstName: '',lastName: '' , email: '' })

    const rules = {
    firstName: { required },
    lastName: { required },
    email: { required, email }
    }

    const v$ = useVuelidate(rules, form)

    const submit = () => {
    v$.value.$validate()
    if (!v$.value.$error) {
        // Gửi form
        alert(`Submitted: ${JSON.stringify(form)}`)
    }
    else {
        // Hiển thị lỗi
        alert('Form is invalid')
    }
    }

    //  Yup + vee-validate
    import { useForm, useField } from 'vee-validate'
    import * as yup from 'yup'

    const schema = yup.object({
        email2: yup.string().email().required(),
        password: yup.string().min(6).required()
        })

    useForm({ validationSchema: schema })

    const { value: email2, errorMessage: emailError } = useField('email')
    const { value: password, errorMessage: passwordError } = useField('password')


</script>