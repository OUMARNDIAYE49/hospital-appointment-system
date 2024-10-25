<template>
  <div class="admin-dashboard">
    <h1>Tableau de Bord - Administrateur</h1>

    <!-- Conteneur du champ de recherche placé juste au-dessus du tableau -->
    <div class="search-container">
      <label for="search-date">Rechercher par date :</label>
      <input type="date" id="search-date" v-model="searchDate" class="form-control search-input" />
    </div>

    <div class="table-responsive">
      <table class="table table-bordered text-center">
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
              <font-awesome-icon @click="viewAppointment(appointment.id)" icon="eye" class="text-info mx-2" />
              <font-awesome-icon @click="editAppointment(appointment.id)" icon="pen" class="text-warning mx-2" />
              <font-awesome-icon @click="deleteAppointment(appointment.id)" icon="trash" class="text-danger mx-2" />
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
      searchDate: '', // Pour stocker la date de recherche
      appointments: [
        {
          id: 1,
          patientName: 'Jean Dupont',
          patientPhone: '0601020304',
          date: '2024-10-10 02:30',
          doctorName: 'Dr. Martin',
          specialty: 'Dentiste', // Ajout de la spécialité
          address: '10 Rue de la Santé, Paris', // Ajout de l'adresse
        },
        {
          id: 2,
          patientName: 'Marie Curie',
          patientPhone: '0654321098',
          date: '2024-11-01 01:05',
          doctorName: 'Dr. Moreau',
          specialty: 'Cardiologue', // Ajout de la spécialité
          address: '20 Avenue , Paris', // Ajout de l'adresse
        },
        // Autres rendez-vous
      ],
    };
  },
  computed: {
    // Filtrage des rendez-vous selon la date recherchée
    filteredAppointments() {
      if (this.searchDate) {
        return this.appointments.filter(appointment =>
          appointment.date === this.searchDate
        );
      }
      return this.appointments;
    },
  },
  methods: {
    viewAppointment(id) {
      // Logique pour voir le rendez-vous
    },
    editAppointment(id) {
      // Logique pour modifier le rendez-vous
    },
    deleteAppointment(id) {
      // Logique pour supprimer le rendez-vous
    },
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

.search-container {
  width: 65%; /* Aligné avec la largeur de la table */
  display: flex;
  justify-content: flex-start; /* Aligne le champ à gauche */
  margin-bottom: 10px; /* Espace en bas du champ de recherche */
  margin-top: 20px; /* Ajout d'un espace entre le titre et le champ de recherche */
}

.search-input {
  width: 200px;
  margin-left: 10px; /* Ajoute un espace entre le label et le champ */
}

.table-responsive {
  width: 65%;
  margin-top: 20px;
}

table {
  background-color: #fff;
}

th, td {
  vertical-align: middle;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
