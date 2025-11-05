<script setup lang="ts">
    import type { IRobotMasterProfile } from '@/interfaces/IRobotMasterProfile';
    import Sprite from "./Sprite.vue";
    import TextDisplay from './TextDisplay.vue';
    import { ref } from 'vue';

    interface Props {
        profile?: IRobotMasterProfile;
    }

    const {
        profile = undefined
    } = defineProps<Props>();

    const name = ref<string>("");

    function startAnimation() {
        if (profile) {
            let nameStr = "";
            let nameIdx = 0;
            const animInterval = setInterval(() => {
                nameStr += profile.name[nameIdx];
                name.value = nameStr.padEnd(profile.name.length, " ");
                nameIdx++;
                if (profile.name.length <= nameIdx) {
                    clearInterval(animInterval);
                }
            }, 100);
        }
    }
</script>

<template>
    <Transition name="enter-stage">
        <div class="enter-stage" v-if="profile !== undefined">
            <div class="intro-text">
                <TextDisplay :text="name" single-line />
            </div>
        </div>
    </Transition>
    <Sprite :profile="profile" @anim-finished="startAnimation" />
</template>

<style scoped>
    .enter-stage {
        background-color: #3CBCFC;
        border-top: 6px solid #FCFCFC;
        border-bottom: 6px solid #FCFCFC;
        height: 228px;
        position: absolute;
        width: 100%;
        z-index: -1;
        top: 344px;
    }
    .intro-text {
        display: flex;
        justify-content: center;
        margin: 8%;
    }

    .enter-stage-enter-active {
        transition: all 2s linear;
    }
    .enter-stage-enter-from {
        transform: translateX(-100%);
    }
</style>
