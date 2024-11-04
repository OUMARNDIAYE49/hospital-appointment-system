<template>
  <form @submit.prevent="submitForm" class="appointment-form">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} un Rendez-vous</h2>

    <!-- Nom et Prénom du patient -->
    <div class="form-row">
      <input type="text" v-model="appointment.name" placeholder="Nom du patient" required />
      <input type="text" v-model="appointment.firstName" placeholder="Prénom du patient" required />
    </div>

    <!-- Adresse du patient -->
    <input type="text" v-model="appointment.address" placeholder="Adresse du patient" required />

    <!-- Téléphone -->
    <input type="tel" v-model="appointment.phone" placeholder="Numéro de téléphone" required />

    <!-- Médecin et Spécialité (sur la même ligne) -->
    <div class="form-row">
      <select v-model="appointment.doctor" required>
        <option disabled value="">Sélectionner un Médecin</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.name">
          {{ doctor.name }}
        </option>
      </select>

      <select v-model="appointment.specialty" required>
        <option disabled value="">Sélectionner une Spécialité</option>
        <option v-for="specialty in specialties" :key="specialty">
          {{ specialty }}
        </option>
      </select>
    </div>

    <!-- Date et heure du rendez-vous -->
    <input type="datetime-local" v-model="appointment.date" required />

    <!-- Statut du rendez-vous -->
    <select v-model="appointment.status" required>
      <option disabled value="">Sélectionner le statut</option>
      <option value="confirmé">Confirmé</option>
      <option value="annulé">Annulé</option>
      <option value="reporté">Reporté</option>
    </select>

    <!-- Boutons de soumission et annulation -->
    <div class="form-buttons">
      <button type="submit" class="button-submit">
        {{ isEditing ? 'Modifier' : 'Ajouter' }}
      </button>
      <button type="button" @click="cancel" class="button-cancel">Annuler</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AppointmentForm',
  props: {
    appointment: {
      type: Object,
      default: () => ({
        name: '',
        firstName: '',
        address: '',
        phone: '',
        doctor: '',
        specialty: '',
        date: '',
        status: '',
        notes: ''
      }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      doctors: [
        { id: 1, name: 'Dr. Jean Dupont' },
        { id: 2, name: 'Dr. Marie Curie' },
        { id: 3, name: 'Dr. Alain Prost' },
      ],
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
      this.$emit('submit', this.appointment);
      this.$emit('reset'); // Réinitialise le formulaire après soumission

      // Redirige vers la liste des rendez-vous après l'ajout ou la modification
      this.$router.push('/admin');
    },
    cancel() {
      this.$emit('reset'); // Action pour annuler et réinitialiser le formulaire
    },
  },
};
</script>

<style scoped>
.appointment-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin: 60px auto;
}

.appointment-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.appointment-form input,
.appointment-form select {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.appointment-form .form-row {
  display: flex;
  gap: 10px;
}

.appointment-form .form-row select,
.appointment-form .form-row input {
  width: 50%;
}

.appointment-form .form-buttons {
  display: flex;
  justify-content: space-between;
}

/* Style pour le bouton Ajouter/Modifier */
.button-submit {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
}

/* Effet hover pour le bouton Ajouter/Modifier */
.button-submit:hover {
  background-color: #0056b3;
}

/* Style pour le bouton Annuler */
.button-cancel {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
}

/* Effet hover pour le bouton Annuler */
.button-cancel:hover {
  background-color: #c82333;
}
</style>
