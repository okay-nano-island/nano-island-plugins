import type { IslandContext, IslandHostAPI } from '@nano-island/types'

declare global {
  interface Window {
    __ISLAND_HOST__: IslandHostAPI
  }
}

export {}
