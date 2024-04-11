<script setup>
  import { computed, ref, toRefs, watchEffect } from 'vue';

  const props = defineProps({
    completedItems: {
      type: Number,
      required: true,
      default: 0
    },
    totalItems: {
      type: Number,
      required: true
    }
  });
  const { completedItems, totalItems } = toRefs(props);

  /* Computed Properties */
  const percentageProgress = computed(() => {
    const percentage = completedItems.value === 0 ? 0 : (completedItems.value / totalItems.value) * 100;
    return Math.round(percentage);
  });
</script>

<template>
  <div class="progress-bar-container">
    <span class="progress-bar-percentage">{{ `${percentageProgress}%` }}</span>
    <div class="progress-bar-completion">
      <div class="progress-bar-completion-amount" :style="`width: ${percentageProgress}%;`"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  display: flex;
  flex-direction: row;
  gap: var(--space-s);
}
.progress-bar-container .progress-bar-percentage {
  display: block;
  width: 24px;
  text-align: center;
  font-size: var(--step--2);
  font-weight: bold;
}
.progress-bar-container .progress-bar-completion {
  position: relative;
  width: 100%;
  margin-left: var(--space-2xs);
  background: var(--color-background-soft);
  border-radius: 26px;
  overflow: hidden;
}
.progress-bar-container .progress-bar-completion .progress-bar-completion-amount {
  top: 0;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: rgba(var(--c-primary), 1);
  transition: all 600ms ease-out;
}
</style>