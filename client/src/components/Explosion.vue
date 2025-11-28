<script setup lang="ts">
    import { computed, onMounted, ref, useTemplateRef } from 'vue';
    import gsap from "gsap";
    import { getParticle } from '@/utils/assetsLoader';

    const ANIM_LENGTH = 5;
    const SPRITE_SIZE = 72;
    const EXPLODE_DISTANCE = window.screen.availWidth / 2 + SPRITE_SIZE;

    const emit = defineEmits(["explode-finished"]);

    const animFrame = ref<number>(0);
    const parts1Refs = useTemplateRef("parts1");
    const parts2Refs = useTemplateRef("parts2");

    const backgroundPosition = computed(() => {
        const x = (animFrame.value % ANIM_LENGTH) * SPRITE_SIZE;
        return `-${x}px 0px`;
    });

    const leftPosition = computed(() => {
        const screenWidth = window.screen.availWidth;
        return (screenWidth - SPRITE_SIZE) / 2;
    });

    const explosionStyle = computed(() => {
        const bgImg = getParticle("Explosion");
        if (bgImg) {
            return {
                backgroundImage: `url(${bgImg})`,
                backgroundPosition: backgroundPosition.value,
                width: `${SPRITE_SIZE}px`,
                height: `${SPRITE_SIZE}px`,
                left: `${leftPosition.value}px`,
            };
        }
    });

    const directions = computed(() => {
        const dist = EXPLODE_DISTANCE;
        const directions = [
            { x: dist, y: 0 },
            { x: -dist, y: 0 },
            { x: 0, y: dist },
            { x: 0, y: -dist },
        ];
        const distForDiag = Math.sin(45) * (dist * 0.8);
        directions.push(...[
            { x: distForDiag, y: distForDiag },
            { x: -distForDiag, y: distForDiag },
            { x: distForDiag, y: -distForDiag },
            { x: -distForDiag, y: -distForDiag },
        ]);
        return directions;
    });

    onMounted(() => {
        startAnimation();
    });

    function startAnimation() {
        setInterval(() => {
            animFrame.value = (animFrame.value + 1) % ANIM_LENGTH;
        }, 100);
        setTranslations();
    }

    function setTranslations() {
        parts1Refs.value?.forEach((part, index) => {
            if (directions.value[index]) {
                const { x, y } = directions.value[index];
                gsap.to(part, {
                    x,
                    y,
                    duration: 1.5,
                    ease: "none",
                });
            }
        });
        parts2Refs.value?.forEach((part, index) => {
            if (directions.value[index]) {
                const { x, y } = directions.value[index];
                gsap.to(part, {
                    x,
                    y,
                    duration: 3,
                    ease: "none",
                    onComplete: index === 0 ? () => emit("explode-finished") : undefined,
                });
            }
        });
    }
</script>

<template>
    <div v-for="idx in 8" :key="idx" class="explosion" ref="parts1" :style="explosionStyle" />
    <div v-for="idx in 8" :key="idx" class="explosion" ref="parts2" :style="explosionStyle" />
</template>

<style scoped>
    .explosion {
        position: absolute;
        bottom: 450px;
        z-index: 10;
    }
</style>