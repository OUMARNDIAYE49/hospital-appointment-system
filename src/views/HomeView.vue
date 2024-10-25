<template>
  <div class="container mt-5">
    <div class="row align-items-center">
      <div class="col-md-6">
        <img 
          src="../assets/images/docteur.jpg" 
          alt="Gestion des rendez-vous" 
          class="img-fluid img-doctor" 
        />
      </div>
      <div class="col-md-6 text-center">
        <h1 class="mb-4">Bienvenue à l'application de gestion des rendez-vous</h1>
        <p class="lead">
          Cette application est destinée à la gestion centralisée des plannings des médecins et des rendez-vous des patients.
        </p>
        <p>
          Grâce à notre interface intuitive, vous pouvez facilement :
        </p>
        <ul class="list-unstyled">
          <li>Consulter les médecins disponibles</li>
          <li>Prendre rendez-vous en quelques clics</li>
          <li>Gérer vos rendez-vous à tout moment</li>
        </ul>
        <div class="mt-5">
          <router-link to="/login" class="btn btn-primary btn-lg">Connexion</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.container {
  max-width: 1200px; /* Limite la largeur de la page */
  margin: auto; /* Centre le contenu */
}

h1 {
  font-weight: 700;
  color: #2c3e50;
}

p {
  font-size: 1.25rem;
  color: #34495e; /* Couleur légèrement plus claire pour le texte */
}

ul {
  font-size: 1.1rem; /* Ajuste la taille de la police pour la liste */
  color: #555; /* Couleur pour le texte de la liste */
}

.btn {
  padding: 10px 20px;
}

.img-doctor {
  max-width: 100%; /* Assure que l'image ne dépasse pas la largeur de son conteneur */
  height: auto; /* Maintient le ratio d'aspect */
  border-radius: 10px; /* Ajoute un léger arrondi aux bords de l'image */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ajoute une ombre pour un effet de profondeur */
}
</style>
