<template>
    <div class="add-doctor-form">
      <h2>Ajouter un Médecin</h2>
      <form @submit.prevent="submitForm">
        <!-- Nom du Médecin -->
        <input type="text" v-model="doctor.name" placeholder="Nom du Médecin" required />
  
        <!-- Spécialité -->
        <select v-model="doctor.specialty" required>
          <option disabled value="">Sélectionner une Spécialité</option>
          <option v-for="specialty in specialties" :key="specialty" :value="specialty">
            {{ specialty }}
          </option>
        </select>
  
        <!-- Téléphone -->
        <input type="tel" v-model="doctor.phone" placeholder="Numéro de téléphone" required />
  
        <!-- Adresse E-mail -->
        <input type="email" v-model="doctor.email" placeholder="Adresse E-mail" required />
  
        <!-- Boutons de soumission et annulation -->
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Ajouter Médecin</button>
          <button type="button" @click="cancel" class="btn btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddDoctor',
    data() {
      return {
        doctor: {
          name: '',
          specialty: '',
          phone: '',
          email: '',
        },
        specialties: [
          'Dentiste',
          'Cardiologue',
          'Dermatologue',
          'Généraliste',
          'Neurologue',
        ],
      };
    },
    methods: {
      submitForm() {
        // Logique pour envoyer les données du médecin au serveur ou à un parent
        console.log('Médecin ajouté:', this.doctor);
        // Réinitialise le formulaire après la soumission
        this.resetForm();
        // Redirige vers la liste des médecins
        this.$router.push('/admin/doctors'); // Assurez-vous que cette route est définie
      },
      cancel() {
        this.resetForm();
        this.$router.push('/admin/doctors'); // Retourne à la liste des médecins
      },
      resetForm() {
        this.doctor = {
          name: '',
          specialty: '',
          phone: '',
          email: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .add-doctor-form {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 600px; /* Ajustez la largeur selon vos besoins */
    margin: 60px auto;
  }
  
  .add-doctor-form h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .add-doctor-form input,
  .add-doctor-form select {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .add-doctor-form button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 48%;
  }
  
  .add-doctor-form button:hover {
    opacity: 0.9;
  }
  </style>
  