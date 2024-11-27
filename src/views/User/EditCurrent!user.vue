<template>
  <div>
    <form
      @submit.prevent="submitUpdate"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <h2 class="text-center mb-4">Modification du profil</h2>

      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input
          type="text"
          class="form-control"
          v-model="updatedName"
          id="name"
          @blur="validateNom"
          :class="{ 'is-invalid': nomError }"
          required
        />
        <div v-if="nomError" class="invalid-feedback">
          {{ nomError }}
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email :</label>
        <input
          type="email"
          class="form-control"
          v-model="updatedEmail"
          id="email"
          @blur="validateEmail"
          :class="{ 'is-invalid': emailError }"
          required
        />
        <div v-if="emailError" class="invalid-feedback">
          {{ emailError }}
        </div>
      </div>

  
      <button class="btn btn-primary text-white mt-3 mb-4 me-3">
        Confirmer
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/calendar"
      >
        <button class="btn btn-outline-secondary mt-3 mb-4">Annuler</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/authStore";
import { useUtilisateurStore } from "../../store/userStore";
import Swal from "sweetalert2";

const userStore = useAuthStore();
const UtilisateurStore = useUtilisateurStore();
const router = useRouter();

const updatedName = ref(userStore.user.nom);
const updatedEmail = ref(userStore.user.email);
const updatedPhone = ref(userStore.user.phone || "");

const nomError = ref("");
const emailError = ref("");

const validateNom = () => {
  const isAlpha = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(updatedName.value);
  const isLongEnough = updatedName.value.length >= 3;
  const isNotTooLong = updatedName.value.length <= 100;

  if (!isAlpha) {
    nomError.value = "Le nom doit contenir uniquement des lettres, des espaces, des apostrophes ou des traits d’union.";
  } else if (!isLongEnough) {
    nomError.value = "Le nom doit contenir au moins 3 caractères.";
  } else if (!isNotTooLong) {
    nomError.value = "Le nom ne doit pas dépasser 100 caractères.";
  } else {
    nomError.value = "";
  }
};

const validateEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isNotTooLong = updatedEmail.value.length <= 50;

  if (!emailRegex.test(updatedEmail.value)) {
    emailError.value = "L'email doit être valide et se terminer par '@gmail.com'.";
  } else if (!isNotTooLong) {
    emailError.value = "L'email ne doit pas dépasser 50 caractères.";
  } else {
    emailError.value = "";
  }
};

const submitUpdate = async () => {
  validateNom();
  validateEmail();

  if (nomError.value || emailError.value) {
    return; 
  }

  try {
    await UtilisateurStore.updateCurrentUser(updatedName.value, updatedEmail.value, updatedPhone.value);

    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Les informations ont été mises à jour avec succès.",
      confirmButtonText: "OK",
    });

    router.push("/");
  } catch (error) {
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
  width: 40%;
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
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
}
</style>
