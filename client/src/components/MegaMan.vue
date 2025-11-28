<script setup lang="ts">
    import { computed, Transition, ref, onMounted, watch } from "vue";
    import gsap from "gsap";
    import { getMMSprite } from "@/utils/assetsLoader";

    const emit = defineEmits(["enter-finished"]);

    const SPRITE_WIDTH = 93;
    const SPRITE_HEIGHT = 96;
    const ANIMATION = [0, 1, 0, 2, 2, 2, 3];

    interface Props {
        isShooting?: boolean;
    }

    const {
        isShooting = false,
    } = defineProps<Props>();

    const spriteAnimFrame = ref<number>(0);
    const visible = ref<boolean>(false);

    const spriteSheet = computed(() => {
        return getMMSprite();
    });

    const backgroundPosition = computed(() => {
        const frame = isShooting ? 4 : ANIMATION[spriteAnimFrame.value];
        if (frame != undefined) {
            const x = (frame % ANIMATION.length) * (SPRITE_WIDTH + 1);
            return `-${x}px -0px`;
        }
        return "";
    });

    const spriteStyle = computed(() => {
        if (spriteSheet.value) {
            return {
                backgroundImage: `url(${spriteSheet.value})`,
                backgroundPosition: backgroundPosition.value,
                width: `${SPRITE_WIDTH}px`,
                height: `${SPRITE_HEIGHT}px`,
                // left: `${leftPosition.value + profile.xOffset}px`,
                // top: `${topPosition.value}px`,
            }
        }
    });

    onMounted(() => {
        setTimeout(() => {
            visible.value = true;
        }, 5000);
    });

    watch(
        () => isShooting,
        (isShooting) => {
        if (isShooting === false) {
            setTimeout(() => {
                animateBackwards();
            }, 200);
        }
    });

    function onBeforeEnter(el: any) {
        gsap.set(el, {
            x: 0,
            y: -window.innerHeight / 2,
        })
    }

    function onEnter(el: any, done: () => void) {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "none",
            onComplete: done,
        });
    }

    function onLeave(el: any, done: () => void) {
        gsap.to(el, {
            x: 0,
            y: -window.innerHeight / 2,
            duration: 0.5,
            ease: "none",
            onComplete: done,
        });
    }

    function onAfterEnter(el: any) {
        animateForwards();
    }

    function animateForwards() {
        const animInterval = setInterval(() => {
            spriteAnimFrame.value = (spriteAnimFrame.value + 1);
            if (spriteAnimFrame.value == ANIMATION.length - 1) {
                clearInterval(animInterval);
                emit("enter-finished");
            }
        }, 50);
    }

    function animateBackwards() {
        const animInterval = setInterval(() => {
            spriteAnimFrame.value = (spriteAnimFrame.value - 1);
            if (spriteAnimFrame.value == 0) {
                clearInterval(animInterval);
                requestAnimationFrame(() => {
                    visible.value = false;
                });
            }
        }, 50);
    }
</script>

<template>
    <Transition @before-enter="onBeforeEnter"  @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
        <div class="mm-sprite" v-if="spriteStyle && visible" :style="spriteStyle" />
    </Transition>
</template>

<style scoped>
    .mm-sprite {
        position: absolute;
        margin-left: 750px;
        margin-bottom: 20px;
        z-index: 3;
    }
</style>