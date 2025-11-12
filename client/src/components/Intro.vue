<script setup lang="ts">
    import type { IRobotMasterProfile } from '@/interfaces/IRobotMasterProfile';
    import Sprite from "./Sprite.vue";
    import TextDisplay from './TextDisplay.vue';
    import { computed, ref } from 'vue';
    import Explosion from './Explosion.vue';
    import { getGameInfo } from '@/utils/gameInfo';

    const titleImages: URL[] = [
        new URL("@/assets/img/title/MM1_Title.png", import.meta.url),
        new URL("@/assets/img/title/MM2_Title.png", import.meta.url),
        new URL("@/assets/img/title/MM3_Title.png", import.meta.url),
        new URL("@/assets/img/title/MM4_Title.png", import.meta.url),
        new URL("@/assets/img/title/MM5_Title.png", import.meta.url),
        new URL("@/assets/img/title/MM6_Title.png", import.meta.url),
    ];
    
    const emit = defineEmits(["complete", "back"]);
    
    enum EOption {
        COMPLETED = "Completed",
        PASSWORD = "Password",
        BACK = "Back",
    }

    interface IProps {
        profile?: IRobotMasterProfile;
        frameIndex?: number,
    }

    const {
        profile = undefined,
        frameIndex = undefined,
    } = defineProps<IProps>();

    const name = ref<string>("");
    const animDone = ref<boolean>(false);
    const hoverId = ref<EOption>(EOption.BACK);
    const isExploding = ref<boolean>(false);

    const gameInfo = computed(() => {
        return profile ? getGameInfo(profile.id) : undefined;
    });

    const spriteOrigin = computed(() => {
        if (frameIndex) {
            const x = 450 + (frameIndex % 5) * 240;
            const y = (32 + Math.floor(frameIndex / 5) * 192);
            return { x, y };
        }
        return undefined;
    });

    const gameTitleStyle = computed(() => {
        const bgImg = (gameInfo.value) ? titleImages[gameInfo.value.game - 1]?.href : "";
        return {
            backgroundImage: `url(${bgImg})`,
        }
    });

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
                    setTimeout(() => {
                        animDone.value = true;
                    }, 1000);
                }
            }, 100);
        }
    }

    function onOptionHover(id: EOption) {
        hoverId.value = id;
    }

    function onOptionClick(id: EOption) {
        switch(id) {
            case EOption.BACK:
                name.value = "";
                animDone.value = false;
                requestAnimationFrame(() => {
                    emit("back");
                });
                break;
            case EOption.COMPLETED:
                name.value = "";
                animDone.value = false;
                isExploding.value = true;
                break;
            case EOption.PASSWORD:
                break;
            default:
                break;
        }
    }

    function onExplodeFinished() {
        isExploding.value = false;
        hoverId.value = EOption.BACK;
        emit("complete");
    }
</script>

<template>
    <Transition name="enter-stage">
        <div class="enter-stage" v-if="profile !== undefined">
            <div class="game-title" >
                <Transition name="side">
                    <div class="game-title__img" :style="gameTitleStyle" v-if="animDone" />
                </Transition>
            </div>
            <div class="intro-text">
                <TextDisplay :text="name" single-line />
            </div>
            <Transition name="side">
                <div class="options" v-if="animDone">
                    <TextDisplay 
                        v-for="option in EOption"
                        :key="option"
                        :text="option"
                        hoverable
                        :isHovered="hoverId === option"
                        @hover="onOptionHover(option)"
                        @click="onOptionClick(option)"
                    />
                </div>
            </Transition>
        </div>
    </Transition>
    <Sprite
        v-if="!isExploding"
        :profile="profile"
        :origin-position="spriteOrigin"
        @anim-finished="startAnimation"
    />
    <Explosion v-else @explode-finished="onExplodeFinished" />
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
        display: grid;
        grid-template-columns: repeat(3, 33%);
        justify-content: center;
    }
    .game-title {
        justify-self: center;
        margin-top: 3%;
    }
    .game-title__img {
        background-size: contain;
        background-repeat: no-repeat;
        height: 100%;
        width: 300px;
    }
    .intro-text {
        justify-self: center;
        margin-bottom: 9%;
        align-self: end;
    }
    .options {
        display: grid;
        grid-template-rows: repeat(3, min-content);
        row-gap: 16px;
        justify-self: center;
        margin-top: 5%;
    }

    .enter-stage-enter-active,
    .enter-stage-leave-active {
        transition: all 2s linear;
    }
    .enter-stage-enter-from {
        transform: translateX(-100%);
    }
    .enter-stage-leave-to {
        transform: translateX(100%);
    }

    .side-enter-from {
        opacity: 0;
    }
    .side-enter-active {
        transition: opacity 0.5s ease;
    }
</style>
