<template>
  <div class="appointment-list">
    <h3>Liste des Rendez-vous</h3>
    <ul class="list-group">
      <li v-for="appointment in appointments" :key="appointment.id" class="list-group-item">
        {{ appointment.patientName }} - {{ new Date(appointment.date).toLocaleString() }}
        <button @click="editAppointment(appointment)" class="btn btn-warning btn-sm float-end">Modifier</button>
        <button @click="deleteAppointment(appointment.id)" class="btn btn-danger btn-sm float-end me-2">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppointmentList',
  props: {
    appointments: Array
  },
  methods: {
    editAppointment(appointment) {
      this.$emit('edit', appointment);
    },
    deleteAppointment(id) {
      this.$emit('delete', id);
    }
  }
};
</script>

<style scoped>
.appointment-list {
  margin: 20px 0;
}
</style>
