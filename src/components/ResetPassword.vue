<template>
  <div class="reset-password">
    <h1 class="text-center mb-4">Nouveau mot de passe</h1>
    <form @submit.prevent="resetPassword" class="shadow-lg p-4 rounded bg-white" autocomplete="off">
      <!-- Champ pour le mot de passe -->
      <div class="form-group mb-3">
        <label for="password" class="form-label">Nouveau mot de passe</label>
        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            :id="`password-${Date.now()}`"
            v-model="password"
            class="form-control"
            placeholder="Entrez votre nouveau mot de passe"
            required
            autocomplete="new-password"
          />
          <span class="input-group-text" @click="togglePasswordVisibility">
            <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
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
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRoute, useRouter } from "vue-router";

export default {
  name: 'ResetPassword',
  setup() {
    const authStore = useAuthStore();
    const password = ref('');
    const message = ref('');
    const success = ref(false);
    const showPassword = ref(false);
    const route = useRoute();
    const router = useRouter();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const resetPassword = async () => {
      const token = route.params.token;
      try {
        await authStore.resetPassword(token, password.value);
        message.value = 'Votre mot de passe a été mis à jour avec succès.';
        success.value = true;
        password.value = ''; // Réinitialiser le champ après succès
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        message.value = "Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.";
        success.value = false;
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
      }
    };

    // Réinitialise le mot de passe au chargement du composant
    onMounted(() => {
      password.value = '';
    });

    return {
      password,
      message,
      success,
      showPassword,
      togglePasswordVisibility,
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
