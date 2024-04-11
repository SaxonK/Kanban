<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import BasicMenu from '@/components/elements/menus/Basic.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import TextInput from '@/components/elements/fields/InputText.vue';

  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    form: false,
    error: false
  });

  const data = ref({
    boardName: '',
    description: '',
    background: ''
  });
  
  const checkRequiredInput = () => {
    if(localStates.value.error) {
      toggleLocalState('error');
    }
  };
  const createNewBoard = () => {
    const boardStore = useBoardStore();
    if(data.value.boardName.trim() === '') {
      toggleLocalState('error');
    } else {
      boardStore.createBoard({
        name: data.value.boardName, 
        description: data.value.description, 
        background: data.value.background
      });
    }
  };
  const handleClickOutsideForm = (event) => {
    if (!event.target.closest('.new-board-container')) {
      setLocalStateFalse('form');
    }
  };
  
  onMounted(() => {
    document.body.addEventListener('click', handleClickOutsideForm);
  });
  onUnmounted(() => {
    document.body.removeEventListener('click', handleClickOutsideForm);
  });
</script>

<template>
  <div class="new-board-container">
    <primaryButton text="New Board" type="primary" @click="toggleLocalState('form')" />
    <transition name="fade">
      <BasicMenu class="new-board-form" v-if="localStates.form">
        <template v-slot:header>
          <h3>Create a new board</h3>
        </template>
        <template v-slot:main>
          <TextInput label="Board Name" v-model="data.boardName" @text-input-populated="checkRequiredInput" required />
          <TextInput label="Description" v-model="data.description" />
          <TextInput label="Background" v-model="data.background" />
        </template>
        <template v-slot:footer>
          <div class="footer-content">
            <PrimaryButton text="Create" type="primary" @click="createNewBoard" />
            <transition name="fade">
              <div v-if="localStates.error" class="error-message">
                <span>Unable to create a new board. <br> Please ensure you have populated all required fields and try again.</span>
              </div>
            </transition>
          </div>
        </template>
      </BasicMenu>
    </transition>
  </div>
</template>

<style scoped>
.new-board-container {
  position: relative;
}
.new-board-form {
  position: absolute;
  display: grid;
  width: max-content;
  gap: var(--space-xs);
  border: 1px solid var(--color-border);
  padding: var(--space-m);
  top: 0;
  right: calc(100% + var(--space-s));
  border-radius: 12px;
  background: rgba(var(--c-black--1), 0.75);
  backdrop-filter: blur(8px);
  box-shadow: 0px 3px 6px -1px var(--color-border-hover);
  transition: all 300ms ease-in-out;
  z-index: 2;
}
.new-board-form h3 {
  width: 100%;
  text-align: center;
  font-weight: 600;
}
.new-board-form .footer-content {
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.new-board-form button {
  margin-top: var(--space-xs);
}
.new-board-form .error-message {
  max-width: 195px;
  color: rgba(var(--c-tertiary), 1);
  font-size: var(--step--1);
  text-align: center;
  margin-top: var(--space-2xs);
}
</style>