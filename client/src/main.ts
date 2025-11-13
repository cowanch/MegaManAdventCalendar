import { createApp } from "vue";
import App from "./AdventCalendar.vue";
import "./assets/styles/global.css";
import { preloadAssets } from "./utils/assetsLoader";

async function bootstrap() {
    await preloadAssets();
    createApp(App).mount('#app')
}

bootstrap();
