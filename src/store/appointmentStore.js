import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointments: [],  // Liste des rendez-vous
    patients: [],
    utilisateurs: [],  
  }),

  actions: {
    // Charger tous les rendez-vous depuis l'API
    async loadDataFromApi() {
      const auth = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/rendezvous",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.appointments = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous :", error);
        this.appointments = [];
      }
    },

    // Ajouter un rendez-vous
    async addAppointment(appointment) {
      const auth = useAuthStore();
      try {
        
        const response = await axios.post("http://localhost:3000/api/rendezvous", appointment,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.appointments.push(response.data);
        console.log("Rendez-vous ajouté avec succès");
      } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous :", error);
      }
    },

    
    
    // Mettre à jour un rendez-vous
    async updateAppointment(id, updatedAppointment) {
      const auth = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/rendezvous/${id}`, updatedAppointment, 
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const index = this.appointments.findIndex((appointment) => appointment.id === id);
        if (index !== -1) {
          this.appointments[index] = { ...this.appointments[index], ...updatedAppointment };
        }
        console.log("Rendez-vous mis à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du rendez-vous :", error);
      }
    },

    // Supprimer un rendez-vous
    async deleteAppointment(id) {
      const auth = useAuthStore();
      try {
        await axios.delete(`http://localhost:3000/api/rendezvous/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        this.appointments = this.appointments.filter((appointment) => appointment.id !== id); 
        console.log("Rendez-vous supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression du rendez-vous :", error);
      }
    },

    // Récupérer un rendez-vous par son ID
    getAppointmentById(id) {
      return this.appointments.find((appointment) => appointment.id === id);
    }
  },
  persist: true
});
