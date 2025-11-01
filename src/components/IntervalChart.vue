<template>
  <v-card class="h-100" flat>
    <v-card-title class="text-h5 font-weight-medium pa-6">
      <v-icon class="mr-2" color="primary">mdi-timer-outline</v-icon>
      Interval Progress
    </v-card-title>

    <v-card-text class="pa-6">
      <div class="text-subtitle-2 text-medium-emphasis mb-4 text-center">
        Time between urges - Are you improving?
      </div>

      <!-- Filter Controls -->
      <v-row class="mb-4" align="center">
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedUrgeType"
            :items="urgeTypeOptions"
            label="Filter by type"
            density="compact"
            variant="outlined"
            hide-details
          >
            <template v-slot:prepend-inner>
              <v-icon size="small">mdi-filter-variant</v-icon>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="timeUnit"
            :items="timeUnitOptions"
            label="Display unit"
            density="compact"
            variant="outlined"
            hide-details
          >
            <template v-slot:prepend-inner>
              <v-icon size="small">mdi-clock-outline</v-icon>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <!-- Bar Chart -->
      <div v-if="hasData" class="chart-container" style="height: 350px">
        <Bar :data="chartData" :options="chartOptions" />
      </div>

      <v-empty-state
        v-else
        icon="mdi-chart-bar"
        title="Not enough data"
        text="Record at least 2 urges to see interval progress"
        class="my-8"
      />

      <!-- Statistics Cards -->
      <div v-if="hasData" class="mt-4">
        <v-row>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="info">
              <v-card-text class="text-center">
                <v-icon color="info" size="large">mdi-chart-timeline-variant</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ averageInterval }}</div>
                <div class="text-caption">Average Interval</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" color="success">
              <v-card-text class="text-center">
                <v-icon color="success" size="large">mdi-trophy</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ longestInterval }}</div>
                <div class="text-caption">Longest Interval</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal" :color="trendColor">
              <v-card-text class="text-center">
                <v-icon :color="trendColor" size="large">{{ trendIcon }}</v-icon>
                <div class="text-h5 font-weight-bold mt-2">{{ trendText }}</div>
                <div class="text-caption">Trend</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { useTheme } from 'vuetify'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { storageService, type Urge } from '@/services/storageService'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const theme = useTheme()
const urges = ref<Urge[]>([])
const selectedUrgeType = ref('all')
const timeUnit = ref('minutes')

interface Interval {
  timestamp: string
  hours: number
  type: string
  previousType: string
}

const urgeTypeOptions = [
  { title: 'All Types', value: 'all' },
  { title: 'Urge Resisted', value: 'resisted' },
  { title: 'Smoking Happened', value: 'smoking' },
  { title: 'Nicotine Gum', value: 'gum' },
]

const timeUnitOptions = [
  { title: 'Minutes', value: 'minutes' },
  { title: 'Hours', value: 'hours' },
  { title: 'Days', value: 'days' },
]

// Calculate intervals between consecutive urges
const intervals = computed<Interval[]>(() => {
  if (urges.value.length < 2) return []
  
  const allIntervals: Interval[] = []
  
  for (let i = 1; i < urges.value.length; i++) {
    const currentUrge = urges.value[i]
    const previousUrge = urges.value[i - 1]
    
    const timeDiff = (new Date(currentUrge.timestamp).getTime() - 
                      new Date(previousUrge.timestamp).getTime()) / 
                      (1000 * 60 * 60) // Convert to hours
    
    allIntervals.push({
      timestamp: currentUrge.timestamp,
      hours: timeDiff,
      type: currentUrge.type || 'resisted',
      previousType: previousUrge.type || 'resisted',
    })
  }
  
  // Filter by selected urge type
  if (selectedUrgeType.value === 'all') {
    return allIntervals
  }
  
  return allIntervals.filter(interval => interval.type === selectedUrgeType.value)
})

const hasData = computed(() => intervals.value.length > 0)

// Convert hours to selected time unit
const convertToTimeUnit = (hours: number): number => {
  if (timeUnit.value === 'minutes') {
    return hours * 60
  } else if (timeUnit.value === 'days') {
    return hours / 24
  }
  return hours
}

// Format time display
const formatTime = (hours: number): string => {
  const value = convertToTimeUnit(hours)
  let unit = 'h'
  
  if (timeUnit.value === 'minutes') {
    unit = 'm'
  } else if (timeUnit.value === 'days') {
    unit = 'd'
  }
  
  // For very small values, show with more precision
  if (value < 1) {
    return `${value.toFixed(2)}${unit}`
  } else if (value < 10) {
    return `${value.toFixed(1)}${unit}`
  }
  return `${Math.round(value)}${unit}`
}

