<template>
  <div class="container-center">
    <form @submit.prevent="resetPassword" class="shadow-lg p-4 rounded bg-white" autocomplete="off">
      <h1 class="text-center mb-4">Nouveau mot de passe</h1>

      <div class="form-group mb-3 position-relative password-field">
        <label for="password" class="form-label">Nouveau mot de passe</label>
        <div class="input-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Entrez votre nouveau mot de passe"
            required
            autocomplete="new-password"
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye-off"
            >
              <path
                d="M17.94 17.94A10.05 10.05 0 0 1 12 19.5a10 10 0 0 1-9.5-6 9.97 9.97 0 0 1 1.64-2.01M12 5.5a10 10 0 0 1 9.5 6 9.97 9.97 0 0 1-1.64 2.01M3 3l18 18"
              ></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              ></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
        </div>
        <div v-if="passwordError" class="text-danger mt-1">
          {{ passwordError }}
        </div>
      </div>
      <div v-if="message" class="alert" :class="{'alert-success': success, 'alert-danger': !success}">
        {{ message }}
      </div>
      <button type="submit" class="btn btn-primary w-100 same-size-button">Mettre à jour le mot de passe</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ResetPassword",
  setup() {
    const authStore = useAuthStore();
    const password = ref("");
    const passwordError = ref(""); 
    const message = ref("");
    const success = ref(false);
    const showPassword = ref(false);
    const route = useRoute();
    const router = useRouter();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validatePassword = () => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,100}$/;
      if (!passwordRegex.test(password.value)) {
        passwordError.value =
          "Le mot de passe doit contenir des lettres, des chiffres, et comporter entre 6 et 100 caractères.";
        return false;
      }
      passwordError.value = "";
      return true;
    };

    const resetPassword = async () => {
      if (!validatePassword()) return;

      const token = route.params.token;
      try {
        await authStore.resetPassword(token, password.value);
        message.value = "Votre mot de passe a été mis à jour avec succès.";
        success.value = true;
        password.value = ""; 
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        message.value =
          "Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.";
        success.value = false;
        console.error("Erreur lors de la mise à jour du mot de passe :", error);
      }
    };

    onMounted(() => {
      password.value = "";
    });

    return {
      password,
      passwordError,
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
.container-center {
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

form {
  max-width: 500px;
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .form-control {
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #6c757d;
}

.alert {
  margin-top: 20px;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
}
</style>
