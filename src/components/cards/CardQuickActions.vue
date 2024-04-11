<script setup>
  import { computed, ref, onBeforeMount } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const { allLists, card, maxDisplayOrder, minDisplayOrder } = defineProps({
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

  /* Computed Properties */
  const currentListIndex = computed(() => {
    return allLists.findIndex(list => list.id === card.listId);
  });
  const currentListDisplayOrder = computed(() => {
    const currentList = allLists[currentListIndex.value];
    return currentList.displayOrder;
  });
  const minimumListDisplayOrder = computed(() => {
    const minDisplayOrder = allLists.reduce((min, list) => list.displayOrder < min ? list.displayOrder : min, Infinity);
    return minDisplayOrder;
  });
  const maximumListDisplayOrder = computed(() => {
    const maxDisplayOrder = allLists.reduce((max, list) => list.displayOrder > max ? list.displayOrder : max, -Infinity);
    return maxDisplayOrder;
  });
  const currentCardIndex = computed(() => {
    const currentList = allLists[currentListIndex.value];
    return currentList.cards.findIndex(cardItem => cardItem.id === card.id);
  });
  const activeCardsIndex = computed(() => {
    const currentList = allLists[currentListIndex.value];
    return currentList.activeCards.findIndex(cardItem => cardItem.id === card.id);
  });

  /* Methods */
  const moveCardDownList = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const boardStore = useBoardStore();

    let currentList = allLists[currentListIndex.value];
    let currentDisplayOrder = card.displayOrder;
    let nextCardIndex = activeCardsIndex.value + 1;
    let nextCard = currentList.activeCards[nextCardIndex];
    let nextCardDisplayOrder = nextCard.displayOrder;

    card.displayOrder = nextCardDisplayOrder;
    nextCard.displayOrder = currentDisplayOrder;
    boardStore.saveToLocalStorage();
  };
  const moveCardUpList = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const boardStore = useBoardStore();

    let currentList = allLists[currentListIndex.value];
    let currentDisplayOrder = card.displayOrder;
    let nextCardIndex = activeCardsIndex.value - 1;
    let nextCard = currentList.activeCards[nextCardIndex];
    let nextCardDisplayOrder = nextCard.displayOrder;

    card.displayOrder = nextCardDisplayOrder;
    nextCard.displayOrder = currentDisplayOrder;
    boardStore.saveToLocalStorage();
  };
  const moveCardToNextList = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const boardStore = useBoardStore();

    let currentList = allLists[currentListIndex.value];
    let nextList = allLists[currentListIndex.value + 1];
    let newDisplayOrder = nextList.maximumDisplayOrder + 1;

    currentList.cards.splice(currentCardIndex.value, 1);
    card.displayOrder = newDisplayOrder;
    card.listId = nextList.id;
    nextList.cards.push(card);
    card.addActivity('progress', ['this card', currentList.id, card.listId]);
    boardStore.saveToLocalStorage();
  };
  const moveCardToPreviousList = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const boardStore = useBoardStore();

    let currentList = allLists[currentListIndex.value];
    let previousList = allLists[currentListIndex.value - 1];
    let newDisplayOrder = previousList.maximumDisplayOrder + 1;

    currentList.cards.splice(currentCardIndex.value, 1);
    card.displayOrder = newDisplayOrder;
    card.listId = previousList.id;
    previousList.cards.push(card);
    card.addActivity('rollback', ['this card', currentList.id, card.listId]);
    boardStore.saveToLocalStorage();
  };
</script>

<template>
  <div class="card-quick-actions">
    <div class="quick-actions-wrapper">
      <SecondaryButton v-if="currentListDisplayOrder != minimumListDisplayOrder"
        class="quick-action-button"
        animation="scale"
        icon="arrow_back"
        :size="18"
        @click="moveCardToPreviousList"
      />
      <SecondaryButton v-if="card.displayOrder != minDisplayOrder" 
        class="quick-action-button"
        animation="scale"
        icon="arrow_upward" 
        :size="18" 
        @click="moveCardUpList"
      />
      <SecondaryButton v-if="card.displayOrder != maxDisplayOrder" 
        class="quick-action-button"
        animation="scale"
        icon="arrow_downward"
        :size="18"
        @click="moveCardDownList"
      />
      <SecondaryButton v-if="currentListDisplayOrder != maximumListDisplayOrder"
        class="quick-action-button"
        animation="scale"
        icon="arrow_forward"
        :size="18"
        @click="moveCardToNextList"
      />
    </div>
  </div>
</template>

<style scoped>
.card-quick-actions {
  position: absolute;
  display: grid;
  padding-left: var(--space-2xs);
  background: var(--color-background-mute);
  top: 0;
  right: var(--space-2xs);
  bottom: 0;
  transition: 
    all 600ms,
    grid-template-columns 300ms
    ease-out;
  box-shadow: -6px 0px 10px -4px rgba(0, 0, 0, 0.4);
  gap: var(--space-3xs);
}
.quick-actions-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}
button.secondary-button.quick-action-button {
  width: fit-content;
  height: fit-content;
  padding: var(--space-3xs);
  align-items: center;
}
</style>