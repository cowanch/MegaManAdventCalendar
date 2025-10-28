import { ERobotMasterId } from "@/enums/ERobotMasterId";

export interface IRobotMasterProfile {
    id: ERobotMasterId;
    name: string;
    animation: number[];
    sprite: {
        width: number;
        height: number;
    },
    game: number;
};
