<template>
  <div class="user-login">
    <form @submit.prevent="login">
      <h3>Connexion</h3>
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$emit('login', { username: this.username, password: this.password });
      this.username = '';
      this.password = '';
    }
  }
};
</script>

<style scoped>
.user-login {
  max-width: 400px;
  margin: auto;
}
</style>
