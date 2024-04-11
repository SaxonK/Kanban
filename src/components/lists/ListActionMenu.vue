<script setup>
  import { onMounted, onUnmounted } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import MenuContainer from '@/components/elements/menus/Basic.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    list: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits(['click-outside-action-menu', 'toggle-action-menu']);

  const toggleVisibility = () => {
    emit('toggle-action-menu');
  };
  const clickOutsideMenu = (event) => {
    if(!props.isVisible) return false;
    const colButton = event.target.closest(`.action-menu-button`);
    if(!event.target.closest(`.list-action-menu`) && (colButton === undefined || colButton === null || colButton.dataset.id != props.list.id)) {
      emit('click-outside-action-menu');
    }
  };
  const deleteList = () => {
    const boardStore = useBoardStore();
    props.list.deleteList();
    boardStore.saveToLocalStorage();
  };

  onMounted(() => {
    document.addEventListener('click', clickOutsideMenu);
  });
  onUnmounted(() => {
    document.removeEventListener('click', clickOutsideMenu);
  });
</script>

<template>
  <transition name="fade">
    <MenuContainer v-if="isVisible" class="list-action-menu">
      <template v-slot:header>
        <h4>List Actions</h4>
        <SecondaryButton
          :absolutePosition="['right']"
          icon="close"
          :isAbsolute="true"
          :size="18"
          @click="toggleVisibility"
        />
      </template>
      <template v-slot:footer>
        <PrimaryButton text="Delete this list" type="tertiary" @click="deleteList" />
      </template>
    </MenuContainer>
  </transition>
</template>

<style scoped>
.list-action-menu {
  position: absolute;
  width: 250px;
  top: calc(var(--space-2xs-xs) + var(--space-2xs) + 38px);
  left: calc(100% - var(--space-s-m) - 38px);
  border-radius: 6px;
  background: rgba(var(--color-background-header-rgb), 0.75);
  box-shadow: 0px 0px 6px 1px rgba(var(--c-black--1), 1);
  z-index: 2;
}
h4 {
  width: 100%;
  text-align: center;
  padding: var(--space-2xs);
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