<template>
  <div class="admin-dashboard">
    <h1 class="text-center mb-4">Ajouter un Rendez-vous</h1>

    <form @submit.prevent="addAppointment" class="shadow-lg p-4 rounded bg-white">
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
      date: '',
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
          // Réinitialiser manuellement les champs sans utiliser resetForm()
          newAppointment.value.date = '';
          newAppointment.value.patient_id = '';
          newAppointment.value.medecin_id = '';
          newAppointment.value.status = '';

          router.push('/appointments'); // Redirection vers la liste des rendez-vous
        } else {
          console.warn("Le rendez-vous n'a pas été ajouté.");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous :", error);
        alert("Erreur lors de l'ajout du rendez-vous : " + error.message);
      }
    };

    return {
      newAppointment,
      patients,
      medecins,
      addAppointment,
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

h1 {
  color: #004085;
  font-weight: bold;
  margin-top: 20px;
}

form {
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
}

.shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn {
  width: 48%;
}

.btn-primary {
  background-color: #0069d9;
  border: none;
}

.btn-outline-secondary {
  color: #6c757d;
  border: 1px solid #6c757d;
}

.btn-primary:hover, .btn-outline-secondary:hover {
  opacity: 0.9;
}

.bg-white {
  background-color: #ffffff;
}

.form-control, .form-select {
  height: 45px;
  font-size: 16px;
  border-radius: 4px;
}
</style>
