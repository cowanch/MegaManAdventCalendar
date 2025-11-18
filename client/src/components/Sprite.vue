<script setup lang="ts">
    import type { IRobotMasterProfile } from "@/interfaces/IRobotMasterProfile";
    import { computed, ref, watch } from "vue";
    import gsap from "gsap";
    import type { IGameInfo } from "@/interfaces/IGameInfo";
    import { getSprite } from "@/utils/assetsLoader";

    const emit = defineEmits(["anim-finished"]);

    interface Props {
        profile?: IRobotMasterProfile;
        gameInfo?: IGameInfo;
        originPosition?: { x: number, y: number };
    }

    const {
        profile,
        gameInfo,
        originPosition,
    } = defineProps<Props>();

    const spriteAnimFrame = ref<number>(0);

    const spriteHeight = computed(() => {
        return gameInfo ? gameInfo.spriteHeight : 0;
    });

    const spriteSheet = computed(() => {
        return gameInfo ? getSprite(gameInfo.game) : undefined;
    });

    const backgroundPosition = computed(() => {
        if (profile && gameInfo) {
            const animFrames = profile?.animation || [];
            const frame = animFrames[spriteAnimFrame.value];
            if (frame != undefined) {
                const x = (frame % animFrames.length) * (profile.spriteWidth + 1);
                const y = gameInfo.index * (gameInfo.spriteHeight + 1);
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
        if (profile && gameInfo && spriteSheet.value) {
            return {
                backgroundImage: `url(${spriteSheet.value.url})`,
                backgroundPosition: backgroundPosition.value,
                width: `${profile.spriteWidth}px`,
                height: `${gameInfo.spriteHeight}px`,
                left: `${leftPosition.value + profile.xOffset}px`,
                top: `${topPosition.value}px`,
            }
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
        if (leftPosition && topPosition && originPosition && profile) {
            gsap.set(el, {
                x: originPosition.x - leftPosition.value - (profile.spriteWidth / 2),
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
        <div class="sprite" v-if="spriteStyle" :style="spriteStyle" />
    </Transition>
</template>

<style scoped>
    .sprite {
        margin: auto;
        position: absolute;
        z-index: 3;
    }
</style>