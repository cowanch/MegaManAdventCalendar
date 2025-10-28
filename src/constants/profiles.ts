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
        sprite: {
            width: 0,
            height: 0
        },
        game: 0,
    },
    {
        id: ERobotMasterId.DLN003,
        name: "Cut Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DLN004,
        name: "Guts Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DLN005,
        name: "Ice Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DLN006,
        name: "Bomb Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DLN007,
        name: "Fire Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DLN008,
        name: "Elec Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 1,
    },
    {
        id: ERobotMasterId.DWN009,
        name: "Metal Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN010,
        name: "Air Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN011,
        name: "Bubble Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN012,
        name: "Quick Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN013,
        name: "Crash Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN014,
        name: "Flash Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN015,
        name: "Heat Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN016,
        name: "Wood Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 2,
    },
    {
        id: ERobotMasterId.DWN017,
        name: "Needle Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN018,
        name: "Magnet Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN019,
        name: "Gemini Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN020,
        name: "Hard Man",
        animation: [0, 1, 2, 1, 2, 0],
        sprite: {
            width: 132,
            height: 138
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN021,
        name: "Top Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN022,
        name: "Snake Man",
        animation: [0, 1, 2],
        sprite: {
            width: 114,
            height: 90
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN023,
        name: "Spark Man",
        animation: [0, 1, 2, 3, 4, 5, 4, 5, 1],
        sprite: {
            width: 132,
            height: 129
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN024,
        name: "Shadow Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 3,
    },
    {
        id: ERobotMasterId.DWN025,
        name: "Bright Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN026,
        name: "Toad Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN027,
        name: "Drill Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN028,
        name: "Pharaoh Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN029,
        name: "Ring Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN030,
        name: "Dust Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN031,
        name: "Dive Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN032,
        name: "Skull Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 4,
    },
    {
        id: ERobotMasterId.DWN033,
        name: "Gravity Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN034,
        name: "Wave Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN035,
        name: "Stone Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN036,
        name: "Gyro Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN037,
        name: "Star Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN038,
        name: "Charge Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN039,
        name: "Napalm Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN040,
        name: "Crystal Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 5,
    },
    {
        id: ERobotMasterId.DWN041,
        name: "Blizzard Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN042,
        name: "Centaur Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN043,
        name: "Flame Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN044,
        name: "Knight Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN045,
        name: "Plant Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN046,
        name: "Tomahawk Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN047,
        name: "Wind Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
    {
        id: ERobotMasterId.DWN048,
        name: "Yamato Man",
        animation: [],
        sprite: {
            width: 0,
            height: 0
        },
        game: 6,
    },
];
