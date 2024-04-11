<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { useLocalState } from '@/mixins/useLocalState.js';
  
  const props = defineProps({
    autoFocus: {
      type: Boolean,
      required: false,
      default: false
    },
    clearValue: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultValue: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  });

  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    error: false,
    populated: false,
    required: false
  });
  const data = ref({
    textAreaValue: props.defaultValue
  });
  const emit = defineEmits(['text-area-blur', 'text-area-cleared', 'text-area-populated']);
  const textArea = ref(null);

  const checkRequiredInput = (event) => {
    if(!localStates.value.required) return false;
    
    if(data.value.textAreaValue.length > 0) {
      setLocalStateTrue('populated');
      setLocalStateFalse('error');
      emit('text-area-populated', event);
    } else {
      setLocalStateFalse('populated');
      setLocalStateTrue('error');
    }
  }
  const clearFieldValue = (clearState) => {
    if(!clearState) return false;
    data.value.textAreaValue = '';
    emit('text-area-cleared');
  };

  onMounted(() => {
    textArea.value.required ? setLocalStateTrue('required') : setLocalStateFalse('required');
    data.value.textAreaValue.length > 0 ? setLocalStateTrue('populated') : setLocalStateFalse('populated');
    props.autoFocus ? textArea.value.focus() : null;
  });
  watch(() => props.clearValue, (newValue, oldValue) => {
    if(!newValue) return false;
    clearFieldValue(newValue);
  });
</script>

<template>
  <div class="text-area">
    <label v-if="label && (label != '' || label != null)">
      {{ label }}
      <span v-if="localStates.required" class="text-area-required">*</span>
      <span v-if="localStates.error" class="text-area-required" style="font-size: var(--step--1)"> Must be populated</span>
    </label>
    <textarea 
      v-bind="$attrs"
      v-model="data.textAreaValue"
      :placeholder="placeholder"
      ref="textArea"
      type="text"
      :class="localStates.required && localStates.populated ? 'populated' : ''"
      @blur="$emit('text-area-blur')"
      @input="checkRequiredInput"
    />
  </div>
</template>

<style scoped>
.text-area {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--space-3xs);
}
label {
  text-align: left;
  font-size: var(--step-0);
  font-weight: 600;
}
label .text-area-required {
  color: rgba(var(--c-tertiary), 1);
  font-style: italic;
  vertical-align: super;
  transition: all 400ms ease-in-out;
}
textarea {
  width: 100%;
  color: var(--color-text);
  font-size: var(--step-0);
  font-family: var(--font-family);
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-2xs) var(--space-xs);
  transition: all 400ms ease-in-out;
}
textarea:focus-within {
  outline: 2px solid var(--color-border);
}
textarea:required:focus-within {
  outline: 2px solid rgba(var(--c-tertiary), 1);
}
textarea.populated:required {
  outline: 2px solid rgba(var(--c-primary), 1);
}

.absolute {
  position: absolute;
}
.absolute.top {
  top: 0;
}
.absolute.right {
  right: 0;
}
.absolute.bottom {
  bottom: 0;
}
.absolute.left {
  left: 0;
}
</style>