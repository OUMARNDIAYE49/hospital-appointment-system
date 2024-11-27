import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useSpecialiteStore = defineStore("specialites", {
  state: () => ({
    specialites: [],  
  }),

  actions: {
    async loadDataFromApi() {
      const auth = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/specialites",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.specialites = response.data;
        console.log("Spécialités chargées :", this.specialites); 
      } catch (error) {
        console.error("Erreur lors du chargement des spécialités :", error);
        this.specialites = [];
      }
    },
    isUniqueSpeciality(nom) {
      return !this.specialites.some(specialite => specialite.nom === nom);
    },

    async addSpecialite(specialite) {
      const auth = useAuthStore();

      if (!this.isUniqueSpeciality(specialite.nom)) {
        throw new Error("Cette spécialité existe déjà.");
      }

      try {
        const response = await axios.post("http://localhost:3000/api/specialites", specialite,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.specialites.push(response.data);
        await this.loadDataFromApi();  
      } catch (error) {
        console.error("Erreur lors de l'ajout de la spécialité :", error);
        throw error;  
      }
    },

    async updateSpecialite(id, updatedSpecialite) {
      const auth = useAuthStore();
      try {
        const response = await axios.put(`http://localhost:3000/api/specialites/${id}`, updatedSpecialite,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        
        const index = this.specialites.findIndex(specialite => specialite.id === id);
        if (index !== -1) {
          this.specialites[index] = { ...this.specialites[index], ...response.data };
        }
        console.log("Spécialité mise à jour avec succès :", response.data);
        return true;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la spécialité :", error);
        return false;
      }
    },
    async deleteSpecialite(id) {
      const auth = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/specialites/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.specialites = this.specialites.filter((specialite) => specialite.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la spécialité :', error);
        throw error;
      }
    },

    getSpecialiteById(id) {
      return this.specialites.find(specialite => specialite.id === id);
    }
  },
  persist: true
});
