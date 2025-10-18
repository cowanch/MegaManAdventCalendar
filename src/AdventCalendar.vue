<script setup lang="ts">
import { computed, ref } from 'vue';
import Portrait from './components/Portrait.vue';

const sizeMultiplier = ref(2.75);
const containerClassObject = computed(() => ({
    "column-gap": `${28 * sizeMultiplier.value}px`,
    "row-gap": `${16 * sizeMultiplier.value}px`,
}))
</script>

<template>
    <div class="container" :style="containerClassObject">
        <Portrait class="portrait" v-for="y in 25" :key="y" :sizeMultiplier="sizeMultiplier" />
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
