<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Create New Visit</div>

    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-select
            v-model="form.patient_id"
            label="Patient"
            :options="patientOptions"
            option-value="id"
            option-label="full_name"
            emit-value
            map-options
            :rules="[val => !!val || 'Patient is required']"
            outlined
            use-input
            input-debounce="300"
            @filter="filterPatients"
            clearable
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.full_name }}</q-item-label>
                  <q-item-label caption>{{
                    scope.opt.medical_record_number
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            v-model="form.visit_date"
            label="Visit Date"
            type="date"
            :rules="[val => !!val || 'Visit date is required']"
            outlined
          />

          <q-input
            v-model="form.complaint"
            label="Complaint"
            type="textarea"
            :rules="[val => !!val || 'Complaint is required']"
            outlined
            rows="3"
          />

          <q-input
            v-model="form.diagnosis"
            label="Diagnosis"
            type="textarea"
            outlined
            rows="3"
          />

          <q-input
            v-model="form.notes"
            label="Notes"
            type="textarea"
            outlined
            rows="3"
          />

          <div class="row justify-end q-gutter-sm">
            <q-btn
              label="Cancel"
              color="negative"
              flat
              @click="$router.push('/visits')"
            />
            <q-btn
              label="Create Visit"
              type="submit"
              color="primary"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section v-if="errorMessage">
        <q-banner class="bg-negative text-white">
          {{ errorMessage }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVisitStore, usePatientStore } from '../stores/index'

const router = useRouter()
const visitStore = useVisitStore()
const patientStore = usePatientStore()

const form = reactive({
  patient_id: null,
  visit_date: new Date().toISOString().split('T')[0],
  complaint: '',
  diagnosis: '',
  notes: ''
})

const patientOptions = ref([])
const loading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  patientStore.fetchPatients()
  patientOptions.value = [...patientStore.patients]
})

function filterPatients(val, update) {
  if (val === '') {
    update(() => {
      patientOptions.value = [...patientStore.patients]
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    patientOptions.value = patientStore.patients.filter(
      p =>
        p.full_name.toLowerCase().includes(needle) ||
        p.medical_record_number.toLowerCase().includes(needle)
    )
  })
}

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  try {
    await visitStore.createVisit({ ...form })
    router.push('/visits')
  } catch (error) {
    const errors = error.response?.data?.errors
    if (errors) {
      errorMessage.value = Object.values(errors).flat().join(', ')
    } else {
      errorMessage.value =
        error.response?.data?.message || 'Failed to create visit.'
    }
  } finally {
    loading.value = false
  }
}
</script>
