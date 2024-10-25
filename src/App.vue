<template>
  <div>
    <!-- Condition pour afficher le bon menu en fonction du rôle -->
    <VerticalNavbar v-if="isAdminMenu" @toggle-navbar="toggleNavbar" />
    <DoctorMenu v-if="isDoctorMenu" @toggle-navbar="toggleNavbar" />
    <HorizontalNavbar v-if="!isAdminMenu && !isDoctorMenu" @toggle-navbar="toggleNavbar" />
    
    <router-view />
  </div>
</template>

<script>
import HorizontalNavbar from './views/HorizontalNavbar.vue';
import VerticalNavbar from './views/VerticalNavbar.vue';
import DoctorMenu from './views/DoctorMenu.vue';

export default {
  name: 'App',
  components: {
    HorizontalNavbar,
    VerticalNavbar,
    DoctorMenu,
  },
  data() {
    return {
      isAdminMenu: false,   // Etat pour savoir si le menu Administrateur est actif
      isDoctorMenu: false,  // Etat pour savoir si le menu Médecin est actif
    };
  },
  watch: {
    $route(to) {
      this.checkUserRole(to);
    },
  },
  mounted() {
    this.checkUserRole(this.$route); // Vérifie le rôle au chargement
  },
  methods: {
    checkUserRole(route) {
      // Vérification du rôle d'utilisateur en fonction de la route actuelle
      if (route.path.includes('admin')) {
        this.isAdminMenu = true;
        this.isDoctorMenu = false;
      } else if (route.path.includes('doctor')) {
        this.isAdminMenu = false;
        this.isDoctorMenu = true;
      } else {
        this.isAdminMenu = false;
        this.isDoctorMenu = false;
      }
    },
    toggleNavbar(value) {
      this.isAdminMenu = value === 'admin';
      this.isDoctorMenu = value === 'doctor';
    },
  },
};
</script>
