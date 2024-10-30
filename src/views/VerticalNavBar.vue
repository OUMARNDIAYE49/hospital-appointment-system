<template>
  <nav class="navbar-vertical">
    <ul>
      <li>
        <router-link to="/" @click="setHorizontalMenu">
          <font-awesome-icon icon="house" /> Accueil
        </router-link>
      </li>
      <li>
        <router-link to="/admin" @click="setVerticalMenu">
          <font-awesome-icon icon="calendar-check" /> Liste des Rendez-vous
        </router-link>
      </li>
      <li>
        <router-link to="/admin/appointments" @click="setHorizontalMenu">
          <font-awesome-icon icon="calendar-plus" /> Ajouter Rendez-vous
        </router-link>
      </li>
      <li>
        <router-link to="/admin/doctors" @click="setHorizontalMenu">
          <font-awesome-icon icon="user-md" /> Gestion des Médecins
        </router-link>
      </li>
      <li>
        <router-link to="/admin/specialties" @click="setHorizontalMenu">
          <font-awesome-icon icon="stethoscope" /> Gestion des Spécialités
        </router-link>
      </li>
      <li>
        <router-link to="/login" @click="setHorizontalMenu">
          <font-awesome-icon icon="sign-out-alt" /> Déconnecter
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'VerticalNavbar',
  methods: {
    setHorizontalMenu() {
      this.$emit('toggle-navbar', false); // Bascule vers le menu horizontal
    },
  },
};
</script>

<style scoped>
.navbar-vertical {
  display: flex; /* Utilise flexbox pour la mise en page */
  flex-direction: column; /* Menu en orientation verticale */
  position: absolute; /* Positionnement absolu à gauche */
  left: 0;
  top: 70px; /* Ajuste selon la hauteur de ton en-tête */
  width: 240px; /* Largeur du menu vertical */
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  background-color: #007bff; /* Couleur de fond */
  padding-top: 20px; /* Espace en haut du menu */
}

.navbar-vertical a {
  color: white; /* Couleur du texte */
  text-decoration: none; /* Supprime le soulignement des liens */
  padding: 20px; /* Espacement autour des éléments */
}

.navbar-vertical ul {
  list-style-type: none; /* Supprime les puces */
  margin: 0; /* Supprime la marge par défaut */
  padding: 0; /* Supprime le padding par défaut */
}

.navbar-vertical li {
  padding: 10px; /* Espacement autour des éléments de la liste */
  display: flex; /* Utilise flexbox pour aligner l'icône et le texte */
  align-items: center; /* Aligne verticalement les éléments */
}

.navbar-vertical i {
  margin-right: 10px; /* Espacement entre l'icône et le texte */
}
</style>
