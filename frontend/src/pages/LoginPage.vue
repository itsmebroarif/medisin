<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-lg" style="width: 400px; max-width: 90vw">
      <q-card-section class="text-center">
        <div class="text-h5 text-primary q-mb-xs">Clinic Management</div>
        <div class="text-subtitle2 text-grey-7">Sign in to your account</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="Username / Email"
            type="text"
            :rules="[
              val => !!val || 'Username or Email is required'
            ]"
            outlined
            autocomplete="username"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :rules="[val => !!val || 'Password is required']"
            outlined
            autocomplete="current-password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-btn
            label="Sign In"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
            size="lg"
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="errorMessage" class="q-pt-none">
        <q-banner class="bg-negative text-white">
          {{ errorMessage }}
        </q-banner>
      </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/index'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    await authStore.login(form.email, form.password)
    router.push('/')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.errors?.email?.[0] ||
      'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
