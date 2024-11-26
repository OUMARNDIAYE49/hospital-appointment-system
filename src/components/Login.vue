<template>
  <div class="container-center">
    <form @submit.prevent="login" class="shadow-lg p-4 rounded bg-white">
      <h1 class="text-center mb-4">Connexion</h1>
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="credentials.email"
          class="form-control"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div class="form-group mb-3 position-relative password-field">
        <label for="password" class="form-label">Mot de passe</label>
        <div class="input-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="credentials.password"
            class="form-control"
            placeholder="Entrez votre mot de passe"
            required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <!-- SVG Icons -->
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
      </div>
      <div class="text-end mb-4">
        <a href="/forgot-password" class="forgot-password-link">Mot de passe oublié ?</a>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Se connecter</button>
        <!-- <button type="button" class="btn btn-outline-secondary" @click="resetForm">
          Annuler
        </button> -->
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const credentials = ref({
      email: "",
      password: "",
    });

    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      try {
        await authStore.login(credentials.value);

        const user = authStore.getUser();
        const role = user?.role || "non défini";

        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          html: `
            Bienvenue <strong>${user?.nom || "utilisateur"}</strong>!<br>
            Rôle : <strong>${role}</strong>
          `,
          confirmButtonText: "OK",
          timer: 3000,
        });

        router.push("/calendar");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Échec de la connexion",
          text: "Vérifiez vos identifiants et réessayez.",
          confirmButtonText: "Réessayer",
        });
        console.error("Erreur lors de la connexion :", error.response?.data || error.message);
      }
    };

    const resetForm = () => {
      credentials.value = { email: "", password: "" };
    };

    return {
      credentials,
      showPassword,
      togglePasswordVisibility,
      login,
      resetForm,
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
  max-width: 400px;  
  width: 100%;  
  border-radius: 8px;
  background-color: #ffffff; 
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  color: #004085;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
}

.btn {
  width: 100%;
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
  display: flex;
  align-items: center;
  height: 100%;
}

.forgot-password-link {
  color: #0069d9;
  text-decoration: none;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

</style>

