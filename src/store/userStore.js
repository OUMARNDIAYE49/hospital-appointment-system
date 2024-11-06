import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useUtilisateurStore = defineStore("utilisateurs", {
  state: () => ({
    utilisateurs: [],
    specialites: [],
    utilisateurActuel: null,
  }),

  actions: {
    async loadDataFromApi() {
      const auth = useAuthStore();
      try {
        const response = await axios.get(
          "http://localhost:3000/api/utilisateurs",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.utilisateurs = response.data;

        // Appeler fetchSpecialites pour charger les spécialités
        await this.fetchSpecialites();
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async fetchSpecialites() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/specialites"
        );
        this.specialites = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des spécialités :", error);
      }
    },

    async addUtilisateur(utilisateur) {
      const auth = useAuthStore();
      try {
        const response = await axios.post(
          "http://localhost:3000/api/utilisateurs",
          utilisateur,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.utilisateurs.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    },

    async updateUtilisateur(id, utilisateurMiseAJour) {
      const auth = useAuthStore();
      try {
        const response = await axios.put(
          `http://localhost:3000/api/utilisateurs/${id}`,
          utilisateurMiseAJour,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const index = this.utilisateurs.findIndex(
          (utilisateur) => utilisateur.id === id
        );
        if (index !== -1) {
          this.utilisateurs[index] = {
            ...this.utilisateurs[index],
            ...utilisateurMiseAJour,
          };
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
      }
    },

    async deleteUtilisateur(id) {
      const auth = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/utilisateurs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.utilisateurs = this.utilisateurs.filter(
          (utilisateur) => utilisateur.id !== id
        );
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["utilisateurActuel"] }],
  },
});
