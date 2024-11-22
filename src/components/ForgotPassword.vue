<template>
  <div class="forgot-password-container">
    
    <form @submit.prevent="sendResetEmail" class="shadow-lg p-4 rounded bg-white">
      <h1 class="text-center mb-4">Réinitialiser le mot de passe</h1>
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          placeholder="Entrez votre email pour réinitialiser le mot de passe"
          required
        />
      </div>
      
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Envoyer le lien</button>
        <button type="button" class="btn btn-outline-secondary" @click="resetForm">Annuler</button>
      </div>
      
      <div v-if="message" class="alert alert-success mt-3">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';

export default {
  name: 'ForgotPassword',
  setup() {
    const email = ref('');
    const message = ref(null);
    const authStore = useAuthStore();

    const sendResetEmail = async () => {
      try {
        await authStore.sendPasswordResetEmail(email.value);
        message.value = "Un lien de réinitialisation a été envoyé à votre adresse email.";
      } catch (error) {
        alert("Erreur lors de l'envoi de l'email de réinitialisation.");
        console.error("Erreur:", error.response?.data || error.message);
      }
    };

    const resetForm = () => {
      email.value = '';
      message.value = null;
    };

    return {
      email,
      message,
      sendResetEmail,
      resetForm,
    };
  },
};
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100vw; 
  background-color: #3b5998; 
  margin: 0;
  padding: 0;
  position: absolute; 
  top: 0;
  left: 0;
}

h1 {
  color: #004085;
  font-weight: bold;
  margin-top: 25px;
}

form {
  max-width: 600px;  
  width: 100%;  
  border-radius: 8px;
  background-color: #ffffff; 
  padding: 20px;
  box-sizing: border-box;
}

.shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn {
  width: 48%;
}

.btn-primary {
  background-color: #0069d9;
  border: none;
}

.btn-outline-secondary {
  color: #6c757d;
  border: 1px solid #6c757d;
}

.btn-primary:hover,
.btn-outline-secondary:hover {
  opacity: 0.9;
}

.bg-white {
  background-color: #ffffff;
}

.form-control {
  height: 45px;
  font-size: 16px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}
</style>
