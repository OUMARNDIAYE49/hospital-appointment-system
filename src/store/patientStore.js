import { defineStore } from "pinia";
import axios from "axios";

export const usePatientStore = defineStore("patient", {
  state: () => ({
    patients: [], // Liste des patients
  }),

  actions: {
    // Charger tous les patients depuis l'API
    async loadDataFromApi() {  
      try {
        const response = await axios.get("http://localhost:3000/api/patients");
        this.patients = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
      }
    },

    // Ajouter un patient
    async addPatient(patient) {
      try {
        const response = await axios.post("http://localhost:3000/api/patients", patient);
        this.patients.push(response.data);
        console.log("Patient ajouté avec succès :", response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout du patient :", error);
      }
    },

    // Mettre à jour un patient
    async updatePatient(id, updatedPatient) {
      try {
        await axios.put(`http://localhost:3000/api/patients/${id}`, updatedPatient);
        const index = this.patients.findIndex((patient) => patient.id === id);
        if (index !== -1) {
          this.patients[index] = { ...this.patients[index], ...updatedPatient };
          console.log("Patient mis à jour avec succès");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du patient :", error);
      }
    },
    
    // Supprimer un patient
    async deletePatient(id) {
      try {
        await axios.delete(`http://localhost:3000/api/patients/${id}`);
        console.log("Patient supprimé avec succès");
        // Recharger la liste des patients après la suppression
        await this.loadDataFromApi(); // Recharge les données
      } catch (error) {
        console.error("Erreur lors de la suppression du patient :", error);
      }
    },

    // Récupérer un patient par son ID
    getPatientById(id) {
      return this.patients.find((patient) => patient.id === id);
    },

    // Vérifier si un patient a des rendez-vous associés
    async checkPatientAppointments(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/patients/${id}/appointments`);
        return response.data.length > 0; // Retourne true si des rendez-vous existent
      } catch (error) {
        console.error("Erreur lors de la vérification des rendez-vous :", error);
        return false; // Retourne false en cas d'erreur
      }
    },
  },
  persist: true
});