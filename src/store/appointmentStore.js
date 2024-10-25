import { defineStore } from 'pinia';
import { fetchAllAppointments, updateAppointmentById, deleteAppointmentById, cancelAppointmentById } from '../services/appointmentService';  // Services API fictifs

export const useAppointmentStore = defineStore('appointments', {
  state: () => ({
    appointments: [],  // Liste des rendez-vous
  }),
  actions: {
    // Récupérer tous les rendez-vous depuis une API ou des données locales
    async fetchAppointments() {
      try {
        const data = await fetchAllAppointments();  // Appel API pour récupérer les rendez-vous
        this.appointments = data;  // Met à jour l'état avec les rendez-vous récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
      }
    },

    // Mettre à jour un rendez-vous spécifique
    async updateAppointment(id, updatedData) {
      try {
        const updatedAppointment = await updateAppointmentById(id, updatedData);  // Appel API pour mettre à jour le rendez-vous
        const index = this.appointments.findIndex(app => app.id === id);
        if (index !== -1) {
          this.appointments[index] = updatedAppointment;  // Met à jour le rendez-vous dans la liste
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rendez-vous:', error);
      }
    },

    // Supprimer un rendez-vous par son ID
    async deleteAppointment(id) {
      try {
        await deleteAppointmentById(id);  // Appel API pour supprimer le rendez-vous
        this.appointments = this.appointments.filter(app => app.id !== id);  // Met à jour la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du rendez-vous:', error);
      }
    },

    // Annuler un rendez-vous (mettre à jour son statut)
    async cancelAppointment(id) {
      try {
        const updatedAppointment = await cancelAppointmentById(id);  // Appel API pour annuler le rendez-vous
        const index = this.appointments.findIndex(app => app.id === id);
        if (index !== -1) {
          this.appointments[index].status = 'annulé';  // Met à jour le statut du rendez-vous dans la liste
        }
      } catch (error) {
        console.error('Erreur lors de l’annulation du rendez-vous:', error);
      }
    },
  },
});
