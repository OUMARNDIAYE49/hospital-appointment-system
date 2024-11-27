import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore";

export const usePatientStore = defineStore("patient", {
  state: () => ({
    patients: [], 
  }),

  actions: {
    async loadDataFromApi() {  
      const auth = useAuthStore();
      try {
        const response = await axios.get("http://localhost:3000/api/patients", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        this.patients = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
      }
    },

    async addPatient(patient) {
      const auth = useAuthStore();
      try {
        const response = await axios.post("http://localhost:3000/api/patients", patient, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        this.patients.push(response.data);
        console.log("Patient ajouté avec succès :", response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout du patient :", error);
      }
    },
    async updatePatient(id, updatedPatient) {
      const auth = useAuthStore();
      try {
        await axios.put(`http://localhost:3000/api/patients/${id}`, updatedPatient, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const index = this.patients.findIndex((patient) => patient.id === id);
        if (index !== -1) {
          this.patients[index] = { ...this.patients[index], ...updatedPatient };
          console.log("Patient mis à jour avec succès");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du patient :", error);
      }
    },
    
    async deletePatient(id) {
      const auth = useAuthStore();
      try {
        const hasAppointments = await this.checkPatientAppointments(id);
        if (hasAppointments) {
          console.warn("Impossible de supprimer : le patient a des rendez-vous programmés.");
          return false; 
        }

        await axios.delete(`http://localhost:3000/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log("Patient supprimé avec succès");
        await this.loadDataFromApi();
        return true; 
      } catch (error) {
        console.error("Erreur lors de la suppression du patient :", error);
        return false;
      }
    },

    getPatientById(id) {
      return this.patients.find((patient) => patient.id === id);
    },

    async checkPatientAppointments(id) {
      const auth = useAuthStore();
      try {
        const response = await axios.get(`http://localhost:3000/api/patients/${id}/appointments`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        return response.data.length > 0; 
      } catch (error) {
        console.error("Erreur lors de la vérification des rendez-vous :", error);
        return false;
      }
    },
  },
  persist: true
});
