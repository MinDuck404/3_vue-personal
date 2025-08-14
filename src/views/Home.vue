<template>
  <DefaultLayout>
    <Header />
    <About />
    <Projects />
    <Contact />
  </DefaultLayout>
</template>

<script>

import Header from '@/components/Header.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default {
  components: {
    DefaultLayout,
    Header,
    About,
    Projects,
    Contact,
  }
}
</script>