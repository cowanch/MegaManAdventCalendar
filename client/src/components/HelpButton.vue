<script setup lang="ts">
    import TextDisplay from './TextDisplay.vue';
    const emit = defineEmits(['click']);
</script>

<template>
    <div class="help-btn" @click="emit('click')">
        <TextDisplay class="help-btn-text" text="?" />
    </div>
</template>

<style scoped>
    .help-btn {
        cursor: pointer;
        background-color: #0070EC;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid white;
        position: fixed;
        right: 20px;
    }
    .help-btn-text {
        padding-left: 8px;
        padding-top: 8px
    }
</style>