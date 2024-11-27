<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Ajouter une Spécialité</h1>
      <button @click="goToList" class="btn btn-outline-secondary btn-sm">
        Retour à la liste
      </button>
    </div>

    <form @submit.prevent="addSpecialty" class="specialty-form">
      <div class="form-group">
        <label for="specialty-name">Nom de la Spécialité:</label>
        <input
          type="text"
          id="specialty-name"
          v-model="specialty.nom"
          class="form-control"
          placeholder="Entrez le nom de la spécialité"
          required
        />
        <div v-if="nomError" class="text-danger mt-2">
          {{ nomError }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Ajouter Spécialité</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSpecialiteStore } from '@/store/specialityStore';
import Swal from 'sweetalert2';

export default {
  name: 'AddSpecialty',
  setup() {
    const router = useRouter();
    const specialiteStore = useSpecialiteStore();

    const specialty = ref({
      nom: '',
    });

    const nomError = ref('');

    const validateNom = () => {
  const isAlpha = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(specialty.value.nom);

  const isLongEnough = specialty.value.nom.length >= 3;
  const isShortEnough = specialty.value.nom.length <= 100;

  if (!isAlpha) {
    nomError.value = 'Le nom doit contenir uniquement des lettres, espaces, apostrophes ou traits d’union.';
  } else if (!isLongEnough) {
    nomError.value = 'Le nom doit contenir au moins 3 caractères.';
  } else if (!isShortEnough) {
    nomError.value = 'Le nom ne doit pas contenir plus de 100 caractères.';
  } else {
    nomError.value = ''; 
  }
};

    const addSpecialty = async () => {
      validateNom();

      if (nomError.value) {
        Swal.fire({
          icon: 'error',
          title: 'Nom invalide',
          text: nomError.value,
        });
        return;
      }

      if (!specialty.value.nom.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Champ requis',
          text: 'Veuillez entrer un nom de spécialité valide.',
        });
        return;
      }

      if (!specialiteStore.isUniqueSpeciality(specialty.value.nom)) {
        Swal.fire({
          icon: 'error',
          title: 'Doublon',
          text: 'Cette spécialité existe déjà.',
        });
        return;
      }

      try {
        await specialiteStore.addSpecialite(specialty.value);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Spécialité ajoutée avec succès !',
        });
        router.push('/specialties');
      } catch (error) {
        console.error("Erreur lors de l'ajout de la spécialité :", error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'ajout de la spécialité.',
        });
      }
    };

    const goToList = () => {
      router.push('/specialties');
    };

    return {
      specialty,
      nomError,
      addSpecialty,
      goToList,
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

.specialty-form {
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
  font-size: 1rem;
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

.text-danger {
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
