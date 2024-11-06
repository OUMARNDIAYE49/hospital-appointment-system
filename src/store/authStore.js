// src/store/authStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,       // Informations de l'utilisateur connecté
    token: null,      // Jeton d'authentification
  }),

  actions: {
    // Charger les données d'authentification depuis le localStorage
    loadAuthFromLocalStorage() {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);
      }
    },

    // Connexion de l'utilisateur
    async login(credentials) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", credentials);
        this.token = response.data.token;
        this.user = response.data.user;

        // Sauvegarder dans le localStorage
        localStorage.setItem("authToken", this.token);
        localStorage.setItem("authUser", JSON.stringify(this.user));

        console.log("Connexion réussie :", this.user);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
      }
    },

    // Déconnexion de l'utilisateur
    logout() {
      this.token = null;
      this.user = null;

      // Supprimer du localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");

      console.log("Déconnexion réussie");
    },

    // Vérifier si l'utilisateur est authentifié
    isAuthenticated() {
      return !!this.token;
    },

    // Récupérer les informations de l'utilisateur connecté
    getUser() {
      return this.user;
    },
  },

  // Persistance des données avec le plugin Pinia Persisted State
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      },
    ],
  },
});