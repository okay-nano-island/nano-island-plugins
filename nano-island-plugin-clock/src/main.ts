import { defineIslandPlugin, type IslandContext } from '@nano-island/sdk'
import RegularComponent from './regular/Regular.vue'
import ExpandedComponent from './expanded/Expanded.vue'
import CardComponent from './card/Card.vue'
import SettingsComponent from './settings/Settings.vue'
import MainMenuComponent from './menu/MainMenu.vue'

export default defineIslandPlugin((ctx: IslandContext) => {
  ctx.registerRegular({
    component: RegularComponent,
    defaultProps: { format: '24h' },
    styles: ''
  })

  ctx.registerExpanded({
    component: ExpandedComponent,
    defaultProps: { clockType: 'digital', showDate: true, showWeekday: true },
    styles: ''
  })

  ctx.registerCard({
    component: CardComponent,
    defaultProps: { showDate: true },
    styles: ''
  })

  ctx.registerSettings({
    component: SettingsComponent,
    defaultProps: {},
    styles: ''
  })

  ctx.registerMenu('main', {
    component: MainMenuComponent,
    defaultProps: {},
    styles: '',
    label: '时钟',
    icon: '🕐'
  })

  ctx.onMount = () => {
    console.log('时钟插件已注册')
  }

  ctx.onEnable = () => {
    console.log('时钟插件已启用')
  }

  ctx.onDisable = () => {
    console.log('时钟插件已禁用')
  }
})