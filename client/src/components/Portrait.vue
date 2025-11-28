<script setup lang="ts">
    import { computed, ref, watch, type StyleValue } from "vue";
    import TextDisplay from "./TextDisplay.vue";
    import { ELookState } from "@/enums/ELookState";
    import { ERobotMasterId } from "@/enums/ERobotMasterId";
    import type { IPortraitProps } from "@/interfaces/IPortraitProps";

    const {
        profile,
        isHovered = false,
        lookState,
        dayNumber,
        revealed = false,
        defeated = false,
    } = defineProps<IPortraitProps>();

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
    const imageStyle = computed<StyleValue>(() => {
        if (!profile) {
            return {};
        }
        let style: StyleValue = {};
        
        let index: number;
        if (profile.id === ERobotMasterId.DLN001) {
            // Special case for Mega Man
            index = lookState ?? ELookState.Neutral;
        } else {
            index = profile.id + (9 - ERobotMasterId.DLN003);
        }
        const x = (index % 11) * 96;
        const y = Math.floor(index / 11) * 96;
        style.backgroundPosition = `-${x}px -${y}px`;
        
        if (defeated) {
            style.filter = "grayscale(100%)";
        }

        return style;
    });
    const textStyle = computed(() => {
        let margin = "0px";
        if (dayNumber && !revealed) {
            return { margin: "0px 66px" };
        } else if (profile) {
            const firstWord = profile.name.split(" ")[0];
            if (firstWord && firstWord.length <= 7) {
                margin = "6px";
            } else {
                margin = "-18px";
            }
        }
        return { marginLeft: margin };
    });
    const textDisplay = computed(() => {
        if (dayNumber && !revealed) {
            return "?";
        } else if (profile && profile.id != ERobotMasterId.DLN001) {
            return profile.name;
        } else {
            return "";
        }
    });
    const showPortrait = computed(() => !!profile && (!dayNumber || revealed))

    if (isHovered) {
        startAnimation();
    }
</script>

<template>
    <div class="portrait-container">
        <div class="stack" @mouseenter="$emit('hover')" @click="$emit('click')">
            <div class="frame" />
            <div v-if="isHovered" class="highlight" :style="highlightStyle" />
            <div v-if="showPortrait" class="portrait-image" :style="imageStyle" />
            <div v-else-if="dayNumber" class="portrait-number">
                <TextDisplay :text="`${dayNumber}`" :centered="true" />
            </div>
        </div>
        <TextDisplay v-if="textDisplay.length" :text="textDisplay" :style="textStyle" />
    </div>
</template>

<style scoped>
    .portrait-container {
        display: flex;
        flex-direction: column;
        min-width: 174px;
        min-height: 192px;
    }
    .stack {
        display: grid;
        cursor: pointer;
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
    .portrait-number {
        z-index: 3;
        align-content: center;
        width: 156px;
    }
</style>
