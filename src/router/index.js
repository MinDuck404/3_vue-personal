// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Projects from '@/views/Projects.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/test', name: 'Test', component: () => import('@/views/Test.vue') },
  { path: '/form', name: 'Form', component: () => import('@/views/Form.vue') },
  {path: '/login', name: 'Login', component: () => import('@/pages/Login.vue') },
  {path: '/register', name: 'Register', component: () => import('@/pages/Register.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }  // luôn cuộn lên đầu
  }
})

export default router