export interface RobotMasterProfile {
    id: RobotMasterId;
    name: string;
};

export enum RobotMasterId {
    DLN000, // ProtoMan - not used in advent calendar
    DLN001,
    DLN002, // Roll - not used in advent calendar
    DLN003,
    DLN004,
    DLN005,
    DLN006,
    DLN007,
    DLN008,
    DWN009,
    DWN010,
    DWN011,
    DWN012,
    DWN013,
    DWN014,
    DWN015,
    DWN016,
    DWN017,
    DWN018,
    DWN019,
    DWN020,
    DWN021,
    DWN022,
    DWN023,
    DWN024,
    DWN025,
    DWN026,
    DWN027,
    DWN028,
    DWN029,
    DWN030,
    DWN031,
    DWN032,
}

const profiles: RobotMasterProfile[] = [
    {
        id: RobotMasterId.DLN001,
        name: "Mega Man",
    },
    {
        id: RobotMasterId.DLN003,
        name: "Cut Man",
    },
    {
        id: RobotMasterId.DLN004,
        name: "Guts Man",
    },
    {
        id: RobotMasterId.DLN005,
        name: "Ice Man",
    },
    {
        id: RobotMasterId.DLN006,
        name: "Bomb Man",
    },
    {
        id: RobotMasterId.DLN007,
        name: "Fire Man",
    },
    {
        id: RobotMasterId.DLN008,
        name: "Elec Man",
    },
    {
        id: RobotMasterId.DWN009,
        name: "Metal Man",
    },
    {
        id: RobotMasterId.DWN010,
        name: "Air Man",
    },
    {
        id: RobotMasterId.DWN011,
        name: "Bubble Man",
    },
    {
        id: RobotMasterId.DWN012,
        name: "Quick Man",
    },
    {
        id: RobotMasterId.DWN013,
        name: "Crash Man",
    },
    {
        id: RobotMasterId.DWN014,
        name: "Flash Man",
    },
    {
        id: RobotMasterId.DWN015,
        name: "Heat Man",
    },
    {
        id: RobotMasterId.DWN016,
        name: "Wood Man",
    },
    {
        id: RobotMasterId.DWN017,
        name: "Needle Man",
    },
    {
        id: RobotMasterId.DWN018,
        name: "Magnet Man",
    },
    {
        id: RobotMasterId.DWN019,
        name: "Gemini Man",
    },
    {
        id: RobotMasterId.DWN020,
        name: "Hard Man",
    },
    {
        id: RobotMasterId.DWN021,
        name: "Top Man",
    },
    {
        id: RobotMasterId.DWN022,
        name: "Snake Man",
    },
    {
        id: RobotMasterId.DWN023,
        name: "Spark Man",
    },
    {
        id: RobotMasterId.DWN024,
        name: "Shadow Man",
    },
    {
        id: RobotMasterId.DWN025,
        name: "Bright Man",
    },
    {
        id: RobotMasterId.DWN026,
        name: "Toad Man",
    },
    {
        id: RobotMasterId.DWN027,
        name: "Drill Man",
    },
    {
        id: RobotMasterId.DWN028,
        name: "Pharaoh Man",
    },
    {
        id: RobotMasterId.DWN029,
        name: "Ring Man",
    },
    {
        id: RobotMasterId.DWN030,
        name: "Dust Man",
    },
    {
        id: RobotMasterId.DWN031,
        name: "Dive Man",
    },
    {
        id: RobotMasterId.DWN032,
        name: "Skull Man",
    },
]

export function getRobotMasterProfiles(): Record<RobotMasterId, RobotMasterProfile> {
    const profileMap: Record<RobotMasterId, RobotMasterProfile> = {} as Record<RobotMasterId, RobotMasterProfile>;
    profiles.forEach(profile => {
        profileMap[profile.id] = profile;
    });
    return profileMap;
};
