<script setup>
  import { Card } from '@/modules/card';
  import { List } from '@/modules/list';
  import { ref, onBeforeMount } from 'vue';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import { useRoute } from 'vue-router';
  import { useBoardStore } from '@/stores/boardStore';
  import AddListMenu from '@/components/lists/AddListMenu.vue';
  import BaseHeader from '@/components/elements/headers/BaseHeader.vue';
  import BoardSettings from '@/components/boards/BoardSettings.vue';
  import CardDetails from '@/components/cards/CardDetails.vue';
  import EditableHeading from '@/components/elements/headings/EditableInputHeading.vue';
  import FavouriteButton from '@/components/boards/BoardFavouriteButton.vue';
  import ListElement from '@/components/lists/List.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const route = useRoute();
  const boardStore = useBoardStore();
  const boardId = parseInt(route.params.id);
  const board = ref(boardStore.getBoardById(boardId));
  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    boardSettings: false,
    cardDetails: false
  });

  const cardData = ref(new Card({id: 0, listId: 0, title: 'Test Title', displayOrder: 0}));
  cardData.value.addActivity('add', [cardData.value.title, 'null']);

  const boardSettingsClickEvent = () => {
    if(!localStates.value.boardSettings) return false;
    setLocalStateFalse('boardSettings');
  };
  const getBackgroundValue = () => {
    if (!board.value || !board.value.background) return '';
    return board.value.background.startsWith('#') ? board.value.background : `url(${board.value.background})`;
  };
  const toggleBoardSettings = (event) => {
    event.stopPropagation();
    toggleLocalState('boardSettings');
  };
  const toggleCardDetails = (card) => {
    cardData.value = card;
    setLocalStateTrue('cardDetails');
  };
  const updateCardDetails = (property, value) => {
    if(property === 'comment') {
      cardData.value.addActivity('comment', value);
      boardStore.saveToLocalStorage();
      return true;
    }
    cardData.value[property] = value;
    boardStore.saveToLocalStorage();
  };

  onBeforeMount(() => {
    if(board.value.lists.length === 0) return false;
    const regeneratedLists = [];

    board.value.lists.forEach(list => {
      const rebuiltList = new List(list);
      regeneratedLists.push(rebuiltList);
    });

    board.value.lists = regeneratedLists;
  });
</script>

<template>
  <main>
    <div class="main-wrapper" :style="{ background: getBackgroundValue() }">
      <BaseHeader :height="60" style="background: rgba(var(--color-background-header-rgb), 0.5); backdrop-filter: blur(4px);">
        <EditableHeading :module="board" type="h3" style="margin-left: calc(0px - var(--space-2xs));" />
        <div class="board-options">
          <FavouriteButton :details="board" />
          <SecondaryButton icon="settings" animation="rotate" @click="toggleBoardSettings" />
        </div>
      </BaseHeader>
      <div class="board-container">
        <div class="board-grid">
          <ListElement v-for="list in board.activeLists"
            :allLists="board.activeLists"
            :list="list"
            :key="list.id"
            @card-click="toggleCardDetails"
          />
          <AddListMenu :boardId="boardId" :totalLists="board.activeLists.length" />
        </div>
      </div>
      <transition name="slide-right">
        <BoardSettings v-if="localStates.boardSettings"
          :board="board"
          @settings-click-event="boardSettingsClickEvent"
        />
      </transition>
    </div>
  </main>
  <CardDetails
    :allLists="board.activeLists"
    :card="cardData"
    :isVisible="localStates.cardDetails"
    @close-modal="setLocalStateFalse('cardDetails')"
    @update-card-details="updateCardDetails"
  />
</template>

<style scoped>
.main-wrapper {
  height: 100%;
  background-size: cover !important;
  background-position: center !important;
}
.board-options {
  display: flex;
  align-items: center;
  gap: var(--space-s);
}
.board-container {
  position: relative;
  height: calc(100% - 60px);
}
.board-grid {
  display: flex;
  height: 100%;
  flex-direction: row;
  padding: var(--space-s-m) var(--space-s-l);
  gap: var(--grid-gutter);
  overflow-x: scroll;
}
.board-grid > * {
  position: relative;
  display: block;
  width: 325px;
  flex: 0 0 auto;
}
</style>