<script setup lang="ts">
    interface Props {
        text: string;
    }

    const props = defineProps<Props>();

    const textParts = props.text.split(" ", 2);
    const word1: string = textParts[0] || "";
    const word2: string = textParts[1] || "";

    const word1Chars = word1.split("");
    const word2Chars = word2.split("");
    // Prepend some spaces to the second world so it aligns at the end of 6 characters
    while (word2Chars.length < 6) {
        word2Chars.unshift(" ");
    }

    function getBackgroundPosition(char: string): string {
        const code = char.toUpperCase().charCodeAt(0);
        let index: number;
        if (code >= 48 && code <= 57) {
            // '0' to '9'
            index = code - 48;
        } else if (code >= 65 && code <= 90) {
            // 'A' to 'Z'
            index = code - 65 + 10;
        } else {
            // Unsupported character, return position for blank
            return `-405px -54px`;
        }
        const x = (index % 16) * 27;
        const y = Math.floor(index / 16) * 27;
        return `-${x}px -${y}px`;
    }
</script>

<template>
    <div class="word-container">
        <div class="text-display" v-for="(char, index) in word1Chars" :key="index" :style="{ backgroundPosition: getBackgroundPosition(char) }" />
    </div>
    <div class="word-container">
        <div class="text-display" v-for="(char, index) in word2Chars" :key="index" :style="{ backgroundPosition: getBackgroundPosition(char) }" />
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
</style>
