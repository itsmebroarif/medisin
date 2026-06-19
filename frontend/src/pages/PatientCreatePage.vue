<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Register New Patient</div>

    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.nik"
                label="NIK"
                :rules="[
                  val => !!val || 'NIK is required',
                  val => val.length <= 16 || 'Max 16 characters'
                ]"
                outlined
                maxlength="16"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.full_name"
                label="Full Name"
                :rules="[val => !!val || 'Full name is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.date_of_birth"
                label="Date of Birth"
                type="date"
                :rules="[val => !!val || 'Date of birth is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="form.gender"
                label="Gender"
                :options="genderOptions"
                :rules="[val => !!val || 'Gender is required']"
                outlined
                emit-value
                map-options
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.phone_number"
                label="Phone Number"
                :rules="[val => !!val || 'Phone number is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                :rules="[
                  val => !!val || 'Email is required',
                  val => /.+@.+/.test(val) || 'Invalid email'
                ]"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.address"
                label="Address"
                type="textarea"
                :rules="[val => !!val || 'Address is required']"
                outlined
                rows="3"
              />
            </div>
          </div>

          <div class="row justify-end q-gutter-sm">
            <q-btn
              label="Cancel"
              color="negative"
              flat
              @click="$router.push('/')"
            />
            <q-btn
              label="Register"
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../stores/index'

const router = useRouter()
const patientStore = usePatientStore()

const form = reactive({
  nik: '',
  full_name: '',
  date_of_birth: '',
  gender: '',
  phone_number: '',
  email: '',
  address: ''
})

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]

const loading = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''
  try {
    await patientStore.createPatient({ ...form })
    router.push('/')
  } catch (error) {
    const errors = error.response?.data?.errors
    if (errors) {
      errorMessage.value = Object.values(errors).flat().join(', ')
    } else {
      errorMessage.value =
        error.response?.data?.message ||
        'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
