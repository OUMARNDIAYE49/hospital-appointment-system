<template>
    <nav class="navbar-vertical">
      <ul>
        <li>
          <router-link to="/" @click="setHorizontalMenu">
            <font-awesome-icon icon="house" /> Accueil
          </router-link>
        </li>
        <li>
          <router-link to="/doctor" @click="setVerticalMenu">
            <font-awesome-icon icon="user-doctor" /> Tableau de bord Médecin
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/doctor/appointments" @click="setVerticalMenu">
            <font-awesome-icon icon="calendar-check" /> Gérer Rendez-vous
          </router-link>
        </li>
        <li>
          <router-link to="/doctor/patients" @click="setVerticalMenu">
            <font-awesome-icon icon="users" /> Liste des Patients
          </router-link>
        </li> -->
        <li>
          <router-link to="/login" @click="setHorizontalMenu">
            <font-awesome-icon icon="sign-out-alt" /> Déconnexion
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'DoctorMenu',
    methods: {
      setVerticalMenu() {
        this.$emit('toggle-doctor-navbar', true); // Rester en mode menu médecin
      },
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
    width: 250px; /* Largeur du menu vertical */
    height: 100vh; /* Prend toute la hauteur de la fenêtre */
    background-color: #007bff; /* Couleur de fond */
    padding-top: 20px; /* Espace en haut du menu */
  }
  
  .navbar-vertical a {
    color: white; /* Couleur du texte */
    text-decoration: none; /* Supprime le soulignement des liens */
    padding: 20px; /* Espacement autour des éléments */
    transition: background-color 0.3s; /* Transition douce pour le changement de couleur de fond */
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
  
  .navbar-vertical li:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Change la couleur de fond au survol */
  }
  
  .navbar-vertical i {
    margin-right: 10px; /* Espacement entre l'icône et le texte */
  }
  </style>
  