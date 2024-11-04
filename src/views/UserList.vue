<template>
    <div class="admin-dashboard">
      <div class="header">
        <h1>Liste des Utilisateurs</h1>
        <button @click="navigateToAddUser" class="btn btn-primary add-user-button">
          Ajouter Utilisateur
        </button>
      </div>
  
      <div class="table-responsive">
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Spécialité</th> <!-- Changement ici -->
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.nom }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ getSpecialiteName(user.specialite_id) }}</td> <!-- Affichage du nom de la spécialité -->
              <td>
                <font-awesome-icon @click="viewUser(user)" icon="eye" class="text-primary mx-2" />
                <font-awesome-icon @click="editUser(user)" icon="pen" class="text-warning mx-2" />
                <font-awesome-icon @click="deleteUser(user.id)" icon="trash" class="text-danger mx-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal pour afficher les détails de l'utilisateur -->
      <div v-if="showDetailsModal" class="modal" tabindex="-1" role="dialog" @click.self="closeDetailsModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Détails de l'Utilisateur</h5>
              <button type="button" class="close" @click="closeDetailsModal">&times;</button>
            </div>
            <div class="modal-body">
              <p><strong>ID :</strong> {{ selectedUser.id }}</p>
              <p><strong>Nom :</strong> {{ selectedUser.nom }}</p>
              <p><strong>Email :</strong> {{ selectedUser.email }}</p>
              <p><strong>Rôle :</strong> {{ selectedUser.role }}</p>
              <p><strong>Spécialité :</strong> {{ getSpecialiteName(selectedUser.specialite_id) }}</p> <!-- Affichage du nom de la spécialité -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeDetailsModal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal pour modifier l'utilisateur -->
      <div v-if="showEditModal" class="modal" tabindex="-1" role="dialog" @click.self="closeEditModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modifier l'Utilisateur</h5>
              <button type="button" class="close" @click="closeEditModal">&times;</button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="saveEdit">
                <div class="form-group">
                  <label>Nom</label>
                  <input v-model="selectedUser.nom" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input v-model="selectedUser.email" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>Rôle</label>
                  <input v-model="selectedUser.role" class="form-control" required />
                </div>
                <div class="form-group">
                  <label>ID Spécialité</label>
                  <input v-model="selectedUser.specialite_id" class="form-control" required />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Enregistrer</button>
                  <button type="button" class="btn btn-secondary" @click="closeEditModal">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useUtilisateurStore } from '@/store/userStore';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'UserList',
    setup() {
      const userStore = useUtilisateurStore();
      const router = useRouter();
      const showDetailsModal = ref(false);
      const showEditModal = ref(false);
      const selectedUser = ref({});
  
      onMounted(() => {
        userStore.loadDataFromApi();
      });
  
      const users = computed(() => userStore.utilisateurs);
  
      const getSpecialiteName = (id) => {
        const specialite = userStore.specialites.find(spec => spec.id === id);
        return specialite ? specialite.nom : 'Inconnue';
      };
  
      const navigateToAddUser = () => {
        router.push('/admin/users/add');
      };
  
      const viewUser = (user) => {
        selectedUser.value = { ...user };
        showDetailsModal.value = true;
      };
  
      const editUser = (user) => {
        selectedUser.value = { ...user };
        showEditModal.value = true;
      };
  
      const closeDetailsModal = () => {
        showDetailsModal.value = false;
        selectedUser.value = {};
      };
  
      const closeEditModal = () => {
        showEditModal.value = false;
        selectedUser.value = {};
      };
  
      const saveEdit = async () => {
        const id = selectedUser.value.id;
        await userStore.updateUtilisateur(id, selectedUser.value);
        await userStore.loadDataFromApi();
        closeEditModal();
      };
  
      const deleteUser = async (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
          await userStore.deleteUtilisateur(id);
          await userStore.loadDataFromApi();
        }
      };
  
      return {
        users,
        navigateToAddUser,
        viewUser,
        editUser,
        closeDetailsModal,
        closeEditModal,
        saveEdit,
        deleteUser,
        showDetailsModal,
        showEditModal,
        selectedUser,
        getSpecialiteName,
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
  
  .add-user-button {
    margin-left: auto;
    margin-top: 10px;
  }
  
  .table-responsive {
    width: 65%;
  }
  
  .table {
    background-color: #fff;
  }
  
  th,
  td {
    vertical-align: middle;
  }
  
  .mx-2 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .font-awesome-icon {
    cursor: pointer;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-dialog {
    max-width: 500px;
    width: 100%;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
  }
  
  .modal-header,
  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  