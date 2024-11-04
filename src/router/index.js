import { createRouter, createWebHistory } from 'vue-router';
// import AdminDashboard from '../components/AdminDashboard.vue';
import AddAppointment from '../views/AddAppointment.vue';
import AppointmentList from '../views/AppointmentList.vue';
import DoctorDashboard from '../components/DoctorDashboard.vue';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import DoctorsList from '../views/DoctorsList.vue';
import AddDoctor from '../views/AddDoctor.vue';
import SpecialiteList from '../views/SpecialiteList.vue';
import AddSpecialty from '../views/AddSpecialty.vue'; 
import UserList from '../views/UserList.vue';
import AddUser from '../views/AddUser.vue';  
import PatientList from '../views/PatientList.vue';  // Composant pour la liste des patients
import AddPatient from '../views/AddPatient.vue';    // Composant pour l'ajout de patients



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
    component: AppointmentList,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/appointments/add',
    name: 'AddAppointment',
    component: AddAppointment,
    meta: { requiresAuth: true, role: 'admin' },
  },
  
  {
    path: '/admin/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/admin/users/add',
    name: 'AddUser',
    component: AddUser,
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
    path: '/admin/patients', 
    name: 'PatientList', 
    component: PatientList, 
    meta: { requiresAuth: true, role: 'admin' } 
  },
  { 
    path: '/admin/patients/add', 
    name: 'AddPatient', 
    component: AddPatient, 
    meta: { requiresAuth: true, role: 'admin' } 
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
