<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import Card from '@/components/elements/menus/Basic.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';
  import TextInput from '@/components/elements/fields/InputText.vue';

  const { boardId, totalLists } = defineProps({
    boardId: {
      type: Number,
      required: true
    },
    totalLists: {
      type: Number,
      required: true
    }
  });
  const data = ref({
    listTitle: ''
  });
  const listTitleField = ref(null);
  
  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    card: false,
    clear: false,
    error: false
  });
  
  const checkRequiredInput = () => {
    if(localStates.value.error) {
      localStates.value.error = !localStates.value.error;
    }
  };
  const clickOutsideCard = (event) => {
    if(!event.target.closest(`.add-list-card`)) {
      resetLocalStates();
    }
  };
  const createNewList = () => {
    if(data.value.listTitle === '') { toggleLocalState('error'); return false; }
    
      const boardStore = useBoardStore();
      
      boardStore.addListToBoard(boardId, data.value.listTitle);
      data.value.listTitle = '';
      setLocalStateTrue('clear');
      listTitleField.value.$refs.textInput.focus();
  };
  const toggleAddListCard = (event) => {
    event.stopPropagation();
    toggleLocalState('card');
  };

  onMounted(() => {
    document.body.addEventListener('click', clickOutsideCard);
  });
  onUnmounted(() => {
    document.body.removeEventListener('click', clickOutsideCard);
  });
</script>

<template>
  <div class="add-list-col">
    <Card class="add-list-card" v-if="localStates.card">
      <template v-slot:header>
        <TextInput
          :autoFocus="true"
          class="list-title"
          :clearValue="localStates.clear"
          name="listTitleField"
          placeholder="Enter list title..."
          ref="listTitleField"
          v-model="data.listTitle"
          @input="checkRequiredInput()"
          @text-input-cleared="setLocalStateFalse('clear')"
        required/>
      </template>
      <template v-slot:footer>
        <PrimaryButton text="Add List" type="primary" style="width: auto; padding: var(--space-xs) var(--space-s);" @click="createNewList(boardId, data.listTitle)" />
        <SecondaryButton icon="close" @click="toggleLocalState('card')" />
        <transition name="fade">
          <span v-if="localStates.error" class="error-message">Please Enter a List Title</span>
        </transition>
      </template>
    </card>
    <PrimaryButton
      v-if="!localStates.card"
      class="add-list"
      icon="add"
      :text="totalLists === 0 ? `Add a list` : `Add another list`"
      textAlign="left"
      @click="toggleAddListCard"
    />
  </div>
</template>

<style scoped>
button.add-list {
  font-size: var(--step-0);
  border-radius: 12px;
  background-color: rgba(var(--color-background-header-rgb), 0.5);
  color: rgba(var(--color-button-background-rgb), 1);
}
button.add-list:hover {
  background-color: rgba(var(--color-background-header-rgb), 0.75);
}
.error-message {
  font-size: var(--step--1);
  color: rgba(var(--c-tertiary), 1);
  transition: all ease-in-out;
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