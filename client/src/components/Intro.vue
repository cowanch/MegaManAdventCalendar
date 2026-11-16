<script setup lang="ts">
    import { computed, ref, watch } from "vue";
    import { useSound } from "@vueuse/sound";
    import Ending from "./Ending.vue";
    import Explosion from "./Explosion.vue";
    import Password from "./Password.vue";
    import Sprite from "./Sprite.vue";
    import TextDisplay from "./TextDisplay.vue";
    import TextOptions from "./TextOptions.vue";
    import explodeWav from "@/assets/sound/Explode.wav";
    import menuOpenWav from "@/assets/sound/MenuOpen.wav";
    import type { IGameInfo } from "@/interfaces/IGameInfo";
    import type { IRobotMasterProfile } from "@/interfaces/IRobotMasterProfile";
    import { getTitle } from "@/utils/assetsLoader";

    const emit = defineEmits(["complete", "back"]);
    
    enum EOption {
        COMPLETED = "Completed",
        PASSWORD = "Password",
        BACK = "Back",
    }

    interface IProps {
        profile?: IRobotMasterProfile;
        gameInfo?: IGameInfo;
        frameIndex?: number,
        showEnding?: boolean;
    }

    const {
        profile = undefined,
        gameInfo = undefined,
        frameIndex = undefined,
        showEnding = false,
    } = defineProps<IProps>();

    const explodeSound = useSound(explodeWav);
    const menuOpenSound = useSound(menuOpenWav);

    const animDone = ref<boolean>(false);
    const hoverId = ref<EOption>(EOption.BACK);
    const isExploding = ref<boolean>(false);
    const showName = ref<boolean>(false);
    const showPassword = ref<boolean>(false);

    const spriteOrigin = computed(() => {
        if (frameIndex !== undefined) {
            const x = 471 + (frameIndex % 5) * 240;
            const y = (32 + Math.floor(frameIndex / 5) * 192);
            return { x, y };
        }
        return undefined;
    });

    const gameTitle = computed(() => {
        return gameInfo ? getTitle(gameInfo.game) : undefined;
    });

    const gameTitleStyle = computed(() => {
        if (gameTitle.value) {
            return {
                backgroundImage: `url(${gameTitle.value})`,
            }
        }
    });

    const availableOptions = computed<EOption[]>(() => {
        return Object.values(EOption).filter((opt) => opt !== EOption.PASSWORD || ( gameInfo && gameInfo.game > 1));
    });

    const showEnterStage = computed(() => {
        return (profile !== undefined && gameInfo !== undefined) || showEnding;
    });

    watch(
        () => profile,
        (profile) => {
        if (profile === undefined) {
            isExploding.value = false;
            hoverId.value = EOption.BACK;
        }
    });

    function onOptionHover(id: EOption) {
        hoverId.value = id;
    }

    function onOptionClick(id: EOption) {
        switch(id) {
            case EOption.BACK:
                animDone.value = false;
                showPassword.value = false;
                showName.value = false;
                requestAnimationFrame(() => {
                    emit("back");
                });
                break;
            case EOption.COMPLETED:
                animDone.value = false;
                showPassword.value = false;
                showName.value = false;
                isExploding.value = true;
                explodeSound.play();
                break;
            case EOption.PASSWORD:
                showPassword.value = !showPassword.value;
                menuOpenSound.play();
                break;
            default:
                break;
        }
    }

    function onExplodeFinished() {
        emit("complete");
    }
</script>

<template>
    <Transition name="password">
        <Password v-show="showPassword" :game="gameInfo?.game" :password="profile?.password"/>
    </Transition>
    <Transition name="enter-stage">
        <div class="enter-stage" v-if="showEnterStage">
            <div class="entity game-title" >
                <Transition name="side">
                    <div class="game-title__img" :style="gameTitleStyle" v-if="animDone" />
                </Transition>
            </div>
            <div class="entity intro-text">
                <TextDisplay v-if="showName && profile" :text="profile.name" single-line type-in @done-typing="animDone = true" />
            </div>
            <Transition name="side">
                <TextOptions 
                    v-if="animDone"
                    :options="availableOptions"
                    :hovered="hoverId"
                    @hover="onOptionHover"
                    @click="onOptionClick"
                />
            </Transition>
        </div>
    </Transition>
    <Sprite
        v-if="!isExploding"
        :profile="profile"
        :game-info="gameInfo"
        :origin-position="spriteOrigin"
        @anim-finished="showName = true"
    />
    <Explosion v-else @explode-finished="onExplodeFinished" />
    <Ending v-if="showEnding"/>
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

    .password-enter-from,
    .password-leave-to {
        transform: translate(400px);
    }
    .password-enter-active,
    .password-leave-active {
        transition: all 0.5s linear;
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
