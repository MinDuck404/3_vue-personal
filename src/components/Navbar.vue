<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container px-5">
      <router-link  to="/" class="nav-link navbar-brand"><span class="fw-bolder text-primary">Start Bootstrap</span></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <button @click="isDark = !isDark">
          {{ isDark ? 'Light' : 'Dark' }} Mode
        </button>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
          <li class="nav-item"><router-link to="/" class="nav-link">{{ $t('navbar.home') }}</router-link></li>
          <li class="nav-item"><router-link to="/about" class="nav-link">{{ $t('navbar.about') }}</router-link></li>
          <li class="nav-item"><router-link to="/projects" class="nav-link">{{ $t('navbar.projects') }}</router-link></li>
          <li class="nav-item"><router-link to="/contact" class="nav-link">{{ $t('navbar.contact') }}</router-link></li>
        </ul>
        <button @click="$i18n.locale = 'vi'">VI</button>
        <button @click="$i18n.locale = 'en'">EN</button>
      </div>
    </div>
  </nav>
</template>

<!-- script dark mode toggle -->
<script setup>
import { ref, watchEffect, onMounted } from 'vue'

const isDark = ref(false)

// Lưu trữ trạng thái class ban đầu của các phần tử
const originalClasses = new WeakMap()

onMounted(() => {
  // Lưu trữ class ban đầu khi component được mount
  document.querySelectorAll('[class*="light"], [class*="dark"], [class*="white"]').forEach(element => {
    originalClasses.set(element, Array.from(element.classList))
  })
})

watchEffect(() => {
  // Cập nhật theme cho toàn bộ document
  document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light')

  // Lấy tất cả các phần tử có class chứa "light", "dark", hoặc "white"
  const elements = document.querySelectorAll('[class*="light"], [class*="dark"], [class*="white"]')

  elements.forEach(element => {
    const classList = element.classList
    const original = originalClasses.get(element) || []

    if (isDark.value) {
      // Chuyển sang dark mode
      classList.forEach(className => {
        if (className === 'bg-light') {
          classList.remove('bg-light')
          classList.add('bg-dark')
        } else if (className === 'text-light') {
          classList.remove('text-light')
          classList.add('text-dark')
        } else if (className === 'bg-white') {
          classList.remove('bg-white')
          classList.add('bg-dark')
        }
      })
    } else {
      // Khôi phục về light mode dựa trên class ban đầu
      classList.forEach(className => {
        if (className === 'bg-dark') {
          classList.remove('bg-dark')
          if (original.includes('bg-light') || original.includes('bg-white')) classList.add(original.includes('bg-white') ? 'bg-white' : 'bg-light')
        } else if (className === 'text-dark') {
          classList.remove('text-dark')
          if (original.includes('text-light')) classList.add('text-light')
        }
      })
    }
  })
})
</script>

<script>
import { RouterLink } from 'vue-router'
export default {
  name: 'Navbar'
}
</script>