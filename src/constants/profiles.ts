import type { IRobotMasterProfile } from "@/interfaces/IRobotMasterProfile";
import { ERobotMasterId } from "@/enums/ERobotMasterId";

export function GetRobotMasterProfiles(): Record<ERobotMasterId, IRobotMasterProfile> {
    const profileMap: Record<ERobotMasterId, IRobotMasterProfile> = {} as Record<ERobotMasterId, IRobotMasterProfile>;
    profiles.forEach(profile => {
        profileMap[profile.id] = profile;
    });
    return profileMap;
};

const profiles: IRobotMasterProfile[] = [
    {
        id: ERobotMasterId.DLN001,
        name: "Mega Man",
    },
    {
        id: ERobotMasterId.DLN003,
        name: "Cut Man",
    },
    {
        id: ERobotMasterId.DLN004,
        name: "Guts Man",
    },
    {
        id: ERobotMasterId.DLN005,
        name: "Ice Man",
    },
    {
        id: ERobotMasterId.DLN006,
        name: "Bomb Man",
    },
    {
        id: ERobotMasterId.DLN007,
        name: "Fire Man",
    },
    {
        id: ERobotMasterId.DLN008,
        name: "Elec Man",
    },
    {
        id: ERobotMasterId.DWN009,
        name: "Metal Man",
    },
    {
        id: ERobotMasterId.DWN010,
        name: "Air Man",
    },
    {
        id: ERobotMasterId.DWN011,
        name: "Bubble Man",
    },
    {
        id: ERobotMasterId.DWN012,
        name: "Quick Man",
    },
    {
        id: ERobotMasterId.DWN013,
        name: "Crash Man",
    },
    {
        id: ERobotMasterId.DWN014,
        name: "Flash Man",
    },
    {
        id: ERobotMasterId.DWN015,
        name: "Heat Man",
    },
    {
        id: ERobotMasterId.DWN016,
        name: "Wood Man",
    },
    {
        id: ERobotMasterId.DWN017,
        name: "Needle Man",
    },
    {
        id: ERobotMasterId.DWN018,
        name: "Magnet Man",
    },
    {
        id: ERobotMasterId.DWN019,
        name: "Gemini Man",
    },
    {
        id: ERobotMasterId.DWN020,
        name: "Hard Man",
    },
    {
        id: ERobotMasterId.DWN021,
        name: "Top Man",
    },
    {
        id: ERobotMasterId.DWN022,
        name: "Snake Man",
    },
    {
        id: ERobotMasterId.DWN023,
        name: "Spark Man",
    },
    {
        id: ERobotMasterId.DWN024,
        name: "Shadow Man",
    },
    {
        id: ERobotMasterId.DWN025,
        name: "Bright Man",
    },
    {
        id: ERobotMasterId.DWN026,
        name: "Toad Man",
    },
    {
        id: ERobotMasterId.DWN027,
        name: "Drill Man",
    },
    {
        id: ERobotMasterId.DWN028,
        name: "Pharaoh Man",
    },
    {
        id: ERobotMasterId.DWN029,
        name: "Ring Man",
    },
    {
        id: ERobotMasterId.DWN030,
        name: "Dust Man",
    },
    {
        id: ERobotMasterId.DWN031,
        name: "Dive Man",
    },
    {
        id: ERobotMasterId.DWN032,
        name: "Skull Man",
    },
    {
        id: ERobotMasterId.DWN033,
        name: "Gravity Man",
    },
    {
        id: ERobotMasterId.DWN034,
        name: "Wave Man",
    },
    {
        id: ERobotMasterId.DWN035,
        name: "Stone Man",
    },
    {
        id: ERobotMasterId.DWN036,
        name: "Gyro Man",
    },
    {
        id: ERobotMasterId.DWN037,
        name: "Star Man",
    },
    {
        id: ERobotMasterId.DWN038,
        name: "Charge Man",
    },
    {
        id: ERobotMasterId.DWN039,
        name: "Napalm Man",
    },
    {
        id: ERobotMasterId.DWN040,
        name: "Crystal Man",
    },
    {
        id: ERobotMasterId.DWN041,
        name: "Blizzard Man",
    },
    {
        id: ERobotMasterId.DWN042,
        name: "Centaur Man",
    },
    {
        id: ERobotMasterId.DWN043,
        name: "Flame Man",
    },
    {
        id: ERobotMasterId.DWN044,
        name: "Knight Man",
    },
    {
        id: ERobotMasterId.DWN045,
        name: "Plant Man",
    },
    {
        id: ERobotMasterId.DWN046,
        name: "Tomahawk Man",
    },
    {
        id: ERobotMasterId.DWN047,
        name: "Wind Man",
    },
    {
        id: ERobotMasterId.DWN048,
        name: "Yamato Man",
    },
];
