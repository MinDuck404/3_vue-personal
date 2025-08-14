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