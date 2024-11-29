<template>
  <div class="header">
    <h1>Liste des Spécialités</h1>
  </div>
  <div class="admin-dashboard">
    <div class="header">
      <button @click="navigateToAddSpecialty" class="btn btn-primary add-specialty-button">
        Ajouter Spécialité
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered text-start table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="specialty in specialties" :key="specialty.id">
            <td>{{ specialty.id }}</td>
            <td>{{ specialty.nom }}</td>
            <td>
              <font-awesome-icon @click="viewSpecialty(specialty)" icon="eye" class="text-primary mx-2" />
              <font-awesome-icon @click="editSpecialty(specialty)" icon="pen" class="text-warning mx-2" />
              <font-awesome-icon @click="deleteSpecialty(specialty.id)" icon="trash" class="text-danger mx-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Modifier la Spécialité' : 'Détails de la Spécialité' }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form v-if="editMode" @submit.prevent="saveEdit">
              <div class="form-group">
                <label>Nom de la Spécialité</label>
                <input v-model="selectedSpecialty.nom" class="form-control" required />
                <div v-if="nomError" class="text-danger">{{ nomError }}</div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
              </div>
            </form>
            <div v-else>
              <p><strong>Nom de la Spécialité :</strong> {{ selectedSpecialty.nom }}</p>
            </div>
          </div>
          <div class="modal-footer" v-if="!editMode">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useSpecialiteStore } from '@/store/specialityStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'SpecialiteList',
  setup() {
    const specialiteStore = useSpecialiteStore();
    const router = useRouter();

    const showModal = ref(false);
    const editMode = ref(false);
    const selectedSpecialty = ref({});
    const nomError = ref('');

    onMounted(async () => {
      await specialiteStore.loadDataFromApi();
    });

    const specialties = computed(() => specialiteStore.specialites);

    const validateNom = () => {
  const trimmedNom = selectedSpecialty.value.nom.trim(); 
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; 

  const isAlpha = nameRegex.test(trimmedNom);
  const isLongEnough = trimmedNom.length >= 3;
  const isShortEnough = trimmedNom.length <= 100;

  if (!trimmedNom) {
    nomError.value = 'Le nom est requis.';
  } else if (!isAlpha) {
    nomError.value = 'Le nom doit contenir uniquement des lettres, espaces, apostrophes ou traits d’union.';
  } else if (!isLongEnough) {
    nomError.value = 'Le nom doit contenir au moins 3 caractères.';
  } else if (!isShortEnough) {
    nomError.value = 'Le nom ne doit pas dépasser 100 caractères.';
  } else {
    nomError.value = ''; 
  }
};

    const viewSpecialty = (specialty) => {
      selectedSpecialty.value = { ...specialty };
      showModal.value = true;
      editMode.value = false;
    };

    const editSpecialty = (specialty) => {
      selectedSpecialty.value = { ...specialty };
      showModal.value = true;
      editMode.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedSpecialty.value = {};
    };

    const saveEdit = async () => {
      validateNom();
      if (nomError.value) {
        return;
      }
      if (specialties.value.some(specialty => specialty.nom === selectedSpecialty.value.nom && specialty.id !== selectedSpecialty.value.id)) {
        await Swal.fire({
          icon: 'warning',
          title: 'Nom déjà utilisé',
          text: 'Ce nom de spécialité existe déjà. Veuillez en choisir un autre.',
          confirmButtonText: 'OK'
        });
        return;
      }

      try {
        const id = selectedSpecialty.value.id;
        await specialiteStore.updateSpecialite(id, selectedSpecialty.value);

        const index = specialties.value.findIndex(specialty => specialty.id === id);
        if (index !== -1) {
          specialties.value[index] = { ...selectedSpecialty.value };
        }

        Swal.fire({
          icon: 'success',
          title: 'Modifié!',
          text: 'La spécialité a été modifiée avec succès.',
          confirmButtonText: 'OK'
        });

        closeModal();
      } catch (error) {
        console.error("Erreur lors de la modification de la spécialité :", error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la modification de la spécialité.',
          confirmButtonText: 'OK'
        });
      }
    };

    const deleteSpecialty = async (id) => {
      try {
        const result = await Swal.fire({
          title: 'Êtes-vous sûr de vouloir supprimer cette spécialité ?',
          text: "Cette action est irréversible.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler',
          reverseButtons: true
        });

        if (result.isConfirmed) {
          await specialiteStore.deleteSpecialite(id);
          await specialiteStore.loadDataFromApi();
          Swal.fire(
            'Supprimé!',
            'La spécialité a été supprimée.',
            'success'
          );
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        Swal.fire(
          'Erreur',
          'Suppression impossible, Cette specialité est associée à des utilisateurs.',
          'error'
        );
      }
    };

    return {
      specialties,
      showModal,
      editMode,
      selectedSpecialty,
      nomError,
      viewSpecialty,
      editSpecialty,
      closeModal,
      saveEdit,
      deleteSpecialty,
      navigateToAddSpecialty: () => router.push('/add-specialties'),
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
  width: 100%;
  margin-top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h1 {
  margin: 60px 0 20px 0;
  color: #343a40;
  font-weight: bold;
}

.add-specialty-button {
  margin-left: auto;
}

.table {
  width: 100%;
  table-layout: fixed;
}

.table th,
.table td {
  vertical-align: middle;
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
