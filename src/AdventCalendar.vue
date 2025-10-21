<script setup lang="ts">
    import { computed, ref } from 'vue';
    import Portrait from './components/Portrait.vue';

    const sizeMultiplier = ref(3);
    const containerClassObject = computed(() => ({
        "column-gap": `${28 * sizeMultiplier.value}px`,
        // "row-gap": `${16 * sizeMultiplier.value}px`,
    }));

    const highlightKey = ref(13);

    function onPortraitHover(index: number) {
        highlightKey.value = index;
    }
</script>

<template>
    <div class="container" :style="containerClassObject">
        <Portrait class="portrait" v-for="y in 25" :key="y" :sizeMultiplier="sizeMultiplier" :is-hovered="y === highlightKey" @hover="onPortraitHover(y)" />
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
