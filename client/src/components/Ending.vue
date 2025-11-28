<script setup lang="ts">
    import { ref } from "vue";
    import MegaMan from './MegaMan.vue';
    import Snowflakes from './Snowflakes.vue';
    import TextDisplay from './TextDisplay.vue';

    const showMessage = ref<boolean>(false);
    const isShooting = ref<boolean>(false);

    function onMMEnterFinished() {
        setTimeout(() => {
            showMessage.value = true;
            isShooting.value = true;
        }, 500);
    }

    function onDoneTyping() {
        setTimeout(() => {
            isShooting.value = false;
        }, 200);
    }
</script>

<template>
    <div class="ending-container">
        <Snowflakes />
        <TextDisplay
            v-if="showMessage"
            class="xmas-message"
            text="Merry Christmas!!"
            single-line
            slide-in
            @done-typing="onDoneTyping"
        />
        <MegaMan @enter-finished="onMMEnterFinished" :is-shooting="isShooting" />
    </div>
</template>

<style scoped>
    .ending-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>