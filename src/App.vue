<template>
  <Header />
  <Indecision id="Indecisdion" />
  <Footer />
</template>

<script>
import Header from './components/shared/Header.vue'
import Indecision from './components/Indecision.vue';
import Footer from './components/shared/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Indecision,
    Footer
  }
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
}

body{
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

#app{
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
