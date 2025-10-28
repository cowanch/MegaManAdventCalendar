<script setup lang="ts">
    import type { IRobotMasterProfile } from "@/interfaces/IRobotMasterProfile";
    import { computed, ref } from "vue";
    import gsap from "gsap";

    interface Props {
        profile?: IRobotMasterProfile;
        frame?: number;
    }

    const {
        profile,
        frame,
    } = defineProps<Props>();

    const spriteAnimFrame = ref<number>(0);

    const backgroundPosition = computed(() => {
        const animFrames = profile?.animation || [];
        const frame = animFrames[spriteAnimFrame.value];
        if (frame) {
            console.log(frame);
            const x = (frame % animFrames.length) * 133;
            return `-${x}px 0px`;
        }
        return "";
    });

    function startAnimation() {
        const animLength = profile?.animation.length || 0;
        setInterval(() => {
            if (spriteAnimFrame.value >= animLength - 1) {
                return;
            }
            spriteAnimFrame.value = (spriteAnimFrame.value + 1);
            console.log(spriteAnimFrame.value);
        }, 100);
    }

    function onBeforeEnter(el: any) {
        gsap.set(el, {
            x: -261,
            y: -336,
        });
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
        <div class="sprite" v-if="profile" :style="{backgroundPosition: backgroundPosition}" />
    </Transition>
</template>

<style scoped>
    .sprite {
        background-image: url("../assets/img/sprite/SparkMan.png");
        width: 132px;
        height: 129px;
        margin: auto;
        position: absolute;
        bottom: 446px;
        left: 894px;
        z-index: 3;
    }
</style>