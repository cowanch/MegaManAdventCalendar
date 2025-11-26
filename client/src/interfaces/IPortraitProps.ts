import type { IRobotMasterProfile } from "./IRobotMasterProfile";
import type { ELookState } from "@/enums/ELookState";

export interface IPortraitProps {
    dayNumber?: number;
    profile?: IRobotMasterProfile;
    isHovered?: boolean;
    lookState?: ELookState;
    revealed?: boolean;
    defeated?: boolean;
};
