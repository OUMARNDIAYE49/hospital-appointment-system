import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../components/AdminDashboard.vue';
import AppointmentForm from '../components/AppointmentForm.vue'; // Assurez-vous que le chemin est correct
import DoctorDashboard from '../components/DoctorDashboard.vue';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import DoctorsList from '../views/DoctorsList.vue'; // Nouvelle page des médecins
import AddDoctor from '../views/AddDoctor.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/appointments',
    name: 'AppointmentForm',
    component: AppointmentForm, // Ce composant doit contenir le formulaire
    meta: { requiresAuth: true, role: 'admin' }, // Ou tout autre rôle qui peut accéder à ce formulaire
  },
  {
    path: '/admin/doctors',
    name: 'Doctors',
    component: DoctorsList, // Route pour la page des médecins
  },
  {
    path: '/admin/doctors/add',
    name: 'AddDoctor',
    component: AddDoctor, // Ou utilisez la méthode d'importation dynamique
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: DoctorDashboard,
    meta: { requiresAuth: true, role: 'doctor' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
