import type { EPasswordEntry } from "@/enums/EPasswordEntry";

interface BaseValue {
    left: number;
    top: number;
    delta: number;
};

const baseValues: { [game: number]: BaseValue } = {
    2: { left: 89, top: 89, delta: 39 }
};

export function getPipMargins(game: number, entry: EPasswordEntry) {
    const base: BaseValue | undefined = baseValues[game];

    if (base) {
        const entryMod = entry % 36;
        const mLeft = base.left + (base.delta * (entryMod % 6));
        const mTop = base.top + (base.delta * Math.floor(entryMod / 6));
        return {
            marginLeft: `${mLeft}px`,
            marginTop: `${mTop}px`,
        };
    }

    return {};
}