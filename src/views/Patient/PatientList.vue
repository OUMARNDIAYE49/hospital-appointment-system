<template>
  <div class="header">
    <h1>Liste des Patients</h1>
  </div>
  <div class="patient-dashboard">
    <div class="header">
      <button @click="navigateToAddPatient" class="btn btn-primary add-patient-button">
        Ajouter Patient
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered text-start table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Date de Naissance</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.nom }}</td>
            <td>{{ patient.telephone }}</td>
            <td>{{ patient.email }}</td>
            <td>{{ formatDate(patient.date_naissance) }}</td>
            <td>{{ patient.adresse }}</td>
            <td>
              <font-awesome-icon @click="viewPatient(patient)" icon="eye" class="text-primary mx-2" />
              <font-awesome-icon @click="editPatient(patient)" icon="pen" class="text-warning mx-2" />
              <font-awesome-icon @click="deletePatient(patient.id)" icon="trash" class="text-danger mx-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal pour afficher ou modifier le patient -->
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Modifier le Patient' : 'Détails du Patient' }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form v-if="editMode" @submit.prevent="saveEdit">
              <div class="form-group">
                <label>Nom</label>
                <input v-model="selectedPatient.nom" class="form-control" required />
                <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
              </div>
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="selectedPatient.telephone" class="form-control" required />
                <small v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</small>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="selectedPatient.email" type="email" class="form-control" required />
                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
              </div>
              <div class="form-group">
                <label>Date de Naissance</label>
                <input v-model="selectedPatient.date_naissance" type="date" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Adresse</label>
                <input v-model="selectedPatient.adresse" class="form-control" required />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
              </div>
            </form>
            <div v-else>
              <p><strong>ID :</strong> {{ selectedPatient.id }}</p>
              <p><strong>Nom :</strong> {{ selectedPatient.nom }}</p>
              <p><strong>Téléphone :</strong> {{ selectedPatient.telephone }}</p>
              <p><strong>Email :</strong> {{ selectedPatient.email }}</p>
              <p><strong>Date de Naissance :</strong> {{ formatDate(selectedPatient.date_naissance) }}</p>
              <p><strong>Adresse :</strong> {{ selectedPatient.adresse }}</p>
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
import { usePatientStore } from '@/store/patientStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  name: 'PatientList',
  setup() {
    const patientStore = usePatientStore();
    const router = useRouter();

    const showModal = ref(false);
    const editMode = ref(false);
    const selectedPatient = ref({});
    const patients = ref([]);
    const errors = ref({
      nom: '',
      telephone: '',
      email: ''
    });

    onMounted(async () => {
      await loadPatients();
    });

    const loadPatients = async () => {
      await patientStore.loadDataFromApi();
      patients.value = patientStore.patients;
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const formatToDateInput = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const viewPatient = (patient) => {
      selectedPatient.value = { ...patient };
      showModal.value = true;
      editMode.value = false;
    };

    const editPatient = (patient) => {
      selectedPatient.value = { 
        ...patient,
        date_naissance: formatToDateInput(patient.date_naissance) 
      };
      showModal.value = true;
      editMode.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedPatient.value = {};
      errors.value = { nom: '', telephone: '', email: '' }; 
    };

    const validateForm = () => {
      let isValid = true;
      errors.value = { nom: '', telephone: '', email: '' };

      if (selectedPatient.value.nom.length < 3) {
        errors.value.nom = "Le nom doit contenir au moins 3 caractères.";
        isValid = false;
      }

      const phoneRegex = /^[0-9+]+$/;
      if (!phoneRegex.test(selectedPatient.value.telephone) || selectedPatient.value.telephone.length < 8) {
        errors.value.telephone = "Le téléphone doit être un nombre et contenir au moins 8 chiffres.";
        isValid = false;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(selectedPatient.value.email)) {
        errors.value.email = "L'email doit être valide (ex: aa@gmail.com).";
        isValid = false;
      }

      return isValid;
    };

    const checkUniqueFields = async () => {
      const existingPhone = patients.value.find(patient => patient.telephone === selectedPatient.value.telephone && patient.id !== selectedPatient.value.id);
      const existingEmail = patients.value.find(patient => patient.email === selectedPatient.value.email && patient.id !== selectedPatient.value.id);

      if (existingPhone) {
        await Swal.fire('Erreur', 'Le téléphone est déjà utilisé par un autre patient.', 'error');
        return false;
      }

      if (existingEmail) {
        await Swal.fire('Erreur', 'L\'email est déjà utilisé par un autre patient.', 'error');
        return false;
      }

      return true;
    };

    const saveEdit = async () => {
      const isValid = validateForm();
      if (!isValid) return;

      try {
        const isUnique = await checkUniqueFields();
        if (!isUnique) return;

        if (selectedPatient.value.id) {
          await patientStore.updatePatient(selectedPatient.value.id, selectedPatient.value);
          Swal.fire('Succès', 'Modification réussie', 'success');
        } else {
          await patientStore.addPatient(selectedPatient.value);
        }

        await loadPatients();
        closeModal();
      } catch (error) {
        console.error("Erreur lors de la sauvegarde : ", error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la sauvegarde.', 'error');
      }
    };

    const navigateToAddPatient = () => {
      router.push('/add-patient');
    };

    const deletePatient = async (id) => {
  try {
    // Vérifier si le patient a des rendez-vous programmés
    const hasAppointments = await patientStore.checkPatientAppointments(id);

    // Si le patient a des rendez-vous, empêcher la suppression
    if (hasAppointments) {
      await Swal.fire({
        icon: 'error',
        title: 'Suppression impossible',
        text: "Ce patient a des rendez-vous programmés. Veuillez annuler les rendez-vous avant de supprimer le patient.",
      });
      return;
    }

    // Demander confirmation avant de supprimer
    const result = await Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce patient ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      const deleteResult = await patientStore.deletePatient(id);
      if (deleteResult) {
        await patientStore.loadDataFromApi();
        patients.value = patients.value.filter(patient => patient.id !== id);
        await Swal.fire('Supprimé!', 'Le patient a été supprimé avec succès.', 'success');
      } else {
        await Swal.fire('Erreur', "Suppression impossible, Ce patient a des rendez-vous programmés.", 'error');
      }
    }
  } catch (error) {
    console.error("Erreur lors de la suppression : ", error);
    await Swal.fire('Erreur', "Une erreur est survenue lors de la suppression du patient.", 'error');
  }
};

    return {
      showModal,
      editMode,
      selectedPatient,
      patients,
      errors,
      loadPatients,
      formatDate,
      formatToDateInput,
      viewPatient,
      editPatient,
      closeModal,
      saveEdit,
      navigateToAddPatient,
      deletePatient
    };
  }
};
</script>

  <style scoped>
  .patient-dashboard {
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
  
  .add-patient-button {
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
  