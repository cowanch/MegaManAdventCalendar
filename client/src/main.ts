import { createApp } from "vue";
import App from "./AdventCalendar.vue";
import "./assets/styles/global.css";

function loadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function preloadAssets() {
    const imageUrls = [
        new URL("@/assets/img/sprite/MM1_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/sprite/MM2_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/sprite/MM3_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/sprite/MM4_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/sprite/MM5_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/sprite/MM6_Sprites.png", import.meta.url).href,
        new URL("@/assets/img/title/MM1_Title.png", import.meta.url).href,
        new URL("@/assets/img/title/MM2_Title.png", import.meta.url).href,
        new URL("@/assets/img/title/MM3_Title.png", import.meta.url).href,
        new URL("@/assets/img/title/MM4_Title.png", import.meta.url).href,
        new URL("@/assets/img/title/MM5_Title.png", import.meta.url).href,
        new URL("@/assets/img/title/MM6_Title.png", import.meta.url).href,
    ];
    await Promise.all(imageUrls.map(loadImage));
}

async function bootstrap() {
    await preloadAssets();
    createApp(App).mount('#app')
}

bootstrap();
