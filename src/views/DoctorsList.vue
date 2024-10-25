<template>
    <div class="admin-dashboard">
      <div class="header">
        <h1>Liste des Médecins</h1>
        <button @click="navigateToAddDoctor" class="btn btn-primary add-doctor-button">Ajouter Médecin</button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-bordered text-center">
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
    name: 'DoctorsList',
    data() {
      return {
        doctors: [
          { id: 1, name: 'Dr. Jean Dupont', specialty: 'Dentiste', phone: '0123456789', email: 'jean.dupont@example.com' },
          { id: 2, name: 'Dr. Marie Curie', specialty: 'Cardiologue', phone: '0987654321', email: 'marie.curie@example.com' },
          { id: 3, name: 'Dr. Alain Prost', specialty: 'Généraliste', phone: '0678901234', email: 'alain.prost@example.com' },
          // Ajoute d'autres médecins ici
        ],
      };
    },
    methods: {
      navigateToAddDoctor() {
        this.$router.push('/admin/doctors/add'); // Remplace par le bon chemin
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    flex-grow: 1;
    margin: 0;
  }
  
  .add-doctor-button {
    margin-left: auto;
    margin-top: 10px;
  }
  
  .table-responsive {
    width: 65%;
  }
  
  .table {
    background-color: #fff;
  }
  
  th, td {
    vertical-align: middle;
  }
  
  .mx-2 {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .font-awesome-icon {
    cursor: pointer;
  }
  </style>
  