<template>
  <div class="doctor-dashboard">
    <h1>Tableau de Bord - Médecin</h1>
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>Nom du Patient</th>
            <th>Date du Rendez-vous</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.patientName }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.status }}</td>
            <td>
              <font-awesome-icon @click="viewDoctor(doctor.id)" icon="eye" class="text-info mx-2" />
                <font-awesome-icon @click="editDoctor(doctor.id)" icon="pen" class="text-warning mx-2" />
                <font-awesome-icon @click="deleteDoctor(doctor.id)" icon="trash" class="text-danger mx-2" />
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
    };
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
  width: 65%;
  margin-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

table {
  background-color: #fff;
}

th, td {
  vertical-align: middle;
}

.btn {
  width: 80px;
}
</style>
