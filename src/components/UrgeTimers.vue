<template>
  <div v-if="hasAnyUrges" class="urge-timers">
    <!-- Timer for last Urge Resisted -->
    <div v-if="lastResisted" class="timer-item timer-success">
      <v-icon size="small" color="success" class="mr-2">mdi-check-circle</v-icon>
      <span class="timer-label">Since resisting:</span>
      <span class="timer-value">{{ resistedTimer }}</span>
    </div>

    <!-- Timer for last Smoking Happened -->
    <div v-if="lastSmoking" class="timer-item timer-error">
      <v-icon size="small" color="error" class="mr-2">mdi-smoking</v-icon>
      <span class="timer-label">Since smoking:</span>
      <span class="timer-value">{{ smokingTimer }}</span>
    </div>

    <!-- Timer for last Nicotine Gum -->
    <div v-if="lastGum" class="timer-item timer-orange">
      <v-icon size="small" color="orange" class="mr-2">mdi-pill</v-icon>
      <span class="timer-label">Since gum:</span>
      <span class="timer-value">{{ gumTimer }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { storageService, type Urge } from '@/services/storageService'

const lastResisted = ref<Date | null>(null)
const lastSmoking = ref<Date | null>(null)
const lastGum = ref<Date | null>(null)

// Current time (updates every second)
const currentTime = ref(new Date())
let intervalId: number | null = null

// Computed property to check if we have any urges
const hasAnyUrges = computed(() => {
  return lastResisted.value || lastSmoking.value || lastGum.value
})

// Format time difference as HH:MM:SS
const formatTimeDifference = (startDate: Date): string => {
  const now = currentTime.value
  const diffMs = now.getTime() - startDate.getTime()
  
  // Calculate hours, minutes, seconds
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  // Format as HH:MM:SS
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Computed timers for each type
const resistedTimer = computed(() => {
  return lastResisted.value ? formatTimeDifference(lastResisted.value) : '00:00:00'
})

const smokingTimer = computed(() => {
  return lastSmoking.value ? formatTimeDifference(lastSmoking.value) : '00:00:00'
})

const gumTimer = computed(() => {
  return lastGum.value ? formatTimeDifference(lastGum.value) : '00:00:00'
})

// Load the last timestamp for each urge type
const loadLastUrges = async () => {
  const urges = await storageService.getUrges()
  
  if (urges.length === 0) {
    return
  }
  
  // Find the most recent urge of each type
  // Iterate from the end (most recent) to the beginning
  for (let i = urges.length - 1; i >= 0; i--) {
    const urge = urges[i]
    const urgeType = urge.type || 'resisted' // Default to 'resisted' for backward compatibility
    
    if (urgeType === 'resisted' && !lastResisted.value) {
      lastResisted.value = new Date(urge.timestamp)
    } else if (urgeType === 'smoking' && !lastSmoking.value) {
      lastSmoking.value = new Date(urge.timestamp)
    } else if (urgeType === 'gum' && !lastGum.value) {
      lastGum.value = new Date(urge.timestamp)
    }
    
    // Break if we found all three types
    if (lastResisted.value && lastSmoking.value && lastGum.value) {
      break
    }
  }
}

// Update current time every second
const startTimer = () => {
  intervalId = window.setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
}

const stopTimer = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Expose method to reload data (called when new urge is recorded)
const refresh = async () => {
  // Reset values
  lastResisted.value = null
  lastSmoking.value = null
  lastGum.value = null
  
  // Reload
  await loadLastUrges()
}

onMounted(async () => {
  await loadLastUrges()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})

// Expose the refresh method so parent can call it
defineExpose({ refresh })
</script>

<style scoped>
.urge-timers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.timer-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.timer-label {
  margin-right: 8px;
  opacity: 0.9;
  font-weight: 500;
}

.timer-value {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  margin-left: auto;
}

/* Color-specific styles */
.timer-success {
  background: rgba(76, 175, 80, 0.15);
  border-left: 4px solid rgb(76, 175, 80);
}

.timer-error {
  background: rgba(244, 67, 54, 0.15);
  border-left: 4px solid rgb(244, 67, 54);
}

.timer-orange {
  background: rgba(255, 152, 0, 0.15);
  border-left: 4px solid rgb(255, 152, 0);
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .urge-timers {
    gap: 10px;
    padding: 8px 16px;
  }
  
  .timer-item {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
  
  .timer-value {
    font-size: 1rem;
  }
}
</style>
