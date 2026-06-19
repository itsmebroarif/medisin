<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md items-center justify-between">
      <div class="text-h5">Visits</div>
      <q-btn
        color="primary"
        icon="add"
        label="Create Visit"
        to="/visits/create"
      />
    </div>

    <q-table
      :rows="visitStore.visits"
      :columns="columns"
      row-key="id"
      :loading="visitStore.loading"
      flat
      bordered
    >
      <template v-slot:body-cell-patient="props">
        <q-td :props="props">
          <div>{{ props.row.patient?.full_name }}</div>
          <div class="text-caption text-grey">{{
            props.row.patient?.medical_record_number
          }}</div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVisitStore } from '../stores/index'

const visitStore = useVisitStore()

const columns = [
  {
    name: 'patient',
    label: 'Patient',
    field: row => row.patient?.full_name,
    align: 'left',
    sortable: true
  },
  {
    name: 'visit_date',
    label: 'Visit Date',
    field: 'visit_date',
    align: 'left',
    sortable: true
  },
  { name: 'complaint', label: 'Complaint', field: 'complaint', align: 'left' },
  { name: 'diagnosis', label: 'Diagnosis', field: 'diagnosis', align: 'left' },
  { name: 'notes', label: 'Notes', field: 'notes', align: 'left' }
]

onMounted(() => {
  visitStore.fetchVisits()
})
</script>
