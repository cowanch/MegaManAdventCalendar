<script setup lang="ts">
    import type { EPasswordEntry } from '@/enums/EPasswordEntry';
    import { getPipMargins } from '@/utils/passwordPositioning';
    import { computed } from 'vue';

    interface IProps {
        game?: number;
        password?: EPasswordEntry[];
    }

    const {
        game = undefined,
        password = undefined,
    } = defineProps<IProps>();

    const passwordStyle = computed(() => {
        if (game) {
            const bgImg = new URL(`../assets/img/password/MM${game}_Password.png`, import.meta.url).href;
            return {
                backgroundImage: `url(${bgImg})`,
            };
        }
        return undefined;
    });

    function getPipStyle(entry: EPasswordEntry) {
        if (game) {
            return getPipMargins(game, entry);
        }
    };
</script>

<template>
    <div class="password-container">
        <div class="password-stack">
            <div v-for="(entry, index) in password" :key="index" class="pip" :style="getPipStyle(entry)" />
            <div v-if="passwordStyle" :style="passwordStyle" class="password-image" />
        </div>
    </div>
</template>

<style scoped>
    .password-container {
        display: flex;
        justify-content: flex-end;
        height: 336px;
        width: 100%;
    }
    .password-stack {
        display: grid;
    }
    .password-stack div {
        grid-area: 1 / 1;
    }
    .pip {
        background-image: url("../assets/img/PasswordPip.png");
        width: 24px;
        height: 24px;
        z-index: 2;
    }
    .password-image {
        background-size: contain;
        background-repeat: no-repeat;
        width: 328px;
        margin-right: 48px;
        margin-bottom: 8px;
    }
</style>
