<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Ajouter un Rendez-vous</h1>
      <button @click="goToList" class="btn btn-outline-secondary btn-sm">
        Retour à la liste
      </button>
    </div>

    <form @submit.prevent="addAppointment" class="user-form shadow-lg p-4 rounded bg-white">
      <div class="form-group mb-3">
        <label for="date_debut" class="form-label">Date Début du Rendez-vous</label>
        <input 
          type="datetime-local" 
          id="date_debut" 
          v-model="newAppointment.date_debut" 
          class="form-control" 
          required 
        />
      </div>

      <div class="form-group mb-3">
        <label for="date_fin" class="form-label">Date Fin du Rendez-vous</label>
        <input 
          type="datetime-local" 
          id="date_fin" 
          v-model="newAppointment.date_fin" 
          class="form-control" 
          required 
        />
      </div>

      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

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
          <option value="confirmé">confirmé</option>
          <option value="annulé">annulé</option>
          <option value="en attente">en attente</option>
        </select>
      </div>

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary w-100">Ajouter Rendez-vous</button>
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
import Swal from 'sweetalert2';

export default {
  name: 'AddAppointment',
  setup() {
    const router = useRouter();
    const patientStore = usePatientStore();
    const appointmentStore = useAppointmentStore();
    const userStore = useUtilisateurStore();

    const newAppointment = ref({
      date_debut: '',
      date_fin: '',
      patient_id: '',
      medecin_id: '',
      status: '',
    });

    const errorMessage = ref('');

    onMounted(async () => {
      await userStore.loadDataFromApi();
      await patientStore.loadDataFromApi();
    });

    const patients = computed(() => patientStore.patients);
    const medecins = computed(() => userStore.utilisateurs.filter(user => user.role === 'MEDECIN'));

    const validateDates = () => {
      const dateDebut = new Date(newAppointment.value.date_debut);
      const dateFin = new Date(newAppointment.value.date_fin);

      // Vérification que la date de fin n'est pas avant la date de début
      if (dateFin < dateDebut) {
        errorMessage.value = "La date de fin ne peut pas être antérieure à la date de début.";
        return false;
      }

      // Vérification des heures d'ouverture (07:00 à 20:00)
      const heureDebut = dateDebut.getHours();
      const heureFin = dateFin.getHours();

      if (heureDebut < 7 || heureDebut >= 20) {
        errorMessage.value = "L'heure de début doit être entre 07:00 et 20:00.";
        return false;
      }
      if (heureFin < 7 || heureFin > 20) {
        errorMessage.value = "L'heure de fin doit être entre 07:00 et 20:00.";
        return false;
      }

      errorMessage.value = '';
      return true;
    };

    const addAppointment = async () => {
  if (!validateDates()) {
    return;
  }

  try {
    const addAppointment = await appointmentStore.addAppointment({
      ...newAppointment.value,
    });

    if (newAppointment) {
      // Réinitialiser les champs manuellement
      newAppointment.value.date_debut = '';
      newAppointment.value.date_fin = '';
      newAppointment.value.patient_id = '';
      newAppointment.value.medecin_id = '';
      newAppointment.value.status = '';

      // Afficher l'alerte de succès
      Swal.fire({
        title: 'Rendez-vous ajouté !',
        text: 'Le rendez-vous a été ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/appointments'); // Redirection vers la liste des rendez-vous après confirmation
      });
    } else {
      console.warn("Le rendez-vous n'a pas été ajouté.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du rendez-vous :", error);
    Swal.fire({
      title: 'Erreur',
      text: "Erreur lors de l'ajout du rendez-vous : " + error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};


    const goToList = () => {
      router.push('/appointments');
    };

    return {
      newAppointment,
      errorMessage,
      patients,
      medecins,
      addAppointment,
      goToList
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

h1 {
  text-align: left;
  color: #004085;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0;
}

form {
  max-width: 640px;
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
  width: 20%;
}

.btn-primary {
  background-color: #0069d9;
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
}

.bg-white {
  background-color: #ffffff;
}

.header {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-control, .form-select {
  height: 45px;
  font-size: 16px;
  border-radius: 4px;
}
</style>
