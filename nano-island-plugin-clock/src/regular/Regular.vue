<template>
  <div class="regular-container" @click="handleClick">
    <span class="time">{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  time?: string
  format?: '24h' | '12h'
}

const props = withDefaults(defineProps<Props>(), {
  time: '',
  format: '24h'
})

const emit = defineEmits<{
  click: []
}>()

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const hours = currentTime.value.getHours()
  const minutes = currentTime.value.getMinutes()
  const displayHours = props.format === '12h' ? hours % 12 || 12 : hours
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
})

function updateTime() {
  currentTime.value = new Date()
}

function handleClick() {
  emit('click')
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

.regular-container {
  @apply flex items-center justify-center h-full;
  @apply text-white font-semibold text-sm;
  @apply cursor-pointer rounded-full px-3;
  @apply hover:bg-white/10 transition-colors duration-200;
}

.time {
  @apply tracking-wide;
}
</style>