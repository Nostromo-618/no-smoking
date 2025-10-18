<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { storageService } from '@/services/storageService'
import DisclaimerModal from '@/components/DisclaimerModal.vue'

const theme = useTheme()
const currentThemePreference = ref<'light' | 'dark' | 'system'>('system')
const showDisclaimer = ref(false)
const disclaimerDeclined = ref(false)

// Function to get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Function to apply theme based on preference
const applyTheme = (preference: 'light' | 'dark' | 'system') => {
  let actualTheme: 'light' | 'dark'
  
  if (preference === 'system') {
    actualTheme = getSystemTheme()
  } else {
    actualTheme = preference
  }
  
  theme.global.name.value = actualTheme
}

// Listen for system theme changes
let mediaQuery: MediaQueryList | null = null

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  // Only apply system theme if user preference is 'system'
  if (currentThemePreference.value === 'system') {
    const systemTheme = e.matches ? 'dark' : 'light'
    theme.global.name.value = systemTheme
  }
}

// Computed property for theme icon and tooltip
const themeIcon = computed(() => {
  switch (currentThemePreference.value) {
    case 'light':
      return 'mdi-weather-sunny'
    case 'dark':
      return 'mdi-weather-night'
    case 'system':
      return 'mdi-theme-light-dark'
    default:
      return 'mdi-theme-light-dark'
  }
})

const themeTooltip = computed(() => {
  switch (currentThemePreference.value) {
    case 'light':
      return 'Current: Light theme - Click for Dark'
    case 'dark':
      return 'Current: Dark theme - Click for System'
    case 'system':
      return `Current: System theme (${getSystemTheme()}) - Click for Light`
    default:
      return 'Switch theme'
  }
})

// Load saved theme preference on app initialization
onMounted(() => {
  // Check disclaimer acceptance first
  const disclaimerAccepted = storageService.getDisclaimerAccepted()
  if (!disclaimerAccepted) {
    showDisclaimer.value = true
  }
  
  const savedTheme = storageService.getThemePreference()
  if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
    currentThemePreference.value = savedTheme as 'light' | 'dark' | 'system'
  } else {
    // Default to system theme if no preference is saved
    currentThemePreference.value = 'system'
    // Save the default preference
    storageService.saveThemePreference('system')
  }
  
  // Apply the theme
  applyTheme(currentThemePreference.value)
  
  // Set up system theme change listener
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
})

onUnmounted(() => {
  // Clean up the event listener
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})

function toggleTheme() {
  // Cycle through: light -> dark -> system -> light...
  let newTheme: 'light' | 'dark' | 'system'
  
  switch (currentThemePreference.value) {
    case 'light':
      newTheme = 'dark'
      break
    case 'dark':
      newTheme = 'system'
      break
    case 'system':
    default:
      newTheme = 'light'
      break
  }
  
  currentThemePreference.value = newTheme
  applyTheme(newTheme)
  
  // Save theme preference to localStorage
  storageService.saveThemePreference(newTheme)
}

function handleDisclaimerAgree() {
  storageService.saveDisclaimerAccepted(true)
  showDisclaimer.value = false
}

function handleDisclaimerDecline() {
  showDisclaimer.value = false
  disclaimerDeclined.value = true
}
</script>

<template>
  <v-app>
    <!-- Disclaimer Modal -->
    <DisclaimerModal 
      v-if="showDisclaimer"
      @agree="handleDisclaimerAgree"
      @decline="handleDisclaimerDecline"
    />
    
    <!-- Main App Content with conditional blur -->
    <div :class="{ 'app-blurred': showDisclaimer }">
      <v-app-bar app elevation="0" color="transparent" absolute>
        <v-toolbar-title style="color: white">Track your urges and stop smoking</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip :text="themeTooltip" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn 
              @click="toggleTheme" 
              icon 
              variant="text" 
              v-bind="props"
              :class="{ 'theme-system': currentThemePreference === 'system' }"
            >
              <v-icon style="color: white">{{ themeIcon }}</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-app-bar>
      <v-main class="pa-0">
        <!-- Show Farewell View if disclaimer was declined -->
        <div v-if="disclaimerDeclined" class="farewell-container">
          <v-container class="fill-height">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="10" md="8" lg="6">
                <v-card class="farewell-card pa-6 text-center" elevation="8">
                  <v-icon icon="mdi-hand-wave" size="80" color="primary" class="mb-4"></v-icon>
                  
                  <h1 class="text-h4 font-weight-bold mb-4">
                    Thank You for Visiting
                  </h1>
                  
                  <div class="text-body-1 mb-6">
                    <p class="mb-4">
                      We're sorry to see you go. However, we understand your decision.
                    </p>
                    
                    <p class="mb-4">
                      <strong>Please note:</strong> Accepting the disclaimer is mandatory to use this app. 
                      The disclaimer ensures that you understand the nature and limitations of the app.
                    </p>
                    
                    <p class="mb-0">
                      If you change your mind, please refresh the page to see the disclaimer again.
                    </p>
                  </div>
                  
                  <v-divider class="my-4"></v-divider>
                  
                  <p class="text-body-2 text-grey">
                    We wish you the best on your journey to better health. 
                    If you need professional support, please consult with a healthcare provider.
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
        
        <!-- Normal Router View -->
        <RouterView v-else />
      </v-main>
    </div>
  </v-app>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.v-application {
  background: transparent !important;
}

.v-main {
  padding: 0 !important;
}

.v-main__wrap {
  width: 100%;
}

/* System theme button styling */
.theme-system {
  position: relative;
}

.theme-system::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
}

.theme-system:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Blur effect when disclaimer is shown */
.app-blurred {
  filter: blur(10px);
  pointer-events: none;
  user-select: none;
}

/* Farewell page styles */
.farewell-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.farewell-card {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.fill-height {
  min-height: 100vh;
}
</style>
