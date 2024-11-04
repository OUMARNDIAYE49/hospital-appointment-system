<template>
    <div class="add-patient">
      <h2>Ajouter un Patient</h2>
      <form @submit.prevent="addPatient">
        <div class="form-group">
          <label for="nom">Nom</label>
          <input
            type="text"
            id="nom"
            v-model="patient.nom"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            v-model="patient.telephone"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="patient.email"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="dateNaissance">Date de Naissance</label>
          <input
            type="date"
            id="dateNaissance"
            v-model="patient.date_naissance"
            class="form-control"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            v-model="patient.adresse"
            class="form-control"
            required
          />
        </div>
  
        <!-- <div class="form-group">
          <label for="utilisateurId">ID Utilisateur</label>
          <input
            type="number"
            id="utilisateurId"
            v-model="patient.utilisateur_id"
            class="form-control"
            required
          />
        </div> -->
  
        <button type="submit" class="btn btn-primary mt-3">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import { usePatientStore } from '@/store/patientStore'; // Assurez-vous d'avoir un store pour les patients
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddPatient',
    setup() {
      const router = useRouter();
      const patientStore = usePatientStore();
  
      onMounted(async () => {
        await patientStore.loadDataFromApi();
      });
  
      const patient = {
        nom: '',
        telephone: '',
        email: '',
        date_naissance: '',
        adresse: '',
       
      };
  
      const addPatient = async () => {
        // Vérification simple des champs requis
        if (!patient.nom || !patient.telephone || !patient.email || !patient.date_naissance || !patient.adresse) {
          console.error("Tous les champs sont requis.");
          return;
        }
  
        try {
          await patientStore.addPatient(patient);
          router.push('/admin/patients');
        } catch (error) {
          console.error("Erreur lors de l'ajout du patient :", error.response?.data || error.message);
        }
      };
  
      return {
        patient,
        addPatient,
      };
    },
  };
  </script>
  
  <style scoped>
  .add-patient {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .btn-primary {
    width: 100%;
  }
  </style>
  