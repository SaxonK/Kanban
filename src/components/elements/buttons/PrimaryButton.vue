<script setup>
  defineProps({
    icon: {
      type: String,
      required: false,
      default: null
    },
    text: {
      type: String,
      required: true
    },
    textAlign: {
      type: String,
      required: false,
      default: 'center'
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  })

  const getButtonClass = (type) => {
    return type = '' ? '' : `bg-${type.toLowerCase()}`;
  }
  const getTextAlignClass = (textAlign) => {
    return textAlign.toLowerCase();
  }
</script>

<template>
  <button :class="getButtonClass(type)">
    <template v-if="icon != null">
      <span class="material-symbols-rounded button-icon">{{ icon }}</span>
    </template>
    <span class="button-text" :class="getTextAlignClass(textAlign)">{{ text }}</span>
  </button>
</template>

<style scoped>
button {
  display: flex;
  width: 100%;
  height: fit-content;
  border: none;
  border-radius: 4px;
  padding: var(--space-2xs) var(--space-xs);
  align-items: center;
  gap: var(--space-2xs);
  transition: all 300ms ease-in-out;
}
button > span.button-icon {
  transition: all 250ms ease-in-out;
}
button:hover span.button-icon {
  transform: scale(1.15);
}
span.button-text {
  flex: 1 1 0;
  transition: all 250ms ease-in-out;
}
span.button-text::first-letter {
  text-transform: capitalize;
}
span.button-text.left {
  text-align: left;
}
span.button-text.center {
  text-align: center;
}
span.button-text.right {
  text-align: right;
}
.bg-primary {
  background-color: rgba(var(--c-primary), 1);
  color: #fff;
}
.bg-primary:hover {
  background-color: rgba(var(--c-primary), 0.75);
}
.bg-tertiary {
  background-color: rgba(var(--c-tertiary), 1);
  color: #fff;
}
.bg-tertiary:hover {
  background-color: rgba(var(--c-tertiary), 0.75);
}
.bg-mute {
  background-color: transparent;
  color: rgba(var(--color-button-background-rgb), 0.75);
}
.bg-mute:hover {
  background-color: rgba(var(--color-background-mute-rgb), 0.25);
}
.bg-soft {
  background-color: var(--color-background-soft);
  color: rgba(var(--color-button-background-rgb), 0.75);
}
.bg-soft:hover {
  background-color: rgba(var(--color-background-soft-rgb), 0.25);
}
</style>