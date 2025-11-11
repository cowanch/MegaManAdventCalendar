<script setup lang="ts">
    import type { IRobotMasterProfile } from "@/interfaces/IRobotMasterProfile";
    import { computed, ref, watch } from "vue";
    import gsap from "gsap";
    import { getGameInfo } from "@/utils/gameInfo";

    const emit = defineEmits(["anim-finished"]);

    interface Props {
        profile?: IRobotMasterProfile;
        originPosition?: { x: number, y: number };
    }

    const {
        profile,
        originPosition,
    } = defineProps<Props>();

    const spriteAnimFrame = ref<number>(0);

    const gameInfo = computed(() => {
        return profile ? getGameInfo(profile.id) : undefined;
    });

    const spriteHeight = computed(() => {
        return gameInfo.value ? gameInfo.value.spriteHeight : 0;
    });

    const backgroundPosition = computed(() => {
        if (profile && gameInfo.value) {
            const animFrames = profile?.animation || [];
            const frame = animFrames[spriteAnimFrame.value];
            if (frame != undefined) {
                const x = (frame % animFrames.length) * (profile.spriteWidth + 1);
                const y = gameInfo.value?.index * (gameInfo.value?.spriteHeight + 1)
                return `-${x}px -${y}px`;
            }
        }
        return "";
    });

    const leftPosition = computed(() => {
        const screenWidth = document.body.clientWidth;
        const spriteWidth = profile?.spriteWidth ?? 0;
        return (screenWidth - spriteWidth) / 2;
    });

    const topPosition = computed(() => {
        return 470 - spriteHeight.value;
    });

    const spriteStyle = computed(() => {
        return {
            // backgroundImage: `url("../assets/img/sprite/MM3_Sprites.png")`,
            backgroundPosition: backgroundPosition.value,
            width: `${profile?.spriteWidth}px`,
            height: `${gameInfo.value?.spriteHeight}px`,
            left: `${leftPosition.value}px`,
            top: `${topPosition.value}px`,
        }
    });

    watch(
        () => profile,
        (profile) => {
        if (profile === undefined) {
            spriteAnimFrame.value = 0;
        }
    });

    function startAnimation() {
        const animLength = profile?.animation.length || 0;
        const animInterval = setInterval(() => {
            spriteAnimFrame.value = (spriteAnimFrame.value + 1);
            if (spriteAnimFrame.value == animLength - 1) {
                clearInterval(animInterval);
                emit("anim-finished");
            }
        }, 100);
    }

    function onBeforeEnter(el: any) {
        if (leftPosition && topPosition && originPosition) {
            gsap.set(el, {
                x: originPosition.x - leftPosition.value,
                y: (originPosition.y - (spriteHeight.value - 96)) - topPosition.value,
            });
        }
    }

    function onEnter(el: any, done: () => void) {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: done
        });
    }

    function onAfterEnter(el: any) {
        setTimeout(() => {
            startAnimation();
        }, 1000);
    }
</script>

<template>
    <Transition @before-enter="onBeforeEnter"  @enter="onEnter" @after-enter="onAfterEnter">
        <div class="sprite" v-if="profile" :style="spriteStyle" />
    </Transition>
</template>

<style scoped>
    .sprite {
        background-image: url("../assets/img/sprite/MM3_Sprites.png");
        margin: auto;
        position: absolute;
        z-index: 3;
    }
</style>