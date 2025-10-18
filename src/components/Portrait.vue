<script setup lang="ts">
    interface Props {
        sizeMultiplier?: number;
    }

    const { sizeMultiplier = 1 } = defineProps<Props>();

    const width = 52 * sizeMultiplier;
    const height = 48 * sizeMultiplier;
    const frameStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundSize: `${width}px ${height}px`,
    };
</script>

<template>
    <div class="frame" :style="frameStyle" />
</template>

<style scoped>
    .frame {
        background-image: url("../assets/img/PortraitFrame.png");
    }
</style>
