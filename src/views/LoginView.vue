<template>
  <div class="container mt-5">
    <!-- <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form> -->
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Logique pour authentifier l'utilisateur
      console.log(`Nom d'utilisateur: ${this.username}, Mot de passe: ${this.password}`);
      // Rediriger après une connexion réussie
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}


.login-form {
  max-width: 400px; 
  margin: auto; 
}

.login-form .mb-3 {
  margin-bottom: 1rem;
}
</style>
