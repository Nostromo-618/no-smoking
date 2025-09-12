<template>
  <v-card class="h-100" flat>
    <v-card-title class="text-h5 font-weight-medium pa-6 text-center">
      <v-icon class="mr-2" color="primary">mdi-heart-pulse</v-icon>
      {{ cardTitle }}
    </v-card-title>

    <v-card-text class="px-6 pb-2">
      <div class="text-center mb-4">
        <v-chip :color="getIntensityColor(intensity)" size="large" class="text-h6 font-weight-bold">
          {{ intensity }}/10
        </v-chip>
      </div>

      <v-slider
        v-model="intensity"
        :min="1"
        :max="10"
        :step="1"
        :color="getIntensityColor(intensity)"
        thumb-label="always"
        track-color="grey-lighten-2"
        class="mb-4"
        track-fill-color="primary"
      >
        <template v-slot:thumb-label="{ modelValue }">
          {{ modelValue }}
        </template>
      </v-slider>

      <div class="d-flex justify-space-between text-caption text-medium-emphasis mb-4">
        <span>Low</span>
        <span>{{ getIntensityLabel(intensity) }}</span>
        <span>High</span>
      </div>

      <v-alert
        v-if="showSuccessMessage"
        type="success"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="showSuccessMessage = false"
      >
        Urge recorded successfully! Keep going strong! 💪
      </v-alert>
    </v-card-text>

    <v-card-actions class="px-6 pb-6">
      <v-btn
        :loading="isRecording"
        color="primary"
        variant="flat"
        size="large"
        block
        @click="recordUrge"
      >
        <v-icon class="mr-2">mdi-plus-circle</v-icon>
        Record This Urge
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storageService, type Urge } from '@/services/storageService'

const emit = defineEmits(['urgeRecorded'])

const intensity = ref(5)
const isRecording = ref(false)
const showSuccessMessage = ref(false)

const cardTitle = computed(() => {
  return 'Track a New Urge'
})

const getIntensityColor = (value: number) => {
  if (value <= 3) return 'success'
  if (value <= 6) return 'warning'
  return 'error'
}

const getIntensityLabel = (value: number) => {
  if (value <= 2) return 'Very Low'
  if (value <= 4) return 'Low'
  if (value <= 6) return 'Moderate'
  if (value <= 8) return 'High'
  return 'Very High'
}

const recordUrge = async () => {
  isRecording.value = true

  try {
    const urgeData: Urge = {
      intensity: intensity.value,
      timestamp: new Date().toISOString(),
    }

    storageService.saveUrge(urgeData)
    emit('urgeRecorded')

    showSuccessMessage.value = true

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } finally {
    isRecording.value = false
  }
}
</script>
