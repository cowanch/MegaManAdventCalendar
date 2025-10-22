<script setup lang="ts">
    import { computed, ref } from 'vue';
    import Portrait from './components/Portrait.vue';
    import { RobotMasterId, type RobotMasterProfile, getRobotMasterProfiles } from './constants/profiles';

    const RobotMasterProfiles = getRobotMasterProfiles();

    const sizeMultiplier = ref(3);
    const containerClassObject = computed(() => ({
        "column-gap": `${28 * sizeMultiplier.value}px`,
        // "row-gap": `${16 * sizeMultiplier.value}px`,
    }));

    const highlightKey = ref(12);

    function onPortraitHover(index: number) {
        highlightKey.value = index;
    }

    // Create an array of 25 profiles for demonstration purposes
    const profiles: RobotMasterProfile[] = Array.from({ length: 25 });

    const megaManProfile: RobotMasterProfile | undefined = RobotMasterProfiles[RobotMasterId.DLN001];
    if (megaManProfile) {
        profiles[12] = megaManProfile;
    }

    // Testing the available robot masters
    for (let i = 0; i < 12; i++) {
        const profile = RobotMasterProfiles[(i + RobotMasterId.DLN003) as RobotMasterId];
        if (profile) {
            profiles[i] = profile;
        }
    }
    for (let i = 13; i < 25; i++) {
        const profile = RobotMasterProfiles[(i - 1 + RobotMasterId.DLN003) as RobotMasterId];
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
