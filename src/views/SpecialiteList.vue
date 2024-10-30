<template>
    <div class="admin-dashboard">
      <div class="header">
        <h1>Liste des Spécialités</h1>
        <button @click="navigateToAddSpecialty" class="btn btn-primary add-specialty-button">Ajouter Spécialité</button>
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
              <td>{{ specialty.name }}</td>
              <td>
                <font-awesome-icon @click="viewSpecialty(specialty.id)" icon="eye" class="text-primary mx-2" />
                <font-awesome-icon @click="editSpecialty(specialty.id)" icon="pen" class="text-warning mx-2" />
                <font-awesome-icon @click="deleteSpecialty(specialty.id)" icon="trash" class="text-danger mx-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SpecialiteList',
    data() {
      return {
        specialties: [
          { id: 1, name: 'Dentiste' },
          { id: 2, name: 'Cardiologue' },
          { id: 3, name: 'Généraliste' },
          // Ajoutez d'autres spécialités ici
        ],
      };
    },
    methods: {
      navigateToAddSpecialty() {
        this.$router.push('/admin/specialties/add'); // Redirection vers la page d'ajout de spécialité
      },
      viewSpecialty(id) {
        this.$router.push(`/admin/specialties/view/${id}`); // Redirection vers la page de vue de la spécialité
      },
      editSpecialty(id) {
        // Logique pour modifier une spécialité
      },
      deleteSpecialty(id) {
        // Logique pour supprimer une spécialité
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
  