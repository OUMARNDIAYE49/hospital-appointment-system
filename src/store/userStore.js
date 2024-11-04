import { defineStore } from "pinia";
import axios from "axios";

export const useUtilisateurStore = defineStore("utilisateurs", {
  state: () => ({
    utilisateurs: [],
    specialites: [],
    utilisateurActuel: null,
  }),

  actions: {
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3000/api/utilisateurs");
        this.utilisateurs = response.data;

        // Appeler fetchSpecialites pour charger les spécialités
        await this.fetchSpecialites();
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async fetchSpecialites() {
      try {
        const response = await axios.get("http://localhost:3000/api/specialites");
        this.specialites = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des spécialités :", error);
      }
    },

    async addUtilisateur(utilisateur) {
      try {
        const response = await axios.post("http://localhost:3000/api/utilisateurs", utilisateur);
        this.utilisateurs.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    },

    async updateUtilisateur(id, utilisateurMiseAJour) {
      try {
        const response = await axios.put(`http://localhost:3000/api/utilisateurs/${id}`, utilisateurMiseAJour);
        const index = this.utilisateurs.findIndex((utilisateur) => utilisateur.id === id);
        if (index !== -1) {
          this.utilisateurs[index] = { ...this.utilisateurs[index], ...utilisateurMiseAJour };
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    },

    async deleteUtilisateur(id) {
      try {
        await axios.delete(`http://localhost:3000/api/utilisateurs/${id}`);
        this.utilisateurs = this.utilisateurs.filter((utilisateur) => utilisateur.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["utilisateurActuel"] }],
  },
});
