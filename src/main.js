import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Importation du routeur
import { createPinia } from 'pinia';  // Importation de Pinia pour la gestion d'état
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import 'bootstrap/dist/css/bootstrap.min.css';  // Importation de Bootstrap 5
import 'bootstrap';  // Importation des scripts Bootstrap 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Importer toutes les icônes solid

// Ajout des icônes à la bibliothèque
library.add(fas);

// Création de l'application Vue
const app = createApp(App);
const pinia = createPinia();
// Utilisation de Pinia pour la gestion d'état
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

// Utilisation de Vue Router pour la navigation
app.use(router);

// Enregistrement du composant FontAwesomeIcon globalement
app.component('font-awesome-icon', FontAwesomeIcon);

// Montage de l'application sur l'élément HTML avec l'id "app"
app.mount('#app');
