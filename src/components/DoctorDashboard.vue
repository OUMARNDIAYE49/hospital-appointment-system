<template>
  <div class="doctor-dashboard">
    <h1>Tableau de Bord - Médecin</h1>
    
    <div class="table-responsive">
      <!-- Barre de recherche par date -->
      <div class="search-bar">
        <label for="searchDate">Rechercher par date :</label>
        <input type="date" id="searchDate" v-model="searchDate" @input="filterAppointments" />
      </div>

      <table class="table table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>Nom du Patient</th>
            <th>Date du Rendez-vous</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filteredAppointments" :key="appointment.id">
            <td>{{ appointment.patientName }}</td>
            <td>{{ appointment.date }}</td>
            <td>
              <span :class="['status-badge', appointment.status === 'Confirmé' ? 'status-confirmed' : 'status-pending']">
                {{ appointment.status }}
              </span>
            </td>
            <td>
              <font-awesome-icon @click="viewAppointment(appointment.id)" icon="eye" class="action-icon text-info" />
              <font-awesome-icon @click="editAppointment(appointment.id)" icon="pen" class="action-icon text-warning" />
              <font-awesome-icon @click="cancelAppointment(appointment.id)" icon="trash" class="action-icon text-danger" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchDate: '', // Date de recherche sélectionnée
      appointments: [
        {
          id: 1,
          patientName: 'Marie Curie',
          date: '2024-10-12',
          status: 'Confirmé',
        },
        {
          id: 2,
          patientName: 'Albert Einstein',
          date: '2024-10-14',
          status: 'Reporté',
        },
        // Autres rendez-vous
      ],
      filteredAppointments: [],
    };
  },
  created() {
    this.filteredAppointments = this.appointments;
  },
  methods: {
    viewAppointment(id) {
      // Logique pour voir le rendez-vous
    },
    editAppointment(id) {
      // Logique pour modifier le rendez-vous
    },
    cancelAppointment(id) {
      // Logique pour annuler le rendez-vous
    },
    filterAppointments() {
      if (this.searchDate) {
        this.filteredAppointments = this.appointments.filter(
          appointment => appointment.date === this.searchDate
        );
      } else {
        this.filteredAppointments = this.appointments;
      }
    },
  },
};
</script>

<style scoped>
.doctor-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.table-responsive {
  width: 60%;
  margin-top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

h1 {
  margin-bottom: 20px;
  color: #444;
}

.search-bar {
  margin: 20px 0; /* Espace en haut et en bas de la barre de recherche */
  padding-left: 15px; /* Aligner la barre de recherche avec le tableau */
}

.table {
  background-color: #f9f9f9;
}

th {
  background-color: #007bff;
  color: #fff;
  padding: 12px;
  border: none;
}

td {
  background-color: #ffffff;
  padding: 10px;
  border: none;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.9em;
}

.status-confirmed {
  background-color: #28a745;
  color: white;
}

.status-pending {
  background-color: #ffc107;
  color: black;
}

.action-icon {
  cursor: pointer;
  font-size: 1.2em;
  margin: 0 5px;
  transition: transform 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.2);
}
</style>
