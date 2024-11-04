<template>
  <div class="admin-dashboard">
    <h1>Tableau de Bord - Administrateur</h1>

    <div class="table-responsive">
      <!-- Barre de recherche par date -->
      <div class="search-bar">
        <label for="search-date">Rechercher par date :</label>
        <input type="date" id="search-date" v-model="searchDate" @input="filterAppointments" />
      </div>

      <table class="table table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>Nom du Patient</th>
            <th>Téléphone</th>
            <th>Date du Rendez-vous</th>
            <th>Médecin</th>
            <th>Spécialité</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filteredAppointments" :key="appointment.id">
            <td>{{ appointment.patientName }}</td>
            <td>{{ appointment.patientPhone }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.doctorName }}</td>
            <td>{{ appointment.specialty }}</td>
            <td>{{ appointment.address }}</td>
            <td>
              <font-awesome-icon @click="viewAppointment(appointment)" icon="eye" class="action-icon text-info" />
              <font-awesome-icon @click="editAppointment(appointment)" icon="pen" class="action-icon text-warning" />
              <font-awesome-icon @click="deleteAppointment(appointment.id)" icon="trash" class="action-icon text-danger" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal pour afficher les détails du rendez-vous -->
    <div v-if="showModal && !editMode" class="modal" tabindex="-1" role="dialog" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails du Rendez-vous</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Nom du Patient :</strong> {{ selectedAppointment.patientName }}</p>
            <p><strong>Téléphone :</strong> {{ selectedAppointment.patientPhone }}</p>
            <p><strong>Date :</strong> {{ selectedAppointment.date }}</p>
            <p><strong>Médecin :</strong> {{ selectedAppointment.doctorName }}</p>
            <p><strong>Spécialité :</strong> {{ selectedAppointment.specialty }}</p>
            <p><strong>Adresse :</strong> {{ selectedAppointment.address }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour modifier le rendez-vous -->
    <div v-if="showModal && editMode" class="modal" tabindex="-1" role="dialog" @click.self="closeModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier le Rendez-vous</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEdit">
              <div class="form-group">
                <label>Nom du Patient</label>
                <input v-model="selectedAppointment.patientName" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="selectedAppointment.patientPhone" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Date</label>
                <input type="date" v-model="selectedAppointment.date" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Médecin</label>
                <input v-model="selectedAppointment.doctorName" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Spécialité</label>
                <input v-model="selectedAppointment.specialty" class="form-control" required />
              </div>
              <div class="form-group">
                <label>Adresse</label>
                <input v-model="selectedAppointment.address" class="form-control" required />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePatientStore } from '@/store/patientStore';
import { useSpecialiteStore } from '@/store/specialityStore'; // Assurez-vous que ce chemin est correct
// import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const appointmentStore = useAppointmentStore();
    const patientStore = usePatientStore();
    const specialityStore = useSpecialiteStore();
    const userStore = useUserStore();
    const router = useRouter();

    const showModal = ref(false);
    const editMode = ref(false);
    const selectedAppointment = ref({});
    const searchDate = ref('');

    const filteredAppointments = computed(() => {
      return appointmentStore.appointments.filter(appointment => 
        appointment.date === searchDate.value || !searchDate.value
      );
    });

    const filterAppointments = () => {
      // Update filtered appointments based on the search date
      filteredAppointments.value;
    };

    const viewAppointment = (appointment) => {
      selectedAppointment.value = { ...appointment };
      showModal.value = true;
      editMode.value = false;
    };

    const editAppointment = (appointment) => {
      selectedAppointment.value = { ...appointment };
      showModal.value = true;
      editMode.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedAppointment.value = {};
    };

    const saveEdit = () => {
      const index = appointmentStore.appointments.findIndex(app => app.id === selectedAppointment.value.id);
      if (index !== -1) {
        appointmentStore.appointments.splice(index, 1, { ...selectedAppointment.value });
      }
      closeModal();
    };

    const deleteAppointment = (id) => {
      appointmentStore.appointments = appointmentStore.appointments.filter(appointment => appointment.id !== id);
    };

    onMounted(async () => {
      await appointmentStore.loadAppointments(); // Assurez-vous d'avoir une méthode pour charger les rendez-vous
      await patientStore.loadPatients(); // Charger les patients si nécessaire
      await specialityStore.loadSpecialites(); // Charger les spécialités si nécessaire
      await userStore.loadUsers(); // Charger les utilisateurs si nécessaire
    });

    return {
      searchDate,
      filteredAppointments,
      showModal,
      editMode,
      selectedAppointment,
      viewAppointment,
      editAppointment,
      closeModal,
      saveEdit,
      deleteAppointment,
      filterAppointments,
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.table-responsive {
  width: 65%;
  margin-top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

h1 {
  margin-bottom: 20px;
  color: #343a40;
}

.search-bar {
  margin-bottom: 20px;
}

/* Styles pour la modal */
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
