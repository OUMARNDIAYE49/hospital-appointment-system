import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userRole: null,   // Rôle de l'utilisateur (admin ou doctor)
    isAuthenticated: false,  // Indicateur d'authentification
  }),
  actions: {
    login(role) {
      this.userRole = role;
      this.isAuthenticated = true;
    },
    logout() {
      this.userRole = null;
      this.isAuthenticated = false;
    },
  },
});
