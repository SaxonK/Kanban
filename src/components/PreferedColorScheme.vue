<script setup>
  import { ref } from 'vue';
  
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const colorScheme = ref(prefersDarkMode ? 'dark' : 'light');

  const toggleColorScheme = () => {
    document.body.classList.toggle('dark-mode');
    colorScheme.value === 'dark' ? colorScheme.value = 'light' : colorScheme.value = 'dark';
  }
</script>

<template lang="">
  <div class="color-scheme-container" @click="toggleColorScheme()">
    <span class="material-symbols-rounded">{{ colorScheme }}_mode</span>
  </div>
</template>

<style scoped>
.color-scheme-container {
  position: relative;
  display: flex;
  height: fit-content;
  align-items: center;
  gap: var(--space-2xs);
  background-color: var(--color-background);
  padding: var(--space-3xs);
  border: 2px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;
}
</style>