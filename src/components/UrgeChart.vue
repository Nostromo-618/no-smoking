<template>
  <v-card class="h-100" flat>
    <v-card-title class="text-h5 font-weight-medium pa-6">
      <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
      Your Progress Journey
    </v-card-title>

    <v-card-text class="pa-6">
      <!-- Date Range Selector -->
      <v-row class="mb-4" align="center">
        <v-col cols="12" md="6">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-calendar-range</v-icon>
            <span class="text-body-1 mr-3">{{ currentDateDisplay }}</span>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="outlined"
                  size="small"
                  prepend-icon="mdi-calendar"
                >
                  {{ dateRangeDisplay }}
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-btn-toggle
                        v-model="dateRangeType"
                        mandatory
                        color="primary"
                        density="compact"
                        class="mb-3"
                      >
                        <v-btn value="all" size="small">All Time</v-btn>
                        <v-btn value="week" size="small">Last Week</v-btn>
                        <v-btn value="month" size="small">Last Month</v-btn>
                        <v-btn value="custom" size="small">Custom</v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                  <v-row v-if="dateRangeType === 'custom'">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="startDate"
                        label="Start Date"
                        type="date"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="endDate"
                        label="End Date"
                        type="date"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-right">
                      <v-btn
                        variant="text"
                        @click="dateMenu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        variant="flat"
                        @click="applyDateFilter"
                      >
                        Apply
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
          <v-chip
            v-if="filteredUrges.length !== urges.length"
            color="info"
            variant="outlined"
            size="small"
          >
            Showing {{ filteredUrges.length }} of {{ urges.length }} data points
          </v-chip>
          <v-chip
            v-else-if="urges.length > 0"
            color="success"
            variant="outlined"
            size="small"
          >
            Showing all {{ urges.length }} data points
          </v-chip>
        </v-col>
      </v-row>
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
        
        <!-- Urge Type Statistics -->
        <v-row class="mt-2">
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="success">
              <v-card-text class="text-center">
                <v-icon color="success" size="large">mdi-check-circle</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ resistedCount }}</div>
                <div class="text-caption">Urges Resisted</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="error">
              <v-card-text class="text-center">
                <v-icon color="error" size="large">mdi-smoking</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ nicotineCount }}</div>
                <div class="text-caption">Nicotine Happened</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="grey">
              <v-card-text class="text-center">
                <v-icon color="grey" size="large">mdi-pencil</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ recordedCount }}</div>
                <div class="text-caption">Just Recorded</div>
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
const filteredUrges = ref<Urge[]>([])

// Date range state
const dateMenu = ref(false)
// Initialize with 'all' but will be overridden from storage in onMounted
const dateRangeType = ref<'all' | 'week' | 'month' | 'custom'>('all')
const startDate = ref('')
const endDate = ref('')

// Maximum data points to display for performance
const MAX_DATA_POINTS = 100

// Current date display
const currentDateDisplay = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

