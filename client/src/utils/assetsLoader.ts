const sprites: { [game: number]: { url: string, img: HTMLImageElement } } = {};
const titles: { [game: number]: { url: string, img: HTMLImageElement } } = {};

const pathes = [
    "img/sprite/MM1_Sprites.png",
    "img/sprite/MM2_Sprites.png",
    "img/sprite/MM3_Sprites.png",
    "img/sprite/MM4_Sprites.png",
    "img/sprite/MM5_Sprites.png",
    "img/sprite/MM6_Sprites.png",
    "img/title/MM1_Title.png",
    "img/title/MM2_Title.png",
    "img/title/MM3_Title.png",
    "img/title/MM4_Title.png",
    "img/title/MM5_Title.png",
    "img/title/MM6_Title.png",
];

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export async function preloadAssets() {
    await Promise.all(
        pathes.map(async (path) => {
            const assetsPath = `../assets/${path}`;
            const url = new URL(assetsPath, import.meta.url).href;
            const img: HTMLImageElement = await loadImage(url);
            const match = path.match(/\d+/);
            if (match) {
                const gameNumber = parseInt(match[0], 10);
                if (path.includes("sprite")) {
                    sprites[gameNumber] = { url, img };
                } else if (path.includes("title")) {
                    titles[gameNumber] = { url, img };
                }
            }
        })
    );
}

export function getSprite(game: number) {
    return sprites[game];
}

export function getTitle(game: number) {
    return titles[game];
}
