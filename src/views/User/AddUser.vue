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
        <input type="password" v-model="password" id="password" required class="form-control" />
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

    const addUser = async () => {
      const utilisateur = {
        nom: nom.value,
        email: email.value,
        password: password.value,
        role: role.value,
        specialite_id: role.value === 'ADMIN' ? 'secretaire' : specialite_id.value,
      };

      await utilisateurStore.addUtilisateur(utilisateur);
      router.push('/users');
    };

    const handleRoleChange = () => {
      if (role.value === 'ADMIN') {
        specialite_id.value = 'secretaire';
      } else {
        specialite_id.value = '';
      }
    };

    const navigateToUserList = () => {
      router.push('/users');
    };

    const fetchSpecialites = async () => {
      await utilisateurStore.fetchSpecialites();
      specialites.value = utilisateurStore.specialites;
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
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  text-align: start;
  color: #004085;
  font-weight: bold;
}

.user-form {
  width: 65%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 6px;
  font-size: 1rem;
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
</style>
