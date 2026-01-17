<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppToastProvider } from './components/toast';

</script>

<template>
  <div>
    <AppToastProvider />
    <RouterView />
  </div>
</template>

<style scoped></style>
