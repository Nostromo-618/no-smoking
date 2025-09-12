<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { onMounted } from 'vue'
import { storageService } from '@/services/storageService'

const theme = useTheme()

// Load saved theme preference on app initialization
onMounted(() => {
  const savedTheme = storageService.getThemePreference()
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
})

function toggleTheme() {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  // Save theme preference to localStorage
  storageService.saveThemePreference(newTheme)
}
</script>

<template>
  <v-app>
    <v-app-bar app elevation="0" color="transparent" absolute>
      <v-toolbar-title style="color: white">I Don't Smoke</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" icon variant="text">
        <v-icon style="color: white">{{
          theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
        }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="pa-0">
      <RouterView />
    </v-main>
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
</style>
