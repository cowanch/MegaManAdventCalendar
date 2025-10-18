<script setup lang="ts">
import image from '../assets/img/PortraitFrame.png';

interface Props {
    sizeMultiplier?: number;
}

const { sizeMultiplier = 1 } = defineProps<Props>();

const width = 52 * sizeMultiplier;
const height = 48 * sizeMultiplier;
</script>

<template>
    <img :src="image" :width="width" :height="height"/>
</template>

<style scoped>
</style>
