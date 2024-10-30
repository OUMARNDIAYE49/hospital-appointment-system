<template>
  <div class="admin-dashboard">
    <div class="header">
      <div class="title-container">
        <h1>Liste des Médecins</h1>
      </div>
      <button @click="navigateToAddDoctor" class="btn btn-primary add-doctor-button">Ajouter Médecin</button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered text-center">
        <thead>
          <tr>
            <th>Nom du Médecin</th>
            <th>Spécialité</th>
            <th>Téléphone</th>
            <th>Adresse E-mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in doctors" :key="doctor.id">
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.specialty }}</td>
            <td>{{ doctor.phone }}</td>
            <td>{{ doctor.email }}</td>
            <td>
              <font-awesome-icon @click="viewDoctor(doctor.id)" icon="eye" class="action-icon text-info" />
              <font-awesome-icon @click="editDoctor(doctor.id)" icon="pen" class="action-icon text-warning" />
              <font-awesome-icon @click="deleteDoctor(doctor.id)" icon="trash" class="action-icon text-danger" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorsList',
  data() {
    return {
      doctors: [
        { id: 1, name: 'Dr. Jean Dupont', specialty: 'Dentiste', phone: '0123456789', email: 'jean.dupont@example.com' },
        { id: 2, name: 'Dr. Marie Curie', specialty: 'Cardiologue', phone: '0987654321', email: 'marie.curie@example.com' },
        { id: 3, name: 'Dr. Alain Prost', specialty: 'Généraliste', phone: '0678901234', email: 'alain.prost@example.com' },
        // Ajoutez d'autres médecins ici
      ],
    };
  },
  methods: {
    navigateToAddDoctor() {
      this.$router.push('/admin/doctors/add'); // Remplacez par le bon chemin
    },
    viewDoctor(id) {
      // Logique pour voir le médecin
    },
    editDoctor(id) {
      // Logique pour modifier le médecin
    },
    deleteDoctor(id) {
      // Logique pour supprimer le médecin
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

.header {
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px; /* Ajusté pour réduire l'espace entre l'en-tête et le tableau */
}

.title-container {
  flex: 1; /* Permet au conteneur du titre d'occuper tout l'espace disponible */
  display: flex;
  justify-content: center; /* Centre le titre */
}

h1 {
  margin: 0; /* Supprime la marge pour un meilleur alignement */
}

.add-doctor-button {
  margin-top: 20px; /* Ajusté pour descendre le bouton jusqu'à coller le tableau */
}

.table-responsive {
  width: 65%;
  margin-top: 10px; /* Ajusté pour aligner le tableau avec le bouton */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.table {
  background-color: #f9f9f9;
}

th {
  background-color: #007bff;
  color: #fff;
  padding: 12px;
}

td {
  background-color: #ffffff;
  padding: 10px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
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
