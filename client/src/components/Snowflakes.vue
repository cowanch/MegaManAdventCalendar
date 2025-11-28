<script setup lang="ts">
    import { ref, computed, onMounted, useTemplateRef } from 'vue';
    import gsap from "gsap";
    import { getParticle } from '@/utils/assetsLoader';

    const ANIM_LENGTH = 2;
    const SPIRTE_SIZE = 24;
    
    const animFrame = ref<number>(0);
    const snowflakeRefs = useTemplateRef("snowflakes");

    const backgroundPosition = computed(() => {
        const x = (animFrame.value % ANIM_LENGTH) * SPIRTE_SIZE;
        return `-${x}px 0px`;
    });

    const snowStyle = computed(() => {
        const bgImg = getParticle("Snowflake");
        if (bgImg) {
            return {
                backgroundImage: `url(${bgImg})`,
                backgroundPosition: backgroundPosition.value,
                width: `${SPIRTE_SIZE}px`,
                height: `${SPIRTE_SIZE}px`,
            };
        }
    });

    onMounted(() => {
        startAnimation();
    });

    function startAnimation() {
        setInterval(() => {
            animFrame.value = (animFrame.value + 1) % ANIM_LENGTH;
        }, 150);
        snowflakeRefs.value?.forEach((part, index, array) => {
            gsap.fromTo(part, {
                y: -48,
                x: ((index / array.length) * window.innerWidth) - 24,
            }, {
                y: window.innerHeight,
                duration: 10,
                ease: "none",
                repeat: -1,
                delay: Math.floor(Math.random() * array.length) * 0.5,
                repeatDelay: Math.random(),
            });
        });
    }
</script>

<template>
    <div v-for="index in 50" :key="index" class="snowflake" :style="snowStyle" ref="snowflakes" />
</template>

<style scoped>
    .snowflake {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
    }
</style>