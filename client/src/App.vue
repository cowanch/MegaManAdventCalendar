<script setup lang="ts">
    import AdventCalendar from "./components/AdventCalendar.vue";
    import MobileNotSupported from "./components/MobileNotSupported.vue";

    // const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isMobile = false;
</script>

<template>
    <MobileNotSupported v-if="isMobile" />
    <AdventCalendar v-else />
</template>
