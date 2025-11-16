<script setup lang="ts">
    import type { EPasswordEntry } from '@/enums/EPasswordEntry';
    import { getPasswordScreen } from '@/utils/assetsLoader';
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

    const passwordScreen = computed(() => {
        return game ? getPasswordScreen(game) : undefined;
    });

    const passwordStyle = computed(() => {
        if (passwordScreen.value) {
            return {
                backgroundImage: `url(${passwordScreen.value.url})`,
            };
        }
        return undefined;
    });

    function getPipStyle(entry: EPasswordEntry) {
        const style = { backgroundPosition: `-${Math.floor(entry / 36) < 1 ? 0 : 24}px 0px` };
        if (game) {
            Object.assign(style, getPipMargins(game, entry));
        }
        return style;
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
