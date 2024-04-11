<script setup>
  import { useBoardStore } from '@/stores/boardStore';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';
  
  const { absolutePosition, details, hoverEffect, isAbsolute, size } = defineProps({
    absolutePosition: {
      type: Array,
      required: false,
      default: [''],
      validator: value => {
        // Ensure a maximum of 4 positions are given
        if (value.length > 4) return false;
        // Check if each item in the array is of type string
        return value.every(item => typeof item === 'string');
      }
    },
    details: {
      type: Object,
      required: true
    },
    hoverEffect: {
      type: Boolean,
      required: false,
      default: true
    },
    isAbsolute: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false,
      default: 24
    }
  });
  
  const toggleIsFavourite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const boardStore = useBoardStore();

    details.toggleIsFavourite();
    boardStore.saveToLocalStorage();
  }
</script>

<template>
  <SecondaryButton
    :class="{ favourite: details.isFavourite }"
    :absolutePosition="absolutePosition"
    animation="scale"
    :hoverEffect="hoverEffect"
    :isAbsolute="isAbsolute"
    icon="favorite"
    :size="size"
    @click="toggleIsFavourite"
  />
</template>

<style scoped>
span {
  position: relative;
  font-size: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
span:hover {
  transform: scale(1.2);
  transition: all 150ms ease-in;
}
.material-symbols-rounded {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
span.material-symbols-rounded.favourite {
  color: #D32F2F;
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
</style>