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
        <input
          type="text"
          id="nom"
          v-model="patient.nom"
          required
          class="form-control"
        />
        <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
      </div>

      <div class="form-group">
        <label for="telephone">Téléphone:</label>
        <input
          type="tel"
          id="telephone"
          v-model="patient.telephone"
          required
          class="form-control"
        />
        <small v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</small>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="patient.email"
          required
          class="form-control"
        />
        <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label for="dateNaissance">Date de Naissance:</label>
        <input
          type="date"
          id="dateNaissance"
          v-model="patient.date_naissance"
          required
          class="form-control"
          :max="maxDate"
        />
      </div>

      <div class="form-group">
        <label for="adresse">Adresse:</label>
        <input
          type="text"
          id="adresse"
          v-model="patient.adresse"
          required
          class="form-control"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Ajouter Patient</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from '@/store/patientStore';
import Swal from 'sweetalert2';

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
      adresse: '',
    });

    const errors = ref({});
    const maxDate = new Date().toISOString().split('T')[0];

    const validateForm = () => {
      errors.value = {};
      let isValid = true;

      const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

      if (!patient.value.nom || patient.value.nom.trim() === '') {
        errors.value.nom = 'Le nom est requis.';
        isValid = false;
      } else {
        const trimmedName = patient.value.nom.trim();
        const isAlpha = nameRegex.test(trimmedName);
        const isLongEnough = trimmedName.length >= 3;
        const isNotTooLong = trimmedName.length <= 100;

        if (!isAlpha) {
          errors.value.nom =
            'Le nom doit contenir uniquement des lettres, des espaces, des apostrophes ou des traits d’union.';
          isValid = false;
        } else if (!isLongEnough) {
          errors.value.nom = 'Le nom doit contenir au moins 3 caractères.';
          isValid = false;
        } else if (!isNotTooLong) {
          errors.value.nom = 'Le nom ne doit pas dépasser 100 caractères.';
          isValid = false;
        }
      }

      const phoneRegex = /^[0-9]+$/;
      if (
        !patient.value.telephone ||
        !phoneRegex.test(patient.value.telephone) ||
        patient.value.telephone.length < 8
      ) {
        errors.value.telephone =
          'Le téléphone doit contenir au moins 8 chiffres et uniquement des chiffres.';
        isValid = false;
      } else if (patient.value.telephone.length > 20) {
        errors.value.telephone = 'Le téléphone ne doit pas dépasser 20 chiffres.';
        isValid = false;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(patient.value.email)) {
        errors.value.email =
          "L'email doit être valide et se terminer par '@gmail.com'.";
        isValid = false;
      } else if (patient.value.email.length > 50) {
        errors.value.email = "L'email ne doit pas dépasser 50 caractères.";
        isValid = false;
      }

      return isValid;
    };

    const checkExistingPatient = () => {
      const existingPatient = patientStore.patients.find(
        (p) =>
          p.telephone === patient.value.telephone ||
          p.email === patient.value.email
      );

      if (existingPatient) {
        if (existingPatient.telephone === patient.value.telephone) {
          errors.value.telephone = 'Ce numéro de téléphone existe déjà.';
        }
        if (existingPatient.email === patient.value.email) {
          errors.value.email = 'Cet email existe déjà.';
        }
        return true;
      }
      return false;
    };

    const addPatient = async () => {
      if (!validateForm()) {
        return;
      }

      if (checkExistingPatient()) {
        return;
      }

      try {
        await patientStore.addPatient(patient.value);
        Swal.fire({
          title: 'Succès',
          text: 'Patient ajouté avec succès !',
          icon: 'success',
        });
        router.push('/patients');
      } catch (error) {
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout du patient.',
          icon: 'error',
        });
      }
    };

    const navigateToUserList = () => {
      router.push('/patients');
    };

    return {
      patient,
      errors,
      maxDate,
      addPatient,
      navigateToUserList,
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
