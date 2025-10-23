<script setup lang="ts">
    import { computed, ref } from "vue";
    import Portrait from "./components/Portrait.vue";
    import { GetRobotMasterProfiles } from "./constants/profiles";
    import { ERobotMasterId } from "./enums/ERobotMasterId";
    import { ELookState } from "./enums/ELookState";
    import type { IRobotMasterProfile } from "./interfaces/IRobotMasterProfile";

    const RobotMasterProfiles = GetRobotMasterProfiles();
    const DLN001_INDEX = 12;

    const sizeMultiplier = ref(3);
    const containerClassObject = computed(() => ({
        "column-gap": `${28 * sizeMultiplier.value}px`,
        // "row-gap": `${16 * sizeMultiplier.value}px`,
    }));
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

    const highlightKey = ref(DLN001_INDEX);

    function onPortraitHover(index: number) {
        highlightKey.value = index;
    }

    // Create an array of 25 profiles for demonstration purposes
    const profiles: IRobotMasterProfile[] = Array.from({ length: 25 });

    const megaManProfile: IRobotMasterProfile | undefined = RobotMasterProfiles[ERobotMasterId.DLN001];
    if (megaManProfile) {
        profiles[DLN001_INDEX] = megaManProfile;
    }

    // Testing the available robot masters
    for (let i = 0; i < 12; i++) {
        const profile = RobotMasterProfiles[(i + ERobotMasterId.DWN025) as ERobotMasterId];
        if (profile) {
            profiles[i] = profile;
        }
    }
    for (let i = DLN001_INDEX + 1; i < profiles.length; i++) {
        const profile = RobotMasterProfiles[(i - 1 + ERobotMasterId.DWN025) as ERobotMasterId];
        if (profile) {
            profiles[i] = profile;
        }
    }
</script>

<template>
    <div class="container" :style="containerClassObject">
        <Portrait 
            v-for="(profile, index) in profiles"
            :key="index"
            class="portrait"
            :profile="profile"
            :is-hovered="index === highlightKey"
            :look-state="index === DLN001_INDEX ? lookState : undefined"
            @hover="onPortraitHover(index)" 
        />
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-template-rows: repeat(5, min-content);
    justify-content: center;
}
.portrait {
    justify-self: center;
}
</style>
