<template>
  <div>
    <!-- Topbar -->
    <div class="topbar">
      <h1>Gestion des Rendez-vous</h1>
      <div class="topbar-actions">
        <a href="#" @click.prevent="logout">
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
            <font-awesome-icon icon="calendar-check" class="sidebar-icon" /> Acceuil
          </router-link>
        </li>
        <li>
          <router-link to="/appointments" exact-active-class="active-link" @click="setVerticalMenu">
            <font-awesome-icon icon="calendar-check" class="sidebar-icon" /> Rendez-vous
          </router-link>
        </li>
        <li>
          <router-link to="/users" exact-active-class="active-link" @click="setHorizontalMenu">
            <font-awesome-icon icon="user-md" class="sidebar-icon" /> Utilisateurs
          </router-link>
        </li>
        <li>
          <router-link to="/patients" exact-active-class="active-link" @click="setHorizontalMenu">
            <font-awesome-icon icon="user" class="sidebar-icon" /> Patients
          </router-link>
        </li>
        <li>
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
export default {
  name: 'SidebarWithTopbar',
  methods: {
    setHorizontalMenu() {
      this.$emit('toggle-navbar', false);
    },
    setVerticalMenu() {
      this.$emit('toggle-navbar', true);
    },
    logout() {
      // Suppression du token ou des données de session
      localStorage.removeItem('token'); // ou sessionStorage.removeItem('token')
      
      // Redirection vers la page de connexion
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Topbar styling */
.topbar {
  height: 70px;
  width: 100%;
  background-color: #3b5998; /* Couleur de fond de la topbar */
  color: #ffffff; /* Couleur du texte de la topbar */
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

.topbar-actions a {
  color: #ffffff; /* Couleur des liens de la topbar */
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #e74c3c; /* Couleur du bouton de déconnexion */
  border-radius: 5px;
  transition: background-color 0.3s;
}

.topbar-actions a:hover {
  background-color: #c0392b; /* Couleur du bouton au survol */
}

/* Sidebar styling */
.sidebar {
  width: 250px;
  height: calc(100vh - 70px);
  background-color: #3b5998; /* Couleur de fond de la sidebar */
  color: #ecf0f1; /* Couleur du texte de la sidebar */
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
  color: #f1c40f; /* Couleur du titre de la sidebar */
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
  color: #ecf0f1; /* Couleur du texte des liens de la sidebar */
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar a:hover {
  background-color: #3b5998; /* Couleur de fond au survol des liens */
  color: #f1c40f; /* Couleur du texte au survol des liens */
}

/* Active link style */
.active-link {
  background-color: #3b5998; /* Couleur de fond du lien actif */
  color: #f1c40f; /* Couleur du texte du lien actif */
  font-weight: bold; /* Rendre le lien actif en gras */
}

/* Spacing between icon and text */
.sidebar-icon {
  margin-right: 10px; /* Espace entre l'icône et le lien */
}
</style>
