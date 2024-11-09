<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Ajouter un Patient</h1>
      <button @click="navigateToUserList" class="btn btn-outline-secondary btn-sm">
        Retour à la Liste
      </button>
    </div>

    <form @submit.prevent="addPatient" class="patient-form">
      <div class="form-group">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="patient.nom" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone:</label>
        <input type="tel" id="telephone" v-model="patient.telephone" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="patient.email" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="dateNaissance">Date de Naissance:</label>
        <input type="date" id="dateNaissance" v-model="patient.date_naissance" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="adresse">Adresse:</label>
        <input type="text" id="adresse" v-model="patient.adresse" required class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Ajouter Patient</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from '@/store/patientStore';

export default {
  name: 'AddPatient',
  setup() {
    const router = useRouter();
    const patientStore = usePatientStore();

    const patient = ref({
      nom: '',
      telephone: '',
      email: '',
      date_naissance: '',
      adresse: ''
    });

    onMounted(async () => {
      await patientStore.loadDataFromApi();
    });

    const addPatient = async () => {
      try {
        await patientStore.addPatient(patient.value);
        router.push('/patients');
      } catch (error) {
        console.error("Erreur lors de l'ajout du patient :", error.response?.data || error.message);
      }
    };
    const navigateToUserList = () => {
      router.push('/patients');
    };
    const cancelAdd = () => {
      if (confirm("Êtes-vous sûr de vouloir annuler l'ajout de ce patient ?")) {
        resetForm();
      }
    };

    const resetForm = () => {
      patient.value = { nom: '', telephone: '', email: '', date_naissance: '', adresse: '' };
    };

    return {
      patient,
      addPatient,
      cancelAdd,
      navigateToUserList
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
}

.header {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  text-align: left;
  color: #004085;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0;
}

.btn {
  width: 20%;
}


.patient-form {
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  border-radius: 6px;
}

.btn-primary {
  border-radius: 6px;
  font-weight: 500;
}

.btn-outline-secondary {
  padding: 4px 12px;
  font-size: 0.85rem;
  border-radius: 6px;
}
</style>
