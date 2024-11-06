<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
// import Sidebar from './components/Sidebar.vue';

// export default {
//   name: 'App',
//   components: {
//     Sidebar,
//   },
// };
</script>

<style>
/* #app {
  display: flex;
} */

.main-content {
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
}
</style>
