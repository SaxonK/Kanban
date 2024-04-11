<script setup>
  import { ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState';
  import InputText from '@/components/elements/fields/InputText.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';

  const { card } = defineProps({
    card: {
      type: Object,
      required: true
    }
  });
  const data = ref({
    buttonText: 'Add',
    title: ''
  });
  const emit = defineEmits('add-checklist');

  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    error: false
  });

  const addChecklist = (title) => {
    if(title !== '') {
      const boardStore = useBoardStore();
      card.addChecklist(title);
      card.addActivity('add', [`the checklist '${title}'`, 'this card']);
      boardStore.saveToLocalStorage();
      emit('add-checklist');
    } else {
      setLocalStateTrue('error');
      data.value.buttonText = 'Title must be populated'
      setTimeout(() => {
        setLocalStateFalse('error');
        data.value.buttonText = 'add';
      }, 2000);
    }
  };
</script>

<template>
  <div class="configuration-details">
    <InputText v-model="data.title" :autoFocus="true" label="Title" required/>
    <PrimaryButton class="submit-button"
      :class="{ 'submit-error' : localStates.error }"
      :text="data.buttonText"
      type="primary"
      @click="addChecklist(data.title)"
    />
  </div>
</template>

<style scoped>
.configuration-details {
  display: flex;
  flex-direction: column;
  margin-bottom: 0px - var(--space-2xs);
  gap: var(--space-xs);
}
.submit-button {
  transition: all 600ms ease-in-out;
}
button.submit-error {
  animation-name: submit-error;
  animation-duration: 300ms;
  background-color: rgba(var(--c-tertiary), 0.75) !important;
}

/* Submit error animation */
@keyframes submit-error {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-2deg); }
  100% { transform: rotate(0deg); }
}
</style>