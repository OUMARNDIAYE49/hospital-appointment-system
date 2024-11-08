<template>
  <div class="calendar-page">
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ref, onMounted } from 'vue';
import { useAppointmentStore } from '@/store/appointmentStore';

const appointmentStore = useAppointmentStore();

const handleEventClick = (info) => {
    const appointment = info.event.extendedProps;
    Swal.fire({
        title: 'Détails du Rendez-vous',
        html: `
            <p><strong>Patient :</strong> ${appointment.patient.nom}</p>
            <p><strong>Médecin :</strong> ${appointment.medecin.nom}</p>
            <p><strong>Status :</strong> ${appointment.status}</p>
            <p><strong>Date de Début :</strong> ${new Date(appointment.date_debut).toLocaleString()}</p>
            <p><strong>Date de Fin :</strong> ${new Date(appointment.date_fin).toLocaleString()}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fermer',
        confirmButtonColor: '#3b5998'
    });
};

const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridDay',
    initialDate: new Date().toISOString().slice(0, 10),
    events: [],
    eventClick: handleEventClick,
    slotLabelFormat: { // Format 24h pour les heures
        hour: 'numeric',
        minute: '2-digit',
        hour12: false // Désactive AM/PM
    },
    slotMinTime: '07:00:00', // Définir l'heure minimale à 07:00
});

onMounted(async () => {
    try {
        await appointmentStore.loadDataFromApi();
        calendarOptions.value.events = appointmentStore.appointments.map(appointment => ({
            title: `${appointment.patient.nom} - ${appointment.medecin.nom}`,
            start: appointment.date_debut,
            end: appointment.date_fin,
            backgroundColor: appointment.status === 'CONFIRMEE' ? '#3b5998' : '#3b5998',
            borderColor: appointment.status === 'CONFIRMEE' ? '#16a085' : '#3b5998',
            textColor: '#fff',
            extendedProps: appointment
        }));
    } catch (error) {
        console.error('Erreur lors du chargement des rendez-vous:', error);
    }
});
</script>

<style scoped>
.calendar-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.calendar-container {
    width: 100%;
    max-width: 1200px;
    background-color: white;
    padding: 20px;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.fc .fc-toolbar-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.fc .fc-button {
    background-color: #1abc9c;
    border: none;
    color: #fff;
}

.fc .fc-button:hover {
    background-color: #16a085;
}

.fc-daygrid-event {
    background-color: #007bff;
    border-color: #0056b3;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
}
</style>
