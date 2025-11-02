import { ERobotMasterId } from "@/enums/ERobotMasterId";
import type { IGameInfo } from "@/interfaces/IGameInfo";

function getGameAndIndexForRobotId(id: ERobotMasterId): { game: number, index: number } {
    if (id >= ERobotMasterId.DLN003 && id <= ERobotMasterId.DLN008) {
        return { game: 1, index: id - ERobotMasterId.DLN003 };
    } else if (id >= ERobotMasterId.DWN009 && id <= ERobotMasterId.DWN016) {
        return { game: 2, index: id - ERobotMasterId.DWN009 };
    } else if (id >= ERobotMasterId.DWN017 && id <= ERobotMasterId.DWN024) {
        return { game: 3, index: id - ERobotMasterId.DWN017 };
    } else if (id >= ERobotMasterId.DWN025 && id <= ERobotMasterId.DWN032) {
        return { game: 4, index: id - ERobotMasterId.DWN025 };
    } else if (id >= ERobotMasterId.DWN033 && id <= ERobotMasterId.DWN040) {
        return { game: 5, index: id - ERobotMasterId.DWN033 };
    } else if (id >= ERobotMasterId.DWN041 && id <= ERobotMasterId.DWN048) {
        return { game: 6, index: id - ERobotMasterId.DWN041 };
    }
    return { game: 0, index: -1 };
}

function getSpriteHeightForGame(game: number): number {
    switch (game) {
        case 1:
            return 0;
        case 2:
            return 0;
        case 3:
            return 129;
        case 4:
            return 0;
        case 5:
            return 0;
        case 6:
            return 0;
        default:
            return 0;
    };
}

export function getGameInfo(id: ERobotMasterId): IGameInfo {
    const { game, index } = getGameAndIndexForRobotId(id);
    return {
        game,
        spriteHeight: getSpriteHeightForGame(game),
        index
    };
}
