<script setup lang="ts">
    import TextDisplay from "./TextDisplay.vue";

    const emit = defineEmits(["hover", "click"]);

    interface IProps {
        options: string[];
        hovered: string;
    };

    const {
        options,
        hovered,
    } = defineProps<IProps>();

    function onOptionHover(id: string) {
        emit("hover", id);
    }

    function onOptionClick(id: string) {
        emit("click", id);
    }
</script>

<template>
    <div class="entity options">
        <TextDisplay
            v-for="option in options"
            :key="option"
            :text="option"
            hoverable
            single-line
            :isHovered="hovered === option"
            @hover="onOptionHover(option)"
            @click="onOptionClick(option)"
        />
    </div>
</template>

<style scoped>
    .options {
        display: grid;
        grid-template-rows: repeat(3, min-content);
        row-gap: 16px;
        justify-self: center;
        margin-top: 5%;
    }
</style>