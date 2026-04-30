<template>
  <div class="settings-container">
    <div class="section">
      <h3>时钟设置</h3>

      <div class="setting-item">
        <label class="setting-label">
          <span>显示格式</span>
        </label>
        <div class="button-group">
          <button
            class="format-btn"
            :class="{ active: timeFormat === '24h' }"
            @click="setTimeFormat('24h')"
          >
            24小时
          </button>
          <button
            class="format-btn"
            :class="{ active: timeFormat === '12h' }"
            @click="setTimeFormat('12h')"
          >
            12小时
          </button>
        </div>
      </div>

      <div class="setting-item">
        <label class="setting-label">
          <span>时钟样式</span>
        </label>
        <div class="button-group">
          <button
            class="format-btn"
            :class="{ active: clockType === 'digital' }"
            @click="setClockType('digital')"
          >
            数字
          </button>
          <button
            class="format-btn"
            :class="{ active: clockType === 'analog' }"
            @click="setClockType('analog')"
          >
            指针
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>关于</h3>
      <div class="about-info">
        <p><strong>插件名称</strong>: 时钟插件</p>
        <p><strong>版本</strong>: 1.0.0</p>
        <p><strong>开发者</strong>: 小莫唐尼</p>
        <p><strong>描述</strong>: 实时显示当前时间，支持数字和指针两种样式</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const timeFormat = ref<'24h' | '12h'>('24h')
const clockType = ref<'digital' | 'analog'>('digital')

const setTimeFormat = async (format: '24h' | '12h') => {
  timeFormat.value = format
  localStorage.setItem('clock-time-format', format)
}

const setClockType = async (type: 'digital' | 'analog') => {
  clockType.value = type
  localStorage.setItem('clock-type', type)
}

onMounted(() => {
  const savedFormat = localStorage.getItem('clock-time-format')
  if (savedFormat === '24h' || savedFormat === '12h') {
    timeFormat.value = savedFormat
  }

  const savedType = localStorage.getItem('clock-type')
  if (savedType === 'digital' || savedType === 'analog') {
    clockType.value = savedType
  }
})
</script>

<style scoped>
@reference "tailwindcss";

.settings-container {
  @apply p-4 bg-gray-50 rounded-lg;
  @apply min-h-60;
}

.section {
  @apply mb-6;
}

.section:last-child {
  @apply mb-0;
}

.section h3 {
  @apply text-sm font-semibold text-gray-800 mb-3 pb-2;
  @apply border-b border-gray-200;
}

.setting-item {
  @apply mb-4;
}

.setting-label {
  @apply flex items-center justify-between text-sm text-gray-700 mb-2;
}

.button-group {
  @apply flex gap-2;
}

.format-btn {
  @apply flex-1 py-2 px-3 text-xs;
  @apply border border-gray-300 bg-white rounded-md;
  @apply cursor-pointer transition-all duration-200;
  @apply text-gray-600;
}

.format-btn:hover {
  @apply bg-gray-100;
}

.format-btn.active {
  @apply bg-blue-500 border-blue-600 text-white;
}

.about-info {
  @apply text-xs text-gray-600 leading-relaxed;
}

.about-info strong {
  @apply text-gray-800;
}
</style>