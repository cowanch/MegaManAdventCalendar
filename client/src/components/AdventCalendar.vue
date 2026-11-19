<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { useSound } from '@vueuse/sound'
import HelpButton from './HelpButton.vue'
import HowToPlay from './HowToPlay.vue'
import Intro from './Intro.vue'
import Portrait from './Portrait.vue'
import Title from './Title.vue'
import hoverWav from '@/assets/sound/Hover.wav'
import stageSelectMp3 from '@/assets/sound/StageSelect.mp3'
import stageChosenMp3 from '@/assets/sound/StageChosen.mp3'
import { GetRobotMasterProfiles } from '@/constants/profiles'
import { ELookState } from '@/enums/ELookState'
import { ERobotMasterId } from '@/enums/ERobotMasterId'
import { COMPLETION_STATE_LS_KEY, type ICompletionState } from '@/interfaces/ICompletionState'
import type { IGameInfo } from '@/interfaces/IGameInfo'
import type { IPortraitProps } from '@/interfaces/IPortraitProps'
import type { IRobotMasterProfile } from '@/interfaces/IRobotMasterProfile'
import { getGameInfo } from '@/utils/gameInfo'

const RobotMasterProfiles: Record<ERobotMasterId, IRobotMasterProfile> = GetRobotMasterProfiles()
const DLN001_INDEX = 12
const CompletionState: ICompletionState = JSON.parse(
    localStorage.getItem(COMPLETION_STATE_LS_KEY) || '{}',
)

const hoverSound = useSound(hoverWav)
const stageSelectSound = useSound(stageSelectMp3)
const stageChosenSound = useSound(stageChosenMp3)

const lookState = computed(() => {
    const key = highlightKey.value
    if (key === undefined || key === DLN001_INDEX) {
        return ELookState.Neutral
    } else if ([10, 11].includes(key)) {
        return ELookState.Left
    } else if ([13, 14].includes(key)) {
        return ELookState.Right
    } else if ([2, 7].includes(key)) {
        return ELookState.Up
    } else if ([17, 22].includes(key)) {
        return ELookState.Down
    } else if ([0, 1, 5, 6].includes(key)) {
        return ELookState.UpLeft
    } else if ([3, 4, 8, 9].includes(key)) {
        return ELookState.UpRight
    } else if ([15, 16, 20, 21].includes(key)) {
        return ELookState.DownLeft
    } else if ([18, 19, 23, 24].includes(key)) {
        return ELookState.DownRight
    } else {
        return ELookState.Neutral
    }
})

const selectedProp = computed<IPortraitProps | undefined>(() => {
    if (selectedIndex.value) {
        return portraitProps[selectedIndex.value]?.value
    }
    return undefined
})

const selectedProfile = computed<IRobotMasterProfile | undefined>(() => {
    if (selectedProp.value) {
        return selectedProp.value?.profile
    }
    return undefined
})

const selectedGameInfo = computed<IGameInfo | undefined>(() => {
    if (selectedProfile.value) {
        return getGameInfo(selectedProfile.value.id)
    }
    return undefined
})

const rowCount = computed<number>(() => {
    return document.body.clientWidth > 768 ? 5 : 3;
})

const dayData = ref<{ day: number; id: number | undefined }[]>([])
const showTitle = ref<boolean>(true)
const highlightKey = ref<number | undefined>(undefined)
const showCalendar = ref<boolean>(false)
const showPortraits = ref<boolean>(false)
const selectedIndex = ref<number | undefined>(undefined)
const allCompleted = ref<boolean>(false)
const showInstructions = ref<boolean>(false)

// Create an array of 25 profiles for demonstration purposes
const portraitProps: Ref<IPortraitProps>[] = Array.from({ length: 25 }, () =>
    ref<IPortraitProps>({
        revealed: false,
        defeated: false,
    }),
)

onMounted(async () => {
    const res = await fetch('/api/days')
    dayData.value = await res.json()
})

watch(
    () => showCalendar.value,
    (showCalendar) => {
        if (showCalendar) {
            stageChosenSound.stop()
            stageSelectSound.play()
        }
    },
)

function reset() {
    highlightKey.value = DLN001_INDEX
    showPortraits.value = true
}

function initProfiles(dayData: { day: number; id: number | undefined }[]) {
    const megaManProfile: IRobotMasterProfile | undefined =
        RobotMasterProfiles[ERobotMasterId.DLN001]
    if (megaManProfile && portraitProps[DLN001_INDEX]) {
        portraitProps[DLN001_INDEX].value.profile = megaManProfile
    }
    dayData.forEach((info, index) => {
        const propIdx = index < DLN001_INDEX ? index : index + 1
        const prop = portraitProps[propIdx]
        if (prop) {
            prop.value.dayNumber = info.day
            if (info.id) {
                const profile = RobotMasterProfiles[info.id as ERobotMasterId]
                if (profile) {
                    prop.value.profile = profile
                }
            }
            const frameState = CompletionState[info.day]
            if (frameState) {
                const { revealed, defeated } = frameState
                prop.value.revealed = revealed
                prop.value.defeated = defeated
            }
        }
    })
    reset()
}

