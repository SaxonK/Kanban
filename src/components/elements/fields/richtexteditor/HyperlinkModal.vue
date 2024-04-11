<script setup>
  import { computed, ref } from 'vue';
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
    hyperlink: ''
  });
  const emit = defineEmits(['close-modal']);

  /* Computed Properties */
  const defaultValue = computed(() => {
    return 'https://';
  });
  const initialValue = computed(() => {
    const currentLink = editor.getAttributes('link').href;
    const initValue = currentLink === '' || currentLink === null || currentLink === undefined ? 
      defaultValue.value : 
      currentLink
    ;

    return initValue;
  });
  const url = computed(() => {
    const inputValue = data.value.hyperlink.trim().toLowerCase();
    const defaultVal = defaultValue.value.trim().toLowerCase();
    if(inputValue !== defaultVal && inputValue !== '' && inputValue !== null && inputValue !== undefined) {
      return inputValue;
    }
    return '';
  });

  /* Methods */
  const createHyperlink = () => {
    const submittedValue = url.value;
    if(submittedValue === '') {
      emit('close-modal');
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: submittedValue }).run();
      emit('close-modal');
    };
  };
  const closeModal = () => {
    emit('close-modal');
  };
</script>

<template>
  <Modal :isVisible="isVisible" class="rich-text-editor-hyperlink-modal">
    <template v-slot:header>
      <span class="material-symbols-rounded card-icon">link</span>
      <h4>Create hyperlink</h4>
    </template>
    <template v-slot:main>
      <InputText v-model="data.hyperlink"
        :autoFocus="true"
        :defaultValue="initialValue"
        label="Link"
      />
    </template>
    <template v-slot:footer>
      <PrimaryButton style="width: auto;"
        text="Save" 
        type="primary"
        @click="createHyperlink"
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
.rich-text-editor-hyperlink-modal .modal {
  height: unset;
}
</style>