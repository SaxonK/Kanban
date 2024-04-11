<script setup>
  import { ref } from 'vue';
  import InputText from '@/components/elements/fields/InputText.vue';
  import Modal from '@/components/elements/menus/Modal.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';

  const { editor, isVisible } = defineProps({
    editor: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  });
  const data = ref({
    hyperlink: null,
    url: ''
  });
  const emit = defineEmits(['close-modal']);
  
  const closeModal = () => {
    emit('close-modal');
  };
  const createImage = () => {
    const submittedValue = data.value.url;
    if(submittedValue === '') {
      emit('close-modal');
    } else {
      editor.chain().focus().setImage({ src: submittedValue }).run();
      emit('close-modal');
    }
  };
  const updatePreviewImage = (inputValue) => {
    const previewUrl = inputValue.startsWith('https://') ? inputValue : '';
    data.value.url = previewUrl;
  };
</script>

<template>
  <Modal :isVisible="isVisible" class="rich-text-editor-image-modal">
    <template v-slot:header>
      <span class="material-symbols-rounded card-icon">add_photo_alternate</span>
      <h4>Add an image</h4>
    </template>
    <template v-slot:main>
      <InputText v-model="data.hyperlink"
        :autoFocus="true"
        label="Attach an image link" 
        @text-input-changed="updatePreviewImage"
      />
      <div class="image-preview-window">
        <p v-if="data.url === ''">Image Preview</p>
        <div v-if="data.url !== ''" class="preview-image" :style="`background: url('${data.url}')`"></div>
      </div>
    </template>
    <template v-slot:footer>
      <PrimaryButton style="width: auto;"
        text="Save" 
        type="primary"
        @click="createImage"
      />
      <PrimaryButton style="width: auto;"
        text="Cancel" 
        type="mute"
        @click="closeModal"
      />
    </template>
  </Modal>
</template>

<style>
.rich-text-editor-image-modal .modal {
  height: unset;
}
</style>
<style scoped>
.image-preview-window {
  display: flex;
  overflow: hidden;
  width: 75%;
  min-height: 150px;
  margin: var(--space-s) auto;
  background-color: var(--color-background-mute);
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image-preview-window p {
  font-weight: 600;
  transition: all 400ms ease-in-out;
}
.image-preview-window .preview-image {
  width: 100%;
  height: 100%;
  background-size: cover !important;
  transition: all 400ms ease-in-out;
}
</style>