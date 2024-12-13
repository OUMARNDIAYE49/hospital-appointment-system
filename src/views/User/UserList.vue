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
      <table class="table table-bordered text-start">
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
                <input v-model="selectedUser.nom" class="form-control" @blur="validateNom" required />
                <div v-if="nomError" class="text-danger">{{ nomError }}</div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="selectedUser.email" class="form-control" @blur="validateEmail" required />
                <div v-if="emailError" class="text-danger">{{ emailError }}</div>
              </div>
              <div class="form-group">
                <label>Rôle</label>
                <select v-model="selectedUser.role" class="form-control" required>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MEDECIN">MEDECIN</option>
                </select>
              </div>
              <div v-if="selectedUser.role !== 'ADMIN'" class="form-group">
                <label>Spécialité</label>
                <select v-model="selectedUser.specialite_id" class="form-control" required>
                  <option v-for="specialite in specialites" :key="specialite.id" :value="specialite.id">
                    {{ specialite.nom }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary" :disabled="nomError || emailError || !selectedUser.nom || !selectedUser.email || !selectedUser.role || (selectedUser.role !== 'ADMIN' && !selectedUser.specialite_id)">
                  Enregistrer
                </button>
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
    const nomError = ref('');
    const emailError = ref('');

    onMounted(() => {
      userStore.loadDataFromApi();
    });

    const users = computed(() => userStore.utilisateurs);

    const getSpecialiteName = (id) => {
      const specialite = userStore.specialites.find(spec => spec.id === id);
      return specialite ? specialite.nom : '';
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

    const checkEmailUnique = async (email, userId) => {
      const existingUser = users.value.find(user => user.email === email && user.id !== userId);
      return !existingUser;
    };
    const validateNom = () => {
  const trimmedNom = selectedUser.value.nom.trim(); // Supprime les espaces inutiles au début et à la fin
  const isAlpha = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(trimmedNom);
  const isLongEnough = trimmedNom.length >= 3;
  const isNotTooLong = trimmedNom.length <= 100;

  if (!isAlpha) {
    nomError.value = 'Le nom doit contenir uniquement des lettres, des espaces, des apostrophes ou des traits d’union.';
  } else if (!isLongEnough) {
    nomError.value = 'Le nom doit comporter au moins 3 caractères.';
  } else if (!isNotTooLong) {
    nomError.value = 'Le nom ne doit pas dépasser 100 caractères.';
  } else {
    nomError.value = ''; 
  }
};


const validateEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isNotTooLong = selectedUser.value.email.length <= 50;

  if (!emailRegex.test(selectedUser.value.email)) {
    emailError.value = "L'email doit être valide et se terminer par '@gmail.com'.";
  } else if (!isNotTooLong) {
    emailError.value = "L'email ne doit pas dépasser 50 caractères.";
  } else {
    emailError.value = ''; 
  }
};


    const saveEdit = async () => {
      const id = selectedUser.value.id;
      const email = selectedUser.value.email;
      const isEmailUnique = await checkEmailUnique(email, id);
      if (!isEmailUnique) {
        Swal.fire({
          title: 'Erreur',
          text: "L'email est déjà utilisé par un autre utilisateur.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      try {
        await userStore.updateUtilisateur(id, selectedUser.value);
        await userStore.loadDataFromApi();
        closeEditModal();
        Swal.fire({
          title: 'Modifié!',
          text: 'Les informations de l\'utilisateur ont été mises à jour avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur : ", error);
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur s'est produite lors de la modification de l'utilisateur. Veuillez réessayer.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };


    const deleteUser = async (id) => {
      try {
        const hasAppointments = await userStore.checkUserAppointments(id);
        if (hasAppointments) {
          await Swal.fire({
            icon: 'error',
            title: 'Suppression impossible',
            text: "Cet utilisateur est associé à des rendez-vous. Veuillez dissocier ou supprimer ces rendez-vous avant de continuer.",
          });
          return;
        }
        const { isConfirmed } = await Swal.fire({
          title: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
          text: "Cette action est irréversible.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler',
          reverseButtons: true,
        });

        if (isConfirmed) {
          const deleteResult = await userStore.deleteUtilisateur(id);
          if (deleteResult) {
            await userStore.loadDataFromApi();
            if (users && users.value) {
              users.value = users.value.filter(user => user.id !== id);
            }

            await Swal.fire('Supprimé!', 'L\'utilisateur a été supprimé avec succès.', 'success');
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Imposible de supprimer, utilisateur est associé à des rendez-vous.",
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la suppression : ", error);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez vérifier votre connexion ou réessayer.",
        });
      }
    };

    return {
      users,
      specialites,
      showDetailsModal,
      showEditModal,
      selectedUser,
      getSpecialiteName,
      navigateToAddUser,
      viewUser,
      editUser,
      closeDetailsModal,
      closeEditModal,
      saveEdit,
      deleteUser,
      nomError,
      emailError,
      validateNom,
      validateEmail
    };
  }
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
  width: 100%; 
  margin-top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

h1 {
  margin: 60px 0 20px 0;
  color: #343a40;
  font-weight: bold;
}

.table {
  width: 100%; 
  table-layout: fixed; 
}

.table th, .table td {
  word-wrap: break-word; 
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1; 
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
