<script setup lang="ts">
    import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
    import gsap from "gsap";

    const emit = defineEmits(["click", "hover", "done-typing"]);

    interface Props {
        text: string;
        centered?: boolean;
        singleLine?: boolean;
        isHovered?: boolean;
        hoverable?: boolean;
        typeIn?: boolean;
        slideIn?: boolean;
    }

    const {
        text,
        centered = false,
        singleLine = false,
        isHovered = false,
        hoverable = false,
        typeIn = false,
        slideIn = false,
    } = defineProps<Props>();

    const partialText = ref<string>("");
    const typeIdx = ref<number>(-1);
    const word1Refs = useTemplateRef("word1");

    const displayText = computed<string>(() => {
        return (typeIn || slideIn) ? partialText.value : text;
    });
    const word1Chars = computed<string[]>(() => {
        const word1 = !singleLine ? displayText.value.split(" ", 2)[0] || "" : displayText.value;
        return word1.split("");
    });
    const word2Chars = computed<string[]>(() => {
        if (!singleLine) {
            const word2 = displayText.value.split(" ", 2)[1] || "";
            const chars = word2.split("");
            // Prepend some spaces to the second world so it aligns at the end of 6 characters
            while (chars.length > 0 && chars.length < (word1Chars.value.length > 7 ? 7 : 6)) {
                chars.unshift(" ");
            }
            return chars;
        } else {
            return [];
        }
    });

    const textContainerStyle = computed(() => ({
        margin: centered ? "0 auto" : "0",
    }));

    const typeDelay = computed(() => {
        return slideIn ? 200 : 100;
    });

    onMounted(() => {
        if (typeIn || slideIn) {
            if (slideIn) {
                partialText.value = "".padEnd(text.length, " ");
            }
            startTyping();
        }
    });

    watch(
        () => typeIdx.value,
        (index: number) => {
            if (index < 0) return;
            const charRef = word1Refs.value?.[index];
            if (slideIn && charRef) {
                gsap.from(charRef, {
                    x: 600 - (index * 27),
                    duration: 0.2,
                    delay: 0.2,
                });
            }
        }
    );

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

    function startTyping() {
        let nameStr = "";
        typeIdx.value = -1;
        const animInterval = setInterval(() => {
            nameStr += text[typeIdx.value] || "";
            partialText.value = nameStr.padEnd(text.length, " ");
            typeIdx.value++;
            if (text.length <= typeIdx.value) {
                clearInterval(animInterval);
                setTimeout(() => {
                    emit("done-typing");
                }, 1000);
            }
        }, typeDelay.value);
    }

    function onHover() {
        emit("hover");
    }

    function onClick() {
        emit("click");
    }
</script>

<template>
    <div class="text-container" :style="textContainerStyle" @mouseenter="onHover" @mousedown="onClick">
        <div class="word-container">
            <div class="menu-arrow" v-if="isHovered" />
            <div 
                class="text-display"
                v-for="(char, index) in word1Chars"
                :key="index"
                :style="{ backgroundPosition: getBackgroundPosition(char), cursor: hoverable ? 'pointer' : '' }"
                ref="word1"
            />
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
    .menu-arrow {
        width: 24px;
        height: 24px;
        background-image: url("../assets/img/MenuArrow.png");
        position: fixed;
        transform: translate(-30px);
    }
</style>
