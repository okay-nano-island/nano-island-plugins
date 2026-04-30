<template>
  <div class="card-container">
    <div class="card-header">
      <span class="icon">🕐</span>
      <span class="title">时钟</span>
    </div>
    <div class="card-body">
      <div class="time-display">{{ formattedTime }}</div>
      <div class="date-display">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  showDate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDate: true
})

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const hours = currentTime.value.getHours()
  const minutes = currentTime.value.getMinutes()
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
})

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
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

.card-container {
  @apply h-full p-3;
  @apply bg-white/10 backdrop-blur-md;
  @apply rounded-xl border border-white/20;
  @apply text-white flex flex-col;
}

.card-header {
  @apply flex items-center gap-1.5 mb-2;
  @apply text-xs font-medium opacity-90;
}

.icon {
  @apply text-sm;
}

.card-body {
  @apply flex-1 flex flex-col items-center justify-center;
}

.time-display {
  @apply text-2xl font-semibold tracking-wide;
}

.date-display {
  @apply text-xs opacity-70 mt-1;
}
</style>