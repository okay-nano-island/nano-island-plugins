<template>
  <div class="menu-container">
    <div class="menu-item" @click="handleSettings">
      <span class="menu-icon">⚙️</span>
      <span class="menu-text">设置</span>
    </div>
    <div class="menu-item" @click="handleShowExpanded">
      <span class="menu-icon">🔍</span>
      <span class="menu-text">放大时钟</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'settings'): void
  (e: 'showExpanded'): void
}>()

const handleSettings = () => {
  emit('settings')
}

const handleShowExpanded = () => {
  emit('showExpanded')
}
</script>

<style scoped>
@reference "tailwindcss";

.menu-container {
  @apply p-2 rounded-lg min-w-40;
  @apply bg-white shadow-lg;
}

.menu-item {
  @apply flex items-center gap-2.5 px-3 py-2.5;
  @apply text-sm text-gray-700 rounded-md cursor-pointer;
  @apply transition-colors duration-150;
}

.menu-item:hover {
  @apply bg-gray-100;
}

.menu-icon {
  @apply text-base;
}

.menu-text {
  @apply flex-1 text-left;
}
</style>