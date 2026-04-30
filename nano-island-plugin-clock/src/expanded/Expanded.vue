<template>
  <div class="expanded-container">
    <div class="clock-area">
      <div class="analog-clock" v-if="clockType === 'analog'">
        <div class="clock-face">
          <div class="hour-marks">
            <div v-for="i in 12" :key="i" class="hour-mark" :style="{ transform: `rotate(${i * 30}deg)` }">
              <div class="mark-line"></div>
            </div>
          </div>
          <div class="clock-hands">
            <div class="hour-hand" :style="{ transform: `rotate(${hourDegrees}deg)` }"></div>
            <div class="minute-hand" :style="{ transform: `rotate(${minuteDegrees}deg)` }"></div>
            <div class="second-hand" :style="{ transform: `rotate(${secondDegrees}deg)` }"></div>
            <div class="center-dot"></div>
          </div>
        </div>
      </div>

      <div class="digital-clock" v-else>
        <div class="time-display">{{ formattedTime }}</div>
        <div class="date-display">{{ formattedDate }}</div>
      </div>
    </div>

    <div class="info-bar">
      <span class="weekday">{{ currentWeekday }}</span>
      <span class="timezone">{{ timezoneName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  clockType?: 'analog' | 'digital'
  showDate?: boolean
  showWeekday?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clockType: 'digital',
  showDate: true,
  showWeekday: true
})

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const hours = currentTime.value.getHours()
  const minutes = currentTime.value.getMinutes()
  const seconds = currentTime.value.getSeconds()
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const currentWeekday = computed(() => {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekdays[currentTime.value.getDay()]
})

const timezoneName = computed(() => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
})

const hourDegrees = computed(() => {
  const hours = currentTime.value.getHours() % 12
  const minutes = currentTime.value.getMinutes()
  return (hours * 30) + (minutes * 0.5)
})

const minuteDegrees = computed(() => {
  const minutes = currentTime.value.getMinutes()
  const seconds = currentTime.value.getSeconds()
  return (minutes * 6) + (seconds * 0.1)
})

const secondDegrees = computed(() => {
  const seconds = currentTime.value.getSeconds()
  return seconds * 6
})

function updateTime() {
  currentTime.value = new Date()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
@reference "tailwindcss";

.expanded-container {
  @apply h-full flex flex-col items-center justify-center p-5;
  @apply bg-gradient-to-br from-slate-900 to-slate-800;
  @apply text-white rounded-xl;
}

.clock-area {
  @apply flex-1 flex items-center justify-center w-full;
}

.analog-clock {
  @apply w-48 h-48;
}

.clock-face {
  @apply w-full h-full rounded-full;
  @apply bg-gradient-to-br from-slate-700 to-slate-900;
  @apply border-4 border-white/20;
  @apply relative shadow-xl;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.2);
}

.hour-marks {
  @apply absolute w-full h-full;
}

.hour-mark {
  @apply absolute w-full h-full flex justify-center;
}

.mark-line {
  @apply w-0.5 h-2.5 bg-white/40 mt-2;
}

.clock-hands {
  @apply absolute w-full h-full;
}

.hour-hand {
  @apply absolute w-1 h-12 bg-white rounded-sm;
  left: calc(50% - 2px);
  top: calc(50% - 48px);
  transform-origin: 2px 48px;
  @apply shadow-md;
}

.minute-hand {
  @apply absolute w-0.5 h-16 bg-white/80 rounded-sm;
  left: calc(50% - 1px);
  top: calc(50% - 64px);
  transform-origin: 1px 64px;
}

.second-hand {
  @apply absolute w-0.5 h-20 bg-red-500 rounded-sm;
  left: calc(50% - 0.5px);
  top: calc(50% - 80px);
  transform-origin: 0.5px 80px;
}

.center-dot {
  @apply absolute w-2.5 h-2.5 bg-white rounded-full;
  left: calc(50% - 5px);
  top: calc(50% - 5px);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.digital-clock {
  @apply text-center;
}

.time-display {
  @apply text-5xl font-light tracking-widest;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.date-display {
  @apply text-sm opacity-70 mt-2;
}

.info-bar {
  @apply flex justify-between w-full px-4 py-3;
  @apply bg-white/5 rounded-lg text-xs opacity-80;
}
</style>