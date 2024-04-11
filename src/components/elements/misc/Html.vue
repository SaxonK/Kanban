<script setup>
  const { html, editable } = defineProps({
    html: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  });

  const emit = defineEmits(['edit-html-content']);
  const emitClickEvent = (event) => {
    if(!editable) return false;

    if(event.target.tagName.toLowerCase() === 'a') {
      event.stopPropagation();
    } else {
      emit('edit-html-content');
    };
  }
</script>

<template>
  <div v-html="html" class="html-container" :class="{ 'editable' : editable }"
    @click="emitClickEvent"
  ></div>
</template>

<style>
.html-container a {
  text-decoration: underline;
  color: rgba(var(--c-primary), 1);
  cursor: pointer;
}
.html-container img {
  max-width: 100%;
}
.html-container > :not(:first-child) {
  margin-top: var(--space-xs);
}
</style>
<style scoped>
.html-container {
  width: 100%;
  padding: calc(var(--space-3xs) * 2) calc(var(--space-2xs) * 2);
  margin: var(--space-2xs) 0;
  background: var(--color-background-soft);
  border-radius: 12px;
  transition: all 300ms ease-in-out;
  cursor: default;
}
.html-container.editable {
  padding: calc(var(--space-2xs) * 2);
  margin: 0;
  border-radius: 4px;
  cursor: pointer;
}
.html-container.editable:hover {
  background: rgba(var(--c-white-0), 0.15);
}
</style>