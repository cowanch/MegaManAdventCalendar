<script setup lang="ts">
    import TextDisplay from './TextDisplay.vue';

    interface Props {
        sizeMultiplier?: number;
        isHovered?: boolean;
    }

    const { sizeMultiplier = 1, isHovered = false } = defineProps<Props>();
</script>

<template>
    <div class="portrait-container">
        <div class="stack">
            <div class="frame" />
            <div v-if="isHovered" class="highlight" />
        </div>
        <TextDisplay text="Test Man" style="margin-left: 6px;" />
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
</style>
