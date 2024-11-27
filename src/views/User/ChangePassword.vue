<template>
  <div class="change-password-container">
    <h2>Changer le mot de passe</h2>

    <form v-if="formVisible" @submit.prevent="handleSubmit">
      
      <div class="form-group">
        <label for="oldPassword">Ancien mot de passe</label>
        <div class="password-input-container">
          <input
            :type="oldPasswordVisible ? 'text' : 'password'"
            id="oldPassword"
            v-model="oldPassword"
            autocomplete="new-password"
            required
            placeholder="Entrez votre ancien mot de passe"
          />
          <span class="toggle-password" @click="togglePasswordVisibility('oldPassword')">
       
            <svg
              v-if="oldPasswordVisible"
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
      <div class="form-group">
        <label for="newPassword">Nouveau mot de passe</label>
        <div class="password-input-container">
          <input
            :type="newPasswordVisible ? 'text' : 'password'"
            id="newPassword"
            v-model="newPassword"
            autocomplete="new-password"
            required
            placeholder="Entrez votre nouveau mot de passe"
          />
          <span class="toggle-password" @click="togglePasswordVisibility('newPassword')">
          
            <svg
              v-if="newPasswordVisible"
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

      <div class="form-group">
        <label for="confirmPassword">Confirmer le nouveau mot de passe</label>
        <div class="password-input-container">
          <input
            :type="confirmPasswordVisible ? 'text' : 'password'"
            id="confirmPassword"
            v-model="confirmPassword"
            autocomplete="new-password"
            required
            placeholder="Confirmez votre nouveau mot de passe"
          />
          <span class="toggle-password" @click="togglePasswordVisibility('confirmPassword')">
          
            <svg
              v-if="confirmPasswordVisible"
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

      <button type="submit" :disabled="isSubmitting">
        Changer le mot de passe
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUtilisateurStore } from "../../store/userStore";
import Swal from "sweetalert2";

const userStore = useUtilisateurStore();
const router = useRouter();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordError = ref("");  
const isSubmitting = ref(false);
const oldPasswordVisible = ref(false);
const newPasswordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const formVisible = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === "oldPassword") {
    oldPasswordVisible.value = !oldPasswordVisible.value;
  } else if (field === "newPassword") {
    newPasswordVisible.value = !newPasswordVisible.value;
  } else if (field === "confirmPassword") {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};

const resetForm = () => {
  oldPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  passwordError.value = "";
};

const validatePassword = () => {
  const hasLetters = /[A-Za-z]/.test(newPassword.value);
  const hasNumbers = /\d/.test(newPassword.value);
  const isLongEnough = newPassword.value.length >= 6;
  const isNotTooLong = newPassword.value.length <= 100;

  if (!hasLetters || !hasNumbers) {
    passwordError.value = 'Le mot de passe doit contenir des lettres et des chiffres.';
  } else if (!isLongEnough) {
    passwordError.value = 'Le mot de passe doit contenir au moins 6 caractères.';
  } else if (!isNotTooLong) {
    passwordError.value = 'Le mot de passe ne doit pas dépasser 100 caractères.';
  } else {
    passwordError.value = ''; 
  }
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    validatePassword();
    if (passwordError.value) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: passwordError.value,
      });
      return;
    }
    if (newPassword.value !== confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Le mot de passe confirmé ne correspond pas au nouveau mot de passe.",
      });
      return;
    }
    await userStore.changePassword(oldPassword.value, newPassword.value);

    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Votre mot de passe a été changé avec succès !",
    });
    resetForm();

    router.push("/");
  } catch (error) {
    const errorMessage = error.response?.data?.message;

    if (errorMessage === "Ancien mot de passe incorrect") {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "L'ancien mot de passe que vous avez saisi est incorrect. Veuillez réessayer.",
      });
    } else if (errorMessage === "Validation échouée") {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Le nouveau mot de passe ne respecte pas les critères requis.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: errorMessage || "Une erreur inattendue s'est produite.",
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  formVisible.value = true;
});
</script>




<style scoped>
.change-password-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  margin-top: 80px;
}

.password-input-container {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

h2 {
  text-align: center;
  color: #4e4e4e;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  background-color: #fafafa;
  transition: border-color 0.3s ease-in-out;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  background-color: #fff;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
  color: #007bff;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.back-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
}

.back-button i {
  margin-right: 8px;
}
</style>
