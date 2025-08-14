<template>
  <DefaultLayout>
    
    <main class="flex-shrink-0">
            <!-- Page content-->
            <section class="py-5">
                <div class="container px-5">
                    <!-- Contact form-->
                    <div class="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div class="text-center mb-5">
                            <div class="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i class="bi bi-envelope"></i></div>
                            <h1 class="fw-bolder">Get in touch</h1>
                            <p class="lead fw-normal text-muted mb-0">Let's work together!</p>
                        </div>
                        <div class="row gx-5 justify-content-center">
                            <div class="col-lg-8 col-xl-6">
                                <!-- * * * * * * * * * * * * * * *-->
                                <!-- * * SB Forms Contact Form * *-->
                                <!-- * * * * * * * * * * * * * * *-->
                                <!-- This form is pre-integrated with SB Forms.-->
                                <!-- To make this form functional, sign up at-->
                                <!-- https://startbootstrap.com/solution/contact-forms-->
                                <!-- to get an API token!-->
                                <form @submit="handleSubmit">
                                        <!-- Name input-->
                                        <div class="form-floating mb-3">
                                            <input 
                                                class="form-control" 
                                                :class="{ 'is-invalid': errors.name }"
                                                id="name" 
                                                type="text" 
                                                placeholder="Enter your name..." 
                                                v-model="form.name"
                                                @input="clearError('name')"
                                            />
                                            <label for="name">Full name</label>
                                            <div class="invalid-feedback" v-show="errors.name">A name is required.</div>
                                        </div>
                                        
                                        <!-- Email address input-->
                                        <div class="form-floating mb-3">
                                            <input 
                                                class="form-control" 
                                                :class="{ 'is-invalid': errors.email }"
                                                id="email" 
                                                type="email" 
                                                placeholder="name@example.com" 
                                                v-model="form.email"
                                                @input="clearError('email')"
                                            />
                                            <label for="email">Email address</label>
                                            <div class="invalid-feedback" v-show="errors.email && !form.email.trim()">An email is required.</div>
                                            <div class="invalid-feedback" v-show="errors.email && form.email.trim() && !isValidEmail">Email is not valid.</div>
                                        </div>
                                        
                                        <!-- Phone number input-->
                                        <div class="form-floating mb-3">
                                            <input 
                                                class="form-control" 
                                                :class="{ 'is-invalid': errors.phone }"
                                                id="phone" 
                                                type="tel" 
                                                placeholder="(123) 456-7890" 
                                                v-model="form.phone"
                                                @input="clearError('phone')"
                                            />
                                            <label for="phone">Phone number</label>
                                            <div class="invalid-feedback" v-show="errors.phone">A phone number is required.</div>
                                        </div>
                                        
                                        <!-- Message input-->
                                        <div class="form-floating mb-3">
                                            <textarea 
                                                class="form-control" 
                                                :class="{ 'is-invalid': errors.message }"
                                                id="message" 
                                                placeholder="Enter your message here..." 
                                                style="height: 10rem" 
                                                v-model="form.message"
                                                @input="clearError('message')"
                                            ></textarea>
                                            <label for="message">Message</label>
                                            <div class="invalid-feedback" v-show="errors.message">A message is required.</div>
                                        </div>
                                        
                                        <!-- Submit success message-->
                                        <div v-show="submitSuccess" id="submitSuccessMessage" class="alert alert-success">
                                            <div class="text-center mb-3">
                                                <div class="fw-bolder">Form submission successful!</div>
                                                Your message has been sent successfully!
                                            </div>
                                        </div>
                                        
                                        <!-- Submit error message-->
                                        <div v-show="submitError" id="submitErrorMessage" class="alert alert-danger">
                                            <div class="text-center text-danger mb-3">Error sending message!</div>
                                        </div>
                                        
                                        <!-- Submit Button-->
                                        <div class="d-grid">
                                            <button 
                                                class="btn btn-primary btn-lg" 
                                                :disabled="!isFormValid || isSubmitting"
                                                type="submit">
                                                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                                                {{ isSubmitting ? 'Sending...' : 'Submit' }}
                                            </button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  components: { DefaultLayout }
}
</script>


<script setup>
import emailjs from 'emailjs-com'
import { reactive, ref, computed } from 'vue'

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// Form states
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)
const errors = reactive({
  name: false,
  email: false,
  phone: false,
  message: false
})

// Validation functions
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = false)
  
  // Name validation
  if (!form.name.trim()) {
    errors.name = true
    isValid = false
  }
  
  // Email validation
  if (!form.email.trim()) {
    errors.email = true
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = true
    isValid = false
  }
  
  // Phone validation
  if (!form.phone.trim()) {
    errors.phone = true
    isValid = false
  }
  
  // Message validation
  if (!form.message.trim()) {
    errors.message = true
    isValid = false
  }
  
  return isValid
}

// Send email function
const sendEmail = async () => {
  // Hide previous messages
  submitSuccess.value = false
  submitError.value = false
  
  // Validate form
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    await emailjs.send(
      'service_h0ln8vl',     // Service ID 
      'template_ldshwhf',    // Template ID 
      {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.message
      },
      'R2KH-LAegGc6MROjM'      // Public Key
    )
    
    // Success
    submitSuccess.value = true
    
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    
  } catch (error) {
    console.error('Email send error:', error)
    submitError.value = true
  } finally {
    isSubmitting.value = false
  }
}

// Check if form is valid for enabling submit button
const isFormValid = computed(() => {
  return form.name.trim() && 
         form.email.trim() && 
         form.phone.trim() && 
         form.message.trim() &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

// Handle form submission
const handleSubmit = (event) => {
  event.preventDefault()
  sendEmail()
}

// Handle button click (for manual validation)
const handleButtonClick = () => {
  sendEmail()
}
</script>