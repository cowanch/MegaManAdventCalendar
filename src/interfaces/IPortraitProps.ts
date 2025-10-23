import type { ELookState } from "@/enums/ELookState";
import type { IRobotMasterProfile } from "./IRobotMasterProfile";

export interface IPortraitProps {
    profile?: IRobotMasterProfile;
    isHovered?: boolean;
    lookState?: ELookState;
    dayNumber?: number;
};
