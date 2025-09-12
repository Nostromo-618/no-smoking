<template>
  <v-card class="h-100" flat>
    <v-card-title class="text-h5 font-weight-medium pa-6">
      <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
      Your Progress Journey
    </v-card-title>

    <v-card-text class="pa-6">
      <div v-if="hasData" class="chart-container" style="height: 400px">
        <Line :data="chartData" :options="chartOptions" />
      </div>

      <v-empty-state
        v-else
        icon="mdi-chart-line-variant"
        title="No data yet"
        text="Start tracking your urges to see your progress over time"
        class="my-8"
      />

      <div v-if="hasData" class="mt-4">
        <v-row>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="info">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ totalUrges }}</div>
                <div class="text-caption">Total Urges</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="success">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ averageIntensity }}</div>
                <div class="text-caption">Average Intensity</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="warning">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ lastUrgeTime }}</div>
                <div class="text-caption">Last Urge</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { useTheme } from 'vuetify'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { storageService, type Urge } from '@/services/storageService'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const theme = useTheme()
const chartData = ref({ labels: [] as string[], datasets: [] as any[] })
const urges = ref<Urge[]>([])

const chartOptions = computed(() => {
  const isDark = theme.global.current.value.dark
  const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : '#333'
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Intensity (1-10)',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        min: 0,
        max: 10,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  }
})

const hasData = computed(() => urges.value.length > 0)
const totalUrges = computed(() => urges.value.length)
const averageIntensity = computed(() => {
  if (urges.value.length === 0) return '0'
  const avg = urges.value.reduce((sum, urge) => sum + urge.intensity, 0) / urges.value.length
  return avg.toFixed(1)
})
const lastUrgeTime = computed(() => {
  if (urges.value.length === 0) return 'Never'
  const lastUrge = urges.value[urges.value.length - 1]
  const date = new Date(lastUrge.timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (diffHours > 0) {
    return `${diffHours}h ago`
  } else if (diffMins > 0) {
    return `${diffMins}m ago`
  } else {
    return 'Just now'
  }
})

const loadChartData = () => {
  urges.value = storageService.getUrges()
  const isDark = theme.global.current.value.dark

  chartData.value = {
    labels: urges.value.map((urge) => {
      const date = new Date(urge.timestamp)
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      )
    }),
    datasets: [
      {
        label: 'Urge Intensity',
        borderColor: isDark ? '#60a5fa' : '#1976D2',
        backgroundColor: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(25, 118, 210, 0.1)',
        data: urges.value.map((urge) => urge.intensity),
        fill: true,
        pointBackgroundColor: isDark ? '#60a5fa' : '#1976D2',
        pointBorderColor: isDark ? '#1e293b' : '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }
}

// Watch for theme changes and reload chart data
watch(
  () => theme.global.current.value.dark,
  () => {
    loadChartData()
  },
)

onMounted(() => {
  loadChartData()
})

defineExpose({ loadChartData })
</script>
