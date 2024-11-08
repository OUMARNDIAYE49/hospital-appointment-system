<template>
  <div class="d-flex justify-content-between align-items-start mb-3">
    <h1 class="title">Liste des Utilisateurs</h1>
  </div>

  <div class="admin-dashboard">
    <div class="header">
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
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ getSpecialiteName(user.specialite_id) }}</td>
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
            <p><strong>Spécialité :</strong> {{ getSpecialiteName(selectedUser.specialite_id) }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDetailsModal">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour modifier l'utilisateur -->
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
            <select v-model="selectedUser.role" class="form-control" required>
              <option value="ADMIN">ADMIN</option>
              <option value="MEDECIN">MEDECIN</option>
            </select>
          </div>
          <!-- Condition pour afficher le champ spécialité seulement si ce n'est pas un ADMIN -->
          <div v-if="selectedUser.role !== 'ADMIN'" class="form-group">
            <label>Spécialité</label>
            <select v-model="selectedUser.specialite_id" class="form-control" required>
              <option v-for="specialite in specialites" :key="specialite.id" :value="specialite.id">
                {{ specialite.nom }}
              </option>
            </select>
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
import Swal from 'sweetalert2';

export default {
  name: 'UserList',
  setup() {
    const userStore = useUtilisateurStore();
    const router = useRouter();
    const showDetailsModal = ref(false);
    const showEditModal = ref(false);
    const selectedUser = ref({});
    const specialites = computed(() => userStore.specialites);

    onMounted(() => {
      userStore.loadDataFromApi();
      
    });

    const users = computed(() => userStore.utilisateurs);

    const getSpecialiteName = (id) => {
      const specialite = userStore.specialites.find(spec => spec.id === id);
      return specialite ? specialite.nom : 'Inconnue';
    };

    const navigateToAddUser = () => {
      router.push('/add-user');
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

    // const deleteUser = async (id) => {
    //   if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    //     await userStore.deleteUtilisateur(id);
    //     await userStore.loadDataFromApi();
    //   }
    // };

 

const deleteUser = async (id) => {
  try {
    // Affichage de la confirmation avec SweetAlert2
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    });

    // Si l'utilisateur confirme la suppression
    if (result.isConfirmed) {
      console.log("Suppression de la utilisateur avec l'ID :", id);
      await userStore.deleteUtilisateur(id);
      await userStore.loadDataFromApi(); // Recharge les données après suppression
      Swal.fire(
        'Supprimé!',
        'L\'utilisateur a été supprimé avec succès.',
        'success'
      );
    } else {
      console.log("Suppression annulée.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression : ", error);
    Swal.fire(
      'Erreur',
      "Une erreur s'est produite lors de la suppression de l'utilisateur. Veuillez réessayer.",
      'error'
    );
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
      specialites,
    };
  },
};
</script>



<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-top: 20px;
}

.table-responsive {
  width: 100%; /* Prendre toute la largeur disponible */
  margin-top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

h1 {
  margin: 60px 0 20px 0; /* Augmenter la marge supérieure pour descendre le titre */
  color: #343a40;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar label {
  margin-right: 10px;
  font-weight: bold;
}

.search-bar input {
  width: auto; /* Ajustement pour s'adapter à la barre de recherche */
}

.table {
  width: 100%; /* Assurez-vous que la table occupe toute la largeur du conteneur */
  table-layout: fixed; /* Fixer le layout de la table pour un meilleur contrôle */
}

.table th, .table td {
  word-wrap: break-word; /* Permettre le retour à la ligne dans les cellules */
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1; /* Couleur d'arrière-plan au survol */
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

.modal-header, .modal-footer {
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
