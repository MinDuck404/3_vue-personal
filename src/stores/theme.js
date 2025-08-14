// src/stores/theme.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    originalClasses: new WeakMap()
  }),
  
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      this.applyTheme()
    },
    
    setDark(value) {
      this.isDark = value
      this.applyTheme()
    },
    
    initializeTheme() {
      // Lưu trữ class ban đầu
      document.querySelectorAll('[class*="light"], [class*="dark"], [class*="white"]').forEach(element => {
        this.originalClasses.set(element, Array.from(element.classList))
      })
      
      // Áp dụng theme hiện tại
      this.applyTheme()
    },
    
    applyTheme() {
      // Cập nhật attribute cho document
      document.documentElement.setAttribute('data-bs-theme', this.isDark ? 'dark' : 'light')
      
      // Cập nhật classes cho elements
      const elements = document.querySelectorAll('[class*="light"], [class*="dark"], [class*="white"]')
      
      elements.forEach(element => {
        const classList = element.classList
        const original = this.originalClasses.get(element) || []
        
        if (this.isDark) {
          // Chuyển sang dark mode
          this.convertToDarkMode(classList)
        } else {
          // Khôi phục về light mode
          this.restoreToLightMode(classList, original)
        }
      })
    },
    
    convertToDarkMode(classList) {
      const classArray = Array.from(classList)
      classArray.forEach(className => {
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
    },
    
    restoreToLightMode(classList, original) {
      const classArray = Array.from(classList)
      classArray.forEach(className => {
        if (className === 'bg-dark') {
          classList.remove('bg-dark')
          if (original.includes('bg-light') || original.includes('bg-white')) {
            classList.add(original.includes('bg-white') ? 'bg-white' : 'bg-light')
          }
        } else if (className === 'text-dark') {
          classList.remove('text-dark')
          if (original.includes('text-light')) classList.add('text-light')
        }
      })
    }
  },
  
  persist: true
})