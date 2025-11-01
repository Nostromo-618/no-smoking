<template>
  <v-card class="h-100 urge-tracker-card" flat :class="cardGradientClass">
    <v-card-title class="text-h5 font-weight-medium pa-6 text-center">
      <v-icon class="mr-2" color="primary">mdi-heart-pulse</v-icon>
      {{ cardTitle }}
    </v-card-title>

    <v-card-text class="px-6 pb-2">
      <div class="text-center mb-4">
        <v-chip color="primary" size="large" class="text-h6 font-weight-bold">
          {{ intensity }}/10
        </v-chip>
      </div>

      <v-slider
        v-model="intensity"
        :min="1"
        :max="10"
        :step="1"
        color="primary"
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
        :type="getAlertType()"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="showSuccessMessage = false"
      >
        {{ getSuccessMessage() }}
      </v-alert>

      <!-- Urge Type Radio Buttons -->
      <div class="mb-4">
        <div class="text-caption text-medium-emphasis mb-3 text-center">Select urge outcome:</div>
        <v-radio-group
          v-model="urgeType"
          hide-details
        >
          <v-radio
            value="resisted"
            color="success"
            class="mb-2"
          >
            <template v-slot:label>
              <div class="d-flex align-center">
                <v-icon color="success" size="small" class="mr-2">mdi-check-circle</v-icon>
                <span class="text-body-2">Urge Resisted</span>
              </div>
            </template>
          </v-radio>
          <v-radio
            value="smoking"
            color="error"
            class="mb-2"
          >
            <template v-slot:label>
              <div class="d-flex align-center">
                <v-icon color="error" size="small" class="mr-2">mdi-smoking</v-icon>
                <span class="text-body-2">Smoking Happened</span>
              </div>
            </template>
          </v-radio>
          <v-radio
            value="gum"
            color="orange"
            class="mb-2"
          >
            <template v-slot:label>
              <div class="d-flex align-center">
                <v-icon color="orange" size="small" class="mr-2">mdi-pill</v-icon>
                <span class="text-body-2">Nicotine Gum Happened</span>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
    </v-card-text>

    <v-card-actions class="px-6 pb-6">
      <v-btn
        :loading="isRecording"
        :color="buttonColor"
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
import { ref, computed, onMounted, watch } from 'vue'
import { storageService, type Urge } from '@/services/storageService'

const emit = defineEmits(['urgeRecorded'])

const intensity = ref(5)
const isRecording = ref(false)
const showSuccessMessage = ref(false)
const urgeType = ref<'resisted' | 'smoking' | 'gum'>('resisted')

const cardTitle = computed(() => {
  return 'Track a New Urge'
})

// Computed property to get button color based on selected urge type
const buttonColor = computed(() => {
  switch (urgeType.value) {
    case 'resisted':
      return 'success' // Green
    case 'smoking':
      return 'error' // Red
    case 'gum':
      return 'orange' // Orange
    default:
      return 'primary' // Blue (fallback)
  }
})

// Computed property for card background gradient class based on selected urge type
const cardGradientClass = computed(() => {
  switch (urgeType.value) {
    case 'resisted':
      return 'gradient-success' // Green gradient
    case 'smoking':
      return 'gradient-error' // Red gradient
    case 'gum':
      return 'gradient-orange' // Orange gradient
    default:
      return 'gradient-primary' // Blue gradient (fallback)
  }
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

const getAlertType = () => {
  switch (urgeType.value) {
    case 'resisted':
      return 'success'
    case 'smoking':
      return 'error'
    case 'gum':
      return 'warning'
    default:
      return 'info'
  }
}

const getSuccessMessage = () => {
  switch (urgeType.value) {
    case 'resisted':
      return 'Urge resisted successfully! Keep going strong! 💪'
    case 'smoking':
      return 'Recorded. Don\'t be too hard on yourself - tomorrow is a new day! 🌟'
    case 'gum':
      return 'Nicotine gum recorded.🌱 Better than smoking!'
    default:
      return 'Urge recorded successfully 📊'
  }
}

const recordUrge = async () => {
  isRecording.value = true

  try {
    const urgeData: Urge = {
      intensity: intensity.value,
      timestamp: new Date().toISOString(),
      type: urgeType.value
    }

    await storageService.saveUrge(urgeData)
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

// Load and save urge type preference
onMounted(() => {
  const savedUrgeType = storageService.getUrgeTypePreference()
  if (savedUrgeType && (savedUrgeType === 'resisted' || savedUrgeType === 'smoking' || savedUrgeType === 'gum')) {
    urgeType.value = savedUrgeType as 'resisted' | 'smoking' | 'gum'
  }
})

// Watch for urge type changes and save preference
watch(urgeType, (newType) => {
  storageService.saveUrgeTypePreference(newType)
})
</script>

<style scoped>
/* Gradient transitions for card backgrounds based on urge type selection */
.urge-tracker-card {
  position: relative;
  transition: background 0.3s ease-in-out;
}

/* Override Vuetify's card background with gradients */
.urge-tracker-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: background 0.3s ease-in-out;
  z-index: 0;
}

/* Green gradient for "Urge Resisted" */
.gradient-success::before {
  background: linear-gradient(180deg, transparent 0%, rgba(76, 175, 80, 0.2) 100%);
}

/* Red gradient for "Smoking Happened" */
.gradient-error::before {
  background: linear-gradient(180deg, transparent 0%, rgba(244, 67, 54, 0.2) 100%);
}

/* Orange gradient for "Nicotine Gum" */
.gradient-orange::before {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 152, 0, 0.2) 100%);
}

/* Blue gradient for default/fallback */
.gradient-primary::before {
  background: linear-gradient(180deg, transparent 0%, rgba(33, 150, 243, 0.2) 100%);
}

/* Ensure card content stays above the gradient */
.urge-tracker-card > * {
  position: relative;
  z-index: 1;
}
</style>
