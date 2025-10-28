<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import Portrait from "./components/Portrait.vue";
    import { GetRobotMasterProfiles } from "./constants/profiles";
    import { ERobotMasterId } from "./enums/ERobotMasterId";
    import { ELookState } from "./enums/ELookState";
    import type { IRobotMasterProfile } from "./interfaces/IRobotMasterProfile";
    import type { IPortraitProps } from "./interfaces/IPortraitProps";
    import Sprite from "./components/Sprite.vue";

    const RobotMasterProfiles: Record<ERobotMasterId, IRobotMasterProfile> = GetRobotMasterProfiles();
    const DLN001_INDEX = 12;

    const lookState = computed(() => {
        const key = highlightKey.value;
        if (key === null || key === DLN001_INDEX) {
            return ELookState.Neutral;
        } else if ([10, 11].includes(key)) {
            return ELookState.Left;
        } else if ([13, 14].includes(key)) {
            return ELookState.Right;
        } else if ([2, 7].includes(key)) {
            return ELookState.Up;
        } else if ([17, 22].includes(key)) {
            return ELookState.Down;
        } else if ([0, 1, 5, 6].includes(key)) {
            return ELookState.UpLeft;
        } else if ([3, 4, 8, 9].includes(key)) {
            return ELookState.UpRight;
        } else if ([15, 16, 20, 21].includes(key)) {
            return ELookState.DownLeft;
        } else if ([18, 19, 23, 24].includes(key)) {
            return ELookState.DownRight;
        } else {
            return ELookState.Neutral;
        }
    });

    const selectedProfile = computed<IRobotMasterProfile | undefined>(() => {
        if (selectedIndex.value === null) {
            return undefined;
        }
        // return portraitProps[selectedIndex.value]?.profile;
        return RobotMasterProfiles[ERobotMasterId.DWN023];
    });

    const highlightKey = ref<number | null>(null);
    const showCalendar = ref<boolean>(false);
    const showPortraits = ref<boolean>(false);
    const selectedIndex = ref<number | null>(null);

    // Create an array of 25 profiles for demonstration purposes
    const portraitProps: IPortraitProps[] = Array.from({ length: 25 });

    onMounted(() => {
        // Delay showing the calendar to allow for any initial animations
        showCalendar.value = true;
        setTimeout(() => {
            initProfiles();
        }, 2200);
    });

    function initProfiles() {
        const megaManProfile: IRobotMasterProfile | undefined = RobotMasterProfiles[ERobotMasterId.DLN001];
        if (megaManProfile) {
            portraitProps[DLN001_INDEX] = {
                profile: megaManProfile,
            };
        }
        for (let i = 0; i < portraitProps.length; i++) {
            if (i === DLN001_INDEX) {
                continue;
            }
            const dayNumber = i < DLN001_INDEX ? i + 1 : i;
            portraitProps[i] = {
                dayNumber,
            };
        }
        highlightKey.value = DLN001_INDEX;
        showPortraits.value = true;
    }

    function getRow(row: number): { [index: number] : IPortraitProps | undefined} {
        if (row < 1 || row > 5) {
            throw new Error("Row must be 1 or 5");
        }
        const rowObj: { [index: number] : IPortraitProps  | undefined} = {};
        for (let i = 0; i < 5; i++) {
            const index = (row - 1) * 5 + i;
            rowObj[index] = showPortraits.value ? portraitProps[index] : undefined;
        }
        return rowObj;
    }

    function onPortraitHover(index: number) {
        if (!showPortraits.value) {
            return;
        }
        highlightKey.value = parseInt(`${index}`);  // Parsing the index to ensure it's a number
    }

    function onPortraitClick(index: number) {
        if (index == DLN001_INDEX || index === selectedIndex.value) {
            return;
        }
        selectedIndex.value = index;
        showPortraits.value = false;
        highlightKey.value = -1;
        requestAnimationFrame(() => {
            showCalendar.value = false;
        });
    }
</script>

<template>
    <Transition v-for="row in 5" :name="row % 2 === 0 ? 'even' : 'odd'" :key="row">
        <div class="container" v-if="showCalendar">
            <Portrait 
                v-for="(props, index) in getRow(row)"
                :key="index"
                class="portrait"
                v-bind="props"
                :is-hovered="index == highlightKey"
                :look-state="index == DLN001_INDEX ? lookState : undefined"
                @hover="onPortraitHover(index)"
                @click="onPortraitClick(index)"
            />
        </div>
    </Transition>
    <Transition name="enter-stage">
        <div class="enter-stage" v-if="selectedIndex !== null" />
    </Transition>
    <Sprite :profile="selectedProfile" />
</template>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(5, min-content);
        grid-template-rows: repeat(5, min-content);
        justify-content: center;
        column-gap: 66px;
    }
    .portrait {
        justify-self: center;
    }
    .enter-stage {
        background-color: #3CBCFC;
        border-top: 6px solid #FCFCFC;
        border-bottom: 6px solid #FCFCFC;
        height: 228px;
        position: absolute;
        width: 100%;
        z-index: -1;
        top: 344px;
    }

    .even-enter-active,
    .odd-enter-active,
    .even-leave-active,
    .odd-leave-active,
    .enter-stage-enter-active {
        transition: all 2s linear;
    }
    .odd-enter-from, 
    .even-leave-to,
    .enter-stage-enter-from {
        transform: translateX(-100%);
    }
    .even-enter-from,
    .odd-leave-to {
        transform: translateX(100%);
    }
</style>
