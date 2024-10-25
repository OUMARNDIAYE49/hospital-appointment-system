<template>
    <div>
      <Navbar />
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/views/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'DefaultLayout',
    components: {
      Navbar,
      Footer
    }
  };
  </script>
  
  <style scoped>
  main {
    padding: 20px;
  }
  </style>
  