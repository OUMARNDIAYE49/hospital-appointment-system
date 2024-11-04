import { defineStore } from "pinia";
import axios from "axios";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    appointments: [],  // Liste des rendez-vous
    patients: [],
    utilisateurs: [],  
  }),

  actions: {
    // Charger tous les rendez-vous depuis l'API
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3000/api/rendezvous");
        this.appointments = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous :", error);
        this.appointments = [];
      }
    },

    // Ajouter un rendez-vous
    async addAppointment(appointment) {
      try {
        // if (!this.validateAppointment(appointment)) {
        //   throw new Error("Données du rendez-vous invalides.");
        // }
        const response = await axios.post("http://localhost:3000/api/rendezvous", appointment);
        this.appointments.push(response.data);
        console.log("Rendez-vous ajouté avec succès");
      } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous :", error);
      }
    },

    // Valider les données du rendez-vous
    // validateAppointment(appointment) {
    //   return appointment.dateHeure && appointment.telephone && appointment.medecinId && appointment.utilisateurId;
    // },
    
    // Mettre à jour un rendez-vous
    async updateAppointment(id, updatedAppointment) {
      try {
        await axios.put(`http://localhost:3000/api/rendezvous/${id}`, updatedAppointment);
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
      try {
        await axios.delete(`http://localhost:3000/api/rendezvous/${id}`);
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
