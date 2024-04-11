<script setup>
  import QuickActions from '@/components/cards/CardQuickActions.vue';

  defineProps({
    allLists: {
      type: Array,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    maxDisplayOrder: {
      type: Number,
      required: true
    },
    minDisplayOrder: {
      type: Number,
      required: true
    }
  });
</script>

<template>
  <div class="card-container" @click="$emit('card-click')">
    <div class="card">
      <h3>{{ card.title }}</h3>
      <QuickActions
        :allLists="allLists"
        :card="card"
        :maxDisplayOrder="maxDisplayOrder"
        :minDisplayOrder="minDisplayOrder"
      />
    </div>
    <div class="card-backdrop"></div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative;
}
.card {
  position: relative;
  display: block;
  padding: var(--space-2xs);
  background: var(--color-background-mute);
  border-radius: 4px;
  transition: all 300ms ease-in-out;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}
h3 {
  font-size: var(--step-0);
  font-weight: 400;
}
.card-backdrop {
  position: absolute;
  background: rgba(var(--c-primary), 1);
  border-radius: 4px;
  opacity: 0;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  z-index: 0;
}
.card-container:hover .card-backdrop {
  opacity: 1;
}
.card .card-quick-actions {
  grid-template-columns: 0fr;
}
.card:hover .card-quick-actions {
  grid-template-columns: 1fr;
}
</style>