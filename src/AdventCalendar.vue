<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import Portrait from "./components/Portrait.vue";
    import { GetRobotMasterProfiles } from "./constants/profiles";
    import { ERobotMasterId } from "./enums/ERobotMasterId";
    import { ELookState } from "./enums/ELookState";
    import type { IRobotMasterProfile } from "./interfaces/IRobotMasterProfile";
    import type { IPortraitProps } from "./interfaces/IPortraitProps";

    const RobotMasterProfiles = GetRobotMasterProfiles();
    const DLN001_INDEX = 12;

    const lookState = computed(() => {
        if ([10, 11].includes(highlightKey.value)) {
            return ELookState.Left;
        } else if ([13, 14].includes(highlightKey.value)) {
            return ELookState.Right;
        } else if ([2, 7].includes(highlightKey.value)) {
            return ELookState.Up;
        } else if ([17, 22].includes(highlightKey.value)) {
            return ELookState.Down;
        } else if ([0, 1, 5, 6].includes(highlightKey.value)) {
            return ELookState.UpLeft;
        } else if ([3, 4, 8, 9].includes(highlightKey.value)) {
            return ELookState.UpRight;
        } else if ([15, 16, 20, 21].includes(highlightKey.value)) {
            return ELookState.DownLeft;
        } else if ([18, 19, 23, 24].includes(highlightKey.value)) {
            return ELookState.DownRight;
        } else {
            return ELookState.Neutral;
        }
    });

    const highlightKey = ref(-1);
    const showCalendar = ref(false);
    const initialized = ref(false);

    // Create an array of 25 profiles for demonstration purposes
    const portraitProps: IPortraitProps[] = Array.from({ length: 25 });

    onMounted(() => {
        // Delay showing the calendar to allow for any initial animations
        setTimeout(() => {
            showCalendar.value = true;
            setTimeout(() => {
                initProfiles();
            }, 3000);
        }, 50);
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
        initialized.value = true;
    }

    function onPortraitHover(index: number) {
        if (!initialized.value) {
            return;
        }
        highlightKey.value = parseInt(`${index}`);  // Parsing the index to ensure it's a number
    }

    function getRow(row: number): { [index: number] : IPortraitProps | undefined} {
        if (row < 1 || row > 5) {
            throw new Error("Row must be 1 or 5");
        }
        const rowObj: { [index: number] : IPortraitProps  | undefined} = {};
        for (let i = 0; i < 5; i++) {
            const index = (row - 1) * 5 + i;
            rowObj[index] = portraitProps[index];
        }
        return rowObj;
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
            />
        </div>
    </Transition>
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
.odd-enter-active {
    transition: all 2.5s linear;
}
.odd-enter-from {
    transform: translateX(-3050px);
}
.even-enter-from {
    transform: translateX(3050px);
}
</style>
