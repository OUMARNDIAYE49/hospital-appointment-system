<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Liste des Spécialités</h1>
      <button @click="navigateToAddSpecialty" class="btn btn-primary add-specialty-button">
        Ajouter Spécialité
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>Nom de la Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="specialty in specialties" :key="specialty.id">
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

    <!-- Modal pour afficher ou modifier la spécialité -->
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

export default {
  name: 'SpecialiteList',
  setup() {
    const specialiteStore = useSpecialiteStore();
    const router = useRouter();

    const showModal = ref(false);
    const editMode = ref(false);
    const selectedSpecialty = ref({});

    onMounted(async () => {
      await specialiteStore.loadDataFromApi();
    });

    const specialties = computed(() => specialiteStore.specialites);

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
  const id = selectedSpecialty.value.id;
  const success = await specialiteStore.updateSpecialite(id, selectedSpecialty.value);
  
  if (success) {
    await specialiteStore.loadDataFromApi();  // Rafraîchir la liste après la mise à jour
    closeModal();  // Fermer le modal
  } else {
    alert("Erreur lors de la mise à jour de la spécialité. Veuillez réessayer.");
  }
};


    const deleteSpecialty = async (id) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette spécialité ?")) {
        await specialiteStore.deleteSpecialite(id);
        await specialiteStore.loadDataFromApi();
      }
    };

    return {
      specialties,
      showModal,
      editMode,
      selectedSpecialty,
      viewSpecialty,
      editSpecialty,
      closeModal,
      saveEdit,
      deleteSpecialty,
      navigateToAddSpecialty: () => router.push('/admin/specialties/add'),
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

.add-specialty-button {
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
