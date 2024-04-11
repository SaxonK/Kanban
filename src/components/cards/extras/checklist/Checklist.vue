<script setup>
  import { computed, ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import ChecklistItem from '@/components/cards/extras/checklist/ChecklistItem.vue';
  import InputText from '@/components/elements/fields/InputText.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import ProgressBar from '@/components/cards/extras/checklist/ProgressBar.vue';
  import Section from '@/components/elements/menus/Section.vue';

  const { card, checklist } = defineProps({
    card: {
      type: Object,
      required: true
    },
    checklist: {
      type: Object,
      required: true
    }
  });
  const data = ref({
    title: ''
  });

  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    addItem: false,
    error: false
  });

  /* Computed Properties */
  const activeChecklistItems = computed(() => {
    const activeItems = checklist.items.filter(item => !item.isDeleted);
    return activeItems;
  });
  const totalChecklistItems = computed(() => {
    const activeItems = checklist.items.filter(item => !item.isDeleted);
    return activeItems.length;
  });
  const totalChecklistItemsCompleted = computed(() => {
    const completedItems = checklist.items.filter(item => !item.isDeleted && item.completed);
    return completedItems.length;
  });

  /* Methods */
  const addChecklistItem = (title) => {
    if(title !== '') {
      const boardStore = useBoardStore();
      card.addChecklistItem(checklist.id, title);
      boardStore.saveToLocalStorage();
      data.value.title = '';
      toggleLocalState('addItem');
    } else {
      setLocalStateTrue('error');
      setTimeout(() => {
        setLocalStateFalse('error');
      }, 2000);
    }
  };
  const cancelChecklistItem = () => {
    data.value.title = '';
    toggleLocalState('addItem');
  };
  const deleteChecklist = () => {
    const boardStore = useBoardStore();
    checklist.isDeleted = true;
    boardStore.saveToLocalStorage();
  };
</script>
<template>
  <Section class="checklist" :headline="checklist.title" headlineType="h3" icon="check_box">
    <PrimaryButton
      class="delete-button"
      text="Delete"
      type="soft"
      @click="deleteChecklist"
    />
    <div class="checklist-container">
      <ProgressBar
        :totalItems="totalChecklistItems"
        :completedItems="totalChecklistItemsCompleted"
      />
      <div class="checklist-items">
        <ChecklistItem v-for="item in activeChecklistItems"
          :card="card"
          :checklistItem="item"
          :key="item"
        />
        <InputText v-if="localStates.addItem" v-model="data.title"
          :autoFocus="true"
          placeholder="Add a new item"
        required />
      </div>
      <PrimaryButton v-if="!localStates.addItem"
        class="add-item-button"
        text="Add an item"
        type="soft"
        @click="toggleLocalState('addItem')"
      />
      <div class="checklist-add-item-actions">
        <PrimaryButton v-if="localStates.addItem"
          class="add-item-button"
          :class="{ 'submit-error' : localStates.error }"
          text="Add"
          type="primary"
          @click="addChecklistItem(data.title)"
        />
        <PrimaryButton v-if="localStates.addItem"
          class="add-item-button"
          text="Cancel"
          type="soft"
          @click="cancelChecklistItem"
        />
      </div>
    </div>
  </Section>
</template>

<style scoped>
.checklist {
  position: relative;
}
.checklist-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
}
.checklist-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.checklist-add-item-actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
}
.add-item-button {
  width: fit-content;
}
button.submit-error {
  animation-name: submit-error;
  animation-duration: 300ms;
  background-color: rgba(var(--c-tertiary), 0.75) !important;
}
</style>