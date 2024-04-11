<script setup>
  import { useBoardStore } from '@/stores/boardStore';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const { card, checklistItem } = defineProps({
    card: {
      type: Object,
      required: true
    },
    checklistItem: {
      type: Object,
      required: true
    }
  });

  const deleteChecklistItem = () => {
    const boardStore = useBoardStore();
    checklistItem.isDeleted = true;
    boardStore.saveToLocalStorage();
  };
  const saveChanges = () => {
    const boardStore = useBoardStore();
    const status = checklistItem.completed ? 'complete' : 'incomplete';
    card.addActivity('mark', [`the checklist item '${checklistItem.title}' as ${status}`, 'this card']);
    boardStore.saveToLocalStorage();
  };
</script>

<template>
  <div class="checkbox-item">
    <div class="checkbox-container">
      <input
        class="checkbox"
        type="checkbox"
        v-model="checklistItem.completed"
        @change="saveChanges"
      />
    </div>
    <div class="checkbox-item-details" :class="{ 'completed' : checklistItem.completed }">
      <span class="checkbox-item-title">{{ checklistItem.title }}</span>
      <div class="checkbox-item-actions">
        <secondaryButton
          icon="timer"
          :size="18"
        />
        <secondaryButton
          icon="delete"
          :size="18"
          @click="deleteChecklistItem"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-item {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
  align-items: center;
}
.checkbox-container {
  position: relative;
  display: flex;
  width: 26px;
  flex-direction: column;
  align-items: center;
}
.checkbox-item input.checkbox[type="checkbox"] {
  position: relative;
  width: 18px;
  height: 18px;
  margin: auto;
  border-radius: 3px;
  border: 2px solid rgba(var(--c-white-3), 0.4);
  background: var(--color-background-mute);
  appearance: none;
  -webkit-appearance: none;
  transition: all 400ms ease-out;
  cursor: pointer;
}
.checkbox-item input.checkbox[type="checkbox"]:hover {
  border: 2px solid var(--color-text);
}
.checkbox-item input.checkbox[type="checkbox"]:checked {
  background: rgba(var(--c-primary), 1);
  border: 2px solid rgba(var(--c-primary), 1);
  color: #fff;
}
.checkbox-item input.checkbox[type="checkbox"]::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  margin-left: -2.5px;
  margin-top: -4px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  font-family: "material symbols rounded";
  transition: all 400ms ease-out;
}
.checkbox-item input.checkbox[type="checkbox"]:checked::before {
  content: "\e876";
}
.checkbox-item-details {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  border-radius: 6px;
  margin-left: var(--space-2xs);
  background: var(--color-background-soft);
  padding: var(--space-3xs) var(--space-2xs);
  transition: 300ms ease-in-out;
  gap: var(--space-xs);
  cursor: pointer;
}
.completed {
  background: var(--color-background);
}
.checkbox-item-details.completed:hover {
  background: var(--color-background);
}
.checkbox-item-details:hover {
  background: rgba(var(--c-white-0), 0.15);
}
.completed .checkbox-item-title {
  text-decoration: line-through;
}
.checkbox-item-title {
  width: 100%;
}
.checkbox-item-actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
  align-items: center;
}
</style>