// Get bar color based on interval length and type
const getBarColor = (hours: number, urgeType: string): string => {
  const isDark = theme.global.current.value.dark
  
  // Color based on urge type
  switch (urgeType) {
    case 'resisted':
      return isDark ? 'rgba(76, 175, 80, 0.8)' : 'rgba(34, 197, 94, 0.8)' // Green
    case 'smoking':
      return isDark ? 'rgba(244, 67, 54, 0.8)' : 'rgba(239, 68, 68, 0.8)' // Red
    case 'gum':
      return isDark ? 'rgba(255, 152, 0, 0.8)' : 'rgba(249, 115, 22, 0.8)' // Orange
    default:
      return isDark ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.8)' // Blue
  }
}

// Chart data
const chartData = computed(() => {
  const isDark = theme.global.current.value.dark
  
  return {
    labels: intervals.value.map((interval, index) => {
      const date = new Date(interval.timestamp)
      return `#${index + 1} - ${date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`
    }),
    datasets: [
      {
        label: `Time Between Urges (${timeUnit.value})`,
        data: intervals.value.map(interval => convertToTimeUnit(interval.hours)),
        backgroundColor: intervals.value.map(interval => getBarColor(interval.hours, interval.type)),
        borderColor: intervals.value.map(interval => getBarColor(interval.hours, interval.type).replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  }
})

// Chart options
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
        callbacks: {
          label: (context: any) => {
            const interval = intervals.value[context.dataIndex]
            const hours = interval.hours
            return `${formatTime(hours)} since previous urge`
          },
          afterLabel: (context: any) => {
            const interval = intervals.value[context.dataIndex]
            return `Type: ${interval.type.charAt(0).toUpperCase() + interval.type.slice(1)}`
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Urge Events',
          color: textColor,
        },
        ticks: {
          color: textColor,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: `Interval (${timeUnit.value})`,
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        beginAtZero: true,
      },
    },
  }
})

// Statistics
const averageInterval = computed(() => {
  if (intervals.value.length === 0) return '0h'
  const avg = intervals.value.reduce((sum, i) => sum + i.hours, 0) / intervals.value.length
  return formatTime(avg)
})

const longestInterval = computed(() => {
  if (intervals.value.length === 0) return '0h'
  const max = Math.max(...intervals.value.map(i => i.hours))
  return formatTime(max)
})

// Trend analysis (comparing last 3 intervals to previous 3)
const trendData = computed(() => {
  if (intervals.value.length < 4) {
    return { direction: 'neutral', percentage: 0 }
  }
  
  const recentCount = Math.min(3, Math.floor(intervals.value.length / 2))
  const recent = intervals.value.slice(-recentCount)
  const previous = intervals.value.slice(-recentCount * 2, -recentCount)
  
  const recentAvg = recent.reduce((sum, i) => sum + i.hours, 0) / recent.length
  const previousAvg = previous.reduce((sum, i) => sum + i.hours, 0) / previous.length
  
  const percentChange = ((recentAvg - previousAvg) / previousAvg) * 100
  
  if (percentChange > 10) return { direction: 'improving', percentage: percentChange }
  if (percentChange < -10) return { direction: 'declining', percentage: Math.abs(percentChange) }
  return { direction: 'stable', percentage: Math.abs(percentChange) }
})

const trendIcon = computed(() => {
  switch (trendData.value.direction) {
    case 'improving': return 'mdi-trending-up'
    case 'declining': return 'mdi-trending-down'
    default: return 'mdi-trending-neutral'
  }
})

const trendColor = computed(() => {
  switch (trendData.value.direction) {
    case 'improving': return 'success'
    case 'declining': return 'error'
    default: return 'warning'
  }
})

const trendText = computed(() => {
  const { direction, percentage } = trendData.value
  
  if (direction === 'improving') {
    return `+${percentage.toFixed(0)}%`
  } else if (direction === 'declining') {
    return `-${percentage.toFixed(0)}%`
  } else {
    return 'Stable'
  }
})

// Load data
const loadChartData = async () => {
  urges.value = await storageService.getUrges()
}

// Watch theme changes
watch(
  () => theme.global.current.value.dark,
  () => {
    // Force chart update by recreating data
    if (hasData.value) {
      loadChartData()
    }
  }
)

onMounted(async () => {
  await loadChartData()
})

defineExpose({ loadChartData })
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
}
</style>
