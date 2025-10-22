<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import TextDisplay from './TextDisplay.vue';
    import { RobotMasterId, type RobotMasterProfile } from '@/constants/profiles';

    interface Props {
        profile?: RobotMasterProfile;
        isHovered?: boolean;
    }

    const { isHovered = false, profile } = defineProps<Props>();

    const animFrame = ref(0);
    const frameRate = 8; // frames per second
    const interval = 1000 / frameRate;
    let intervalId: number | null = null;
    watch(() => isHovered, (h) => {
        if (!h) {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
            animFrame.value = 0;
        } else {
            startAnimation();
        }
    });

    function startAnimation() {
        if (intervalId === null) {
            intervalId = setInterval(() => {
                animFrame.value = (animFrame.value + 1) % 2;
            }, interval);
        }
    }

    const highlightStyle = computed(() => ({
        backgroundPosition: `-${animFrame.value * 156}px 0px`,
    }));
    const imageStyle = computed(() => {
        if (!profile) {
            return {};
        }
        let index: number;
        if (profile.id === RobotMasterId.DLN001) {
            // Special case for Mega Man
            index = 4;
        } else {
            index = profile.id + 6;
        }
        const x = (index % 11) * 96;
        const y = Math.floor(index / 11) * 96;
        return { backgroundPosition: `-${x}px -${y}px` };
    });

    if (isHovered) {
        startAnimation();
    }
</script>

<template>
    <div class="portrait-container">
        <div class="stack" @mouseenter="$emit('hover')">
            <div class="frame" />
            <div v-if="isHovered" class="highlight" :style="highlightStyle" />
            <div v-if="profile" class="portrait-image" :style="imageStyle" />
        </div>
        <TextDisplay v-if="profile" :text="profile.name" style="margin-left: 6px;" />
    </div>
</template>

<style scoped>
    .portrait-container {
        display: flex;
        flex-direction: column;
    }
    .stack {
        display: grid;
    }
    .stack div {
        grid-area: 1 / 1;
    }
    .frame {
        background-image: url("../assets/img/PortraitFrame.png");
        width: 156px;
        height: 144px;
        z-index: 1;
    }
    .highlight {
        background-image: url("../assets/img/FrameHighlight.png");
        width: 156px;
        height: 144px;
        z-index: 2;
    }
    .portrait-image {
        background-image: url("../assets/img/RobotPortraits.png");
        width: 96px;
        height: 96px;
        z-index: 3;
        margin: 24px 30px;
    }
</style>
