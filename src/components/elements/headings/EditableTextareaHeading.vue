<script setup>
  import { ref } from 'vue';
  import { useBoardStore } from '@/stores/boardStore';
  import TextArea from '@/components/elements/fields/TextArea.vue';

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
    <TextArea 
      v-model="data.heading"
      class="editable-heading-text-area" 
      :class="type"
      :defaultValue="module.title"
      size="1"
      @text-area-blur="updatedHeading"
    required/>
    <div class="editable-heading-hidden" :class="type">{{ data.heading }}</div>
  </div>
</template>

<style>
.editable-heading-container .text-area {
  position: absolute;
  top: var(--space-2xs);
  right: var(--space-2xs);
  bottom: var(--space-2xs);
  left: var(--space-2xs);
  width: unset;
  height: inherit;
  font-weight: inherit;
}
.editable-heading-container textarea.editable-heading-text-area {
  width: inherit !important;
  height: 100% !important;
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-family);
  font-weight: inherit;
  color: var(--color-text);
  padding: 0;
  resize: none;
  transition: all 300ms ease-in-out;
  overflow: hidden;
  cursor: pointer;
}
.editable-heading-container textarea.editable-heading-text-area:focus-visible,
.editable-heading-container textarea.editable-heading-text-area:required:focus-within,
.editable-heading-container textarea.editable-heading-text-area.populated:required:focus-within {
  outline: none;
  cursor: auto;
}
.editable-heading-container textarea.editable-heading-text-area.populated:required {
  outline: none;
}

/* Types */
.editable-heading-container .h1 {
  font-size: var(--step-3);
}
.editable-heading-container .h2 {
  font-size: var(--step-2);
}
.editable-heading-container .h3 {
  font-size: var(--step-1);
}
.editable-heading-container .h4 {
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
  background-color: rgba(var(--color-background-header-rgb), 0.25);
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