<template>
  <div>
    <div class="topbar">
    <h1>Gestion des Rendez-vous</h1>
    <div class="topbar-actions">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-outline-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <font-awesome-icon icon="user" class="user-icon" />
          <span v-if="authStore.getUser()">{{ authStore.getUser().nom }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <router-link 
              to="/edit-user" 
              class="dropdown-item" 
              :class="{ 'active-link': isRouteActive('/edit-user') }"
            >
              <font-awesome-icon icon="user-edit" class="dropdown-icon" />
              Profil
            </router-link>
          </li>
          <li>
            <router-link 
              to="/change-password" 
              class="dropdown-item" 
              :class="{ 'active-link': isRouteActive('/change-password') }"
            >
              <font-awesome-icon icon="key" class="dropdown-icon" />
              Changer mot de passe
            </router-link>
          </li>
        </ul>
      </div>
      <a href="#" @click.prevent="logout" class="logout-button">
        <font-awesome-icon icon="sign-out-alt" /> Déconnecter
      </a>
    </div>
  </div>

    <div class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <router-link to="/calendar" :class="{ 'active-link': isRouteActive('/calendar') }">
            <font-awesome-icon icon="house" class="sidebar-icon" /> Accueil
          </router-link>
        </li>
        <li>
          <router-link
            to="/appointments"
            :class="{ 'active-link': isRouteGroupActive(['/appointments', '/add-appointment']) }"
          >
            <font-awesome-icon icon="calendar-check" class="sidebar-icon" />
            Rendez-vous
          </router-link>
        </li>
        <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/users" :class="{ 'active-link': isRouteGroupActive(['/users', '/add-user']) }">
            <font-awesome-icon icon="user-md" class="sidebar-icon" />
            Utilisateurs
          </router-link>
        </li>
        <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/patients" :class="{ 'active-link': isRouteGroupActive(['/patients', '/add-patient']) }">
            <font-awesome-icon icon="bed" class="sidebar-icon" /> Patients
          </router-link>
        </li>
        <li v-if="authStore.getUser()?.role !== 'MEDECIN'">
          <router-link to="/specialties" :class="{ 'active-link': isRouteGroupActive(['/specialties', '/add-specialties']) }">
            <font-awesome-icon icon="stethoscope" class="sidebar-icon" />
            Spécialités
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
    isRouteActive(route) {
      return this.$route.path === route;
    },
    isRouteGroupActive(routes) {
      return routes.some(route => this.$route.path.startsWith(route));
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
      this.$router.push({
        name: "Login",
        query: { message: "Veuillez vous connecter." },
      });
    }
  },
};
</script>

<style scoped>
.active-dropdown {
  background-color: #007bff; 
  color: #f1c40f; 
  font-weight: bold;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-left: 4px solid #f1c40f;
}

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

.btn-outline-secondary {
  color: #f2f5f8;
  border: 1px solid #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #d4ac0d;
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

.user-icon {
  margin-right: 8px;
}

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

.active-appointments {
  background-color: #007bff; 
  color: #f1c40f; 
  font-weight: bold;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-left: 4px solid #f1c40f;
}

.active-appointments .sidebar-icon {
  color: #f1c40f !important;
}

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

.btn-outline-secondary {
  color: #f2f5f8;
  border: 1px solid #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #d4ac0d;
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

.user-icon {
  margin-right: 8px;
}

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

.active-link {
  background-color: #2c3e50;
  color: #f1c40f;
  font-weight: bold;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-left: 4px solid #f1c40f;
}

.sidebar-icon {
  margin-right: 10px;
}

.active-link .sidebar-icon {
  color: #f1c40f !important;
}
</style>
