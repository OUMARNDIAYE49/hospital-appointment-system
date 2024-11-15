<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Ajouter un Utilisateur</h1>
      <button @click="navigateToUserList" class="btn btn-outline-secondary btn-sm">
        Retour à la Liste
      </button>
    </div>

    <form @submit.prevent="addUser" class="user-form">
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input type="text" v-model="nom" id="nom" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="password">Mot de Passe:</label>
        <div class="password-input">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            id="password"
            required
            class="form-control"
            @input="validatePassword"
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off">
              <path d="M17.94 17.94A10.05 10.05 0 0 1 12 19.5a10 10 0 0 1-9.5-6 9.97 9.97 0 0 1 1.64-2.01M12 5.5a10 10 0 0 1 9.5 6 9.97 9.97 0 0 1-1.64 2.01M3 3l18 18"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
        </div>
        <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
      </div>

      <div class="form-group">
        <label for="role">Rôle:</label>
        <select v-model="role" @change="handleRoleChange" id="role" required class="form-control">
          <option value="" disabled>Choisissez un rôle</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MEDECIN">MEDECIN</option>
        </select>
      </div>

      <div class="form-group" v-if="role === 'MEDECIN'">
        <label for="specialite_id">Spécialité:</label>
        <select v-model="specialite_id" id="specialite_id" required class="form-control">
          <option value="" disabled>Choisissez une spécialité</option>
          <option v-for="specialite in specialites" :key="specialite.id" :value="specialite.id">
            {{ specialite.nom }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Ajouter Utilisateur</button>
    </form>
  </div>
</template>

<script>
import { useUtilisateurStore } from '@/store/userStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'AddUser',
  setup() {
    const utilisateurStore = useUtilisateurStore();
    const router = useRouter();

    const nom = ref('');
    const email = ref('');
    const password = ref('');
    const role = ref('');
    const specialite_id = ref('');
    const specialites = ref([]);
    const passwordError = ref('');
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validatePassword = () => {
      const hasLetters = /[A-Za-z]/.test(password.value);
      const hasNumbers = /\d/.test(password.value);
      if (!hasLetters || !hasNumbers) {
        passwordError.value = "Le mot de passe doit contenir des lettres et des chiffres.";
      } else {
        passwordError.value = "";
      }
    };

    const addUser = async () => {
  validatePassword();
  if (passwordError.value) return;

  // Vérifier l'unicité de l'email
  const emailExists = utilisateurStore.utilisateurs.some(
    (user) => user.email === email.value
  );

  if (emailExists) {
    Swal.fire({
      icon: 'error',
      title: 'Email déjà utilisé',
      text: 'Cet email est déjà associé à un autre utilisateur.',
      confirmButtonText: 'OK',
    });
    return; // Empêche l'ajout si l'email existe déjà
  }

  const utilisateur = {
    nom: nom.value,
    email: email.value,
    password: password.value,
    role: role.value,
    specialite_id: role.value === 'ADMIN' ? null : specialite_id.value,
  };

  try {
    await utilisateurStore.addUtilisateur(utilisateur);
    Swal.fire({
      icon: 'success',
      title: 'Utilisateur ajouté',
      text: 'L’utilisateur a été ajouté avec succès!',
      confirmButtonText: 'OK',
      timer: 2000,
    });
    router.push('/users');
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Une erreur est survenue lors de l'ajout de l'utilisateur.",
      confirmButtonText: 'OK',
    });
  }
};

    const handleRoleChange = () => {
      if (role.value === 'ADMIN') {
        specialite_id.value = null;
      } else {
        specialite_id.value = '';
      }
    };

    const navigateToUserList = () => {
      router.push('/users');
    };

    const fetchSpecialites = async () => {
      try {
        await utilisateurStore.fetchSpecialites();
        specialites.value = utilisateurStore.specialites;
      } catch (error) {
        console.error("Erreur lors du chargement des spécialités :", error);
      }
    };

    onMounted(() => {
      fetchSpecialites();
    });

    return {
      nom,
      email,
      password,
      role,
      specialite_id,
      specialites,
      addUser,
      navigateToUserList,
      handleRoleChange,
      validatePassword,
      passwordError,
      showPassword,
      togglePasswordVisibility,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
}

.header {
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  text-align: start;
  color: #004085;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0;
}

.user-form {
  width: 55%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.password-input {
  position: relative;
}

.form-control {
  border-radius: 6px;
  font-size: 1rem;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn-primary {
  border-radius: 6px;
  font-weight: 500;
}

.btn-outline-secondary {
  padding: 4px 12px;
  font-size: 0.85rem;
  border-radius: 6px;
}

.text-danger {
  color: #dc3545;
  font-size: 0.875rem;
}
</style>
