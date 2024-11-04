<template>
    <div class="admin-dashboard">
      <div class="header">
        <h1>Ajouter un Utilisateur</h1>
        <button @click="navigateToUserList" class="btn btn-secondary">
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
  
        <button type="submit" class="btn btn-primary">Ajouter Utilisateur</button>
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
  
      // Déclaration des champs du formulaire
      const nom = ref('');
      const email = ref('');
      const password = ref('');
      const role = ref('');
      const specialite_id = ref(''); // Utilisation de specialite_id
      const specialites = ref([]);
  
      // Fonction pour ajouter un utilisateur
      const addUser = async () => {
        const utilisateur = {
          nom: nom.value,
          email: email.value,
          password: password.value,
          role: role.value,
          specialite_id: role.value === 'admin' ? 'secretaire' : specialite_id.value,
        };
  
        await utilisateurStore.addUtilisateur(utilisateur);
        // Redirection vers la liste des utilisateurs après l'ajout
        router.push('/admin/users');
      };
  
      // Gérer le changement de rôle
      const handleRoleChange = () => {
        if (role.value === 'admin') {
          specialite_id.value = 'secretaire'; // Si ADMIN, définit la spécialité sur 'secretaire'
        } else {
          specialite_id.value = ''; // Réinitialiser pour les médecins
        }
      };
  
      // Fonction pour naviguer vers la liste des utilisateurs
      const navigateToUserList = () => {
        router.push('/admin/users');
      };
  
      // Récupération des spécialités
      const fetchSpecialites = async () => {
        await utilisateurStore.fetchSpecialites(); // Récupérer les spécialités
        specialites.value = utilisateurStore.specialites; // Mettre à jour le modèle local
      };
  
      // Utilisation de onMounted pour effectuer des actions à l'initialisation du composant
      onMounted(() => {
        console.log('Composant AddUser monté');
        fetchSpecialites(); // Charger les spécialités à l'initialisation
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
    margin-top: 20px;
  }
  
  .header {
    width: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    flex-grow: 1;
    margin: 0;
  }
  
  .user-form {
    width: 65%;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn-secondary {
    margin-top: 10px;
  }
  </style>
  