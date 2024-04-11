<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import { useLocalState } from '@/mixins/useLocalState';
  import Basic from '@/components/elements/menus/Basic.vue';
  import ConfigChecklist from '@/components/cards/actions/configuration/configurationChecklist.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const { card } = defineProps({
    card: {
      type: Object,
      required: true
    }
  });
  
  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    actionButtons: true,
    configurations: {
      checklist: false
    }
  });
  const data = ref({
    actionMenuTitle: 'Actions',
  });
  const emit = defineEmits(['close-action-menu', 'close-modal']);

  const clickOutsideActionMenu = (event) => {
    if(!event.target.closest(`.card-actions-menu`)) {
      resetLocalStates();
      emit('close-action-menu');
    }
  };
  const closeConfiguration = () => {
    setLocalStateTrue('actionButtons');
    setLocalStateFalse('configurations', 'checklist');
    data.value.actionMenuTitle = `Actions`;
  };
  const closeMenu = () => {
    resetLocalStates();
    emit('close-action-menu');
  };  
  const deleteCard = () => {
    const boardStore = useBoardStore();
    card.deleteCard();
    boardStore.saveToLocalStorage();
    emit('close-modal');
  };
  const openActionConfiguration = (type, action) => {
    setLocalStateFalse('actionButtons');
    setLocalStateTrue('actionConfiguration');
    setLocalStateTrue('configurations', 'checklist');
    data.value.actionMenuTitle = `${action} ${type}`;
  };
  onMounted(() => {
    document.body.addEventListener('click', clickOutsideActionMenu);
  });
  onUnmounted(() => {
    document.body.removeEventListener('click', clickOutsideActionMenu);
  });
</script>

<template>
  <Basic class="card-actions-menu">
    <template v-slot:header>
      <secondaryButton
        v-show="localStates.actionConfiguration"
        icon="arrow_back"
        :size="18"
        style="position: absolute; left: 0;"
        @click="closeConfiguration"
      />
      <h4 class="card-action-menu-title">{{ data.actionMenuTitle }}</h4>
      <secondaryButton
        icon="close"
        :size="18"
        style="position: absolute; right: 0;"
        @click="closeMenu"
      />
    </template>
    <template v-slot:main>
      <div v-show="localStates.actionButtons" class="action-buttons">
        <PrimaryButton
          icon="check_box"
          text="Add Checklist"
          textAlign="left"
          type="soft"
          @click="openActionConfiguration('checklist', 'add')"
        />
      </div>
      <ConfigChecklist v-show="localStates.configurations.checklist" 
        :card="card"
        @add-checklist="closeMenu"
      />
    </template>
    <template v-slot:footer v-if="localStates.actionButtons">
      <PrimaryButton
        text="Delete Card"
        type="tertiary"
        @click="deleteCard"
      />
    </template>
  </Basic>
</template>

<style scoped>
.card-actions-menu {
  position: absolute;
  width: 250px;
  right: 0;
  top: calc(100% + var(--space-2xs));
  padding: var(--space-xs);
  border-radius: 6px;
  z-index: 10;
}
.card-action-menu-title {
  text-align: center;
  margin: auto;
}
.card-action-menu-title::first-letter {
  text-transform: capitalize;
}
</style>