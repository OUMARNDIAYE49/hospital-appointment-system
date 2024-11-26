import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useUtilisateurStore = defineStore("utilisateurs", {
  state: () => ({
    utilisateurs: [],
    specialites: [],
    medecinsDisponibles: [],
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
        await this.fetchSpecialites();
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    },

    async updateCurrentUser(nom, email) {
      const auth = useAuthStore();
      try {
        const response = await axios.put("http://localhost:3000/api/user/update", { nom, email },{
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        return response.data.utilisateurs;
      } catch (error) {
        console.error("Erreur lors de la mise à jour des informations :", error);
        throw error;
      }
    },

    async changePassword(currentPassword, newPassword) {
      const auth = useAuthStore();
      try {
          console.log("Données envoyées :", { currentPassword, newPassword });
          const response = await axios.put(
              "http://localhost:3000/api/user/change-password",
              { currentPassword, newPassword },
              {
                  headers: {
                      Authorization: `Bearer ${auth.token}`,
                  },
              }
          );
          console.log("Réponse de l'API :", response.data);
          return response.data;
      } catch (error) {
          console.error("Erreur lors du changement de mot de passe :", error);
          if (error.response) {
              console.error("Réponse du serveur :", error.response.data);
              console.error("Statut HTTP :", error.response.status);
          }
          throw error;
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
        return true; 
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        return false; 
      }
    },
    
    async checkUserAppointments(id) {
      const auth = useAuthStore(); 
      try {
        const response = await axios.get(
          `http://localhost:3000/api/utilisateurs/${id}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, 
            },
          }
        );
        return response.data.length > 0; 
      } catch (error) {
        console.error("Erreur lors de la vérification des rendez-vous :", error);
        return false; 
      }
    },
  },


  async fetchMedecinsDisponibles(dateDebut, dateFin) {
    const auth = useAuthStore();
    try {
      const response = await axios.get("http://localhost:3000/api/medecin", {
        params: { dateDebut, dateFin },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      this.medecinsDisponibles = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des médecins disponibles :", error);
      this.medecinsDisponibles = [];
    }
  },
  

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["utilisateurActuel"] }],
  },
});
