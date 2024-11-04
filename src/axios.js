import axios from 'axios';

// Créez une instance d'axios avec la configuration de base
const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL de base pour toutes les requêtes
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
