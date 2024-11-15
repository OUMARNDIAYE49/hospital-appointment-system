import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Informations de l'utilisateur connecté
    token: null, // Jeton d'authentification
  }),

  actions: {
    // Charger les données d'authentification depuis le localStorage
    loadAuthFromLocalStorage() {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);

        console.log("Utilisateur chargé depuis localStorage :", this.user);
        console.log("Token chargé depuis localStorage :", this.token);

        // Affichage du rôle de l'utilisateur connecté
        if (this.user && this.user.role) {
          console.log("Rôle de l'utilisateur connecté :", this.user.role);
        } else {
          console.log("Rôle de l'utilisateur non disponible.");
        }
      } else {
        console.log("Aucun utilisateur ou token trouvé dans localStorage.");
      }
    },

    // Connexion de l'utilisateur
    async login(credentials) {
      try {
        console.log("Tentative de connexion avec :", credentials);

        const response = await axios.post(
          "http://localhost:3000/api/login",
          credentials
        );
        console.log("Réponse du serveur :", response.data);

        // Stocker le token et l'utilisateur dans le store
        this.token = response.data.token;
        this.user = response.data.utilisateur;

        // Sauvegarder dans le localStorage pour la persistance
        localStorage.setItem("authToken", this.token);
        localStorage.setItem("authUser", JSON.stringify(this.user));

        console.log("Utilisateur connecté après login :", this.user);

        // Affichage du rôle de l'utilisateur connecté
        if (this.user && this.user.role) {
          console.log("Rôle de l'utilisateur connecté :", this.user.role);
        }
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

    // Envoi de l'email de réinitialisation du mot de passe
    async sendPasswordResetEmail(email) {
      try {
        await axios.post("http://localhost:3000/api/password/forgot-password", {
          email,
        });
        console.log("Email de réinitialisation envoyé à :", email);
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de l'email de réinitialisation :",
          error
        );
        throw error;
      }
    },

    // Réinitialisation du mot de passe
    async resetPassword(token, newPassword) {
      try {
        await axios.post("http://localhost:3000/api/password/reset-password", {
          token,
          newPassword,
        });
        console.log("Mot de passe réinitialisé avec succès.");
      } catch (error) {
        console.error(
          "Erreur lors de la réinitialisation du mot de passe :",
          error
        );
        throw error;
      }
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
