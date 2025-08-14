<template>
  <transition name="slide-up" mode="out-in">
    <router-view />
  </transition>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>

<script>
import Home from './views/Home.vue'

export default {
  components: { Home }
}
</script>

<style>

/* App.vue hoặc src/assets/style.css */
.router-link-active {
  font-weight: bold;
  color: #0d6efd !important; /* Bootstrap primary */
}
</style>