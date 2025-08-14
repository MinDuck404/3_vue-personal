<template>
  <div>
    <Navbar />
    <Header />
    <About />
    <Projects />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Header,
    About,
    Projects,
    Contact,
    Footer
  }
}
</script>