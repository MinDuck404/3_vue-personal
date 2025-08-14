<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container px-5">
      <router-link  to="/" class="nav-link navbar-brand"><span class="fw-bolder text-primary">Start Bootstrap</span></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <button 
          @click="themeStore.toggleDark" 
          :class="['btn', themeStore.isDark ? 'btn-light' : 'btn-dark']"
        >
          {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
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
  import { onMounted } from 'vue'
  import { useThemeStore } from '@/stores/theme'

  const themeStore = useThemeStore()

  onMounted(() => {
    // Khởi tạo theme khi component được mount
    themeStore.initializeTheme()
  })
</script>

<script>
import { RouterLink } from 'vue-router'
export default {
  name: 'Navbar'
}
</script>