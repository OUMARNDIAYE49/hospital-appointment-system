// specialiteStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useSpecialiteStore = defineStore("specialites", {
  state: () => ({
    specialites: [],  // Liste des spécialités
  }),

  actions: {
    // Charger toutes les spécialités depuis l'API
    async loadDataFromApi() {
      try {
        const response = await axios.get("http://localhost:3000/api/specialites");
        this.specialites = response.data;
        console.log("Spécialités chargées :", this.specialites); // Vérification des données
      } catch (error) {
        console.error("Erreur lors du chargement des spécialités :", error);
        this.specialites = [];
      }
    },

    // Ajouter une nouvelle spécialité
    async addSpecialite(specialite) {
      try {
        const response = await axios.post("http://localhost:3000/api/specialites", specialite);
        this.specialites.push(response.data);                
        await this.loadDataFromApi();  // Rafraîchir la liste après ajout
      } catch (error) {
        console.error("Erreur lors de l'ajout de la spécialité :", error);              
      }
    },
    
    // Mettre à jour une spécialité existante
    async updateSpecialite(id, updatedSpecialite) {
      try {
        // Envoie la mise à jour à l'API
        const response = await axios.put(`http://localhost:3000/api/specialites/${id}`, updatedSpecialite);
        
        // Met à jour localement la liste des spécialités
        const index = this.specialites.findIndex(specialite => specialite.id === id);
        if (index !== -1) {
          this.specialites[index] = { ...this.specialites[index], ...response.data }; 
        }
        console.log("Spécialité mise à jour avec succès :", response.data);
        return true;  // Succès
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la spécialité :", error);
        return false;  // Échec
      }
    },
    
    // Supprimer une spécialité
    async deleteSpecialite(id) {
      try {
        await axios.delete(`http://localhost:3000/api/specialites/${id}`);
        this.specialites = this.specialites.filter((specialite) => specialite.id !== id); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la spécialité :', error);
        throw error;
      }
    },
    
    // Récupérer une spécialité par son ID
    getSpecialiteById(id) {
      return this.specialites.find(specialite => specialite.id === id);
    }
  },
  persist: true
});
