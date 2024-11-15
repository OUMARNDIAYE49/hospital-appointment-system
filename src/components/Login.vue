<template>
  <div class="admin-dashboard">
    <h1 class="text-center mb-4">Connexion</h1>
    <form @submit.prevent="login" class="shadow-lg p-4 rounded bg-white">
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

      <div class="form-group mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          class="form-control"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>

      <div class="text-end mb-4">
        <a href="/forgot-password" class="forgot-password-link">Mot de passe oublié ?</a>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Se connecter</button>
        <button type="button" class="btn btn-outline-secondary" @click="resetForm">Annuler</button>
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

    const login = async () => {
      try {
        await authStore.login(credentials.value);

        const user = authStore.getUser();
        const role = user?.role || "non défini";

        console.log("Rôle de l'utilisateur connecté :", role);

        // Afficher une alerte SweetAlert2 après une connexion réussie
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

        // Rediriger l'utilisateur
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
      login,
      resetForm,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
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

.forgot-password-link {
  color: #0069d9;
  text-decoration: none;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>