function getRow(row: number): { [index: number]: IPortraitProps | undefined } {
    if (row < 1 || row > 5) {
        throw new Error('Row must be 1 or 5')
    }
    const rowObj: { [index: number]: IPortraitProps | undefined } = {}
    for (let i = 0; i < rowCount.value; i++) {
        const index = (row - 1) * 5 + i
        if (portraitProps[index]) {
            rowObj[index] = showPortraits.value ? portraitProps[index].value : undefined
        }
    }
    return rowObj
}

function changeCompletionState(
    prop: IPortraitProps,
    revealedState: boolean | undefined,
    defeatedState: boolean | undefined,
) {
    const day = prop.dayNumber
    const revealed = revealedState || prop.revealed || false
    const defeated = defeatedState || prop.defeated || false
    if (day) {
        CompletionState[day] = {
            revealed,
            defeated,
        }
        localStorage.setItem(COMPLETION_STATE_LS_KEY, JSON.stringify(CompletionState))
        prop.revealed = revealed
        prop.defeated = defeated
    }
}

function startCalendar() {
    showTitle.value = false
    showCalendar.value = true
    setTimeout(() => {
        initProfiles(dayData.value)
    }, 2200)
}

function onPortraitHover(index: number) {
    if (!showPortraits.value) {
        return
    }
    highlightKey.value = parseInt(`${index}`) // Parsing the index to ensure it's a number
    hoverSound.play()
}

function onPortraitClick(index: number) {
    if (
        index === selectedIndex.value ||
        portraitProps[index]?.value.defeated ||
        !portraitProps[index]?.value.profile
    ) {
        return
    }
    if (index == DLN001_INDEX) {
        if (checkAllCompleted()) {
            allCompleted.value = true
            showPortraits.value = false
            highlightKey.value = -1
            requestAnimationFrame(() => {
                showCalendar.value = false
                stageSelectSound.stop()
            })
        }
        return
    }
    selectedIndex.value = index
    showPortraits.value = false
    highlightKey.value = -1
    requestAnimationFrame(() => {
        const day = selectedProp.value?.dayNumber
        if (day) {
            changeCompletionState(selectedProp.value, true, false)
        }
        showCalendar.value = false
        stageSelectSound.stop()
        stageChosenSound.play()
    })
}

function checkAllCompleted(): boolean {
    return Object.values(portraitProps).every(
        (prop) => prop.value.defeated || prop.value.profile?.id === ERobotMasterId.DLN001,
    )
}

function onIntroBack() {
    selectedIndex.value = undefined
    showCalendar.value = true
    setTimeout(() => {
        reset()
    }, 2200)
}

function onIntroComplete() {
    if (selectedProp.value) {
        changeCompletionState(selectedProp.value, true, true)
    }
    if (checkAllCompleted() === false) {
        onIntroBack()
    } else {
        selectedIndex.value = undefined
        allCompleted.value = true
    }
}
</script>

<template>
    <Title v-if="showTitle" @start="startCalendar" />
    <HelpButton v-if="!showTitle" @click="showInstructions = true" />
    <HowToPlay v-if="showInstructions" @back="showInstructions = false" />
    <div class="grid-container">
        <Transition v-for="row in 5" :name="row % 2 === 0 ? 'even' : 'odd'" :key="row">
            <div class="container" v-if="showCalendar">
                <Portrait
                    v-for="(props, index) in getRow(row)"
                    :key="index"
                    class="portrait"
                    v-bind="props"
                    :is-hovered="index == highlightKey"
                    :look-state="index == DLN001_INDEX ? lookState : undefined"
                    @hover="onPortraitHover(index)"
                    @click="onPortraitClick(index)"
                />
            </div>
        </Transition>
    </div>
    <Intro
        :profile="selectedProfile"
        :game-info="selectedGameInfo"
        :frame-index="parseInt(`${selectedIndex}`)"
        :show-ending="allCompleted"
        @back="onIntroBack"
        @complete="onIntroComplete"
    />
</template>

<style scoped>
.grid-container {
    margin-top: 72px;
}
.container {
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-template-rows: repeat(5, min-content);
    justify-content: center;
    column-gap: 66px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(3, min-content);
        grid-template-rows: repeat(3, min-content);
        justify-content: space-around;
        transform: scale(0.9);
    }
}
.portrait {
    justify-self: center;
}

.even-enter-active,
.odd-enter-active,
.even-leave-active,
.odd-leave-active {
    transition: all 2s linear;
}
.odd-enter-from,
.even-leave-to {
    transform: translateX(-100%);
}
.even-enter-from,
.odd-leave-to {
    transform: translateX(100%);
}
</style>
