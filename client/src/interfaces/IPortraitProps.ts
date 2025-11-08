import type { ELookState } from "@/enums/ELookState";
import type { IRobotMasterProfile } from "./IRobotMasterProfile";

export interface IPortraitProps {
    dayNumber?: number;
    profile?: IRobotMasterProfile;
    isHovered?: boolean;
    lookState?: ELookState;
    revealed?: boolean;
    defeated?: boolean;
};
