<script setup lang="ts">
    import { ref } from 'vue';
    import TextDisplay from './TextDisplay.vue';
    import TextOptions from './TextOptions.vue';
    import BuyMeACoffee from './BuyMeACoffee.vue';
    import HowToPlay from './HowToPlay.vue';

    const emit = defineEmits(["start"]);

    enum ETitleOption {
        START = "Start",
        HOW_TO_PLAY = "How to Play",
    }

    const hoverId = ref<ETitleOption>(ETitleOption.START);
    const showInstructions = ref<boolean>(false);

    function onOptionHover(id: ETitleOption) {
        hoverId.value = id;
    }

    function onOptionClick(id: ETitleOption) {
        switch(id) {
            case ETitleOption.START:
                emit("start");
                break;
            case ETitleOption.HOW_TO_PLAY:
                showInstructions.value = true;
                break;
            default:
                break;
        }
    }
</script>

<template>
    <div class="black-bg">
        <div class="title-container">
            <div class="title-logo"/>
            <TextDisplay text="Advent Calendar" single-line class="title-text"/>
            <div class="options-container">
                <TextOptions
                    :options="Object.values(ETitleOption)"
                    :hovered="hoverId"
                    @hover="onOptionHover"
                    @click="onOptionClick"
                />
                <div class="helmet" />
            </div>
            <BuyMeACoffee />
        </div>
        <HowToPlay v-if="showInstructions" @back="showInstructions = false" />
    </div>
</template>

<style scoped>
    .black-bg {
        background-color: black;
        width: 100%;
        height: 100vh;
        margin-top: -8px;
        margin-bottom: -8px;
    }
    .title-container {
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .title-logo {
        background-image: url("../assets/img/title/MM1_Title.png");
        width: 546px;
        height: 168px;
        margin-top: 100px;
    }
    .title-text {
        padding-top: 24px;
    }
    .options-container {
        display: flex;
        margin-top: 100px;
        margin-bottom: 125px;
        justify-content: space-evenly;
        width: 100vh;
    }
    .helmet {
        background-image: url("../assets/img/Helmet.png");
        width: 201px;
        height: 159px;
    }
</style>