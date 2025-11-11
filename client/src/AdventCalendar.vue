<script setup lang="ts">
    import { computed, onMounted, ref, type Ref } from "vue";
    import Portrait from "./components/Portrait.vue";
    import { GetRobotMasterProfiles } from "./constants/profiles";
    import { ERobotMasterId } from "./enums/ERobotMasterId";
    import { ELookState } from "./enums/ELookState";
    import type { IRobotMasterProfile } from "./interfaces/IRobotMasterProfile";
    import type { IPortraitProps } from "./interfaces/IPortraitProps";
    import Intro from "./components/Intro.vue"
    import { COMPLETION_STATE_LS_KEY, type ICompletionState } from "./interfaces/ICompletionState";

    const RobotMasterProfiles: Record<ERobotMasterId, IRobotMasterProfile> = GetRobotMasterProfiles();
    const DLN001_INDEX = 12;
    const CompletionState: ICompletionState = JSON.parse(localStorage.getItem(COMPLETION_STATE_LS_KEY) || "{}");

    const lookState = computed(() => {
        const key = highlightKey.value;
        if (key === undefined || key === DLN001_INDEX) {
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

    const selectedProp = computed<IPortraitProps | undefined>(() => {
        if (selectedIndex.value) {
            return portraitProps[selectedIndex.value]?.value;
        }
        return undefined;
    });

    const selectedProfile = computed<IRobotMasterProfile | undefined>(() => {
        if (selectedProp.value) {
            const profile: IRobotMasterProfile | undefined = selectedProp.value?.profile;
            if (profile?.animation.length) {
                return profile;
            }
            return RobotMasterProfiles[ERobotMasterId.DWN023];
        }
        return undefined;
    });

    const dayData = ref<{ day: number, id: number | undefined }[]>([]);
    const highlightKey = ref<number | undefined>(undefined);
    const showCalendar = ref<boolean>(false);
    const showPortraits = ref<boolean>(false);
    const selectedIndex = ref<number | undefined>(undefined);

    // Create an array of 25 profiles for demonstration purposes
    const portraitProps: Ref<IPortraitProps>[] = Array.from({ length: 25 }, () => ref<IPortraitProps>({
        revealed: false,
        defeated: false,
    }));
    
    onMounted(async () => {
        const res = await fetch("http://localhost:3000/api/days");
        dayData.value = await res.json();
        showCalendar.value = true;
        setTimeout(() => {
            initProfiles(dayData.value);
        }, 2200);
    });

    function reset() {
        highlightKey.value = DLN001_INDEX;
        showPortraits.value = true;
    }

    function initProfiles(dayData: { day: number, id: number | undefined }[]) {
        const megaManProfile: IRobotMasterProfile | undefined = RobotMasterProfiles[ERobotMasterId.DLN001];
        if (megaManProfile && portraitProps[DLN001_INDEX]) {
            portraitProps[DLN001_INDEX].value.profile = megaManProfile;
        }
        dayData.forEach((info, index) => {
            const propIdx = index < DLN001_INDEX ? index : index + 1;
            const prop = portraitProps[propIdx];
            if (prop) {
                prop.value.dayNumber = info.day;
                if (info.id) {
                    const profile = RobotMasterProfiles[info.id as ERobotMasterId];
                    if (profile) {
                        prop.value.profile = profile;
                    }
                }
                const frameState = CompletionState[info.day];
                if (frameState) {
                    const { revealed, defeated } = frameState;
                    prop.value.revealed = revealed;
                    prop.value.defeated = defeated;
                }
            }
        });
        reset();
    }

    function getRow(row: number): { [index: number] : IPortraitProps | undefined} {
        if (row < 1 || row > 5) {
            throw new Error("Row must be 1 or 5");
        }
        const rowObj: { [index: number] : IPortraitProps  | undefined} = {};
        for (let i = 0; i < 5; i++) {
            const index = (row - 1) * 5 + i;
            if (portraitProps[index]) {
                rowObj[index] = showPortraits.value ? portraitProps[index].value : undefined;
            }
        }
        return rowObj;
    }

    function changeCompletionState(prop: IPortraitProps, revealedState: boolean | undefined, defeatedState: boolean | undefined) {
        const day = prop.dayNumber;
        const revealed = revealedState || prop.revealed || false;
        const defeated = defeatedState || prop.defeated || false;
        if (day) {
            CompletionState[day] = {
                revealed,
                defeated
            };
            localStorage.setItem(COMPLETION_STATE_LS_KEY, JSON.stringify(CompletionState));
            prop.revealed = revealed;
            prop.defeated = defeated;
        }
    }

    function onPortraitHover(index: number) {
        if (!showPortraits.value) {
            return;
        }
        highlightKey.value = parseInt(`${index}`);  // Parsing the index to ensure it's a number
    }

    function onPortraitClick(index: number) {
        if (index == DLN001_INDEX 
            || index === selectedIndex.value 
            || portraitProps[index]?.value.defeated
            || !portraitProps[index]?.value.profile) {
            return;
        }
        selectedIndex.value = index;
        showPortraits.value = false;
        highlightKey.value = -1;
        requestAnimationFrame(() => {
            const day = selectedProp.value?.dayNumber;
            if (day) {
                changeCompletionState(selectedProp.value, true, false)
            }
            showCalendar.value = false;
        });
    }

    function onIntroBack() {
        selectedIndex.value = undefined;
        showCalendar.value = true;
        setTimeout(() => {
            reset();
        }, 2200);
    }

    function onIntroComplete() {
        if (selectedProp.value) {
            changeCompletionState(selectedProp.value, true, true);
        }
        selectedIndex.value = undefined;
        showCalendar.value = true;
        setTimeout(() => {
            reset();
        }, 2200);
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
    <Intro
        :profile="selectedProfile"
        :frame-index="parseInt(`${selectedIndex}`)"
        @back="onIntroBack"
        @complete="onIntroComplete"
    />
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

    .even-enter-active,
    .odd-enter-active,
    .even-leave-active,
    .odd-leave-active {
        transition: all 2s linear;
    }
    .odd-enter-from, 
    .even-leave-to {
        transform: translateX(-100%);
    }
    .even-enter-from,
    .odd-leave-to {
        transform: translateX(100%);
    }
</style>
