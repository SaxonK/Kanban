<script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3';
  import { useLocalState } from '@/mixins/useLocalState.js';
  import HyperlinkModal from '@/components/elements/fields/richtexteditor/HyperlinkModal.vue';
  import ImageModal from '@/components/elements/fields/richtexteditor/ImageModal.vue';
  import Image from '@tiptap/extension-image';
  import Link from '@tiptap/extension-link';
  import Placeholder from '@tiptap/extension-placeholder';
  import primaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import Toolbar from '@/components/elements/fields/richtexteditor/Toolbar.vue';
  import Underline from '@tiptap/extension-underline';

  const { content, isVisible } = defineProps({
    content: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  });
  const emit = defineEmits(['cancel-rich-text', 'save-rich-text']);

  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    hyperlink: false,
    image: false
  });

  const editor = useEditor({
    content: content,
    extensions: [
      Image.configure({
        HTMLAttributes: {
          class: 'rich-text-image',
        },
      }),
      Link.configure({
        validate: href => /^https?:\/\//.test(href),
      }),
      Placeholder.configure({
        placeholder: 'Enter a description...',
      }),
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Underline
    ]
  });

  const cancelChanges = () => {
    emit('cancel-rich-text');
  };
  const openModal = (property) => {
    setLocalStateTrue(property);
  };
  const saveChanges = (content) => {
    const richTextContent = content;
    emit('save-rich-text', richTextContent);
  };
</script>

<template>
  <div v-if="isVisible" class="rich-text-editor-container">
    <div class="rich-text-editor">
      <Toolbar :editor="editor"
        @openModal="openModal"
      />
      <editor-content class="rich-text-editor-content" :editor="editor" autofocus />
      <HyperlinkModal :isVisible="localStates.hyperlink" :editor="editor"
        @close-modal="setLocalStateFalse('hyperlink')"
      />
      <ImageModal  :isVisible="localStates.image" :editor="editor"
        @closeModal="setLocalStateFalse('image')"
      />
    </div>
    <div class="rich-text-editor-actions">
      <primaryButton style="width: auto;"
        text="Save" 
        type="primary"
        @click="saveChanges(editor.getHTML())"
      />
      <primaryButton style="width: auto;"
        text="Cancel" 
        type="mute"
        @click="cancelChanges"
      />
    </div>
  </div>
</template>

<style>
/* applied styling fixes */
strong {
  font-weight: bold !important;
}
em, u {
  font-weight: inherit;
}

/* UI Styling fixes */
.rich-text-editor-content .tiptap.ProseMirror.ProseMirror-focused {
  outline: none;
}
.rich-text-editor-content .tiptap.ProseMirror > :not(:first-child) {
  margin-top: var(--space-xs);
}
.rich-text-editor-content .tiptap.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  pointer-events: none;
  height: 0;
  color: rgba(var(--c-white-0), 0.2);
  font-style: italic;
}
.rich-text-editor-content .tiptap.ProseMirror a {
  color: rgba(var(--c-primary), 1);
  text-decoration: underline;
}
.rich-text-editor-content .tiptap.ProseMirror img.rich-text-image {
  max-width: 100%;
}
</style>
<style scoped>
/* Rich Text Editor */
.rich-text-editor-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}
.rich-text-editor {
  position: relative;
  display: flex;
  max-height: 45vh;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  transition: all 400ms ease-in-out;
  overflow: hidden;
}
.rich-text-editor:focus-within {
  outline: 2px solid rgba(var(--c-primary), 1);
}
/* Rich Text Editor Content */
.rich-text-editor-content {
  background: var(--color-background-mute);
  padding: calc(var(--space-2xs) * 2);
  overflow-y: scroll;
}
/* Rich Text Editor Actions */
.rich-text-editor-actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-2xs);
}
</style>