// Date range display text
const dateRangeDisplay = computed(() => {
  switch (dateRangeType.value) {
    case 'all':
      return 'All Time'
    case 'week':
      return 'Last 7 Days'
    case 'month':
      return 'Last 30 Days'
    case 'custom':
      if (startDate.value && endDate.value) {
        const start = new Date(startDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const end = new Date(endDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        return `${start} - ${end}`
      }
      return 'Select Dates'
    default:
      return 'All Time'
  }
})

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

const hasData = computed(() => filteredUrges.value.length > 0)
const totalUrges = computed(() => filteredUrges.value.length)
const averageIntensity = computed(() => {
  if (filteredUrges.value.length === 0) return '0'
  const avg = filteredUrges.value.reduce((sum, urge) => sum + urge.intensity, 0) / filteredUrges.value.length
  return avg.toFixed(1)
})
const resistedCount = computed(() => filteredUrges.value.filter(u => !u.type || u.type === 'resisted').length)
const nicotineCount = computed(() => filteredUrges.value.filter(u => u.type === 'nicotine').length)
const recordedCount = computed(() => filteredUrges.value.filter(u => u.type === 'recorded').length)
const lastUrgeTime = computed(() => {
  // Always use all urges for last urge time, not filtered
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

// Apply date filter to urges
const applyDateFilter = () => {
  let filtered = [...urges.value]
  const now = new Date()
  
  switch (dateRangeType.value) {
    case 'week': {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filtered = urges.value.filter(u => new Date(u.timestamp) >= weekAgo)
      break
    }
    case 'month': {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filtered = urges.value.filter(u => new Date(u.timestamp) >= monthAgo)
      break
    }
    case 'custom': {
      if (startDate.value && endDate.value) {
        const start = new Date(startDate.value)
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate.value)
        end.setHours(23, 59, 59, 999)
        filtered = urges.value.filter(u => {
          const urgeDate = new Date(u.timestamp)
          return urgeDate >= start && urgeDate <= end
        })
      }
      break
    }
    case 'all':
    default:
      filtered = [...urges.value]
      break
  }
  
  // Limit data points for performance
  if (filtered.length > MAX_DATA_POINTS) {
    // Sample the data to keep it under MAX_DATA_POINTS
    const step = Math.ceil(filtered.length / MAX_DATA_POINTS)
    const sampled = []
    for (let i = 0; i < filtered.length; i += step) {
      sampled.push(filtered[i])
    }
    // Always include the last data point
    if (sampled[sampled.length - 1] !== filtered[filtered.length - 1]) {
      sampled.push(filtered[filtered.length - 1])
    }
    filtered = sampled
  }
  
  filteredUrges.value = filtered
  updateChartData()
  dateMenu.value = false
}

// Update chart with filtered data
const updateChartData = () => {
  const isDark = theme.global.current.value.dark
  
  // Function to get point color based on urge type
  const getPointColor = (urgeType: string | undefined) => {
    switch (urgeType) {
      case 'resisted':
        return isDark ? '#4ade80' : '#22c55e' // Green
      case 'nicotine':
        return isDark ? '#f87171' : '#ef4444' // Red
      case 'recorded':
        return isDark ? '#9ca3af' : '#6b7280' // Grey
      default:
        return isDark ? '#4ade80' : '#22c55e' // Default to green for backward compatibility
    }
  }
  
  chartData.value = {
    labels: filteredUrges.value.map((urge) => {
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
        data: filteredUrges.value.map((urge) => urge.intensity),
        fill: true,
        pointBackgroundColor: filteredUrges.value.map((urge) => getPointColor(urge.type)),
        pointBorderColor: isDark ? '#1e293b' : '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }
}

const loadChartData = (skipFilter = false) => {
  urges.value = storageService.getUrges()
  // Initialize filtered urges with all urges
  filteredUrges.value = [...urges.value]
  // Apply current filter unless explicitly skipped
  if (!skipFilter) {
    applyDateFilter()
  }
}

// Watch for theme changes and update chart
watch(
  () => theme.global.current.value.dark,
  () => {
    updateChartData()
  },
)

// Track if component is mounted to avoid saving on initial load
const isMounted = ref(false)

// Initialize date range to current date for custom range
watch(
  () => dateRangeType.value,
  (newType) => {
    if (newType === 'custom' && !startDate.value && !endDate.value) {
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      startDate.value = weekAgo.toISOString().split('T')[0]
      endDate.value = now.toISOString().split('T')[0]
    }
    // Only save preference after component is mounted (user interaction)
    if (isMounted.value) {
      storageService.saveCalendarIntervalPreference(newType)
    }
  },
)

onMounted(() => {
  // First, load the urges data without applying filter
  urges.value = storageService.getUrges()
  
  // Load saved calendar interval preference
  const savedInterval = storageService.getCalendarIntervalPreference()
  
  // Set the date range type from storage (or use default)
  if (savedInterval && ['all', 'week', 'month', 'custom'].includes(savedInterval)) {
    dateRangeType.value = savedInterval as 'all' | 'week' | 'month' | 'custom'
  }
  
  // Now apply the filter with the correct dateRangeType
  applyDateFilter()
  
  // Mark component as mounted after initial load
  isMounted.value = true
})

defineExpose({ loadChartData })
</script>
