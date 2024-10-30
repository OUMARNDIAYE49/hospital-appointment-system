<template>
    <div class="add-specialty-container">
      <h2>Ajouter une Spécialité</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="specialty-name">Nom de la Spécialité :</label>
          <input
            type="text"
            id="specialty-name"
            v-model="specialtyName"
            placeholder="Entrez le nom de la spécialité"
            required
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">Ajouter Spécialité</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        specialtyName: ''
      };
    },
    methods: {
      submitForm() {
        if (this.specialtyName.trim()) {
          // Logique pour sauvegarder la spécialité dans la base de données ou par API
          console.log("Nouvelle spécialité ajoutée :", this.specialtyName);
  
          // Réinitialisation du champ après soumission
          this.specialtyName = '';
  
          // Optionnel: Rediriger vers la liste des spécialités après ajout
          this.$router.push('/admin/specialties');
        } else {
          alert("Veuillez entrer un nom de spécialité valide.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-specialty-container {
    max-width: 500px;
    margin: auto;
    margin-top: 60px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-control {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  .btn-primary {
    display: block;
    width: 100%;
    margin-top: 10px;
  }
  </style>
  