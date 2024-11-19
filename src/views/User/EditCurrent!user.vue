<template>
  <div>
    <form
      @submit.prevent="submitUpdate"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input
          type="text"
          class="form-control"
          v-model="updatedName"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email :</label>
        <input
          type="email"
          class="form-control"
          v-model="updatedEmail"
          id="email"
          :class="{ 'is-invalid': !isEmailValid && updatedEmail }"
          required
        />
        <div v-if="!isEmailValid && updatedEmail" class="invalid-feedback">
          Veuillez entrer une adresse email valide.
        </div>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">
        Confirmer
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/calendar"
      >
        <button class="btn btn-danger mt-3 mb-4">Annuler</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/authStore";
import { useUtilisateurStore } from "../../store/userStore";
import Swal from "sweetalert2";

const userStore = useAuthStore();
const UtilisateurStore = useUtilisateurStore();

const router = useRouter();

const updatedName = ref(userStore.user.nom);
const updatedEmail = ref(userStore.user.email);

// Fonction de validation de l'email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validation d'email dynamique
const isEmailValid = computed(() => validateEmail(updatedEmail.value));

const submitUpdate = async () => {
  // Vérification côté client avant l'envoi
  if (!isEmailValid.value) {
    Swal.fire({
      icon: "error",
      title: "Email invalide",
      text: "Veuillez entrer une adresse email valide.",
      confirmButtonText: "OK",
    });
    return;
  }

  try {
    // Mise à jour des informations utilisateur
    await UtilisateurStore.updateCurrentUser(updatedName.value, updatedEmail.value);

    // Alerte de succès
    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Les informations ont été mises à jour avec succès.",
      confirmButtonText: "OK",
    });

    // Redirection après confirmation
    router.push("/calendar");
  } catch (error) {
    // Gérer les erreurs spécifiques
    if (error.response && error.response.status === 409) {
      Swal.fire({
        icon: "warning",
        title: "Email existant",
        text: "Cet email est déjà utilisé par un autre utilisateur.",
        confirmButtonText: "OK",
      });
    } else if (error.response && error.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "L'email est incorrect.",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite lors de la mise à jour.",
        confirmButtonText: "OK",
      });
    }
  }
};
</script>

<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
.is-invalid {
  border-color: red;
}
.invalid-feedback {
  color: red;
  font-size: 0.875rem;
}
</style>
