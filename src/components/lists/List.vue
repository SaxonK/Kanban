<script setup>
  import { Card } from '@/modules/card';
  import { onBeforeMount, ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import BasicMenu from '@/components/elements/menus/Basic.vue';
  import CardElement from '@/components/cards/Card.vue';
  import EditableHeading from '@/components/elements/headings/EditableTextareaHeading.vue';
  import ListActionMenu from '@/components/lists/ListActionMenu.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';
  import TextArea from '@/components/elements/fields/TextArea.vue';

  const { allLists, list } = defineProps({
    allLists: {
      type: Array,
      required: true
    },
    list: {
      type: Object,
      required: true
    }
  });
  const cardTitleField = ref(null);
  const data = ref({
    cardTitle: ''
  });
  const emit = defineEmits(['card-click']);

  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    actionMenu: false,
    addCard: false,
    clear: false
  });

  const cardClick = (card) => {
    emit('card-click', card);
  };
  const createNewCard = () => {
    if(data.value.cardTitle.trim() === '') { setLocalStateFalse('addCard'); return false; }
    
    const boardStore = useBoardStore();

    boardStore.addCardToList(list.boardId, list.id, data.value.cardTitle);
    data.value.cardTitle = '';
    setLocalStateTrue('clear');
    cardTitleField.value.$refs.textArea.focus();
  };

  onBeforeMount(() => {
    if(list.cards.length === 0) return false;
    const regeneratedCards = [];

    list.cards.forEach(card => {
      const rebuiltCard = new Card(card);
      regeneratedCards.push(rebuiltCard);
    });

    list.cards = regeneratedCards;
  });
</script>

<template>
  <transition name="fade">
    <div class="list-column">
      <BasicMenu>
        <template v-slot:header>
          <EditableHeading :module="list" type="h4" style="width: 100%;" />
          <SecondaryButton class="action-menu-button" icon="more_vert" :data-id="list.id" @click="toggleLocalState('actionMenu')" />
        </template>
        <template v-slot:main>
          <CardElement v-for="card in list.activeCards"
            :allLists="allLists"
            :card="card"
            :maxDisplayOrder="list.maximumDisplayOrder"
            :minDisplayOrder="list.minimumDisplayOrder"
            :key="card.id"
            @card-click="cardClick(card)"
          />
          <div v-if="localStates.addCard" class="add-card-container">
            <TextArea
              v-model="data.cardTitle"
              :autoFocus="true"
              class="add-card-title"
              :clearValue="localStates.clear"
              name="cardTitleField"
              placeholder="Enter a title for this card..."
              ref="cardTitleField"
              style="height: 100%; resize: none;"
              @text-area-cleared="setLocalStateFalse('clear')"
            required />
            <span class="add-card-title-hidden">{{ data.cardTitle }}&nbsp;</span>
          </div>
        </template>
        <template v-slot:footer>
          <PrimaryButton v-if="localStates.addCard"
            text="Add Card"
            type="primary"
            style="width: auto; padding: var(--space-xs) var(--space-s);"
            @click="createNewCard"
          />
          <SecondaryButton v-if="localStates.addCard" 
            icon="close" 
            @click="setLocalStateFalse('addCard')" 
          />
          <PrimaryButton v-if="!localStates.addCard"
            class="add-card"
            textAlign="left"
            icon="add"
            text="Add a card"
            @click="setLocalStateTrue('addCard')"
          />
        </template>
      </BasicMenu>
      <ListActionMenu 
        :isVisible="localStates.actionMenu" 
        :list="list"
        @toggle-action-menu="toggleLocalState('actionMenu')"
        @click-outside-action-menu="toggleLocalState('actionMenu')"
      />
    </div>
  </transition>
</template>

<style scoped>
.add-card-container .text-area {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
<style scoped>
.list-column {
  position: relative;
}
.add-card-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  position: relative;
}
.add-card-title {
  width: 100%;
}
.add-card-title-hidden {
  position: relative;
  padding: var(--space-2xs) var(--space-xs) var(--space-m);
  outline: 2px solid var(--c-primary);
  border-radius: 4px;
  visibility: hidden;
  z-index: 0;
}
button.add-card {
  font-size: var(--step-0);
  border-radius: 12px;
  background-color: rgba(var(--c-white-0), 0.25);
  color: #fff;
  margin-top: var(--space-xs);
}
button.add-card:hover {
  background-color: rgba(var(--c-white-0), 0.4);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>