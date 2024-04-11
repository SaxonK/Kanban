<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import { useRouter } from 'vue-router';
  import BasicMenu from '@/components/elements/menus/Basic.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';
  import TextInput from '@/components/elements/fields/InputText.vue';

  const { board } = defineProps({
    board: {
      type: Object,
      required: true
    }
  });
  
  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    deleteBoard: false
  });
  const emit = defineEmits('settings-click-event');
  const localDetails = ref({ ...board });
  const router = useRouter();

  const closeBoardSettings = () => {
    emit('settings-click-event');
  };
  const deleteBoard = () => {
    const boardStore = useBoardStore();

    board.deleteBoard();
    boardStore.saveToLocalStorage();
    router.push('/');
  };
  const handleClickEvent = (event) => {
    if(event.target.closest('.board-settings-container')) return false;
    emit('settings-click-event');
  };
  const UpdateValue = (field) => {
    if (localDetails[field] === board[field]) return false;
    const boardStore = useBoardStore();
    localDetails[field] = board[field];
    boardStore.saveToLocalStorage();
  };
  onMounted(() => {
    document.body.addEventListener('click', handleClickEvent);
  });
  onUnmounted(() => {
    document.body.removeEventListener('click', handleClickEvent);
  });
</script>

<template>
  <BasicMenu class="board-settings-container">
    <template v-slot:header>
      <div class="board-settings-title">
        <h3>Settings</h3>
        <SecondaryButton icon="close" :isAbsolute="true" :absolutePosition="['right']" @click="closeBoardSettings" />
      </div>
    </template>
    <template v-slot:main>
      <div class="board-settings">
        <TextInput v-model="board.description" 
          :defaultValue="board.description"
          label="Description"
          @blur="UpdateValue('description')"
        />
        <TextInput v-model="board.background"
          :defaultValue="board.background"
          label="Background"
          @blur="UpdateValue('background')"
        />
      </div>
    </template>
    <template v-slot:footer>
      <PrimaryButton v-show="!localStates.deleteBoard"
        text="Delete board" 
        type="tertiary"
        @click="toggleLocalState('deleteBoard')"
      />
      <div class="delete-board-confirmation" v-show="localStates.deleteBoard">
        <h4>Are you sure you want to delete this board?</h4>
        <PrimaryButton
          text="Yes, Delete this board" 
          type="tertiary"
          @click="deleteBoard"
        />
        <PrimaryButton
          text="Cancel board deletion" 
          type="soft"
          @click="toggleLocalState('deleteBoard')"
        />
      </div>
    </template>
  </BasicMenu>
</template>

<style scoped>
.board-settings-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0%;
  bottom: 0;
  gap: var(--grid-gutter);
  padding: 0 var(--space-m) var(--space-m);
  width: 25%;
  height: calc(100vh - 50px);
  background: rgba(var(--color-background-header-rgb), 0.75);
  backdrop-filter: blur(4px);
  border-radius: 0px;
  border-left: 1px solid var(--color-border);
  transition: all 300ms ease-in-out;
  z-index: 10;
}
.board-settings-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--color-border);
}
h3 {
  font-size: var(--step-1);
  font-weight: 600;
  text-align: center;
}
.close-button {
  position: absolute;
  right: 0;
  cursor: pointer;
  display: flex;
  padding: var(--space-2xs);
  border-radius: 4px;
  transition: all 300ms ease-in-out;
}
.close-button:hover {
  background: rgba(255,255,255, 0.15);
}
.board-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
.delete-board-confirmation {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--space-s);
}
.delete-board-confirmation h4 {
  text-align: center;
}
</style>