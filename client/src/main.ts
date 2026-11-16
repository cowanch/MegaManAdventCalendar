import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css'
import { preloadAssets } from './utils/assetsLoader'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

async function bootstrap() {
    await preloadAssets()
    createApp(App).mount('#app')
}

bootstrap()
