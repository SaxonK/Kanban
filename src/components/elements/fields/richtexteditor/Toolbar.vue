<script setup>
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  const { editor } = defineProps({
    editor: {
      type: Object,
      required: true
    }
  });
</script>
<template>
  <div v-if="editor" class="rich-text-editor-menu">
    <div class="button-group">
      <SecondaryButton :class="{ 'is-active': editor.isActive('bold') }"
        icon="format_bold"
        :size="18"
        tooltip="Bold"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('italic') }"
        icon="format_italic"
        :size="18"
        tooltip="Italic"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('underline') }"
        icon="format_underlined"
        :size="18"
        tooltip="Underline"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
    </div>
    <div class="button-group">
      <SecondaryButton :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        icon="format_align_left"
        :size="18"
        tooltip="Align left"
        @click="editor.chain().focus().setTextAlign('left').run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        icon="format_align_center"
        :size="18"
        tooltip="Align center"
        @click="editor.chain().focus().setTextAlign('center').run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        icon="format_align_right"
        :size="18"
        tooltip="Align right"
        @click="editor.chain().focus().setTextAlign('right').run()"
      />
    </div>
    <div class="button-group">
      <SecondaryButton :class="{ 'is-active': editor.isActive('bulletList') }"
        icon="format_list_bulleted"
        :size="18"
        tooltip="Bulleted list"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('orderedList') }"
        icon="format_list_numbered"
        :size="18"
        tooltip="Numbered list"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
    </div>
    <div class="button-group">
      <SecondaryButton :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        icon="format_h2"
        :size="18"
        tooltip="Format as h2"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        icon="format_h3"
        :size="18"
        tooltip="Format as h3"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        icon="format_h4"
        :size="18"
        tooltip="Format as h4"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      />
    </div>
    <div class="button-group">
      <SecondaryButton :class="{ 'is-active': editor.isActive('link') }"
        icon="link"
        :size="18"
        tooltip="Create hyperlink"
        @click="$emit('openModal', 'hyperlink')"
      />
      <SecondaryButton :class="{ 'is-disabled': !editor.isActive('link') }"
        icon="link_off"
        :size="18"
        tooltip="Remove hyperlink"
        @click="editor.chain().focus().unsetLink().run()"
      />
      <SecondaryButton :class="{ 'is-active': editor.isActive('image') }"
        icon="add_photo_alternate"
        :size="18"
        tooltip="Add image"
        @click="$emit('openModal', 'image')"
      />
    </div>
  </div>
</template>

<style scoped>
/* Rich Text Editor Menu */
.rich-text-editor-menu {
  position: sticky;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: var(--space-xs);
  padding: var(--space-2xs);
  background: rgba(var(--color-background-header-rgb), 0.25);
  border-bottom: 1px solid var(--color-border);
}
.button-group {
  display: flex;
  border-right: 1px solid var(--color-border);
  padding-right: var(--space-2xs);
  gap: var(--space-xs);
}
.button-group:last-child {
  border-right: none;
  padding-right: 0;
}
button.secondary-button.is-active {
  background: rgba(var(--color-button-background-rgb), 0.15);
}
button.secondary-button.is-disabled {
  display: none;
}
</style>