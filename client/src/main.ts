import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css'
import { preloadAssets } from './utils/assetsLoader'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

async function bootstrap() {
    await preloadAssets()
    createApp(App).mount('#app')
    window.addEventListener('resize', fit)
    fit()
}

function fit() {
    const el = document.getElementById('app')
    const s = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT)
    if (el) {
        el.style.transform = `translate(-50%, -50%) scale(${s})`
    }
    const tile = Math.max(1, Math.round(64 * s))
    document.documentElement.style.setProperty('--tile', `${tile}px`)
}

bootstrap()
