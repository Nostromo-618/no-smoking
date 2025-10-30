// ...existing code...
<template>
  <div class="home-responsive" :class="{ 'dark-mode': isDarkMode }">
    <v-container fluid class="pa-0 pt-16">
      <!-- Header Section -->
      <v-row class="mb-8 mt-4 header-row">
        <v-col cols="12" class="text-center">
          <h3 class="text-h3 font-weight-light mb-2">Track, Limit, and Quit</h3>
          <p class="text-subtitle-1 text-medium-emphasis subtitle">
            Monitor your nicotine consumption, better understand your habits and patterns.
          </p>
        </v-col>
      </v-row>

      <!-- Main Content Grid -->
      <v-row class="main-content" align="stretch" justify="center" no-gutters>
        <!-- Urge Tracker Section -->
        <v-col cols="12" md="6" lg="5" class="pa-4">
          <div class="content-wrapper h-100">
            <UrgeTracker @urgeRecorded="handleUrgeRecorded" />
          </div>
        </v-col>

        <!-- Chart Section -->
        <v-col cols="12" md="6" lg="7" class="pa-4">
          <div class="content-wrapper h-100">
            <UrgeChart ref="urgeChart" />
          </div>
        </v-col>
      </v-row>

      <!-- Actions Section -->
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn
            color="white"
            variant="flat"
            size="large"
            prepend-icon="mdi-download"
            @click="downloadData"
            class="action-button mr-2"
          >
            Export Your Data
          </v-btn>
          <v-btn
            color="white"
            variant="flat"
            size="large"
            prepend-icon="mdi-upload"
            @click="triggerFileInput"
            class="action-button ml-2"
          >
            Import Your Data
          </v-btn>
          <input
            ref="fileInput"
            type="file"
            accept=".json"
            style="display: none"
            @change="handleFileSelect"
          />
        </v-col>
      </v-row>

      <!-- Import Dialog -->
      <v-dialog v-model="importDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Import Data Options
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              You are about to import data from: <strong>{{ selectedFileName }}</strong>
            </p>
            <p>Would you like to:</p>
            <v-radio-group v-model="importOption" class="mt-4">
              <v-radio
                label="Replace existing data (This will overwrite all current data)"
                value="replace"
              ></v-radio>
              <v-radio
                label="Merge with existing data (Add imported data to current data)"
                value="merge"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="importDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="flat"
              @click="performImport"
              :loading="isImporting"
            >
              Import
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbar for notifications -->
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :color="snackbarColor"
      >
        {{ snackbarMessage }}
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<style scoped>
.home-responsive {
  min-height: 100vh;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  width: 100%;
  transition: background 0.3s ease;
}

.home-responsive.dark-mode {
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
}

.subtitle {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.main-content {
  width: 100%;
  margin: 0;
  min-height: 500px;
  padding: 0 20px;
}

.content-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0;
  min-height: 420px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
}

.dark-mode .content-wrapper {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Theme-aware card styling */
.content-wrapper :deep(.v-card) {
  background: transparent !important;
  box-shadow: none !important;
  height: 100%;
}

.dark-mode .content-wrapper :deep(.v-card-title),
.dark-mode .content-wrapper :deep(.v-card-text),
.dark-mode .content-wrapper :deep(.text-caption),
.dark-mode .content-wrapper :deep(.text-medium-emphasis) {
  color: rgba(255, 255, 255, 0.9) !important;
}

.dark-mode .content-wrapper :deep(.v-card .text-h4),
.dark-mode .content-wrapper :deep(.v-card .text-h5) {
  color: rgba(255, 255, 255, 0.95) !important;
}

.dark-mode .content-wrapper :deep(.v-empty-state__text) {
  color: rgba(255, 255, 255, 0.7) !important;
}

h1 {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-button {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #764ba2 !important;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 4px;
}

.action-button:hover {
  background: white !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dark-mode .action-button {
  background: #1e40af !important;
  color: white !important;
}

.dark-mode .action-button:hover {
  background: #1d4ed8 !important;
  color: white !important;
}

/* Desktop layout */
@media (min-width: 1200px) {
  .main-content {
    padding: 0 40px;
  }

  .content-wrapper {
    min-height: 500px;
  }
}

/* Tablet layout */
@media (min-width: 768px) and (max-width: 1199px) {
  .content-wrapper {
    min-height: 450px;
  }
}

/* Mobile layout */
@media (max-width: 767px) {
  .main-content {
    padding: 0 16px;
  }

  .content-wrapper {
    min-height: 320px;
    border-radius: 16px;
  }

  .subtitle {
    font-size: 1rem;
  }

  /* Add safe padding for header content on small screens */
  .header-row {
    padding: 0 16px;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import UrgeTracker from '@/components/UrgeTracker.vue'
import UrgeChart from '@/components/UrgeChart.vue'
import { storageService } from '@/services/storageService'

const theme = useTheme()
const isDarkMode = computed(() => theme.global.current.value.dark)

const urgeChart = ref<InstanceType<typeof UrgeChart> | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const importDialog = ref(false)
const importOption = ref<'replace' | 'merge'>('merge')
const selectedFile = ref<File | null>(null)
const selectedFileName = ref('')
const isImporting = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const handleUrgeRecorded = async () => {
  await urgeChart.value?.loadChartData()
}

const downloadData = () => {
  storageService.downloadUrges()
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    if (!file.name.endsWith('.json')) {
      showSnackbar('Please select a valid JSON file', 'error')
      return
    }
    
    selectedFile.value = file
    selectedFileName.value = file.name
    importDialog.value = true
  }
  
  // Reset the input so the same file can be selected again
  target.value = ''
}

const performImport = async () => {
  if (!selectedFile.value) return
  
  isImporting.value = true
  
  try {
    const mergeWithExisting = importOption.value === 'merge'
    await storageService.importUrges(selectedFile.value, mergeWithExisting)
    
    // Refresh the chart with new data
    urgeChart.value?.loadChartData()
    
    importDialog.value = false
    showSnackbar(
      mergeWithExisting
        ? 'Data successfully merged with existing records'
        : 'Data successfully imported (existing data replaced)',
      'success'
    )
    
    selectedFile.value = null
    selectedFileName.value = ''
  } catch (error) {
    showSnackbar(
      `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'error'
    )
  } finally {
    isImporting.value = false
  }
}

const showSnackbar = (message: string, color: 'success' | 'error') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}
</script>
