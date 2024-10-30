<template>
  <div class="container mt-5 home-container">
    <div class="row align-items-center">
      <div class="col-md-6 text-center">
        <img 
          src="../assets/images/docteur.jpg" 
          alt="Gestion des rendez-vous" 
          class="img-fluid img-doctor" 
        />
      </div>
      <div class="col-md-6 text-center content-container">
        <h1 class="mb-4">Bienvenue à l'application de gestion des rendez-vous</h1>
        <p class="lead">
          Cette application est destinée à la gestion centralisée des plannings des médecins et des rendez-vous des patients.
        </p>
        <p class="description">
          Grâce à notre interface intuitive, vous pouvez facilement :
        </p>
        <ul class="list-unstyled features-list">
          <li>
            <font-awesome-icon icon="user-md" class="icon" /> Consulter les médecins disponibles
          </li>
          <li>
            <font-awesome-icon icon="calendar-alt" class="icon" /> Prendre rendez-vous en quelques clics
          </li>
          <li>
            <font-awesome-icon icon="clock" class="icon" /> Gérer vos rendez-vous à tout moment
          </li>
        </ul>
        <div class="mt-5">
          <router-link to="/login" class="btn btn-primary btn-lg btn-login">Connexion</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'HomeView',
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
/* Conteneur principal avec un fond dégradé */
.home-container {
  background: linear-gradient(to right, #b4d8f6, #b4d8f6);
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Conteneur du contenu */
.content-container {
  color: #34495e;
}

/* Styles pour le titre */
h1 {
  font-weight: 700;
  color: #2c3e50;
}

/* Styles pour les paragraphes */
p {
  font-size: 1.25rem;
  color: #34495e;
}

.description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
}

/* Liste des fonctionnalités */
.features-list {
  font-size: 1.1rem;
  color: #555;
  margin-top: 15px;
}

.features-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.icon {
  color: #3498db;
  margin-right: 10px;
  font-size: 1.2rem;
}

/* Bouton de connexion */
.btn-login {
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-login:hover {
  transform: scale(1.05);
}

/* Styles de l'image */
.img-doctor {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.img-doctor:hover {
  transform: scale(1.02);
}
</style>
