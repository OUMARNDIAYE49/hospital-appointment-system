<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>

</script>

<style>

.main-content {
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
}
</style>
