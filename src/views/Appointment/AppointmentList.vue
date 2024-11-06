<template>
  <div class="d-flex justify-content-between align-items-start mb-3">
    <h1 class="title">Liste des Rendez-vous</h1>
  </div>
  <div class="admin-dashboard">
    <div>
      <button @click="navigateToAddAppointment" class="btn btn-primary">
        Ajouter Rendez-vous
      </button>
    </div>

    <div class="table-responsive">
      <div class="search-bar mb-3">
        <label for="search-date">Rechercher par date :</label>
        <input type="date" id="search-date" v-model="searchDate" @input="filterAppointments" class="form-control" />
      </div>

      <table class="table table-hover table-bordered text-center">
        <thead class="thead-dark">
          <tr>
            <th>Date et Heure</th>
            <th>Patient</th>
            <th>Téléphone</th>
            <th>Médecin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointmentStore.appointments" :key="appointment.id">
            <td>{{ appointment.date }}</td>
            <td v-if="appointment.patient">{{ appointment.patient.nom }}</td>
            <td v-if="appointment.patient">{{ appointment.patient.telephone }}</td>
            <td v-if="appointment.medecin">{{ appointment.medecin.nom }}</td>
            <td>{{ appointment.status }}</td>
            <td>
              <font-awesome-icon @click="viewAppointment(appointment)" icon="eye" class="action-icon text-info mx-2" />
              <font-awesome-icon @click="editAppointment(appointment)" icon="pen" class="action-icon text-warning mx-2" />
              <font-awesome-icon @click="deleteAppointment(appointment.id)" icon="trash" class="action-icon text-danger mx-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Modifier le Rendez-vous' : 'Détails du Rendez-vous' }}</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form v-if="editMode" @submit.prevent="saveEdit">
              <div class="form-group">
                <label>Date et Heure</label>
                <input type="datetime-local" v-model="selectedAppointment.date" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Statut</label>
                <select v-model="selectedAppointment.status" class="form-control" required>
                  <option value="Confirmé">Confirmé</option>
                  <option value="Annulé">Annulé</option>
                  <option value="En attente">En attente</option>
                </select>
              </div>
              <div class="form-group">
                <label>Nom du Patient</label>
                <select v-model="selectedAppointment.patient.telephone" class="form-control" required>
                  <option v-for="patient in patientStore.patients" :key="patient.telephone" :value="patient.telephone">
                    {{ patient.nom }} ({{ patient.telephone }})
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Médecin</label>
                <select v-model="selectedAppointment.medecin.nom" class="form-control" required>
                  <option v-for="medecin in medecins" :key="medecin.nom" :value="medecin.nom">
                    {{ medecin.nom }}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">Enregistrer</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
              </div>
            </form>
            <div v-else>
              <p><strong>Date et Heure :</strong> {{ selectedAppointment.date }}</p>
              <p><strong>Statut :</strong> {{ selectedAppointment.status }}</p>
              <p><strong>Nom du Patient :</strong> {{ selectedAppointment.patient.nom }}</p>
              <p><strong>Téléphone :</strong> {{ selectedAppointment.patient.telephone }}</p>
              <p><strong>Médecin :</strong> {{ selectedAppointment.medecin.nom }}</p>
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
import { ref, onMounted } from 'vue';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePatientStore } from '@/store/patientStore';
import { useRouter } from 'vue-router';
import { useUtilisateurStore } from '../../store/userStore';

export default {
  name: 'AppointmentList',
  setup() {
    const appointmentStore = useAppointmentStore();
    const patientStore = usePatientStore();
    const router = useRouter();

    const showModal = ref(false);
    const editMode = ref(false);
    const selectedAppointment = ref({});
    const searchDate = ref('');

    const viewAppointment = (appointment) => {
      selectedAppointment.value = {
        ...appointment,
        patient: appointment.patient || { nom: 'Inconnu', telephone: 'Non spécifié' },
        medecin: appointment.medecin || { nom: 'Non spécifié' }
      };
      showModal.value = true;
      editMode.value = false;
    };

    const editAppointment = (appointment) => {
      selectedAppointment.value = {
        ...appointment,
        patient: appointment.patient || { nom: 'Inconnu', telephone: 'Non spécifié' },
        medecin: appointment.medecin || { nom: 'Non spécifié' }
      };
      showModal.value = true;
      editMode.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedAppointment.value = {};
    };

    
    const saveEdit = async () => {
      await appointmentStore.updateAppointment(selectedAppointment.value.id, selectedAppointment.value);
      closeModal();
    };

    const deleteAppointment = async (id) => {
      if (confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) {
        await appointmentStore.deleteAppointment(id);
      }
    };

    const navigateToAddAppointment = () => {
      router.push('/add-appointment');
    };

    onMounted(async () => {
      await appointmentStore.loadDataFromApi();
      await patientStore.loadDataFromApi();
useUtilisateurStore().loadDataFromApi()

    });

    return {
      appointmentStore,
      patientStore,
      // useUtilisateurStore,
      searchDate,
      showModal,
      editMode,
      selectedAppointment,
      viewAppointment,
      editAppointment,
      closeModal,
      saveEdit,
      deleteAppointment,
      navigateToAddAppointment,
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

.title {
  margin: 60px 0 20px 0;
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
  width: auto;
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
  max-width: 600px;
  width: 100%;
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
