import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Sidebar from '../components/Sidebar.vue';
import Home from '../views/Home.vue';
import Appointments from '../views/Appointment/AppointmentList.vue';
import UserList from '../views/User/UserList.vue';
import AddUser from '../views/User/AddUser.vue';
import SpecialtyList from '../views/Specialty/SpecialtyList.vue';
import AddSpecialty from '../views/Specialty/AddSpecialty.vue';
import PatientList from '../views/Patient/PatientList.vue';
import AddPatient from '../views/Patient/AddPatient.vue';
import AddAppointment from '../views/Appointment/AddAppointment.vue';
import { useAuthStore } from '../store/authStore';
import CalendarView from '../components/CalendarView.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import EditCurrentUser from '../views/User/EditCurrent!user.vue';
import ChangePassword from '../views/User/ChangePassword.vue';


const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword },
  
  { 
    path: '/Home', 
    name: 'Sidebar', 
    component: Sidebar,
    meta: { requiresAuth: true },
    children: [
      { path: '/calendar', name: 'calendar', component: CalendarView },
      { path: '/appointments', name: 'Appointments', component: Appointments, meta: { requiresAuth: true } },
      { path: '/users', name: 'UserList', component: UserList, meta: { requiresAuth: true } },
      { path: '/add-user', name: 'AddUser', component: AddUser, meta: { requiresAuth: true } },
      { path: '/add-patient', name: 'AddPatient', component: AddPatient, meta: { requiresAuth: true } },
      { path: '/specialties', name: 'SpecialtyList', component: SpecialtyList, meta: { requiresAuth: true } },
      { path: '/add-specialties', name: 'AddSpecialty', component: AddSpecialty, meta: { requiresAuth: true } },
      { path: '/patients', name: 'PatientList', component: PatientList, meta: { requiresAuth: true } },
      { path: '/add-appointment', name: 'AddAppointment', component: AddAppointment, meta: { requiresAuth: true } },
      { path: '/edit-user', name: 'edit-user', component: EditCurrentUser, meta: { requiresAuth: true } },
      { path: '/change-password', name: 'echanger-password', component: ChangePassword, meta: { requiresAuth: true } },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour la vérification de l'authentification
router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  // Vérifie si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isAuthenticated) {
      // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      next({ name: 'Login' });
    } else {
      next(); // Continue vers la route demandée si authentifié
    }
  } else {
    next(); // Continue si aucune authentification n'est requise
  }
});

export default router;
