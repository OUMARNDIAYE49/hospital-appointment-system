<template>
    <div class="admin-layout">
      <Sidebar />
      <div class="admin-content">
        <Navbar />
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/views/Navbar.vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    name: 'AdminLayout',
    components: {
      Navbar,
      Sidebar
    }
  };
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
  }
  
  .admin-content {
    flex-grow: 1;
  }
  
  main {
    padding: 20px;
  }
  </style>
  