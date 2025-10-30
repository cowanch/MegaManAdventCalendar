<script setup lang="ts">
    import { computed } from 'vue';

    interface Props {
        text: string;
        centered?: boolean;
    }

    const {
        text,
        centered = false
    } = defineProps<Props>();

    const word1Chars = computed<string[]>(() => {
        const word1 = text.split(" ", 2)[0] || "";
        return word1.split("");
    });
    const word2Chars = computed<string[]>(() => {
        const word2 = text.split(" ", 2)[1] || "";
        const chars = word2.split("");
        // Prepend some spaces to the second world so it aligns at the end of 6 characters
        while (chars.length > 0 && chars.length < (word1Chars.value.length > 7 ? 7 : 6)) {
            chars.unshift(" ");
        }
        return chars;
    });

    function getBackgroundPosition(char: string): string {
        const code = char.toUpperCase().charCodeAt(0);
        let index: number;
        if (code >= 48 && code <= 57) {
            // '0' to '9'
            index = code - 48;
        } else if (code >= 65 && code <= 90) {
            // 'A' to 'Z'
            index = code - 65 + 10;
        } else if (code === 46) {
            // '.'
            index = 36;
        } else if (code === 44) {
            // ','
            index = 37;
        } else if (code === 39) {
            // "'" (single quote)
            index = 38;
        } else if (code === 33) {
            // '!' 
            index = 39;
        } else if (code === 58) {
            // ':'
            index = 41;
        } else if (code === 63) {
            // '?'
            index = 43;
        } else {
            // Unsupported character, return position for blank
            return `-405px -54px`;
        }
        const x = (index % 16) * 27;
        const y = Math.floor(index / 16) * 27;
        return `-${x}px -${y}px`;
    }

    const textContainerStyle = computed(() => ({
        margin: centered ? "0 auto" : "0",
    }));
</script>

<template>
    <div class="text-container" :style="textContainerStyle">
        <div class="word-container">
            <div class="text-display" v-for="(char, index) in word1Chars" :key="index" :style="{ backgroundPosition: getBackgroundPosition(char) }" />
        </div>
        <div v-if="word2Chars.length" class="word-container">
            <div class="text-display" v-for="(char, index) in word2Chars" :key="index" :style="{ backgroundPosition: getBackgroundPosition(char) }" />
        </div>
    </div>
</template>

<style scoped>
    .word-container {
        display: flex;
    }
    .text-display {
        width: 24px;
        height: 24px;
        background-image: url("../assets/img/LetterSet.png");
    }
    .text-container {
        width: fit-content;
    }
</style>
