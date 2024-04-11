<script setup>
  import { useBoardStore } from '@/stores/boardStore';
  import CreatedBoards from '@/components/boards/Board.vue';

  const boardStore = useBoardStore();
</script>

<template>
  <main>
    <div class="layout-container">
      <div class="board-container">
        <CreatedBoards v-for="board in boardStore.activeBoards" :details="board" :key="board.id" />
      </div>
    </div>
  </main>
</template>

<style scoped>
  .board-container {
    display: grid;
    gap: var(--grid-gutter);
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    padding: var(--space-s-m) 0;
  }
</style>