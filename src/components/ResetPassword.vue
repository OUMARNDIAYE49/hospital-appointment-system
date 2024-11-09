<template>
  <div class="reset-password">
    <h1 class="text-center mb-4">Nouveau mot de passe</h1>
    <form @submit.prevent="resetPassword" class="shadow-lg p-4 rounded bg-white">
      <!-- Champ pour le mot de passe -->
      <div class="form-group mb-3">
        <label for="password" class="form-label">Nouveau mot de passe</label>
        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Entrez votre nouveau mot de passe"
            required
          />
          <span class="input-group-text" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </span>
        </div>
      </div>

      <!-- Champ pour la confirmation du mot de passe -->
      <div class="form-group mb-3">
        <label for="confirmPassword" class="form-label">Confirmez le mot de passe</label>
        <div class="input-group">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Confirmez votre nouveau mot de passe"
            required
          />
          <span class="input-group-text" @click="toggleConfirmPasswordVisibility">
            <i :class="showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
          </span>
        </div>
      </div>

      <!-- Message d'alerte -->
      <div v-if="message" class="alert" :class="{'alert-success': success, 'alert-danger': !success}">
        {{ message }}
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="btn btn-primary w-100">Mettre à jour le mot de passe</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';

export default {
  name: 'ResetPassword',
  setup() {
    const authStore = useAuthStore();
    const password = ref('');
    const confirmPassword = ref('');
    const message = ref('');
    const success = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };

    const resetPassword = async () => {
      if (password.value !== confirmPassword.value) {
        message.value = "Les mots de passe ne correspondent pas.";
        success.value = false;
        return;
      }

      try {
        await authStore.updatePassword(password.value);
        message.value = 'Votre mot de passe a été mis à jour avec succès.';
        success.value = true;
        password.value = '';
        confirmPassword.value = '';
      } catch (error) {
        message.value = "Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.";
        success.value = false;
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
      }
    };

    return {
      password,
      confirmPassword,
      message,
      success,
      showPassword,
      showConfirmPassword,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      resetPassword,
    };
  },
};
</script>

<style scoped>
.reset-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
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
}

.shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-group-text {
  cursor: pointer;
}

.btn-primary {
  background-color: #0069d9;
  border: none;
}

.btn-primary:hover {
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

.alert {
  margin-top: 20px;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
