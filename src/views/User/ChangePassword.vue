
  
  <template>
  <div>
    <form
      @submit.prevent="submitPasswordChange"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <!-- Ancien mot de passe -->
      <div class="mb-3">
        <label for="oldPassword" class="form-label">Ancien mot de passe :</label>
        <div class="input-group">
          <input
            :type="showOldPassword ? 'text' : 'password'"
            class="form-control"
            v-model="currentPassword"
            id="oldPassword"
            required
          />
          <span class="input-group-text" @click="toggleOldPasswordVisibility" style="cursor: pointer;">
            <svg
              v-if="showOldPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
        </div>
      </div>

      <!-- Nouveau mot de passe -->
      <div class="mb-3">
        <label for="newPassword" class="form-label">Nouveau mot de passe :</label>
        <div class="input-group">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            class="form-control"
            v-model="newPassword"
            id="newPassword"
            :class="{ 'is-invalid': !isPasswordValid && newPassword }"
            required
          />
          <span class="input-group-text" @click="toggleNewPasswordVisibility" style="cursor: pointer;">
            <svg
              v-if="showNewPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
        </div>
        <div
          v-if="newPassword && !isPasswordValid"
          class="invalid-feedback"
        >
          Le mot de passe doit contenir au moins 8 caractères.
        </div>
      </div>

      <!-- Boutons -->
      <div class="mb-3 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary" :disabled="!isPasswordValid">
          Valider
        </button>
        <router-link to="/" class="btn btn-secondary">
          Annuler
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUtilisateurStore } from "@/store/userStore"; // Import du store
import Swal from "sweetalert2";

const router = useRouter();
const utilisateurStore = useUtilisateurStore(); // Initialisation du store utilisateur

const currentPassword = ref("");
const newPassword = ref("");
const showOldPassword = ref(false);
const showNewPassword = ref(false);

const isPasswordValid = computed(() => newPassword.value.length >= 8);

const toggleOldPasswordVisibility = () => {
  showOldPassword.value = !showOldPassword.value;
};

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

const submitPasswordChange = async () => {
  if (!isPasswordValid.value) {
    Swal.fire({
      icon: "error",
      title: "Mot de passe invalide",
      text: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
      confirmButtonText: "OK",
    });
    return;
  }

  try {
    // Appel de la méthode changePassword dans le store avec l'ancien et le nouveau mot de passe
    await utilisateurStore.changePassword(currentPassword.value, newPassword.value);

    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Votre mot de passe a été changé avec succès.",
      confirmButtonText: "OK",
    });

    router.push("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Une erreur s'est produite lors du changement de mot de passe.",
      confirmButtonText: "OK",
    });
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
  