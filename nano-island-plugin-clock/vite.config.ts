import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

function getPath(relativePath: string) {
  return fileURLToPath(new URL(relativePath, import.meta.url))
}

function copyManifestPlugin() {
  return {
    name: 'copy-manifest-plugin',
    closeBundle() {
      const manifestPath = getPath('manifest.json')
      const distManifestPath = getPath('dist/manifest.json')
      if (existsSync(manifestPath)) {
        copyFileSync(manifestPath, distManifestPath)
        console.log('manifest.json copied to dist/')
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), copyManifestPlugin()],
  resolve: {
    alias: {
      '@': getPath('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.ts',
        regular: 'src/regular/Regular.vue',
        expanded: 'src/expanded/Expanded.vue',
        card: 'src/card/Card.vue',
        settings: 'src/settings/Settings.vue',
        menu: 'src/menu/MainMenu.vue'
      },
      external: ['vue', '@nano-island/sdk', '@nano-island/types'],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})