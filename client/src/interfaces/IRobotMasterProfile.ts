import type { EPasswordEntry } from "@/enums/EPasswordEntry";
import { ERobotMasterId } from "@/enums/ERobotMasterId";

export interface IRobotMasterProfile {
    id: ERobotMasterId;
    name: string;
    animation: number[];
    spriteWidth: number;
    xOffset: number;
    password: EPasswordEntry[];
};
