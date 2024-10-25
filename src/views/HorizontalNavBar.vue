<template>
  <nav class="navbar">
    <div class="navbar-left">
      <ul>
        <li>
          <router-link to="/" @click="setHorizontalMenu">
            <font-awesome-icon icon="house" /> Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/admin" @click="setVerticalMenu">
            <font-awesome-icon icon="user" /> Administration
          </router-link>
        </li>
        <li>
          <router-link to="/doctor" @click="setVerticalMenu">
            <font-awesome-icon icon="user-doctor" /> Médecins
          </router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <ul>
        <li>
          <router-link to="/login" @click="setHorizontalMenu">
            <font-awesome-icon icon="sign-in-alt" /> Connexion
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HorizontalNavbar',
  methods: {
    setVerticalMenu() {
      this.$emit('toggle-navbar', true); // Change vers le menu vertical
    },
    setHorizontalMenu() {
      this.$emit('toggle-navbar', false); // Revient au menu horizontal
    },
    setDoctorMenu() {
      this.$emit('toggle-doctor-navbar', true); // Active le menu Médecins
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  width: 100%;
}

.navbar-left ul,
.navbar-right ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar-left li,
.navbar-right li {
  margin: 0 40px;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar-right {
  margin-right: 50px;
}

.navbar-left {
  margin-left: 50px;
}
</style>
