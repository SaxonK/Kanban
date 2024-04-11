<script setup>
  import { ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import TextInput from '@/components/elements/fields/InputText.vue';

  const { module, type } = defineProps({
    module: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  });

  const data = ref({
    heading: module.title
  });

  const updatedHeading = () => {
    if(data.value.heading.trim() === module.title.trim()) return false;

    const boardStore = useBoardStore();
    module.title = data.value.heading;
    boardStore.saveToLocalStorage();
  };
</script>

<template>
  <div class="editable-heading-container">
    <TextInput 
      v-model="data.heading"
      class="editable-heading-input" 
      :class="type"
      :defaultValue="module.title"
      size="1"
      @text-input-blur="updatedHeading"
    required/>
    <div class="editable-heading-hidden" :class="type">{{ data.heading }}</div>
  </div>
</template>

<style>
.editable-heading-container .text-input {
  position: absolute;
  top: var(--space-2xs);
  right: var(--space-2xs);
  bottom: var(--space-2xs);
  left: var(--space-2xs);
  width: unset;
  height: inherit;
}
input.editable-heading-input {
  width: 100% !important;
  height: 100% !important;
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-family);
  color: var(--color-text);
  padding: 0;
  resize: none;
  transition: all 300ms ease-in-out;
  overflow: hidden;
  cursor: pointer;
}
input.editable-heading-input:focus-visible,
input.editable-heading-input:required:focus-within,
input.editable-heading-input.populated:required:focus-within {
  outline: none;
  cursor: auto;
}
input.editable-heading-input.populated:required {
  outline: none;
}

/* Types */
.h1 {
  font-size: var(--step-3);
}
.h2 {
  font-size: var(--step-2);
}
.h3 {
  font-size: var(--step-1);
}
.h4 {
  font-size: var(--step-0);
}
</style>

<style scoped>
.editable-heading-container {
  position: relative;
  padding: var(--space-2xs);
  border-radius: 4px;
  transition: all 300ms ease-in-out;
}
.editable-heading-container:hover,
.editable-heading-container:focus-within {
  background-color: rgba(var(--color-background-rgb), 0.25);
}
.editable-heading-container:focus-within {
  outline: 2px solid rgba(var(--c-primary), 1);
}
.editable-heading-hidden {
  position: relative;
  visibility: hidden;
  line-height: normal;
  z-index: 0;
}
</style>