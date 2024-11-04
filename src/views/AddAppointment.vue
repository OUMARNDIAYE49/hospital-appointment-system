<template>
  <div class="admin-dashboard">
    <h1 class="text-center mb-4">Ajouter un Rendez-vous</h1>

    <form @submit.prevent="addAppointment" class="shadow-lg p-4 rounded bg-light">
      <div class="form-group mb-3">
        <label for="date" class="form-label">Date et Heure du Rendez-vous</label>
        <input 
          type="datetime-local" 
          id="date" 
          v-model="newAppointment.date" 
          class="form-control" 
          required 
        />
      </div>

      <div class="form-group mb-3">
        <label for="telephone" class="form-label">Téléphone du Patient</label>
        <select
          id="telephone"
          v-model="newAppointment.patient_id"
          class="form-select"
          required
        >
          <option value="" disabled selected>Choisissez un téléphone</option>
          <option v-for="patient in patients" :key="patient.id" :value="patient.id">
            {{ patient.telephone }}
          </option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label for="medecin" class="form-label">Médecin</label>
        <select
          id="medecin"
          v-model="newAppointment.medecin_id"
          class="form-select"
          required
        >
          <option value="" disabled selected>Choisissez un médecin</option>
          <option v-for="medecin in medecins" :key="medecin.id" :value="medecin.id">
            {{ medecin.nom }}
          </option>
        </select>
      </div>

      <div class="form-group mb-4">
        <label for="status" class="form-label">Statut</label>
        <select id="status" v-model="newAppointment.status" class="form-select" required>
          <option value="" disabled selected>Choisissez un statut</option>
          <option value="Confirme">confirmé</option>
          <option value="Annule">annulé</option>
          <option value="Reporte">en attente</option>
        </select>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button type="button" class="btn btn-secondary" @click="cancelAdd">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from '@/store/patientStore';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useUtilisateurStore } from '@/store/userStore';

export default {
  name: 'AddAppointment',
  setup() {
    const router = useRouter();
    const patientStore = usePatientStore();
    const appointmentStore = useAppointmentStore();
    const userStore = useUtilisateurStore();

    const newAppointment = ref({
      date: '',  // Notez que `date` est un champ `DateTime`
      patient_id: '',
      medecin_id: '',
      status: '',
    });

    onMounted(async () => {
      await userStore.loadDataFromApi();
      await patientStore.loadDataFromApi();
    });

    const patients = computed(() => patientStore.patients);
    const medecins = computed(() => userStore.utilisateurs.filter(user => user.role === 'MEDECIN'));

    const addAppointment = async () => {
      try {
        const addedAppointment = await appointmentStore.addAppointment({
          ...newAppointment.value,
        });

        if (addedAppointment) {
          resetForm();
          router.push('/admin');
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous :", error);
        alert("Erreur lors de l'ajout du rendez-vous : " + error.message);
      }
    };

    const resetForm = () => {
      newAppointment.value = { date: '', patient_id: '', medecin_id: '', status: '' };
    };

    const cancelAdd = () => {
      if (confirm("Êtes-vous sûr de vouloir annuler l'ajout de ce rendez-vous ?")) {
        resetForm();
      }
    };

    return {
      newAppointment,
      patients,
      medecins,
      addAppointment,
      cancelAdd,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
}

form {
  max-width: 600px;
  width: 100%;
}

h1 {
  color: #0056b3;
}

.shadow-lg {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn {
  flex: 1;
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn:hover {
  opacity: 0.8;
}
</style>
