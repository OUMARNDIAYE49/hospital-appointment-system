import { createRouter, createWebHistory } from 'vue-router';

// Importation des vues
import Login from '../components/Login.vue';
import Sidebar from '../components/Sidebar.vue';
import Home from '../views/Home.vue';
import Appointments from '../views/Appointment/AppointmentList.vue';
import UserList from '../views/User/UserList.vue';
import AddUser from '../views/User/AddUser.vue';
import SpecialtyList from '../views/Specialty/SpecialtyList.vue'; // Liste des spécialités
import AddSpecialty from '../views/Specialty/AddSpecialty.vue'; // Liste des spécialités
import PatientList from '../views/Patient/PatientList.vue'; // Liste des patients
import AddPatient from '../views/Patient/AddPatient.vue'; // Liste des patients
import AddAppointment from '../views/Appointment/AddAppointment.vue'; // Ajouter un rendez-vous

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/Home', name: 'Sidebar', component: Sidebar,
    children:[
      { path: '/appointments', name: 'Appointments', component: Appointments },
      { path: '/users', name: 'UserList', component: UserList },
      { path: '/add-user', name: 'AddUser', component: AddUser },
      { path: '/add-patient', name: 'AddPatient', component: AddPatient },
      { path: '/specialties', name: 'SpecialtyList', component: SpecialtyList },
      { path: '/add-specialties', name: 'AddSpecialty', component: AddSpecialty },
      { path: '/patients', name: 'PatientList', component: PatientList }, // Nouvelle route pour la liste des patients
      { path: '/add-appointment', name: 'AddAppointment', component: AddAppointment }, // Ajouter un rendez-vous
    ]
   },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
