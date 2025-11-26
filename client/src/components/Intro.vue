<script setup lang="ts">
    import { computed, ref, watch } from "vue";
    import { useSound } from "@vueuse/sound";
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
    }

    const {
        profile = undefined,
        gameInfo = undefined,
        frameIndex = undefined,
    } = defineProps<IProps>();

    const explodeSound = useSound(explodeWav);
    const menuOpenSound = useSound(menuOpenWav);

    const name = ref<string>("");
    const animDone = ref<boolean>(false);
    const hoverId = ref<EOption>(EOption.BACK);
    const isExploding = ref<boolean>(false);
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

    watch(
        () => profile,
        (profile) => {
        if (profile !== undefined) {
            
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
                showPassword.value = false;
                requestAnimationFrame(() => {
                    emit("back");
                });
                break;
            case EOption.COMPLETED:
                name.value = "";
                animDone.value = false;
                showPassword.value = false;
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
        isExploding.value = false;
        hoverId.value = EOption.BACK;
        emit("complete");
    }
</script>

<template>
    <Transition name="password">
        <Password v-show="showPassword" :game="gameInfo?.game" :password="profile?.password"/>
    </Transition>
    <Transition name="enter-stage">
        <div class="enter-stage" v-if="profile && gameInfo">
            <div class="game-title" >
                <Transition name="side">
                    <div class="game-title__img" :style="gameTitleStyle" v-if="animDone" />
                </Transition>
            </div>
            <div class="intro-text">
                <TextDisplay :text="name" single-line />
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
