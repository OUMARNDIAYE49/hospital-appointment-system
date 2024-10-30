import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../components/AdminDashboard.vue';
import AppointmentForm from '../components/AppointmentForm.vue';
import DoctorDashboard from '../components/DoctorDashboard.vue';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import DoctorsList from '../views/DoctorsList.vue';
import AddDoctor from '../views/AddDoctor.vue';
import SpecialiteList from '../views/SpecialiteList.vue';
import AddSpecialty from '../views/AddSpecialty.vue'; // Import pour ajouter une spécialité

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
    component: AppointmentForm,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/doctors',
    name: 'Doctors',
    component: DoctorsList,
  },
  {
    path: '/admin/doctors/add',
    name: 'AddDoctor',
    component: AddDoctor,
  },
  {
    path: '/admin/specialties',
    name: 'Specialties',
    component: SpecialiteList,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/specialties/add', // Nouvelle route pour ajouter une spécialité
    name: 'AddSpecialty',
    component: AddSpecialty, // Le composant de formulaire d'ajout de spécialité
    meta: { requiresAuth: true, role: 'admin' },
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
