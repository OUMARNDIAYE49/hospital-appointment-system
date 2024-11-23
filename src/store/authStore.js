import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, 
    token: null, 
  }),

  actions: {
    loadAuthFromLocalStorage() {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);

        console.log("Utilisateur chargé depuis localStorage :", this.user);
        console.log("Token chargé depuis localStorage :", this.token);

        if (this.user && this.user.role) {
          console.log("Rôle de l'utilisateur connecté :", this.user.role);
        } else {
          console.log("Rôle de l'utilisateur non disponible.");
        }
      } else {
        console.log("Aucun utilisateur ou token trouvé dans localStorage.");
      }
    },
    async login(credentials) {
      try {
        console.log("Tentative de connexion avec :", credentials);

        const response = await axios.post(
          "http://localhost:3000/api/login",
          credentials
        );
        console.log("Réponse du serveur :", response.data);

        this.token = response.data.token;
        this.user = response.data.utilisateur;

        localStorage.setItem("authToken", this.token);
        localStorage.setItem("authUser", JSON.stringify(this.user));

        console.log("Utilisateur connecté après login :", this.user);

        if (this.user && this.user.role) {
          console.log("Rôle de l'utilisateur connecté :", this.user.role);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");

      console.log("Déconnexion réussie");
    },

    isAuthenticated() {
      return !!this.token;
    },

    getUser() {
      return this.user;
    },

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

    async resetPassword(token, password) {
      try {
        await axios.post(`http://localhost:3000/api/password/reset-password/${token}`, {
          password,
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
