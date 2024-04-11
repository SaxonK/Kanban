<script setup>
  import Basic from '@/components/elements/menus/Basic.vue';
  import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue';

  defineProps({
    isVisible: {
      type: Boolean,
      required: true
    }
  });
</script>

<template>
  <transition name="modal">
    <div v-if="isVisible" class="modal-container">
      <div class="modal">
        <Basic style="height: 100%; box-shadow: 0px 0px 6px 1px rgba(var(--black--1), 1);">
          <template v-if="$slots.header" v-slot:header>
            <div class="header-content">
              <slot name="header"></slot>
            </div>
            <SecondaryButton icon="close" @click="$emit('close-modal')" />
          </template>
          <template v-if="$slots.main" v-slot:main>
            <slot name="main"></slot>
          </template>
          <template v-if="$slots.footer" v-slot:footer>
            <slot name="footer"></slot>
          </template>
        </Basic>
      </div>
      <div class="modal-backdrop" @click="$emit('close-modal')"></div>
    </div>
  </transition>
</template>

<style>
.modal header {
  width: 100%;
  padding-bottom: var(--space-2xs);
  border-bottom: 1px solid var(--color-border);
}
</style>

<style scoped>
.modal-container {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.6s ease;
  z-index: 9998;
}
.modal {
  display: flex;
  width: 50%;
  height: calc(100vh - (var(--space-2xl) * 2));
  margin: auto;
  transition: all 0.3s ease;
  z-index: 1;
}
.modal .header-content {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--space-s);
}
.modal-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(var(--c-black-0), 0.6);
  z-index: 0;
}

/* Animation */
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>