import type { EPasswordEntry } from "@/enums/EPasswordEntry";

interface BaseValue {
    left: number;
    top: number;
    delta: number;
};

const baseValues: { [game: number]: BaseValue } = {
    2: { left: 89, top: 89, delta: 39 },
    3: { left: 45, top: 45, delta: 44 },
    4: { left: 45, top: 45, delta: 44 },
    5: { left: 79, top: 72, delta: 38 },
    6: { left: 60, top: 63, delta: 43 },
};

export function getPipMargins(game: number, entry: EPasswordEntry) {
    const base: BaseValue | undefined = baseValues[game];

    if (base) {
        const entryMod = entry % 36;
        const mLeft = base.left + (base.delta * (entryMod % 6));
        let mTop = base.top + (base.delta * Math.floor(entryMod / 6));

        // There is a gap in Mega Man 3's password screen between the C and D rows
        if (game === 3 && entryMod > 15) {
            mTop += 21;
        }

        return {
            marginLeft: `${mLeft}px`,
            marginTop: `${mTop}px`,
        };
    }

    return {};
}