const passwordScreens: { [game: number]: string } = {};
const sprites: { [game: number]: string } = {};
const titles: { [game: number]: string } = {};
const images: { [name: string]: string } = {};

const pwModules = import.meta.glob("../assets/img/password/*.png", { eager: true, import: "default" });
const spriteModules = import.meta.glob("../assets/img/sprite/*.png", { eager: true, import: "default" });
const titleModules = import.meta.glob("../assets/img/title/*.png", { eager: true, import: "default" });
const imageModules = import.meta.glob("../assets/img/Explosion.png", { eager: true, import: "default" });

for (const path in pwModules) {
    const match = path.match(/\d+/);
    if (match) {
        const gameNumber = parseInt(match[0], 10);
        passwordScreens[gameNumber] = pwModules[path] as string;
    }
}

for (const path in spriteModules) {
    const match = path.match(/\d+/);
    if (match) {
        const gameNumber = parseInt(match[0], 10);
        sprites[gameNumber] = spriteModules[path] as string;
    }
}

for (const path in titleModules) {
    const match = path.match(/\d+/);
    if (match) {
        const gameNumber = parseInt(match[0], 10);
        titles[gameNumber] = titleModules[path] as string;
    }
}

for (const path in imageModules) {
    const pathParts = path.split("/");
    if (pathParts.length) {
        const name = pathParts[pathParts.length - 1]?.replace(".png", "");
        if (name) {
            images[name] = imageModules[path] as string;
        }
    }
}

export async function preloadAssets() {
    const assets = [
        ...Object.values(passwordScreens),
        ...Object.values(titles),
        ...Object.values(sprites),
        ...Object.values(images),
    ];
    assets.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

export function getPasswordScreen(game: number) {
    return passwordScreens[game];
}

export function getSprite(game: number) {
    return sprites[game];
}

export function getTitle(game: number) {
    return titles[game];
}

export function getImage(name: string) {
    return images[name];
}
