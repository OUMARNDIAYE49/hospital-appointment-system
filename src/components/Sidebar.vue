<template>
  <div>
    <!-- Topbar -->
    <div class="topbar">
      <h1>Gestion des Rendez-vous</h1>
      <div class="topbar-actions">
        <!-- Bouton avec nom de l'utilisateur -->
        <button class="user-button">
          <font-awesome-icon icon="user" class="user-icon" />
          <span v-if="authStore.getUser()">{{ authStore.getUser().nom }}</span>
        </button>
        <!-- Bouton déconnexion -->
        <a href="#" @click.prevent="logout" class="logout-button">
          <font-awesome-icon icon="sign-out-alt" /> Déconnecter
        </a>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <router-link to="/calendar" exact-active-class="active-link" @click="setVerticalMenu">
            <font-awesome-icon icon="house" class="sidebar-icon" /> Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/appointments" exact-active-class="active-link" @click="setVerticalMenu">
            <font-awesome-icon icon="calendar-check" class="sidebar-icon" /> Rendez-vous
          </router-link>
        </li>

        <!-- Vérification du rôle pour afficher la gestion des utilisateurs -->
        <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/users" exact-active-class="active-link" @click="setHorizontalMenu">
            <font-awesome-icon icon="user-md" class="sidebar-icon" /> Utilisateurs
          </router-link>
        </li>

        
          <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/patients" exact-active-class="active-link" @click="setHorizontalMenu">
            <font-awesome-icon icon="bed" class="sidebar-icon" /> Patients
          </router-link>
        </li>
      
          <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/specialties" exact-active-class="active-link" @click="setHorizontalMenu">
            <font-awesome-icon icon="stethoscope" class="sidebar-icon" /> Spécialités
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";

export default {
  name: "SidebarWithTopbar",
  computed: {
    authStore() {
      return useAuthStore();
    },
  },
  methods: {
    setHorizontalMenu() {
      this.$emit("toggle-navbar", false);
    },
    setVerticalMenu() {
      this.$emit("toggle-navbar", true);
    },
    logout() {
      Swal.fire({
        title: "Déconnexion",
        text: "Êtes-vous sûr de vouloir vous déconnecter ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, déconnectez-moi",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          const authStore = useAuthStore();
          authStore.logout();
          this.$router.push({
            name: "Login",
            query: { message: "Déconnexion réussie" },
          });
        }
      });
    },
  },
  mounted() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated()) {
      this.$router.push({ name: "Login", query: { message: "Veuillez vous connecter." } });
    }
  },
};
</script>

<style scoped>
/* Topbar styling */
.topbar {
  height: 70px;
  width: 100%;
  background-color: #3b5998;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.topbar h1 {
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Bouton utilisateur */
.user-button {
  display: flex;
  align-items: center;
  background-color: #f1c40f;
  color: #3b5998;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-button:hover {
  background-color: #d4ac0d;
}

.user-icon {
  margin-right: 8px;
}

/* Bouton déconnexion */
.logout-button {
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #e74c3c;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

/* Sidebar styling */
.sidebar {
  width: 250px;
  height: calc(100vh - 70px);
  background-color: #3b5998;
  color: #ecf0f1;
  padding: 20px;
  position: fixed;
  top: 70px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 1.4em;
  font-weight: 600;
  color: #f1c40f;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  margin-bottom: 15px;
}

.sidebar a {
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar a:hover {
  background-color: #3b5998;
  color: #f1c40f;
}

/* Active link style */
.active-link {
  background-color: #3b5998;
  color: #f1c40f;
  font-weight: bold;
}

.sidebar-icon {
  margin-right: 10px;
}
</style>
