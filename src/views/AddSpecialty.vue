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
import { ref } from 'vue'; // Ajout de 'ref' pour la gestion des données réactives
import { useSpecialiteStore } from '@/store/specialityStore';
import { useRouter } from 'vue-router';

export default {
  name: 'AddSpecialty',
  setup() {
    const specialiteStore = useSpecialiteStore();
    const router = useRouter();
    const specialtyName = ref(''); // Définir specialtyName comme une référence réactive

    const submitForm = async () => {
      if (specialtyName.value.trim()) {
        // Ajout de la spécialité via le store
        await specialiteStore.addSpecialite({ nom: specialtyName.value });
        
        // Réinitialisation du champ après soumission
        specialtyName.value = '';

        // Redirection vers la liste des spécialités
        router.push('/admin/specialties');
      } else {
        alert("Veuillez entrer un nom de spécialité valide.");
      }
    };

    return {
      specialtyName, // Ajout de specialtyName au retour
      submitForm,
    };
  },
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
