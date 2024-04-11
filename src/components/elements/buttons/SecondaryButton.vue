<script setup>
  defineProps({
    absolutePosition: {
      type: Array,
      required: false,
      default: [],
      validator: value => {
        // Ensure a maximum of 4 positions are given
        if (value.length > 4) return false;
        // Check if each item in the array is of type string
        return value.every(item => typeof item === 'string');
      }
    },
    animation: {
      type: String,
      required: false,
      default: ''
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
    icon: {
      type: String,
      required: true,
      default: 'block'
    },
    size: {
      type: Number,
      required: false,
      default: 24
    },
    tooltip: {
      type: String,
      required: false,
      default: ''
    }
  });
  
  const getButtonClasses = (position, alignment, animation, hover) => {
    const positionClass = position ? 'absolute' : '';
    const aligmentClass = alignment.length > 0 ? alignment.join(' ') : '';
    const hoverClass = hover ? 'hover-effect' : '';

    return `${animation} ${positionClass} ${aligmentClass} ${hoverClass}`;
  };
  const iconFontSize = (size) => {
    return `font-size: ${size}px;`;
  };
</script>

<template lang="">
  <button class="secondary-button" :class="getButtonClasses(isAbsolute, absolutePosition, animation, hoverEffect)" :title="tooltip">
    <span class="material-symbols-rounded button-icon" :style="iconFontSize(size)">{{ icon }}</span>
  </button>
</template>

<style scoped>
button.secondary-button {
  position: relative;
  display: flex;
  right: 0;
  padding: var(--space-2xs);
  border-radius: 4px;
  background: rgba(255,255,255, 0);
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
button.secondary-button.hover-effect:hover {
  background: rgba(255,255,255, 0.15);
}
button.secondary-button.absolute {
  position: absolute;
}
button.secondary-button.absolute.top {
  top: 0;
}
button.secondary-button.absolute.right {
  right: 0;
}
button.secondary-button.absolute.bottom {
  bottom: 0;
}
button.secondary-button.absolute.left {
  left: 0;
}
.button-icon {
  color: var(--color-text);
  transition: all 250ms ease-in-out;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
button.secondary-button.favourite .button-icon {
  color: #D32F2F;
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
button.secondary-button.rotate:hover .button-icon {
  transform: rotate(60deg);
}
button.secondary-button.scale:hover .button-icon {
  transform: scale(1.15);
}
</style>