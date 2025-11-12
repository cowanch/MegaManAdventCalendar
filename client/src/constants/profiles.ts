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
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN003,
        name: "Cut Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN004,
        name: "Guts Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN005,
        name: "Ice Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN006,
        name: "Bomb Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN007,
        name: "Fire Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DLN008,
        name: "Elec Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN009,
        name: "Metal Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN010,
        name: "Air Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN011,
        name: "Bubble Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN012,
        name: "Quick Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN013,
        name: "Crash Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN014,
        name: "Flash Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN015,
        name: "Heat Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN016,
        name: "Wood Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN017,
        name: "Needle Man",
        animation: [0, 1, 0, 2, 3],
        spriteWidth: 126,
    },
    {
        id: ERobotMasterId.DWN018,
        name: "Magnet Man",
        animation: [0, 1, 2, 3],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN019,
        name: "Gemini Man",
        animation: [0, 1, 2, 3, 4, 2],
        spriteWidth: 102,
    },
    {
        id: ERobotMasterId.DWN020,
        name: "Hard Man",
        animation: [0, 1, 2, 1, 2, 0],
        spriteWidth: 132,
    },
    {
        id: ERobotMasterId.DWN021,
        name: "Top Man",
        animation: [0, 1, 2],
        spriteWidth: 93,
    },
    {
        id: ERobotMasterId.DWN022,
        name: "Snake Man",
        animation: [0, 1, 2],
        spriteWidth: 114,
    },
    {
        id: ERobotMasterId.DWN023,
        name: "Spark Man",
        animation: [0, 1, 2, 3, 4, 5, 4, 5, 1],
        spriteWidth: 132,
    },
    {
        id: ERobotMasterId.DWN024,
        name: "Shadow Man",
        animation: [0, 1, 2, 3],
        spriteWidth: 105,
    },
    {
        id: ERobotMasterId.DWN025,
        name: "Bright Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN026,
        name: "Toad Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN027,
        name: "Drill Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN028,
        name: "Pharaoh Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN029,
        name: "Ring Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN030,
        name: "Dust Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN031,
        name: "Dive Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN032,
        name: "Skull Man",
        animation: [],
        spriteWidth: 0,
    },
    {
        id: ERobotMasterId.DWN033,
        name: "Gravity Man",
        animation: [0, 1, 2, 1, 2, 0, 1, 2, 1, 2, 3],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN034,
        name: "Wave Man",
        animation: [0, 1, 2, 2, 1, 3, 4, 5, 1],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN035,
        name: "Stone Man",
        animation: [0, 1, 2, 3, ],
        spriteWidth: 126,
    },
    {
        id: ERobotMasterId.DWN036,
        name: "Gyro Man",
        animation: [0, 1, 2, 3, 2, 1, 3, 2, 3, 2, 3, 2, 3, 2, 0],
        spriteWidth: 87,
    },
    {
        id: ERobotMasterId.DWN037,
        name: "Star Man",
        animation: [0, 1, 2, 3, 4, 5, 6, 7, 5, 3],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN038,
        name: "Charge Man",
        animation: [0, 1, 2, 3, 2, 1, 2, 0, 4, 5, 6, 7, 8, 9, 10, 4],
        spriteWidth: 87,
    },
    {
        id: ERobotMasterId.DWN039,
        name: "Napalm Man",
        animation: [0, 1, 2, 3, 4, 3, 4, 3],
        spriteWidth: 117,
    },
    {
        id: ERobotMasterId.DWN040,
        name: "Crystal Man",
        animation: [0, 1, 2, 3, 4, 3, 4, 3],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN041,
        name: "Blizzard Man",
        animation: [0, 1, 2, 1, 3, 4, 5, 4, 3, 1, 2, 1, 3, 4, 6],
        spriteWidth: 147,
    },
    {
        id: ERobotMasterId.DWN042,
        name: "Centaur Man",
        animation: [0, 1, 0, 2, 0, 1, 3],
        spriteWidth: 120,
    },
    {
        id: ERobotMasterId.DWN043,
        name: "Flame Man",
        animation: [0, 1, 2, 1, 3],
        spriteWidth: 96,
    },
    {
        id: ERobotMasterId.DWN044,
        name: "Knight Man",
        animation: [0, 1, 2, 3, 4, 3],
        spriteWidth: 162,
    },
    {
        id: ERobotMasterId.DWN045,
        name: "Plant Man",
        animation: [0, 1, 2, 1, 3],
        spriteWidth: 108,
    },
    {
        id: ERobotMasterId.DWN046,
        name: "Tomahawk Man",
        animation: [0, 1, 2, 3, 4],
        spriteWidth: 153,
    },
    {
        id: ERobotMasterId.DWN047,
        name: "Wind Man",
        animation: [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 1, 4],
        spriteWidth: 147,
    },
    {
        id: ERobotMasterId.DWN048,
        name: "Yamato Man",
        animation: [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 1],
        spriteWidth: 144,
    },
];
