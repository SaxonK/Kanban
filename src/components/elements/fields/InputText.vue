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
    }
  });

  const { localStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    error: false,
    populated: false,
    required: false
  });
  const data = ref({
    textInputValue: props.defaultValue
  });
  const emit = defineEmits(['text-input-blur', 'text-input-changed', 'text-input-cleared', 'text-input-populated']);
  const textInput = ref(null);

  const checkRequiredInput = (event) => {
    if(!localStates.value.required) {
      emit('text-input-changed', data.value.textInputValue);
      return false;
    };
    
    if(data.value.textInputValue.length > 0) {
      setLocalStateTrue('populated');
      setLocalStateFalse('error');
      emit('text-input-populated', event);
    } else {
      setLocalStateFalse('populated');
      setLocalStateTrue('error');
    }
  }
  const clearFieldValue = (clearState) => {
    if(!clearState) return false;
    data.value.textInputValue = '';
    emit('text-input-cleared');
  };

  onMounted(() => {
    textInput.value.required ? setLocalStateTrue('required') : setLocalStateFalse('required');
    data.value.textInputValue.length > 0 ? setLocalStateTrue('populated') : setLocalStateFalse('populated');
    props.autoFocus ? textInput.value.focus() : null;
  });
  watch(() => props.clearValue, (newValue, oldValue) => {
    if(!newValue) return false;
    clearFieldValue(newValue);
  });
</script>

<template>
  <div class="text-input">
    <label v-if="label && (label != '' || label != null)">
      {{ label }}
      <span v-if="localStates.required" class="input-required">*</span>
      <span v-if="localStates.error" class="input-required" style="font-size: var(--step--1)"> Must be populated</span>
    </label>
    <input 
      v-bind="$attrs"
      v-model="data.textInputValue"
      ref="textInput"
      type="text"
      :class="localStates.required && localStates.populated ? 'populated' : ''"
      @blur="$emit('text-input-blur')"
      @input="checkRequiredInput"
    />
  </div>
</template>

<style scoped>
.text-input {
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
label .input-required {
  color: rgba(var(--c-tertiary), 1);
  font-style: italic;
  vertical-align: super;
  transition: all 400ms ease-in-out;
}
input {
  width: 100%;
  color: var(--color-text);
  font-size: var(--step-0);
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-2xs) var(--space-xs);
  transition: all 400ms ease-in-out;
}
input:focus-within {
  outline: 2px solid var(--color-border);
}
input:required:focus-within {
  outline: 2px solid rgba(var(--c-tertiary), 1);
}
input.populated:required {
  outline: 2px solid rgba(var(--c-primary), 1);
}
</style>