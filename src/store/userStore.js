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
        await this.fetchSpecialites(); // Charger les spécialités après avoir récupéré les utilisateurs
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async fetchSpecialites() {
      const auth = useAuthStore();
      try {
        const response = await axios.get(
          "http://localhost:3000/api/specialites",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
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
          this.utilisateurs[index] = { ...this.utilisateurs[index], ...utilisateurMiseAJour };
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      }
    },

    async deleteUtilisateur(id) {
      const auth = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/utilisateurs/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        this.utilisateurs = this.utilisateurs.filter((utilisateur) => utilisateur.id !== id);
        return true; // Indicateur de succès
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        return false; // Retourne false en cas d'erreur
      }
    },
    

    async checkUserAppointments(id) {
      const authStore = useAuthStore(); // Utiliser useAuthStore pour accéder au store d'authentification
      try {
        const response = await axios.get(
          `http://localhost:3000/api/utilisateurs/${id}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`, // Utiliser le token provenant du store auth
            },
          }
        );
        return response.data.length > 0; // Retourne true si des rendez-vous sont trouvés
      } catch (error) {
        console.error("Erreur lors de la vérification des rendez-vous :", error);
        return false; // Retourne false en cas d'erreur
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["utilisateurActuel"] }],
  },
});
