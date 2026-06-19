<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md items-center justify-between">
      <div class="text-h5">Patients</div>
      <q-btn
        color="primary"
        icon="add"
        label="Register Patient"
        to="/patients/create"
      />
    </div>

    <q-table
      :rows="patientStore.patients"
      :columns="columns"
      row-key="id"
      :loading="patientStore.loading"
      flat
      bordered
    >
      <template v-slot:body-cell-gender="props">
        <q-td :props="props">
          <q-chip
            :color="props.value === 'male' ? 'blue' : 'pink'"
            text-color="white"
            dense
          >
            {{ props.value === 'male' ? 'Male' : 'Female' }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePatientStore } from '../stores/index'

const patientStore = usePatientStore()

const columns = [
  {
    name: 'medical_record_number',
    label: 'RM Number',
    field: 'medical_record_number',
    align: 'left',
    sortable: true
  },
  {
    name: 'full_name',
    label: 'Full Name',
    field: 'full_name',
    align: 'left',
    sortable: true
  },
  { name: 'nik', label: 'NIK', field: 'nik', align: 'left' },
  {
    name: 'date_of_birth',
    label: 'Date of Birth',
    field: 'date_of_birth',
    align: 'left'
  },
  { name: 'gender', label: 'Gender', field: 'gender', align: 'center' },
  {
    name: 'phone_number',
    label: 'Phone',
    field: 'phone_number',
    align: 'left'
  },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'address', label: 'Address', field: 'address', align: 'left' }
]

onMounted(() => {
  patientStore.fetchPatients()
})
</script>
